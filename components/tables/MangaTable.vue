<template>
  <div>
    <Feedback :message="feedbackAddMessage" :success="feedbackAddSuccess" />
    <div class="overflow-x-auto">
      <table class="table text-center">
        <thead>
          <tr>
            <th class="hidden md:block">Poster</th>
            <th class="text-left">Title</th>
            <th>Status</th>
            <th>Chapters</th>
            <th>Rating /10</th>
            <th v-if="user">Actions</th>
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
            <td v-if="user">
              <button class="text-sm btn btn-ghost" onclick="editModal.showModal()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
                  />
                </svg>
              </button>
              <EditManga
                :manga-id="manga.mangaid"
                :manga-title="manga.mangaInfo.title"
                :manga-chapters="manga.mangaInfo.chaptercount"
                :current-read-chapters="manga.readchapters"
                :current-status="manga.status.statusid"
                :current-rating="manga.rating"
                @manga-updated="handleMangaUpdated"
              />
              <button class="text-sm btn btn-ghost" onclick="deleteModal.showModal()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
                  />
                </svg>
              </button>
              <DeleteManga
                :manga-id="manga.mangaid"
                :manga-title="manga.mangaInfo.title"
                @manga-deleted="handleMangaDeleted"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MangaList } from '~/types/mangas';
const route = useRoute();
const user = ref(false);

const {
  feedbackMessage: feedbackAddMessage,
  feedbackSuccess: feedbackAddSuccess,
  setFeedback,
  clearFeedback,
} = useFeedback();

const userClient = useSupabaseUser();

if (userClient.value?.user_metadata?.username === route.params.username) {
  user.value = true;
} else {
  user.value = false;
}

const props = defineProps({
  mangaData: {
    type: Array as () => MangaList[],
    required: true,
  },
});

const handleMangaUpdated = () => {
  try {
    setFeedback('Manga edited successfully', true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error(error);
    setFeedback('Error updating manga', false);
  }
};

const handleMangaDeleted = () => {
  try {
    setFeedback('Manga deleted successfully', true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error(error);
    setFeedback('Error deleting manga', false);
  }
};
</script>
