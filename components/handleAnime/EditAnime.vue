<template>
  <div>
    <div v-if="feedbackEditMessage" v-motion-slide-visible-right class="z-50 toast toast-end">
      <div
        :class="{
          'alert alert-success': feedbackEditSuccess,
          'alert alert-error': !feedbackEditSuccess,
        }"
      >
        <svg
          v-if="feedbackEditSuccess"
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
          v-if="!feedbackEditSuccess"
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
        {{ feedbackEditMessage }}
      </div>
    </div>
    <dialog id="editModal" class="modal" @click.self="closeModal">
      <div class="modal-box">
        <button
          onclick="editModal.close()"
          class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
        >
          ✕
        </button>
        <h3 class="text-lg font-bold">Edit {{ animeTitle }} in your list</h3>
        <p class="py-4 text-sm">
          Press
          <kbd class="kbd">ESC</kbd>
          or click on the ✕ to close
        </p>
        <form method="dialog">
          <form class="gap-2 form-control align-center" @submit.prevent="submitEditForm">
            <label for="status" class="label-text-alt">Status:</label>
            <select
              id="status"
              v-model="editedAnime.status"
              class="w-full input input-bordered"
              @change="handleStatusChange"
            >
              <option value="1">Watching</option>
              <option value="2">Completed</option>
              <option value="3">On Hold</option>
              <option value="4">Dropped</option>
              <option value="6">Plan to Watch</option>
            </select>
            <label for="watchedEpisodes" class="label-text-alt">Watched Episodes:</label>
            <div class="join">
              <input
                id="watchedEpisodes"
                v-model="editedAnime.watchedEpisodes"
                type="number"
                class="w-full remove-arrow input input-bordered join-item"
                min="0"
                :max="animeEpisodes"
              />
              <span class="p-2.5 join-item input input-bordered">/{{ animeEpisodes }}</span>
            </div>
            <!-- Rating -->
            <label for="rating" class="label-text-alt">Rating:</label>
            <div class="mx-auto rating rating-lg rating-half">
              <input
                v-model="editedAnime.rating"
                type="radio"
                name="rating-10"
                class="rating-hidden"
                value="0"
              />
              <input
                v-model="editedAnime.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-1"
                value="1"
              />
              <input
                v-model="editedAnime.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-2"
                value="2"
              />
              <input
                v-model="editedAnime.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-1"
                value="3"
              />
              <input
                v-model="editedAnime.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-2"
                value="4"
              />
              <input
                v-model="editedAnime.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-1"
                value="5"
              />
              <input
                v-model="editedAnime.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-2"
                value="6"
              />
              <input
                v-model="editedAnime.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-1"
                value="7"
              />
              <input
                v-model="editedAnime.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-2"
                value="8"
              />
              <input
                v-model="editedAnime.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-1"
                value="9"
              />
              <input
                v-model="editedAnime.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-2"
                value="10"
              />
            </div>
            <button class="mt-8 btn btn-primary" type="submit">Save Changes</button>
          </form>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
const jwt = useCookie('sb-access-token');
const { value: yourJwtToken } = jwt;
const feedbackEditMessage = ref('');
const feedbackEditSuccess = ref(false);

const { animeId, animeTitle, animeEpisodes, currentWatchedEpisodes, currentStatus, currentRating } =
  defineProps([
    'animeId',
    'animeTitle',
    'animeEpisodes',
    'currentWatchedEpisodes',
    'currentStatus',
    'currentRating',
  ]);
const emit = defineEmits(['anime-updated']);

const editedAnime = ref({
  status: currentStatus,
  watchedEpisodes: currentWatchedEpisodes,
  rating: currentRating,
});

const submitEditForm = async () => {
  const jsonPayload = {
    statusId: editedAnime.value.status,
    watchedEpisodes: editedAnime.value.watchedEpisodes,
    rating: editedAnime.value.rating,
  };
  console.log(jsonPayload);
  try {
    await useFetch(`https://localhost:7081/api/anime/list/update/${animeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${yourJwtToken}`,
      },
      body: JSON.stringify(jsonPayload),
    });
    emit('anime-updated');
    const modal = document.getElementById('editModal');
    feedbackEditMessage.value = 'Anime updated successfully';
    feedbackEditSuccess.value = true;
    modal.close();
  } catch (error) {
    console.error(error);
    feedbackEditMessage.value = 'Error updating anime';
    feedbackEditSuccess.value = false;
  }
};

watch(editedAnime, () => {
  console.log(editedAnime.value);
});

const handleStatusChange = () => {
  if (editedAnime.value.status === 2) {
    editedAnime.value.watchedEpisodes = animeEpisodes;
  }
};

const removefeedbackEditMessage = () => {
  feedbackEditMessage.value = '';
  feedbackEditSuccess.value = false;
};
watch(feedbackEditMessage, () => {
  if (feedbackEditMessage.value !== '') {
    setTimeout(removefeedbackEditMessage, 3000);
  }
});

const closeModal = () => {
  const modal = document.getElementById('editModal');
  modal.close();
};
</script>
