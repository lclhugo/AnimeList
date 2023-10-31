<template>
  <div class="flex flex-col items-center justify-center text-center min-h-screen80">
    <h1
      class="mb-4 text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%"
    >
      Welcome to AnimeList!
    </h1>
    <p class="mb-8 text-lg">A platform for managing and arranging your anime watchlists!</p>
    <router-link to="/coucou" class="btn btn-active btn-accent">Get Started</router-link>
    <button class="btn btn-active btn-accent" @click="sendRequest()">Send Request</button>
  </div>
</template>

<script>
import axios from 'axios';
const client = useSupabaseClient();

export default {
  setup: function () {
    onMounted(async () => {
      await sendRequest();
    });

    const sendRequest = async () => {
      try {
        const session = client.auth.getSession();

        console.log(session.access_token);
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;

        const response = await axios.get('https://localhost:7081/api/anime/test');
        console.log('API Response:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    return {
      sendRequest: sendRequest,
    };
  },
};
</script>
