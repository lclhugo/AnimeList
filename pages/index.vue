<template>
  <div
    v-motion-pop-visible-once
    :delay="300"
    class="flex flex-col items-center justify-center text-center min-h-screen80"
  >
    <div>
      <h1
        class="mb-4 text-6xl font-extrabold text-transparent title bg-clip-text bg-gradient-to-r from-primary from-10 via-30% to-secondary to-90%"
      >
        Welcome to AnimeList!
      </h1>
      <p class="mb-8 text-lg">
        A platform for managing and arranging your
        <NuxtLink to="animes" class="text-primary">anime</NuxtLink>
        and
        <NuxtLink to="animes" class="text-primary">manga</NuxtLink>
        lists.
      </p>
    </div>
    <div v-if="user">
      <p>Welcome back! {{ user.email }}</p>
      <p>user id: {{ user.id }}</p>
    </div>
    <div v-else>
      <p>
        You are not logged in, please
        <router-link to="/login" class="underline text-primary">login</router-link>
        or
        <router-link to="/register" class="underline text-primary">register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
</script>
