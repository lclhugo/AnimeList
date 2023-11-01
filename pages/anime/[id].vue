<template>
  <div>
    <div v-if="animeData">
      <h2>{{ animeData?.data.title }}</h2>
      <h3>{{ animeData?.data.title_japanese }}</h3>

      <img :src="animeData?.data.images.webp.image_url" />
      <p>{{ animeData?.data.synopsis }}</p>
      <p>{{ animeData?.data.background }}</p>
    </div>
    <div v-else>
      <h1>There is no anime with this id</h1>
      <NuxtLink class="btn btn-accent" to="/">Go back to home</NuxtLink>
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

    onMounted(async () => {
      try {
        const { data } = await axios.get(`https://api.jikan.moe/v4/anime/${route.params.id}`);
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
