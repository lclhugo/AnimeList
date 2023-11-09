<template>
  <div>
    <p>Welcome back {{ user.user_metadata.username }}!</p>
    <div v-if="animeData" class="flex flex-col justify-center w-11/12 gap-4 mx-auto">
      <div class="text-center">
        <h2 class="text-3xl font-bold">{{ animeData?.data.title }}</h2>
        <h3 class="text-xl font-bold">{{ animeData?.data.titleJapanese }}</h3>
      </div>
      <figure class="flex flex-col items-center justify-center">
        <img :src="animeData?.data.images.webp.largeImageUrl" class="w-56 rounded-l shadow-lg" />
        <figcaption class="text-sm text-gray-500">
          {{ animeData?.data.images.webp.largeImageUrl }}
        </figcaption>
      </figure>

      <div v-if="InList">
        <h3 class="text-xl font-bold">You have this anime in your list</h3>
      </div>
      <div v-else>
        <h3 class="text-xl font-bold">You don't have this anime in your list</h3>
      </div>
      <!-- <form @submit.prevent="submitForm">
        <label for="animeId">Anime ID:</label>
        <input v-model="form.animeId" type="number" required />

        <label for="statusId">Status ID:</label>
        <input v-model="form.statusId" type="number" required />

        <label for="watchedEpisodes">Watched Episodes:</label>
        <input v-model="form.watchedEpisodes" type="number" required />

        <label for="rating">Rating:</label>
        <input v-model="form.rating" type="number" required />

        <button type="submit">Submit</button>
      </form> -->

      <div class="w-11/12 mx-auto prose-sm prose sm:prose">
        <h3 class="text-xl font-bold">Synopsis</h3>
        <p>{{ animeData?.data.synopsis }}</p>

        <div class="collapse bg-base-200">
          <input type="checkbox" />
          <div class="text-xl font-medium collapse-title">Background</div>
          <div class="collapse-content">
            <p>{{ animeData?.data.background }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>There is no anime with this id</h1>
      <NuxtLink class="btn btn-accent" to="/">Go back to home</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const user = useSupabaseUser();
const { username } = user.user_metadata;

const { data: anime } = await useFetch(`https://localhost:7081/api/anime/${route.params.id}`);
const animeData = ref(anime);

const isInListResponse = await useFetch(
  `https://localhost:7081/api/anime/list/get/${username}}/anime/${route.params.id}`,
);
const InList = ref(isInListResponse.data);

// const form = ref({
//   animeId: 0,
//   statusId: 0,
//   watchedEpisodes: 0,
//   rating: 0,
// });

// const submitForm = () => {
//   const formData = {
//     animeId: form.value.animeId,
//     statusId: form.value.statusId,
//     watchedEpisodes: form.value.watchedEpisodes,
//     rating: form.value.rating,
//     created: new Date().toISOString(),
//     lastUpdated: new Date().toISOString(),
//   };

//   // Now you can make your API call with the formData and JWT
//   fetch('your-api-endpoint', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       Authorization: `Bearer ${yourJwtToken}`,
//     },
//     body: JSON.stringify(formData),
//   })
//     .then(response => {
//       // Handle the response as needed
//     })
//     .catch(error => {
//       // Handle errors
//       console.error('Error:', error);
//     });
// };
</script>
