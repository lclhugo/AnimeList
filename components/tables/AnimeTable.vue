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
            <th>Type</th>
            <th>Episodes</th>
            <th>Rating /10</th>
            <th v-if="user">Actions</th>
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
            <td v-if="user">
              <button class="text-sm btn btn-ghost" onclick="editModal.showModal()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15q.4 0 .775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
                  />
                </svg>
              </button>
              <EditAnime
                :anime-id="anime.animeid"
                :anime-title="anime.animeInfo.title"
                :anime-episodes="anime.animeInfo.episodecount"
                :current-watched-episodes="anime.watchedepisodes"
                :current-status="anime.status.statusid"
                :current-rating="anime.rating"
                @anime-updated="handleAnimeUpdated"
              />
              <button class="text-sm btn btn-ghost" onclick="deleteModal.showModal()">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
                  />
                </svg>
              </button>
              <DeleteAnime
                :anime-id="anime.animeid"
                :anime-title="anime.animeInfo.title"
                @anime-deleted="handleAnimeDeleted"
              />
            </td>
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
  animeData: {
    type: Array as () => AnimeList[],
    required: true,
  },
});

const handleAnimeUpdated = () => {
  try {
    setFeedback('Anime edited successfully', true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error(error);
    setFeedback('Error updating anime', false);
  }
};

const handleAnimeDeleted = () => {
  try {
    console.log('Anime deleted');
    setFeedback('Anime deleted successfully', true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  } catch (error) {
    console.error(error);
    setFeedback('Error deleting anime', false);
  }
};
</script>
