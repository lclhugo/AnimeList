<template>
  <div>
    <ListMangas :url="apiUrl" title="Top Manga" />
  </div>
</template>

<script setup lang="ts">
const apiUrl = 'https://api.jikan.moe/v4/top/manga';
</script>
