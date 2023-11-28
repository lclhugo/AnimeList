<template>
  <div class="md:container md:mx-auto">
    <h1
      class="text-4xl text-center font-extrabold text-transparent title bg-clip-text bg-gradient-to-r from-primary from-10 via-50% to-secondary to-100% w-fit mx-auto"
    >
      {{ username }}'s manga list
    </h1>
    <div
      class="flex flex-col items-center justify-center w-full my-8 md:flex-row md:justify-center md:tabs md:tabs-lifted"
    >
      <button
        class="tab"
        :class="{ 'tab-active': selectedCategory === 'All' }"
        @click="filterManga('All')"
      >
        All Manga
      </button>
      <button
        class="tab"
        :class="{ 'tab-active ': selectedCategory === 'Current' }"
        @click="filterManga('Current')"
      >
        Watching
      </button>
      <button
        class="tab"
        :class="{ 'tab-active': selectedCategory === 'Completed' }"
        @click="filterManga('Completed')"
      >
        Completed
      </button>
      <button
        class="tab"
        :class="{ 'tab-active': selectedCategory === 'On Hold' }"
        @click="filterManga('On Hold')"
      >
        On Hold
      </button>
      <button
        class="tab"
        :class="{ 'tab-active': selectedCategory === 'Dropped' }"
        @click="filterManga('Dropped')"
      >
        Dropped
      </button>
      <button
        class="tab"
        :class="{ 'tab-active': selectedCategory === 'Planning' }"
        @click="filterManga('Planning')"
      >
        Planning
      </button>
    </div>
    <div class="mt-16">
      <MangaTable :manga-data="filteredManga" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import type { Manga } from '~/types/mangas';

definePageMeta({
  middleware: ['check-if-user-exists'],
});

export default {
  setup: function () {
    const mangaData = ref<Manga[] | null>(null);
    const selectedCategory = ref('All');
    const {
      params: { username },
    } = useRoute();

    onMounted(async () => {
      try {
        const { data } = await axios.get(`https://localhost:7081/api/manga/list/get/${username}`);
        mangaData.value = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    const filteredManga = computed(() => {
      if (mangaData.value) {
        return mangaData.value.filter(manga => {
          if (selectedCategory.value === 'All') {
            return true;
          }
          return manga.status.statusname === selectedCategory.value;
        });
      }
      return [];
    });

    const filterManga = (category: string) => {
      selectedCategory.value = category;
    };

    return {
      mangaData: mangaData,
      selectedCategory: selectedCategory,
      filteredManga: filteredManga,
      filterManga: filterManga,
      username: username,
    };
  },
};
</script>
