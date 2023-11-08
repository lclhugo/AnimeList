<template>
  <div class="md:container md:mx-auto">
    <h1 class="text-3xl font-bold text-center">{{ username }}'s anime list</h1>
    <div
      class="flex flex-col items-center justify-center w-full h-32 my-8 md:my-0 md:flex-row md:justify-center"
    >
      <button
        class="tab md:tab-bordered"
        :class="{ 'tab-active': selectedCategory === 'All' }"
        @click="filterAnime('All')"
      >
        All Anime
      </button>
      <button
        class="tab md:tab-bordered"
        :class="{ 'tab-active': selectedCategory === 'Current' }"
        @click="filterAnime('Current')"
      >
        Watching
      </button>
      <button
        class="tab md:tab-bordered"
        :class="{ 'tab-active': selectedCategory === 'Completed' }"
        @click="filterAnime('Completed')"
      >
        Completed
      </button>
      <button
        class="tab md:tab-bordered"
        :class="{ 'tab-active': selectedCategory === 'On Hold' }"
        @click="filterAnime('On Hold')"
      >
        On Hold
      </button>
      <button
        class="tab md:tab-bordered"
        :class="{ 'tab-active': selectedCategory === 'Dropped' }"
        @click="filterAnime('Dropped')"
      >
        Dropped
      </button>
      <button
        class="tab md:tab-bordered"
        :class="{ 'tab-active': selectedCategory === 'Planning' }"
        @click="filterAnime('Planning')"
      >
        Plan to Watch
      </button>
    </div>
    <AnimeTable :anime-data="filteredAnime" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Anime {
  animeId: number;
  status: { statusName: string };
  watchedEpisodes: number;
  rating: number;
}

export default {
  setup: function () {
    const animeData = ref<Anime[] | null>(null);
    const selectedCategory = ref('All');
    const {
      params: { username },
    } = useRoute();

    onMounted(async () => {
      try {
        const { data } = await axios.get(`https://localhost:7081/api/anime/list/get/${username}`);
        animeData.value = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    const filteredAnime = computed(() => {
      if (animeData.value) {
        return animeData.value.filter(anime => {
          if (selectedCategory.value === 'All') {
            return true;
          }
          return anime.status.statusName === selectedCategory.value;
        });
      }
      return [];
    });

    const filterAnime = (category: string) => {
      selectedCategory.value = category;
    };

    return {
      animeData: animeData,
      selectedCategory: selectedCategory,
      filteredAnime: filteredAnime,
      filterAnime: filterAnime,
      username: username,
    };
  },
};
</script>
