<template>
  <NuxtLayout>
    <div v-if="mangas.length === 0">No data was found</div>
    <div v-else>
      <h1 class="mb-8 text-4xl font-bold">{{ title }}</h1>
      <div class="flex flex-wrap justify-center w-11/12 gap-2 mx-auto md:gap-0 md:justify-around">
        <mangaCard
          v-for="manga in displayedMangas"
          :id="manga.mal_id"
          :key="manga.mal_id"
          :name="manga.title"
          :image="manga.images.jpg.large_image_url"
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
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

definePageMeta({
  layout: 'base',
});

const { url, title } = defineProps({
  url: {
    type: String,
    default: 'https://api.jikan.moe/v4/top/manga',
  },
  title: {
    type: String,
    default: 'Top manga',
  },
});

const displayedMangas = ref([]);
const mangas = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);

const fetchData = async (page: number) => {
  try {
    const response = await axios.get(`${url}?page=${page}`);
    const { data } = response;
    mangas.value = data.data;
    displayedMangas.value = data.data;
    totalPages.value = data.pagination.last_visible_page;
    console.log('data', data.data);
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
