<template>
  <div class="navbar bg-base-100">
    <div class="navbar-start">
      <div class="z-20 md:hidden drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <!-- Page content here -->
          <label for="my-drawer" class="drawer-button">
            <svg
              class="fill-current swap-off"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </label>
        </div>
        <div class="drawer-side">
          <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>

          <ul class="min-h-full p-4 menu w-80 bg-base-200 text-base-content">
            <li><HomeButton /></li>
            <li>
              <NuxtLink to="/">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/">Anime</NuxtLink>
              <ul class="p-2">
                <li><NuxtLink to="/anime/search">Search</NuxtLink></li>
                <li><NuxtLink to="/anime/top">Top Ratings</NuxtLink></li>
                <li><NuxtLink to="/anime/current-season">Airing</NuxtLink></li>
              </ul>
            </li>
            <li>
              <NuxtLink to="/">Manga</NuxtLink>
              <ul class="p-2">
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
      </div>
      <HomeButton />
    </div>
    <div class="hidden gap-8 navbar-center lg:flex">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost">Anime</label>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-56"
        >
          <li><NuxtLink to="/anime/search">Search Animes</NuxtLink></li>
          <li><NuxtLink to="/anime/top">Top Rated Animes</NuxtLink></li>
          <li><NuxtLink to="/anime/current-season">Airing</NuxtLink></li>
        </ul>
      </div>
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost">manga</label>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-56"
        >
          <li><NuxtLink to="/manga/search">Search Mangas</NuxtLink></li>
          <li><NuxtLink to="/manga/top">Top Rated Mangas</NuxtLink></li>
        </ul>
      </div>
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost">Anime</label>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-56"
        >
          <li><NuxtLink to="/anime/search">Search</NuxtLink></li>
          <li><NuxtLink to="/anime/top">Top Ratings</NuxtLink></li>
          <li><NuxtLink to="/anime/current-season">Airing</NuxtLink></li>
        </ul>
      </div>
    </div>
    <div class="px-4 navbar-end">
      <ThemeSwitcher />
    </div>
  </div>
</template>
