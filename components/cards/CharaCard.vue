<template>
  <div v-motion-fade-visible class="shadow-xl w-44 h-60">
    <!-- <NuxtLink :to="'/anime/' + id"> -->
    <figure>
      <img :src="image" class="object-cover rounded-lg w-44 h-60 hover:opacity-75" />
    </figure>
    <div>
      <h3 class="text-sm font-semibold">{{ name }}</h3>
    </div>
    <!-- </NuxtLink> -->
  </div>
</template>

<script setup lang="ts">
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
  delay: {
    type: Number,
    default: 0,
  },
});
</script>
