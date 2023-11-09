<template>
  <div class="flex flex-col items-center justify-center text-center min-h-screen80">
    <h1
      class="mb-4 text-6xl font-extrabold text-transparent title bg-clip-text bg-gradient-to-r from-primary from-10 via-30% to-secondary to-90%"
    >
      Welcome to AnimeList!
    </h1>
    <p class="mb-8 text-lg">
      A platform for managing and arranging your
      <NuxtLink to="anime/search" class="text-primary">anime</NuxtLink>
      and
      <NuxtLink to="manga/search" class="text-primary">manga</NuxtLink>
      lists.
    </p>
    <p>Register now to get started!</p>
    <NuxtLink to="/register" class="mt-4 btn btn-primary">Get started!</NuxtLink>
    <p class="mt-4 text-sm">
      or
      <NuxtLink to="/login" class="text-secondary">login</NuxtLink>
      if you already have an account
    </p>
  </div>
</template>
