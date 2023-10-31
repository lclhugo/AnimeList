<template>
  <div
    class="w-44 sm:w-56 hover:shadow-xl hover:translate-x-1 hover:translate-y-1 transition-all duration-300 ease-in-out"
  >
    <NuxtLink :to="'/anime/' + id">
      <figure>
        <img :src="image" class="w-44 sm:w-56 mb-2 h-60 sm:h-80 rounded-lg object-cover" />
      </figure>
      <div>
        <h3 class="text-sm font-semibold">{{ name }}</h3>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  image: {
    type: String,
    default: 'default-image.jpg',
  },
  id: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: 'Default Anime Name',
  },
});
</script>
