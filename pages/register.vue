<template>
  <CenterLayout>
    <form
      class="w-10/12 max-w-md p-8 rounded-lg shadow-md bg-neutral text-neutral-content"
      @submit.prevent="signUp"
    >
      <h2 class="mb-4 text-2xl font-semibold text-center">Sign Up</h2>
      <div class="mb-4">
        <label for="email" class="label-text-alt text-neutral-content">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          name="email"
          class="w-full input input-bordered focus:input-primary text-base-content"
          placeholder="Email"
          required
        />
      </div>
      <div class="mb-4">
        <label for="username" class="label-text-alt text-neutral-content">Username</label>
        <input
          id="username"
          v-model="username"
          type="text"
          name="username"
          class="w-full input input-bordered focus:input-primary text-base-content"
          placeholder="Username"
          required
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
          required
        />
      </div>
      <div class="mb-6">
        <label for="confirmPassword" class="label-text-alt text-neutral-content">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          name="confirmPassword"
          class="w-full input input-bordered focus:input-primary text-base-content"
          placeholder="Confirm Password"
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
definePageMeta({
  middleware: ['redirect-if-auth'],
});

const client = useSupabaseClient();
const email = ref('');
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMsg = ref('');
const successMsg = ref('');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9]{3,16}$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

watchEffect(() => {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match';
  } else {
    errorMsg.value = '';
  }
});

const checkUsernameAvailability = async username => {
  try {
    // Make a request to your API endpoint
    const response = await fetch(`https://localhost:7081/api/user/username-check/${username}`);

    if (response.ok) {
      return true;
    }
    const data = await response.json();
    console.error('Username is not available:', data.errorMessage);
    return false;
  } catch (error) {
    console.error('Error checking username availability:', error);
    return false;
  }
};

const signUp = async () => {
  if (password.value !== confirmPassword.value) {
    errorMsg.value = 'Passwords do not match';
    return;
  }
  if (!emailRegex.test(email.value)) {
    errorMsg.value = 'Invalid email format';
    return;
  }

  if (!usernameRegex.test(username.value)) {
    errorMsg.value =
      'Invalid username format, must be between 3 and 16 characters and contain only letters and numbers';
    return;
  }

  if (!passwordRegex.test(password.value)) {
    errorMsg.value =
      'Password must contain at least 8 characters, one lowercase letter, one uppercase letter, and one number';
    return;
  }

  const isUsernameAvailable = await checkUsernameAvailability(username.value);

  if (!isUsernameAvailable) {
    errorMsg.value = 'Username is not available';
    return;
  }

  const { data, error } = await client.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        username: username.value,
      },
    },
  });
  if (error) {
    const { message } = error;
    errorMsg.value = message;
  } else {
    successMsg.value = 'You are now registered! You can now login.';
  }
};
</script>
