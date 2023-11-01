<template>
  <div>
    <h1>Anime Search</h1>
    <input v-model="query" placeholder="Search Anime" />
    <div class="container px-4 mx-auto my-8 sm:x-auto">
      <div v-if="animes.length === 0">No data was found</div>
      <div v-else>
        <div class="flex flex-wrap justify-center w-11/12 gap-2 mx-auto md:gap-0 md:justify-around">
          <AnimeCard
            v-for="anime in displayedAnimes"
            :id="anime.mal_id"
            :key="anime.mal_id"
            :name="anime.title"
            :image="anime.images.jpg.large_image_url"
          />
        </div>
        <div class="flex justify-between my-8">
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
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import axios from 'axios';

const displayedAnimes = ref([]);
const animes = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const query = ref('');

const fetchData = async (page: number) => {
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${query.value}&sfw&page=${page}`,
    );
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

// Watch for changes in the query and trigger the search function
watch(query, () => {
  currentPage.value = 1; // Reset the current page when the query changes
  fetchData(currentPage.value);
});
</script>
