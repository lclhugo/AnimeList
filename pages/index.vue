<template>
  <div v-motion-pop-visible-once :delay="300">
    <div v-if="!user">
      <WelcomeBox />
    </div>

    <div v-else>
      <div class="flex flex-col items-center justify-center">
        <h1
          class="mb-4 text-2xl font-extrabold text-transparent title bg-clip-text bg-gradient-to-r from-primary from-10 via-10% to-secondary to-100%"
        >
          Welcome back {{ user.user_metadata.username }}!
        </h1>
        <div class="flex flex-col items-center justify-center gap-4"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
</script>
