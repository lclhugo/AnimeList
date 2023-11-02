<template>
  <div>
    <div v-if="mangaData">
      <h2>{{ mangaData?.data.title }}</h2>
      <h3>{{ mangaData?.data.title_japanese }}</h3>

      <img :src="mangaData?.data.images.webp.image_url" />
      <p>{{ mangaData?.data.synopsis }}</p>
      <p>{{ mangaData?.data.background }}</p>
    </div>
    <div v-else>
      <h1>There is no manga with this id</h1>
      <NuxtLink class="btn btn-accent" to="/">Go back to home</NuxtLink>
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

    onMounted(async () => {
      try {
        const { data } = await axios.get(`https://api.jikan.moe/v4/manga/${route.params.id}`);
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
