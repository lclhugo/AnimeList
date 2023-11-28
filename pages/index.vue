<template>
  <div v-motion-pop :delay="300">
    <div v-if="!user">
      <WelcomeBox />
    </div>

    <div v-else>
      <div class="flex flex-col items-center justify-center">
        <h1
          class="mb-4 text-4xl font-extrabold text-transparent title bg-clip-text bg-gradient-to-r from-primary from-10 via-10% to-secondary to-100%"
        >
          Welcome back {{ user.user_metadata.username }}!
        </h1>
        <div class="flex flex-col items-center justify-center gap-4">
          <h2 class="text-xl font-bold">What do you want to do?</h2>
          <p class="mb-8 md:mb-16">Here are some suggestions:</p>

          <div class="flex flex-col md:flex-row flex-wrap justify-around gap-16">
            <div
              class="flex flex-col items-center justify-center gap-4 card card-compact w-96 bg-base-200 shadow-xl py-4 px-8 hover:bg-base-300 hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 ease-in-out"
            >
              <h3>How about browsing some anime or manga?</h3>
              <NuxtLink class="btn btn-primary" to="/anime/search">Browse anime</NuxtLink>
              <NuxtLink class="btn btn-primary" to="/manga/search">Browse manga</NuxtLink>
            </div>

            <div
              class="flex flex-col items-center justify-center gap-4 card card-compact w-96 bg-base-200 shadow-xl py-4 px-8 hover:bg-base-300 hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 ease-in-out"
            >
              <h3>Or maybe you want to check your lists?</h3>
              <NuxtLink
                class="btn btn-secondary"
                :to="'/user/' + user.user_metadata.username + '/anime'"
              >
                Go to my anime list
              </NuxtLink>
              <NuxtLink
                class="btn btn-secondary"
                :to="'/user/' + user.user_metadata.username + '/manga'"
              >
                Go to my manga list
              </NuxtLink>
            </div>

            <div
              class="flex flex-col items-center justify-center gap-4 card card-compact w-96 bg-base-200 shadow-xl py-4 px-8 hover:bg-base-300 hover:translate-x-0.5 hover:translate-y-0.5 transition-all duration-300 ease-in-out"
            >
              <h3>Or maybe you want to change your settings?</h3>
              <NuxtLink class="btn btn-accent" to="/profile">Go to my settings</NuxtLink>
              <NuxtLink class="btn btn-accent" :to="'/user/' + user.user_metadata.username">
                Go to my profile
              </NuxtLink>
            </div>
          </div>
          <div class="flex flex-col items-center justify-center gap-4 mt-16">
            <h2 class="text-xl font-bold">Or maybe you want to log out?</h2>
            <button class="btn btn-error" @click="logout">Log out</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const client = useSupabaseClient();

async function logout() {
  await client.auth.signOut();
  router.push('/');
}
</script>
