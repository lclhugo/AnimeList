<template>
  <NuxtLayout>
    <div v-if="animes.length === 0">No data was found</div>
    <div v-else>
      <h1
        class="text-4xl text-center font-extrabold mb-8 text-transparent title bg-clip-text bg-gradient-to-r from-primary from-10 via-50% to-secondary to-100% w-fit mx-auto"
      >
        {{ title }}
      </h1>
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
          <button class="join-item btn">Page {{ currentPage }}</button>
          <button class="join-item btn" :disabled="currentPage === totalPages" @click="nextPage">
            »
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { DisplayedAnime } from '~/types/animes';

definePageMeta({
  layout: 'base',
});

const { url, title } = defineProps({
  url: {
    type: String,
    default: 'https://api.jikan.moe/v4/top/anime',
  },
  title: {
    type: String,
    default: 'Top Anime',
  },
});

const displayedAnimes = ref([] as DisplayedAnime[]);
const animes = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);

const fetchData = async (page: number) => {
  try {
    const response = await axios.get(`${url}?page=${page}`);
    const { data } = response;
    animes.value = data.data;
    displayedAnimes.value = data.data;
    totalPages.value = data.pagination.last_visible_page;
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

onMounted(() => {
  fetchData(currentPage.value);
});
</script>
