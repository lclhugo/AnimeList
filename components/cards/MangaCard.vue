<template>
  <div
    v-motion-fade-visible
    class="transition-all duration-300 ease-in-out w-44 sm:w-56 hover:shadow-xl hover:translate-x-1 hover:translate-y-1"
  >
    <NuxtLink :to="'/manga/' + id">
      <figure>
        <img :src="image" class="object-cover mb-2 rounded-lg w-44 xl:w-56 h-60 xl:h-80" />
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
    default: 'Default manga Name',
  },
  delay: {
    type: Number,
    default: 0,
  },
});
</script>
