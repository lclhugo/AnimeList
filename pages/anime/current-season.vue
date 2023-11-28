<template>
  <div>
    <ListAnimes :url="apiUrl" title="Current Season" />
  </div>
</template>

<script setup lang="ts">
const apiUrl = 'https://api.jikan.moe/v4/seasons/now';
</script>
