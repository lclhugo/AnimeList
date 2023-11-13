<template>
  <div>
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
    modal.close();
  } catch (error) {
    console.error(error);
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

const closeModal = () => {
  const modal = document.getElementById('editModal');
  modal.close();
};
</script>
