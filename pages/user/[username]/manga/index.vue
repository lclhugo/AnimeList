<template>
  <div>
    <div v-for="manga in mangaData" :key="manga.mangaId">
      <img :src="manga.mangaInfo.image" alt="manga Poster" />
      <p>{{ manga.mangaInfo.title }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup: function () {
    const mangaData = ref(null);
    const route = useRoute();
    const { username } = route.params;

    onMounted(async () => {
      try {
        const { data } = await axios.get(`https://localhost:7081/api/manga/list/get/${username}`);
        mangaData.value = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    });

    return {
      mangaData: mangaData,
    };
  },
};
</script>
