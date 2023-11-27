<template>
  <div class="container grid grid-cols-1 gap-12 p-4 mx-auto md:grid-cols-8">
    <div class="col-span-8 w-full flex flex-col md:col-span-3 lg:col-span-2 gap-12">
      <div class="flex flex-col items-center justify-center mx-auto md:items-end md:flex-row">
        <img
          v-if="avatarUrl == ''"
          src="~/assets/images/default-avatar.jpg"
          alt="{{ username }}'s avatar"
          class="w-full max-w-[200px] max-h-[200] hover:opacity-80 transition-opacity duration-300 rounded-full"
        />
        <img
          v-else
          :src="avatarUrl"
          alt="{{ username }}'s avatar"
          class="w-full max-w-[200px] max-h-[200] hover:opacity-80 transition-opacity duration-300 rounded-full"
        />
        <h2
          class="text-2xl font-extrabold text-transparent title bg-clip-text bg-gradient-to-r from-primary from-10 via-10% to-secondary to-100%"
        >
          {{ UserData.username }}
        </h2>
      </div>
      <div>
        <div class="w-full mockup-window bg-base-300">
          <div class="flex justify-center px-4 py-8 bg-base-200">
            {{ UserData.bio }}
          </div>
        </div>
      </div>
    </div>
    <div class="col-span-8 md:col-span-5 lg:col-span-6">
      <div>
        <label class="text-5xl swap swap-flip">
          <input v-model="isChecked" type="checkbox" @change="handleChange" />
          <div class="mx-auto md:mx-0 flex items-center rounded-full swap-on border-primary">
            <h3
              class="text-4xl font-extrabold text-transparent title bg-clip-text bg-gradient-to-r from-primary from-10 via-50% to-secondary to-100% w-fit mx-auto"
            >
              Anime
            </h3>
            <span>📺</span>
          </div>
          <div class="flex items-center swap-off">
            <h3
              class="text-4xl text-center font-extrabold text-transparent title bg-clip-text bg-gradient-to-r from-primary from-10 via-50% to-secondary to-100% w-fit"
            >
              Manga
            </h3>
            <span>📖</span>
          </div>
        </label>
      </div>
      <div v-if="selectedType === 'anime'">
        <div v-if="watching.length === 0">
          <p class="text-xl font-bold">{{ username }} is not watching any anime for now! 😢</p>
        </div>
        <div v-else>
          <h3
            class="text-2xl text-center font-extrabold mb-8 text-transparent title bg-clip-text bg-gradient-to-r from-primary from-10 via-50% to-secondary to-100% w-fit mx-auto md:text-left md:mx-0"
          >
            Currently watching!
          </h3>
          <div
            class="flex flex-wrap justify-around mx-auto md:mx-0 lg:gap-y-16 md:justify-center gap-4 md:gap-8 gap-y-16 xl:justify-start"
          >
            <AnimeCard
              v-for="anime in watching"
              :id="anime.animeid"
              :key="anime.animeid"
              :name="anime.animeInfo.title"
              :image="anime.animeInfo.image"
            />
          </div>
        </div>
        <div class="flex justify-center mt-16 md:justify-start">
          <NuxtLink class="btn btn-primary" :to="'/user/' + username + '/anime'">
            Anime List
          </NuxtLink>
        </div>
      </div>
      <div v-else>
        <div v-if="reading.length === 0" class="text-left">
          <p class="text-xl font-bold">{{ username }} is not reading any manga for now! 😢</p>
        </div>
        <div v-else>
          <h3
            class="text-2xl text-center font-extrabold mb-8 text-transparent title bg-clip-text bg-gradient-to-r from-primary from-10 via-50% to-secondary to-100% w-fit mx-auto md:text-left md:mx-0"
          >
            Currently reading!
          </h3>
          <div
            class="flex flex-wrap justify-around mx-auto md:mx-0 lg:gap-y-16 md:justify-center gap-4 md:gap-8 gap-y-16 xl:justify-start"
          >
            <MangaCard
              v-for="manga in reading"
              :id="manga.mangaid"
              :key="manga.mangaid"
              :name="manga.mangaInfo.title"
              :image="manga.mangaInfo.image"
            />
          </div>
        </div>
        <div class="flex justify-center mt-16 md:justify-start">
          <NuxtLink class="btn btn-primary" :to="'/user/' + username + '/manga'">
            Manga List
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import type { User } from '~/types/user';
import type { AnimeList } from '~/types/animes';
import type { MangaList } from '~/types/mangas';
const isChecked = ref<boolean>(true);
const selectedType = ref<string>('anime');

const handleChange = () => {
  if (isChecked.value) {
    selectedType.value = 'anime';
  } else {
    selectedType.value = 'manga';
  }
};

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

const watching = ref<AnimeList[]>([]);
const reading = ref<MangaList[]>([]);

const fetchAnimeList = async () => {
  try {
    const { data } = await axios.get(
      `https://localhost:7081/api/anime/list/get/${username}/watching/5`,
    );
    watching.value = data;
  } catch (error) {
    console.error(error);
  }
};

const fetchMangaList = async () => {
  try {
    const { data } = await axios.get(
      `https://localhost:7081/api/manga/list/get/${username}/reading/5`,
    );
    reading.value = data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  try {
    const { data } = await axios.get(`https://localhost:7081/api/user/${username}`);
    UserData.value = data;
    if (UserData.value.avatarUrl === null) {
      avatarUrl.value = '';
    } else {
      avatarUrl.value = `https://xepjirqsxefnlhjmaqoh.supabase.co/storage/v1/object/public/avatars/${UserData.value.avatarUrl}`;
    }
    await fetchAnimeList();
    await fetchMangaList();
  } catch (error) {
    console.error(error);
  }
});
</script>
