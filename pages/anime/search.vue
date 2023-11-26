<template>
  <div>
    <h1
      class="text-4xl text-center font-extrabold mb-8 text-transparent title bg-clip-text bg-gradient-to-r from-primary from-10 via-50% to-secondary to-100% w-fit mx-auto"
    >
      Search Anime
    </h1>
    <div class="flex flex-row justify-center mx-auto my-8 join">
      <div>
        <label for="search" hidden>Search Anime:</label>
        <input
          id="search"
          v-model="query"
          placeholder="Search an anime name"
          class="w-56 sm:w-96 input input-bordered input-primary join-item"
        />
      </div>
      <div>
        <label for="genres" hidden>Select Genres:</label>
        <select
          id="genres"
          v-model="selectedGenre"
          class="max-w-xs select select-primary join-item"
          @change="addSelectedGenre"
        >
          <option value="" disabled selected>Select Genre</option>
          <option v-for="genre in genres" :key="genre.mal_id" :value="genre.mal_id">
            {{ genre.name }}
          </option>
        </select>
      </div>
    </div>
    <div
      class="container flex flex-row flex-wrap items-center justify-center max-w-2xl gap-2 px-4 mx-auto my-8 sm:x-auto"
    >
      <span v-for="genreId in selectedGenres" :key="genreId" class="gap-2 badge badge-primary">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          class="inline-block w-4 h-4 cursor-pointer stroke-current current-color"
          @click="removeSelectedGenre(genreId)"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
        {{ getGenreNameById(genreId) }}
      </span>
    </div>
    <div>
      <div
        class="flex flex-wrap justify-around mx-auto gap-y-16 md:max-w-7xl md:justify-center md:gap-x-4"
      >
        <AnimeCard
          v-for="anime in displayedAnimes"
          :id="anime.mal_id"
          :key="anime.mal_id"
          :name="anime.title"
          :image="anime.images.jpg.large_image_url"
        />
      </div>
      <div v-show="totalPages > 1" class="flex justify-between my-8 mt-24">
        <div class="mx-auto join">
          <button class="join-item btn" :disabled="currentPage === 1" @click="prevPage">«</button>
          <button class="join-item btn" :disabled="currentPage === totalPages" @click="nextPage">
            »
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import type { DisplayedAnime } from '~/types/animes';
const { genres, fetchGenres, getGenreNameById } = useGenres();

definePageMeta({
  layout: 'base',
});

const displayedAnimes = ref([] as DisplayedAnime[]);
const animes = ref([]);
const currentPage = ref(1);

const selectedGenres: Ref<string[]> = ref([]);
const selectedGenre = ref<string>('');

const totalPages = ref(1);
const query = ref('');

const fetchData = async (page: number, genres?: string) => {
  try {
    let apiUrl;

    if (query.value.trim() === '') {
      apiUrl = 'https://api.jikan.moe/v4/anime?sfw&page=1';
    } else {
      apiUrl = `https://api.jikan.moe/v4/anime?q=${query.value}&sfw&page=${page}`;
    }

    const genresString = selectedGenres.value.join(',');

    if (genresString) {
      apiUrl += `&genres=${genresString}`;
    }

    const response = await axios.get(apiUrl);

    const {
      data: { pagination, data },
    } = response;
    animes.value = data;
    displayedAnimes.value = data;
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
