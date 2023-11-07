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
      <p class="mb-8 text-lg">A platform for managing and arranging your anime and manga lists.</p>
      <router-link to="/coucou" class="btn btn-primary">Get Started</router-link>
    </div>
    <div v-if="user">
      <p>Welcome back! {{ user.email }}</p>
      <p>user id: {{ user.id }}</p>
    </div>
    <div v-else>
      <p>
        You are not logged in, please
        <router-link to="/login" class="text-primary">login</router-link>
        or
        <router-link to="/register" class="text-primary">register</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
</script>
