<!-- <template>
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
</template> -->
<!-- 
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
</script> -->

<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h8m-8 6h16"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a>Parent</a>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
          <li>
            <a>Parent</a>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
          <li>
            <a>Parent</a>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
        </ul>
      </div>
      <NuxtLink to="/" class="text-xl font-semibold tracking-tight normal-case btn btn-ghost">
        AnimeList
      </NuxtLink>
    </div>
    <div class="hidden navbar-center lg:flex">
      <ul class="gap-8 px-1 menu menu-horizontal">
        <li tabindex="0">
          <details>
            <summary>Anime</summary>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </details>
        </li>

        <li tabindex="0">
          <details>
            <summary>Manga</summary>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </details>
        </li>
        <li tabindex="0">
          <details>
            <summary>List</summary>
            <ul class="p-2">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
    <div class="navbar-end">
      <ThemeSwitcher />
    </div>
  </div>
</template>

<script lang="ts">
import type { ThemeSwitcher } from '#build/components';
</script>
