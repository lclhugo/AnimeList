<template>
  <div>
    <div v-if="animeData" class="flex flex-col justify-center w-11/12 gap-4 mx-auto">
      <div class="text-center">
        <div v-if="feedbackMessage" class="z-50 toast toast-end">
          <div
            :class="{
              'alert alert-success': feedbackSuccess,
              'alert alert-error': !feedbackSuccess,
            }"
          >
            <svg
              v-if="feedbackSuccess"
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
              v-if="!feedbackSuccess"
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
            {{ feedbackMessage }}
          </div>
        </div>
        <h2 class="text-3xl font-bold">{{ animeData?.data.title }}</h2>
        <h3 class="text-xl font-bold">{{ animeData?.data.titleJapanese }}</h3>
      </div>
      <figure class="flex flex-col items-center justify-center">
        <img :src="animeData?.data.images.webp.largeImageUrl" class="w-56 rounded-l shadow-lg" />
        <figcaption class="text-sm text-gray-500">
          {{ animeData?.data.images.webp.largeImageUrl }}
        </figcaption>
      </figure>

      <div v-if="InList && InList.length > 0">
        <h3 class="text-xl font-bold">You have this anime in your list</h3>

        <p>Watched Episodes: {{ InList[0].watchedEpisodes }}</p>
        <p>Rating: {{ InList[0].rating }}</p>

        <button class="btn" onclick="editModal.showModal()">Edit anime</button>
        <dialog id="editModal" class="modal">
          <div class="modal-box">
            <button
              onclick="editModal.close()"
              class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
            >
              ✕
            </button>
            <h3 class="text-lg font-bold">Edit {{ animeData?.data.title }} in your list</h3>
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
                    :max="animeData?.data.episodes"
                  />
                  <span class="p-2.5 join-item input input-bordered">
                    /{{ animeData?.data.episodes }}
                  </span>
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
        <button class="btn btn-error" @click="deleteFromList">Delete from list</button>
      </div>
      <div v-else>
        <h3 class="text-xl font-bold">You don't have this anime in your list</h3>
        <button class="btn btn-success" @click="addToList">Add to list</button>
      </div>

      <div class="w-11/12 mx-auto prose-sm prose sm:prose">
        <h3 class="text-xl font-bold">Synopsis</h3>
        <p>{{ animeData?.data.synopsis }}</p>

        <div class="collapse bg-base-200">
          <input type="checkbox" />
          <div class="text-xl font-medium collapse-title">Background</div>
          <div class="collapse-content">
            <p>{{ animeData?.data.background }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>There is no anime with this id</h1>
      <NuxtLink class="btn btn-accent" to="/">Go back to home</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const jwt = useCookie('sb-access-token');
const { value: yourJwtToken } = jwt;
const feedbackMessage = ref('');
const feedbackSuccess = ref(false);

const { data: anime } = await useFetch(`https://localhost:7081/api/anime/${route.params.id}`);
const animeData = ref(anime);

const isInListResponse = await useFetch(
  `https://localhost:7081/api/anime/list/get/user/${route.params.id}`,
  {
    headers: {
      Authorization: `Bearer ${yourJwtToken}`,
    },
  },
);

let InList = ref(isInListResponse.data);
const editedAnime = ref({
  watchedEpisodes: 0,
  rating: 0,
});

watch(() => {
  if (InList.value.length > 0) {
    editedAnime.value.watchedEpisodes = InList.value[0].watchedEpisodes;
    editedAnime.value.rating = InList.value[0].rating;
    editedAnime.value.status = InList.value[0].status.statusId;
    editedAnime.value.created = InList.value[0].created;
  }
});

const submitEditForm = async () => {
  const jsonPayload = {
    statusId: editedAnime.value.status,
    watchedEpisodes: editedAnime.value.watchedEpisodes,
    rating: editedAnime.value.rating,
  };
  console.log(jsonPayload);
  try {
    await useFetch(`https://localhost:7081/api/anime/list/update/${route.params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${yourJwtToken}`,
      },
      body: JSON.stringify(jsonPayload),
    });
    const modal = document.getElementById('editModal');
    modal.close();
    feedbackMessage.value = 'Anime updated successfully';
    feedbackSuccess.value = true;
    const isInListResponse = await useFetch(
      `https://localhost:7081/api/anime/list/get/user/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${yourJwtToken}`,
        },
      },
    );
    InList = isInListResponse.data;
  } catch (error) {
    console.error(error);
    feedbackMessage.value = 'Error updating anime';
    feedbackSuccess.value = false;
  }
};

const removeFeedbackMessage = () => {
  feedbackMessage.value = '';
  feedbackSuccess.value = false;
};

watch(() => {
  if (feedbackMessage.value !== '') {
    setTimeout(removeFeedbackMessage, 3000);
  }
});

watch(() => {
  if (editedAnime.value.status === 2) {
    editedAnime.value.watchedEpisodes = animeData.value?.data.episodes || 0;
  }
});

const handleStatusChange = () => {
  if (editedAnime.value.status === 2) {
    editedAnime.value.watchedEpisodes = animeData.value?.data.episodes || 0;
  }
};

const deleteFromList = async () => {
  try {
    await useFetch(`https://localhost:7081/api/anime/list/remove?animeId=${route.params.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${yourJwtToken}`,
      },
    });
    const isInListResponse = await useFetch(
      `https://localhost:7081/api/anime/list/get/user/${route.params.id}`,
      {
        headers: {
          Authorization: `Bearer ${yourJwtToken}`,
        },
      },
    );
    InList = isInListResponse.data;
    feedbackMessage.value = 'Anime deleted successfully';
    feedbackSuccess.value = true;
  } catch (error) {
    console.error(error);
    feedbackMessage.value = 'Error deleting anime';
    feedbackSuccess.value = false;
  }
};
</script>
