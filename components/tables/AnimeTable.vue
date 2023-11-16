<template>
  <div>
    <div class="overflow-x-auto">
      <table class="table">
        <thead>
          <tr>
            <th class="hidden md:block"></th>
            <th>Title</th>
            <th>Status</th>
            <th>Type</th>
            <th>Episodes</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="anime in animeData" :key="anime.animeId" v-motion-fade-visible>
            <td class="hidden md:block hover:scale-110">
              <NuxtLink v-if="anime.animeId" :to="'/anime/' + anime.animeId">
                <div class="avatar">
                  <div class="w-12 h-12 lg:w-20 lg:h-20 mask mask-squircle">
                    <img :src="anime.animeInfo.image" alt="Anime Poster" />
                  </div>
                </div>
              </NuxtLink>
            </td>
            <td>
              <NuxtLink :to="'/anime/' + anime.animeId">{{ anime.animeInfo.title }}</NuxtLink>
            </td>
            <td>{{ anime.status.statusName }}</td>
            <td>{{ anime.animeInfo.type }}</td>
            <td>
              {{ anime.watchedEpisodes }}/{{ anime.animeInfo.episodeCount }}
              <br />
              <progress
                class="w-20 md:w-40 progress progress-primary"
                :value="anime.watchedEpisodes"
                :max="anime.animeInfo.episodeCount"
              ></progress>
            </td>
            <td>{{ anime.rating }}/10</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    animeData: {
      type: Array,
      required: true,
    },
  },
});
</script>
