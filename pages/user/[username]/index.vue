<template>
  <div>
    <h2>welcome to {{ username }} profile</h2>

    <NuxtLink :to="'/user/' + username + '/anime'" class="btn btn-primary">Anime List!</NuxtLink>
    <NuxtLink :to="'/user/' + username + '/manga'" class="btn btn-primary">Manga List!</NuxtLink>
  </div>
</template>

<script setup lang="ts">
const {
  params: { username },
} = useRoute();
</script>
