<template>
  <div>
    <div v-if="animeData" class="flex flex-col justify-center w-11/12 gap-4 mx-auto">
      <div class="text-center">
        <h2 class="text-3xl font-bold">{{ animeData?.data.title }}</h2>
        <h3 class="text-xl font-bold">{{ animeData?.data.titleJapanese }}</h3>
      </div>
      <figure class="flex flex-col items-center justify-center">
        <img :src="animeData?.data.images.webp.largeImageUrl" class="w-56 rounded-l shadow-lg" />
        <figcaption class="text-sm text-gray-500">
          {{ animeData?.data.images.webp.largeImageUrl }}
        </figcaption>
      </figure>
      <div class="w-11/12 mx-auto prose-sm prose sm:prose">
        <h3 class="text-xl font-bold">Synopsis</h3>
        <p>{{ animeData?.data.synopsis }}</p>
        <div class="collapse bg-base-200">
          <input type="checkbox" />
          <div class="text-xl font-medium collapse-title">Background</div>
          <div class="collapse-content">
            <p>{{ animeData?.data.background }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>There is no anime with this id</h1>
      <NuxtLink class="btn btn-accent" to="/">Go back to home</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { data: anime } = await useFetch(`https://localhost:7081/api/anime/${route.params.id}`);
const animeData = ref(anime);
</script>
