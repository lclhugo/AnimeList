<template>
  <div>
    <div v-for="anime in animeData" :key="anime.animeId">
      <img :src="anime.animeInfo.image" alt="Anime Poster" />
      <p>{{ anime.animeInfo.title }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup: function () {
    const animeData = ref(null);
    const route = useRoute();
    const { username } = route.params;

    onMounted(async () => {
      try {
        const { data } = await axios.get(`https://localhost:7081/api/anime/list/get/${username}`);
        animeData.value = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    return {
      animeData: animeData,
    };
  },
};
</script>
