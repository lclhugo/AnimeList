<template>
  <div>
    <Feedback :message="feedbackAddMessage" :success="feedbackAddSuccess" />
    <div v-if="animeData" class="flex flex-col justify-center w-11/12 gap-4 mx-auto">
      <div class="text-center">
        <h2 class="text-3xl font-bold">{{ animeData?.data.title }}</h2>
        <h3 class="text-xl font-bold">{{ animeData?.data.title_japanese }}</h3>
      </div>
      <figure class="flex flex-col items-center justify-center">
        <img :src="animeData.data.images.webp.large_image_url" class="w-56 rounded-l shadow-lg" />
        <figcaption class="text-sm text-gray-500">
          {{ animeData.data.images.webp.large_image_url }}
        </figcaption>
      </figure>

      <div v-if="InList" class="flex flex-col items-center justify-center">
        <h3 class="text-xl font-bold">You have this anime in your list</h3>
        <p>Status: {{ InList[0].status.statusName }}</p>
        <p>Watched Episodes: {{ InList[0].watchedEpisodes / animeData.data.episodes }}</p>
        <p>Rating: {{ InList[0].rating }} / 10</p>
        <button class="btn btn-primary" onclick="editModal.showModal()">Edit entry</button>
        <EditAnime
          :anime-id="animeData?.data.mal_id"
          :anime-title="animeData?.data.title"
          :anime-episodes="animeData?.data.episodes"
          :current-watched-episodes="InList[0].watchedEpisodes"
          :current-status="InList[0].status.statusId"
          :current-rating="InList[0].rating"
          @anime-updated="handleAnimeUpdated"
        />
        <button class="text-sm hover:underline" onclick="deleteModal.showModal()">
          Remove from your list
        </button>
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

      <div class="text-center shadow stats stats-vertical lg:stats-horizontal">
        <div v-if="animeData?.data.type" class="stat">
          <div class="stat-title">Type</div>
          <div class="text-sm stat-value">{{ animeData.data.type }}</div>
        </div>

        <div v-if="animeData?.data.source" class="stat">
          <div class="stat-title">Source</div>
          <div class="text-sm stat-value">{{ animeData.data.source }}</div>
        </div>

        <div v-if="animeData?.data.status" class="stat">
          <div class="stat-title">Status</div>
          <div class="text-sm stat-value">{{ animeData.data.status }}</div>
        </div>

        <div v-if="animeData?.data.episodes" class="stat">
          <div class="stat-title">Episodes</div>
          <div class="text-sm stat-value">{{ animeData.data.episodes }}</div>
        </div>

        <div v-if="animeData?.data.season_year" class="stat">
          <div class="stat-title">Year</div>
          <div class="text-sm stat-value">{{ animeData.data.season_year }}</div>
        </div>

        <div v-if="animeData?.data.rating" class="stat">
          <div class="stat-title">Rating</div>
          <div class="text-sm stat-value">{{ animeData.data.rating }}</div>
        </div>
      </div>

      <div class="w-11/12 mx-auto prose-sm prose sm:prose">
        <h3 class="text-xl font-bold">Synopsis</h3>
        <p>{{ animeData?.data.synopsis }}</p>
        <p>{{ animeData?.data.background }}</p>
      </div>

      <div class="w-11/12 mx-auto prose-sm prose sm:prose">
        <div v-if="animeData?.data.genres.length > 0">
          <h4>Genres:</h4>
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="genre in animeData.data.genres"
              :key="genre.mal_id"
              class="badge badge-secondary"
            >
              {{ genre.name }}
            </li>
          </ul>
        </div>

        <div v-if="animeData?.data.studios.length > 0">
          <h4>Studios:</h4>
          <ul>
            <li v-for="studio in animeData.data.studios" :key="studio.mal_id">
              {{ studio.name }}
            </li>
          </ul>
        </div>

        <div v-if="animeData?.data.producers.length > 0">
          <h4>Producers:</h4>
          <ul>
            <li v-for="producer in animeData.data.producers" :key="producer.mal_id">
              {{ producer.name }}
            </li>
          </ul>
        </div>
      </div>
      <!-- {{ charactersData }} -->
      <div v-for="character in charactersData.data" :key="character.mal_id">
        <h2>{{ character.character.name }}</h2>
        <img :src="character.character.images.webp.image_url" />
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

const { data: anime } = await useFetch(`https://api.jikan.moe/v4/anime/${route.params.id}/full`);
const animeData = ref(anime);

const { data: characters } = await useFetch(
  `https://api.jikan.moe/v4/anime/${route.params.id}/characters`,
);
const charactersData = ref(characters);

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
