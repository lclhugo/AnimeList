<template>
  <div class="pt-4 mx-auto navbar bg-base-100 max-w-7xl">
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
                <li v-if="user">
                  <NuxtLink :to="'/user/' + username + '/anime'">Your Anime List!</NuxtLink>
                </li>
                <li><NuxtLink to="/anime/search">Browse</NuxtLink></li>
                <li><NuxtLink to="/anime/top">Top Ratings</NuxtLink></li>
                <li><NuxtLink to="/anime/current-season">Airing</NuxtLink></li>
              </ul>
            </li>
            <li>
              <NuxtLink to="/">Manga</NuxtLink>
              <ul class="p-2">
                <li v-if="user">
                  <NuxtLink :to="'/user/' + username + '/manga'">Your Manga List!</NuxtLink>
                </li>
                <li><NuxtLink to="/manga/search">Browse</NuxtLink></li>
                <li><NuxtLink to="/manga/top">Top Ratings</NuxtLink></li>
              </ul>
            </li>
            <li v-if="user">
              <NuxtLink :to="`/user/${username}`">{{ username }}</NuxtLink>
              <ul class="p-2">
                <li>
                  <NuxtLink :to="`/user/${username}`">Profile</NuxtLink>
                </li>
                <li><button class="" @click="logout">Logout</button></li>
              </ul>
            </li>
            <li v-else>
              <NuxtLink to="/login">Login</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
      <HomeButton />
    </div>
    <div class="hidden gap-8 navbar-center md:flex">
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost">Anime</label>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
        >
          <li v-if="user">
            <NuxtLink :to="'/user/' + username + '/anime'">Your List!</NuxtLink>
          </li>
          <li><NuxtLink to="/anime/search">Browse</NuxtLink></li>
          <li><NuxtLink to="/anime/top">Top Ratings</NuxtLink></li>
          <li><NuxtLink to="/anime/current-season">Airing</NuxtLink></li>
        </ul>
      </div>
      <div class="dropdown">
        <label tabindex="0" class="btn btn-ghost">manga</label>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
        >
          <li v-if="user">
            <NuxtLink :to="'/user/' + username + '/manga'">Your List!</NuxtLink>
          </li>
          <li><NuxtLink to="/manga/search">Browse</NuxtLink></li>
          <li><NuxtLink to="/manga/top">TopRatings</NuxtLink></li>
        </ul>
      </div>
    </div>
    <div class="px-4 navbar-end">
      <div v-if="user" class="hidden dropdown md:block">
        <label tabindex="0" class="btn btn-ghost">
          <div class="avatar">
            <div class="w-8">
              <img
                v-if="avatarUrl == ''"
                src="~/assets/images/default-avatar.jpg"
                alt="{{ username }}'s avatar"
                class="w-full rounded-full"
              />
              <img v-else :src="avatarUrl" alt="avatar" class="w-full rounded-full" />
            </div>
          </div>
          {{ username }}
        </label>
        <ul
          tabindex="0"
          class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
        >
          <li>
            <NuxtLink :to="`/user/${username}`">my profile</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/profile">edit profile</NuxtLink>
          </li>

          <li>
            <button @click="logout">Logout</button>
          </li>
        </ul>
      </div>
      <NuxtLink v-else to="/login" class="btn btn-ghost btn-sm">Login</NuxtLink>
      <ThemeSwitcher />
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import type { User } from '~/types/user';

const user = useSupabaseUser();
const router = useRouter();
const client = useSupabaseClient();
const username = ref<string | undefined>(user.value?.user_metadata?.username);

const UserData = ref<User>({
  username: '',
  avatarUrl: '',
  bio: '',
});

const avatarUrl = ref<string>('');

const fetchData = async () => {
  try {
    if (!username.value) {
      return;
    }
    const { data } = await axios.get(`https://localhost:7081/api/user/${username.value}`);
    UserData.value = data;
    if (UserData.value.avatarUrl === null) {
      avatarUrl.value = '';
    } else {
      avatarUrl.value = `https://xepjirqsxefnlhjmaqoh.supabase.co/storage/v1/object/public/avatars/${UserData.value.avatarUrl}`;
    }
  } catch (error) {
    console.error(error);
  }
};

watch(
  user,
  newUser => {
    const newUsername = newUser?.user_metadata?.username;

    if (newUsername !== undefined) {
      username.value = newUsername;
      fetchData();
    }
  },
  { immediate: true },
);

async function logout() {
  await client.auth.signOut();
  router.push('/');
}
</script>
