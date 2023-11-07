<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M4 18q-.425 0-.713-.288T3 17q0-.425.288-.713T4 16h11q.425 0 .713.288T16 17q0 .425-.288.713T15 18H4Zm14.9-1.7l-3.6-3.6q-.3-.3-.3-.7t.3-.7l3.6-3.6q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7L17.4 12l2.9 2.9q.275.275.275.7t-.275.7q-.275.275-.7.275t-.7-.275ZM4 13q-.425 0-.713-.288T3 12q0-.425.288-.713T4 11h8q.425 0 .713.288T13 12q0 .425-.288.713T12 13H4Zm0-5q-.425 0-.713-.288T3 7q0-.425.288-.713T4 6h11q.425 0 .713.288T16 7q0 .425-.288.713T15 8H4Z"
            />
          </svg>
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <NuxtLink to="/">Anime</NuxtLink>
            <ul class="p-2">
              <li><NuxtLink to="/animes">Animes</NuxtLink></li>
              <li><NuxtLink to="/anime/search">Search</NuxtLink></li>
              <li><NuxtLink to="/anime/top">Top Ratings</NuxtLink></li>
              <li><NuxtLink to="/anime/current-season">Airing</NuxtLink></li>
            </ul>
          </li>
          <li>
            <NuxtLink to="/">Manga</NuxtLink>
            <ul class="p-2">
              <li><NuxtLink to="/mangas">Mangas</NuxtLink></li>
              <li><NuxtLink to="/manga/search">Search</NuxtLink></li>
              <li><NuxtLink to="/manga/top">Top Ratings</NuxtLink></li>
            </ul>
          </li>
          <li>
            <NuxtLink to="/">Parent</NuxtLink>
            <ul class="p-2">
              <li><NuxtLink to="/">Submenu 1</NuxtLink></li>
              <li><NuxtLink to="/">Submenu 2</NuxtLink></li>
            </ul>
          </li>
        </ul>
      </div>
      <HomeButton />
    </div>
    <div class="hidden navbar-center lg:flex">
      <ul class="gap-8 px-1 z-[1] menu menu-horizontal">
        <li tabindex="0">
          <details>
            <summary>Anime</summary>
            <ul class="p-2">
              <li><NuxtLink to="/animes">Animes</NuxtLink></li>
              <li><NuxtLink to="/anime/search">Search</NuxtLink></li>
              <li><NuxtLink to="/anime/top">Top Ratings</NuxtLink></li>
              <li><NuxtLink to="/anime/current-season">Airing</NuxtLink></li>
            </ul>
          </details>
        </li>

        <li tabindex="0">
          <details>
            <summary>Manga</summary>
            <ul class="p-2">
              <li><NuxtLink to="/mangas">Mangas</NuxtLink></li>
              <li><NuxtLink to="/manga/search">Search</NuxtLink></li>
              <li><NuxtLink to="/manga/top">Top Ratings</NuxtLink></li>
            </ul>
          </details>
        </li>
        <li tabindex="0">
          <details>
            <summary>List</summary>
            <ul class="p-2">
              <li><NuxtLink to="/">Submenu 1</NuxtLink></li>
              <li><NuxtLink to="/">Submenu 2</NuxtLink></li>
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

<script lang="ts"></script>
