<template>
  <div>
    <div v-if="feedbackAddMessage" v-motion-slide-visible-right class="z-50 toast toast-end">
      <div
        :class="{
          'alert alert-success': feedbackAddSuccess,
          'alert alert-error': !feedbackAddSuccess,
        }"
      >
        <svg
          v-if="feedbackAddSuccess"
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
          v-if="!feedbackAddSuccess"
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
        {{ feedbackAddMessage }}
      </div>
    </div>
    <div v-if="animeData" class="flex flex-col justify-center w-11/12 gap-4 mx-auto">
      <div class="text-center">
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
        <EditAnime
          :anime-id="animeData?.data.malId"
          :anime-title="animeData?.data.title"
          :anime-episodes="animeData?.data.episodes"
          :current-watched-episodes="InList[0].watchedEpisodes"
          :current-status="InList[0].status.statusId"
          :current-rating="InList[0].rating"
          @anime-updated="fetchNewInListData"
        />
        <button class="btn" onclick="deleteModal.showModal()">Delete anime</button>
        <DeleteAnime
          :anime-id="animeData?.data.malId"
          :anime-title="animeData?.data.title"
          @anime-deleted="fetchNewInListData"
        />
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
const feedbackAddMessage = ref('');
const feedbackAddSuccess = ref(false);

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
const InList = ref(isInListResponse.data);

const addToList = async () => {
  try {
    await useFetch(`https://localhost:7081/api/anime/list/add/${route.params.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${yourJwtToken}`,
      },
    });
    feedbackAddMessage.value = 'Anime added successfully';
    feedbackAddSuccess.value = true;
  } catch (error) {
    console.error(error);
    feedbackAddMessage.value = 'Error adding anime';
    feedbackAddSuccess.value = false;
  }
};

const removefeedbackAddMessage = () => {
  feedbackAddMessage.value = '';
  feedbackAddSuccess.value = false;
};
watch(feedbackAddMessage, () => {
  if (feedbackAddMessage.value !== '') {
    setTimeout(removefeedbackAddMessage, 3000);
  }
});
</script>
