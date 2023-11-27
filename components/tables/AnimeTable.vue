<template>
  <div>
    <div class="overflow-x-auto">
      <table class="table text-center">
        <thead>
          <tr>
            <th class="hidden md:block">Poster</th>
            <th class="text-left">Title</th>
            <th>Status</th>
            <th>Type</th>
            <th>Episodes</th>
            <th>Rating /10</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="anime in animeData" :key="anime.animeid" v-motion-fade-visible>
            <td class="hidden md:block">
              <NuxtLink v-if="anime.animeid" :to="'/anime/' + anime.animeid">
                <div class="avatar">
                  <div class="w-20 md:w-30">
                    <img
                      :src="anime.animeInfo.image"
                      alt="Anime Poster"
                      class="transition-opacity duration-300 hover:opacity-80"
                    />
                  </div>
                </div>
              </NuxtLink>
            </td>
            <td class="text-left">
              <NuxtLink :to="'/anime/' + anime.animeid">
                {{ anime.animeInfo.title }}
              </NuxtLink>
            </td>
            <td>{{ anime.status.statusname }}</td>
            <td>{{ anime.animeInfo.type }}</td>
            <td>
              {{ anime.watchedepisodes }}/{{ anime.animeInfo.episodecount }}

              <progress
                class="hidden mt-2 md:block progress progress-primary"
                :value="anime.watchedepisodes"
                :max="anime.animeInfo.episodecount"
              ></progress>
            </td>
            <td v-if="anime.rating !== 0">{{ anime.rating }}</td>
            <td v-else>Not rated</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AnimeList } from '~/types/animes';
const route = useRoute();
const user = ref(false);

const userClient = useSupabaseUser();

if (userClient.value?.user_metadata?.username === route.params.username) {
  user.value = true;
} else {
  user.value = false;
}

const props = defineProps({
  animeData: {
    type: Array as () => AnimeList[],
    required: true,
  },
});
</script>
