<template>
  <div>
    <div v-if="feedbackDeleteMessage" v-motion-slide-visible-right class="z-50 toast toast-end">
      <div
        :class="{
          'alert alert-success': feedbackDeleteSuccess,
          'alert alert-error': !feedbackDeleteSuccess,
        }"
      >
        <svg
          v-if="feedbackDeleteSuccess"
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 stroke-current shrink-0"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-if="!feedbackDeleteSuccess"
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 stroke-current shrink-0"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {{ feedbackDeleteMessage }}
      </div>
    </div>
    <dialog id="deleteModal" class="modal" @click.self="closeModal">
      <div class="modal-box">
        <button
          onclick="deleteModal.close()"
          class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
        >
          ✕
        </button>
        <h3 class="text-lg font-bold">
          Are you sure you want to delete {{ animeTitle }} from your list?
        </h3>
        <p class="py-4 text-sm">
          Press
          <kbd class="kbd">ESC</kbd>
          or click on the ✕ to close
        </p>
        <div class="flex justify-end gap-2">
          <button class="btn" onclick="deleteModal.close()">Cancel</button>
          <button class="btn btn-primary" @click="deleteFromList">Delete</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script lang="ts" setup>
const jwt = useCookie('sb-access-token');
const { value: yourJwtToken } = jwt;
const feedbackDeleteMessage = ref('');
const feedbackDeleteSuccess = ref(false);

const { animeId, animeTitle } = defineProps(['animeId', 'animeTitle']);
const emit = defineEmits(['anime-deleted']);

const deleteFromList = async () => {
  try {
    await useFetch(`https://localhost:7081/api/anime/list/remove?animeId=${animeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${yourJwtToken}`,
      },
    });
    emit('anime-deleted');
    const modal = document.getElementById('deleteModal');
    feedbackDeleteMessage.value = 'Anime deleted successfully';
    feedbackDeleteSuccess.value = true;
    modal.close();
  } catch (error) {
    console.error(error);
    feedbackDeleteMessage.value = 'Error deleting anime';
    feedbackDeleteSuccess.value = false;
  }
};

const closeModal = () => {
  const modal = document.getElementById('deleteModal');
  modal.close();
};

const removefeedbackDeleteMessage = () => {
  feedbackDeleteMessage.value = '';
  feedbackDeleteSuccess.value = false;
};

watch(feedbackDeleteMessage, () => {
  if (feedbackDeleteMessage.value !== '') {
    setTimeout(removefeedbackDeleteMessage, 3000);
  }
});
</script>
