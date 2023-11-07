<template>
  <div>
    <h1 class="text-3xl font-bold text-center">Search manga</h1>
    <div class="container flex flex-row items-center justify-center px-4 mx-auto my-8 sm:x-auto">
      <div class="flex flex-col items-center justify-center">
        <label for="search">Search manga:</label>
        <input
          id="search"
          v-model="query"
          placeholder="Search manga"
          class="input input-bordered input-secondary"
        />
      </div>
      <div class="flex flex-col items-center justify-center">
        <label for="genres">Select Genres:</label>
        <select
          id="genres"
          v-model="selectedGenre"
          class="max-w-xs select select-secondary"
          @change="addSelectedGenre"
        >
          <option v-for="genre in genres" :key="genre.mal_id" :value="genre.mal_id">
            {{ genre.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="container flex flex-row items-center justify-center px-4 mx-auto my-8 sm:x-auto">
      <span
        v-for="genreId in selectedGenres"
        :key="genreId"
        class="badge badge-secondary badge-outline"
      >
        {{ getGenreNameById(genreId) }}
        <button class="remove-button" @click="removeSelectedGenre(genreId)">×</button>
      </span>
    </div>
    <div>
      <div class="flex flex-wrap justify-center w-11/12 gap-2 mx-auto md:gap-0 md:justify-around">
        <mangaCard
          v-for="manga in displayedMangas"
          :id="manga.mal_id"
          :key="manga.mal_id"
          :name="manga.title"
          :image="manga.images.jpg.large_image_url"
        />
      </div>
      <div v-show="totalPages > 1" class="flex justify-between my-8">
        <div class="mx-auto join">
          <button class="join-item btn" :disabled="currentPage === 1" @click="prevPage">«</button>
          <button class="join-item btn">Page {{ currentPage }}</button>
          <button class="join-item btn" :disabled="currentPage === totalPages" @click="nextPage">
            »
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import axios from 'axios';
const { genres, fetchGenres, getGenreNameById } = useGenres();

definePageMeta({
  layout: 'base',
});

const displayedMangas = ref([]);
const mangas = ref([]);
const currentPage = ref(1);

const selectedGenres: Ref<string[]> = ref([]);
const selectedGenre = ref<string>('');

const totalPages = ref(1);
const query = ref('');

const fetchData = async (page: number, genres?: string) => {
  try {
    let apiUrl;

    if (query.value.trim() === '') {
      apiUrl = 'https://api.jikan.moe/v4/manga?sfw&page=1';
    } else {
      apiUrl = `https://api.jikan.moe/v4/manga?q=${query.value}&sfw&page=${page}`;
    }

    const genresString = selectedGenres.value.join(',');

    if (genresString) {
      apiUrl += `&genres=${genresString}`;
    }

    const response = await axios.get(apiUrl);

    const {
      data: { pagination, data },
    } = response;
    mangas.value = data;
    displayedMangas.value = data;
    totalPages.value = pagination.last_visible_page;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
    fetchData(currentPage.value);
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value = currentPage.value + 1;
    fetchData(currentPage.value);
  }
};

const addSelectedGenre = () => {
  if (selectedGenre.value && !selectedGenres.value.includes(selectedGenre.value)) {
    selectedGenres.value.push(selectedGenre.value);
    selectedGenre.value = '';
  }
};

const removeSelectedGenre = (genre: string) => {
  const index = selectedGenres.value.indexOf(genre);
  if (index !== -1) {
    selectedGenres.value.splice(index, 1);
  }
};

onMounted(() => {
  fetchGenres();
});

watch([query, selectedGenres], () => {
  currentPage.value = 1;
  fetchData(currentPage.value, selectedGenres.value.join(','));
});
</script>
