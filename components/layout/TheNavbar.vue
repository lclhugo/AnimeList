<template>
  <header>
    <div id="app" class="font-sans antialiased">
      <nav class="flex flex-wrap items-center justify-between p-6 bg-teal">
        <div class="flex items-center mr-6 flex-no-shrink">
          <NuxtLink to="/" class="text-xl font-semibold tracking-tight normal-case btn btn-ghost">
            AnimeList
          </NuxtLink>
        </div>
        <div class="block sm:hidden">
          <button
            class="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-white hover:border-white"
            @click="toggle"
          >
            <svg
              class="w-3 h-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          :class="open ? 'block' : 'hidden'"
          class="flex-grow w-full sm:flex sm:items-center sm:w-auto"
        >
          <div class="text-sm sm:flex-grow">
            <NuxtLink
              to="/anime/top"
              class="block mt-4 mr-4 no-underline sm:inline-block sm:mt-0 text-teal-lighter hover:text-white"
            >
              Top
            </NuxtLink>
            <NuxtLink
              to="/anime/search"
              class="block mt-4 mr-4 no-underline sm:inline-block sm:mt-0 text-teal-lighter hover:text-white"
            >
              Search
            </NuxtLink>
            <NuxtLink
              to="/anime/current-season"
              class="block mt-4 no-underline sm:inline-block sm:mt-0 text-teal-lighter hover:text-white"
            >
              CurrentSeason
            </NuxtLink>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup: function () {
    const open = ref(false);
    const toggle = () => {
      open.value = !open.value;
    };
    return {
      open: open,
      toggle: toggle,
    };
  },
});
</script>
