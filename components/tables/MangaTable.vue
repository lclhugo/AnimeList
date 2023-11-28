<template>
  <div>
    <div class="overflow-x-auto">
      <table class="table text-center">
        <thead>
          <tr>
            <th class="hidden md:block">Poster</th>
            <th class="text-left">Title</th>
            <th>Status</th>
            <th>Chapters</th>
            <th>Rating /10</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="manga in mangaData" :key="manga.mangaid" v-motion-fade-visible>
            <td class="hidden md:block">
              <NuxtLink v-if="manga.mangaid" :to="'/manga/' + manga.mangaid">
                <div class="avatar">
                  <div class="w-20 md:w-30">
                    <img
                      :src="manga.mangaInfo.image"
                      alt="Manga Poster"
                      class="transition-opacity duration-300 hover:opacity-80"
                    />
                  </div>
                </div>
              </NuxtLink>
            </td>
            <td class="text-left">
              <NuxtLink :to="'/manga/' + manga.mangaid">
                {{ manga.mangaInfo.title }}
              </NuxtLink>
            </td>
            <td>{{ manga.status.statusname }}</td>
            <td v-if="manga.mangaInfo.chaptercount !== null">
              {{ manga.readchapters }}/{{ manga.mangaInfo.chaptercount }}

              <progress
                class="hidden mt-2 md:block progress progress-primary"
                :value="manga.readchapters"
                :max="manga.mangaInfo.chaptercount"
              ></progress>
            </td>
            <td v-else>{{ manga.readchapters }}</td>
            <td v-if="manga.rating !== 0">{{ manga.rating }}</td>
            <td v-else>Not rated</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MangaList } from '~/types/mangas';
const route = useRoute();

const props = defineProps({
  mangaData: {
    type: Array as () => MangaList[],
    required: true,
  },
});
</script>
