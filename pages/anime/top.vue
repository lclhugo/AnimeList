<template>
  <div>
    <ListAnimes :url="apiUrl" title="Top Anime" />
  </div>
</template>

<script setup lang="ts">
const apiUrl = 'https://api.jikan.moe/v4/top/anime';
</script>
