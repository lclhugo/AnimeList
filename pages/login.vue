<template>
  <CenterLayout>
    <form
      class="w-10/12 max-w-md p-8 rounded-lg shadow-md sm:w-11/12 bg-neutral text-neutral-content"
      @submit.prevent="signIn"
    >
      <h2 class="mb-4 text-2xl font-semibold text-center">Login</h2>
      <div class="mb-4">
        <label for="email" class="label-text-alt text-neutral-content">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          class="w-full input input-bordered focus:input-primary text-base-content"
          placeholder="Email"
        />
      </div>
      <div class="mb-6">
        <label for="password" class="label-text-alt text-neutral-content">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
          class="w-full input input-bordered focus:input-primary text-base-content"
          placeholder="Password"
        />
      </div>
      <div v-if="errorMsg" class="mb-4 text-center text-error">
        {{ errorMsg }}
      </div>
      <div v-if="successMsg" class="mb-4 text-center text-success">
        {{ successMsg }}
      </div>
      <button type="submit" class="w-full p-2 btn btn-primary">Sign In</button>
    </form>
  </CenterLayout>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['redirect-if-auth'],
});

const client = useSupabaseClient();
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMsg = ref('');
const successMsg = ref('');

const signIn = async () => {
  if (!email.value || !password.value) {
    errorMsg.value = 'Please fill in all fields.';
    return;
  }

  const { error } = await client.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    const { message } = error;
    errorMsg.value = message;
  } else {
    successMsg.value = 'Successfully logged in!';
    await router.push('/');
  }
};
</script>
