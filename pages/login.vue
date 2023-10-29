<template>
  <CenterLayout>
    <div class="w-full max-w-md p-8 rounded-lg shadow-md bg-primary-content">
      <h2 class="mb-4 text-2xl font-semibold text-center">Login</h2>
      <div class="mb-4">
        <label
          for="email"
          class="block mb-1 text-sm font-medium text-gradient-to-r from-primary to-secondary"
        >
          Email
        </label>
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          class="w-full px-3 py-2 border rounded-lg bg-base-100 focus:outline-none focus:ring focus:border-base-100-focus"
          placeholder="Email"
        />
      </div>
      <div class="mb-6">
        <label for="password" class="block mb-1 text-sm font-medium text-base-content">
          Password
        </label>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          class="w-full px-3 py-2 border rounded-lg bg-base-100 focus:outline-none focus:ring focus:border-base-100-focus"
          placeholder="Password"
        />
      </div>
      <div v-if="errorMsg" class="mb-4 text-center text-error">
        {{ errorMsg }}
      </div>
      <button class="w-full p-2 btn btn-primary" @click="signIn">Sign In</button>
    </div>
  </CenterLayout>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMsg = ref('');

const signIn = async () => {
  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    errorMsg.value;
  } else {
    router.push('/coucou');
  }
};
</script>
