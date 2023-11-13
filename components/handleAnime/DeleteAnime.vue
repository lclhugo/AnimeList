<template>
  <div>
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
    closeModal();
  } catch (error) {
    console.error(error);
  }
};

const closeModal = () => {
  const modal = document.getElementById('deleteModal');
  modal.close();
};
</script>
