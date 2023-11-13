<template>
  <div>
    <Feedback :message="feedbackAddMessage" :success="feedbackAddSuccess" />
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

      <div v-if="InList">
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
          @anime-updated="handleAnimeUpdated"
        />
        <button class="btn" onclick="deleteModal.showModal()">Delete anime</button>
        <DeleteAnime
          :anime-id="animeData?.data.malId"
          :anime-title="animeData?.data.title"
          @anime-deleted="handleAnimeDeleted"
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

const {
  feedbackMessage: feedbackAddMessage,
  feedbackSuccess: feedbackAddSuccess,
  setFeedback,
  clearFeedback,
} = useFeedback();

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
    setFeedback('Anime added successfully', true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error(error);
    setFeedback('Error adding anime', false);
  }
};

const handleAnimeUpdated = () => {
  try {
    setFeedback('Anime updated successfully', true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error(error);
    setFeedback('Error updating anime', false);
  }
};

const handleAnimeDeleted = () => {
  try {
    console.log('Anime deleted');
    setFeedback('Anime deleted successfully', true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error(error);
    setFeedback('Error deleting anime', false);
  }
};
</script>
