<template>
  <div>
    <Feedback :message="feedbackAddMessage" :success="feedbackAddSuccess" />
    <div v-if="mangaData" class="flex flex-col justify-center w-11/12 gap-4 mx-auto">
      <div class="text-center">
        <h2 class="text-3xl font-bold">{{ mangaData?.data.title }}</h2>
        <h3 class="text-xl font-bold">{{ mangaData?.data.title_japanese }}</h3>
      </div>
      <figure class="flex flex-col items-center justify-center">
        <img :src="mangaData.data.images.webp.large_image_url" class="w-56 rounded-l shadow-lg" />
        <figcaption class="text-sm text-gray-500">
          {{ mangaData.data.images.webp.large_image_url }}
        </figcaption>
      </figure>
      <div v-if="user" class="flex flex-col items-center justify-center">
        <div v-if="InList" class="flex flex-col items-center justify-center">
          <h3 class="text-xl font-bold">You have this manga in your list</h3>
          <p>Status: {{ InList[0].status.statusname }}</p>
          <p>Rating: {{ InList[0].rating }} / 10</p>
          <button class="btn btn-primary" onclick="editModal.showModal()">Edit entry</button>
          <EditManga
            :manga-id="mangaData?.data.mal_id"
            :manga-title="mangaData?.data.title"
            :manga-chapters="mangaData?.data.chapters"
            :current-read-chapters="InList[0].readchapters"
            :current-status="InList[0].status.statusid"
            :current-rating="InList[0].rating"
            @manga-updated="handlemangaUpdated"
          />
          <button class="text-sm hover:underline" onclick="deleteModal.showModal()">
            Remove from your list
          </button>
          <DeleteManga
            :manga-id="mangaData?.data.mal_id"
            :manga-title="mangaData?.data.title"
            @manga-deleted="handlemangaDeleted"
          />
        </div>
        <div v-else class="flex flex-col items-center justify-center">
          <button class="btn btn-success" @click="addToList">Add to list</button>
        </div>
      </div>

      <div class="text-center shadow stats stats-vertical lg:stats-horizontal">
        <div v-if="mangaData?.data.status" class="stat">
          <div class="stat-title">Status</div>
          <div class="text-sm stat-value">{{ mangaData.data.status }}</div>
        </div>

        <div v-if="mangaData?.data.chapters" class="stat">
          <div class="stat-title">Chapters</div>
          <div class="text-sm stat-value">{{ mangaData.data.chapters }}</div>
        </div>

        <div v-if="mangaData?.data.ratings" class="stat">
          <div class="stat-title">Rating</div>
          <div class="text-sm stat-value">{{ mangaData.data.ratings }}</div>
        </div>
      </div>

      <div class="w-11/12 mx-auto prose-sm prose sm:prose">
        <h3 class="text-xl font-bold">Synopsis</h3>
        <p>{{ mangaData?.data.synopsis }}</p>
        <p>{{ mangaData?.data.background }}</p>
      </div>

      <div class="w-11/12 mx-auto prose-sm prose sm:prose">
        <div v-if="mangaData?.data.genres.length > 0">
          <h4>Genres:</h4>
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="genre in mangaData.data.genres"
              :key="genre.mal_id"
              class="badge badge-secondary"
            >
              {{ genre.name }}
            </li>
          </ul>
        </div>

        <div v-if="mangaData?.data.authors.length > 0">
          <h4>Authors:</h4>
          <ul>
            <li v-for="authors in mangaData.data.authors" :key="authors.mal_id">
              {{ authors.name }}
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
      <h1>There is no manga with this id</h1>
      <NuxtLink class="btn btn-accent" to="/">Go back to home</NuxtLink>
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const jwt = useCookie('sb-access-token');
const { value: yourJwtToken } = jwt;
const user = useSupabaseUser();

const {
  feedbackMessage: feedbackAddMessage,
  feedbackSuccess: feedbackAddSuccess,
  setFeedback,
  clearFeedback,
} = useFeedback();

const { data: manga } = await useFetch(`https://api.jikan.moe/v4/manga/${route.params.id}/full`);
const mangaData = ref(manga);

const { data: characters } = await useFetch(
  `https://api.jikan.moe/v4/manga/${route.params.id}/characters`,
);
const charactersData = ref(characters);

const isInListResponse = await useFetch(
  `https://localhost:7081/api/manga/list/get/user/${route.params.id}`,
  {
    headers: {
      Authorization: `Bearer ${yourJwtToken}`,
    },
  },
);
const InList = ref(isInListResponse.data);

const addToList = async () => {
  try {
    await useFetch(`https://localhost:7081/api/manga/list/add/${route.params.id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${yourJwtToken}`,
      },
    });
    setFeedback('manga added successfully', true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error(error);
    setFeedback('Error adding manga', false);
  }
};

const handlemangaUpdated = () => {
  try {
    setFeedback('manga edited successfully', true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error(error);
    setFeedback('Error updating manga', false);
  }
};

const handlemangaDeleted = () => {
  try {
    setFeedback('manga deleted successfully', true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error(error);
    setFeedback('Error deleting manga', false);
  }
};
</script>
