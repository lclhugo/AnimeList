<template>
  <CenterLayout>
    <form
      class="w-full max-w-md p-8 rounded-lg shadow-md bg-primary-content"
      @submit.prevent="signUp"
    >
      <h2 class="mb-4 text-2xl font-semibold text-center">Sign Up</h2>
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
          required
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
          required
        />
      </div>
      <div v-if="errorMsg" class="mb-4 text-center text-error">
        {{ errorMsg }}
      </div>
      <div v-if="successMsg" class="mb-4 text-center text-success">
        {{ successMsg }}
      </div>
      <button type="submit" class="w-full p-2 btn btn-primary">Sign Up</button>
    </form>
  </CenterLayout>
</template>

<script setup lang="ts">
const client = useSupabaseClient();

const email = ref('');
const password = ref('');
const errorMsg = ref('');
const successMsg = ref('');

const signUp = async () => {
  const { error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) {
    errorMsg.value = error.message;
  } else {
    successMsg.value = 'Check your email for the confirmation link.';
  }
};
</script>
