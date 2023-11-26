<script setup lang="ts">
import axios from 'axios';
import type { User } from '~/types/user';

const {
  params: { username },
} = useRoute();

const data = await axios.get(`https://localhost:7081/api/user/check-username/${username}`);
if (data.data === true) {
  navigateTo('/404');
}

const UserData = ref<User>({
  username: '',
  avatarUrl: '',
  bio: '',
});
const avatarUrl = ref<string>('');

onMounted(async () => {
  try {
    const { data } = await axios.get(`https://localhost:7081/api/user/${username}`);
    UserData.value = data;
    if (UserData.value.avatarUrl === null) {
      avatarUrl.value = '';
    } else {
      avatarUrl.value = `https://xepjirqsxefnlhjmaqoh.supabase.co/storage/v1/object/public/avatars/${UserData.value.avatarUrl}`;
    }
  } catch (error) {
    console.error(error);
  }
});
</script>

<template>
  <div
    class="container flex flex-col gap-8 px-4 py-8 mx-auto sm:px-6 md:px-8 lg:px-10 xl:px-20 2xl:px-32"
  >
    <h2
      class="text-2xl font-extrabold text-transparent title bg-clip-text bg-gradient-to-r from-primary from-10 via-10% to-secondary to-100%"
    >
      Welcome to {{ UserData.username }}'s profile!
    </h2>
    <div class="flex items-center justify-center">
      <img
        v-if="avatarUrl == ''"
        src="~/assets/images/default-avatar.jpg"
        alt="{{ username }}'s avatar"
        class="w-full max-w-[200px] max-h-[200] mx-auto hover:opacity-80 transition-opacity duration-300"
      />
      <img
        v-else
        :src="avatarUrl"
        alt="{{ username }}'s avatar"
        class="w-full max-w-[200px] max-h-[200] mx-auto hover:opacity-80 transition-opacity duration-300"
      />
    </div>
    <div class="mx-auto prose">
      <h3>About:</h3>
      <p>{{ UserData.bio }}</p>
      <NuxtLink :to="'/user/' + username + '/anime'" class="btn btn-primary">Anime List!</NuxtLink>
      <NuxtLink :to="'/user/' + username + '/manga'" class="btn btn-primary">Manga List!</NuxtLink>
    </div>
  </div>
</template>
