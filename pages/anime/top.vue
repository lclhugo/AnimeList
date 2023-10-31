<template>
  <div class="container sm:x-auto my-8 px-4">
    <h1 class="text-4xl font-bold mb-8">Top Anime</h1>
    <div class="flex justify-between mb-4">
      <div class="join mx-auto">
        <button class="join-item btn" :disabled="currentPage === 1" @click="prevPage">«</button>
        <button class="join-item btn">Page {{ currentPage }}</button>
        <button class="join-item btn" :disabled="currentPage === totalPages" @click="nextPage">
          »
        </button>
      </div>
    </div>
    <div class="flex flex-wrap justify-between gap-1 sm:gap-4 w-11/12 mx-auto">
      <AnimeCard
        v-for="anime in displayedAnimes"
        :id="anime.mal_id"
        :key="anime.mal_id"
        :name="anime.title"
        :image="anime.images.jpg.large_image_url"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
const displayedAnimes = ref([]);
const animes = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);

const fetchData = async (page: number) => {
  try {
    const response = await axios.get(`https://api.jikan.moe/v4/top/anime?page=${page}`);
    const {
      data: { pagination, data },
    } = response;
    animes.value = data;
    displayedAnimes.value = data;
    totalPages.value = pagination.last_visible_page;

    console.log('data', data);
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
