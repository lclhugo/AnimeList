<template>
  <div>
    <h1>coucou</h1>
    <button v-if="user" @click="logout">Logout</button>
    <div class="chat chat-start">
      <div class="chat-bubble">It's over Anakin, I have the high ground.</div>
    </div>
    <div class="chat chat-end">
      <div class="chat-bubble">You underestimate my power!</div>
    </div>
    <div v-if="user">
      <p>Logged in as {{ user.email }}</p>
      <p>user id: {{ user.id }}</p>
    </div>
    <div v-else>
      <p>Not logged in</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['redirect-if-not-auth'],
});

const user = useSupabaseUser();
const router = useRouter();
const client = useSupabaseClient();

console.log(user.value);
async function logout() {
  await client.auth.signOut();

  router.push('/');
}
</script>
