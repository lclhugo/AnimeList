<script setup>
definePageMeta({
  middleware: ['redirect-if-not-auth'],
});
const supabase = useSupabaseClient();
const loading = ref(true);
const username = ref('');
const avatar_path = ref('');
const bio = ref('');
const errorMsg = ref('');
const successMsg = ref('');

loading.value = true;
const user = useSupabaseUser();

const { data } = await supabase
  .from('profiles')
  .select(`username, avatar_url, bio`)
  .eq('id', user.value.id)
  .single();

if (data) {
  username.value = data.username;
  avatar_path.value = data.avatar_url;
  bio.value = data.bio;
}

loading.value = false;

async function updateProfile() {
  try {
    loading.value = true;
    const user = useSupabaseUser();

    const updates = {
      id: user.value.id,
      username: username.value,
      avatar_url: avatar_path.value,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal',
    });

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function editBio() {
  try {
    loading.value = true;
    successMsg.value = '';
    errorMsg.value = '';
    const user = useSupabaseUser();

    if (!user.value.id) {
      errorMsg.value = 'You must be logged in to edit your bio';
    }

    if (bio > 2000) {
      errorMsg.value = 'Bio must be less than 2000 characters';
    }

    const updates = {
      id: user.value.id,
      bio: bio.value,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal',
    });

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
    successMsg.value = 'Bio updated successfully!';
  }
}
</script>

<template>
  <form class="form-widget" @submit.prevent="updateProfile">
    <div class="container flex flex-col items-center gap-4 mx-auto">
      <h1
        class="text-4xl text-center font-extrabold mb-8 text-transparent title bg-clip-text bg-gradient-to-r from-primary from-10 via-50% to-secondary to-100% w-fit mx-auto"
      >
        Edit your profile!
      </h1>

      <Avatar v-model:path="avatar_path" @upload="updateProfile" />

      <div class="flex flex-col items-center justify-center gap-4">
        <h3 class="font-bold title">Edit your biography:</h3>
        <label for="bio" hidden></label>
        <textarea
          id="bio"
          v-model="bio"
          class="w-full textarea textarea-primary min-w-[340px] md:min-w-[600px]"
          placeholder="Write a short bio about yourself!"
          maxlength="200"
          rows="5"
        ></textarea>
        <button class="btn btn-primary" :disabled="loading" @click="editBio">Edit Bio</button>
        <span v-if="loading" class="loading loading-spinner text-primary"></span>
      </div>
      <p class="text-sm text-center">
        <span class="font-bold">{{ bio.length }}</span>
        / 200
      </p>
      <p class="text-sm text-center text-error">{{ errorMsg }}</p>
      <p class="text-sm text-center text-success">{{ successMsg }}</p>
    </div>
    <div class="container flex flex-col items-center justify-center gap-4 mx-auto">
      <NuxtLink to="/" class="btn btn-secondary">Back to home</NuxtLink>
    </div>
  </form>
</template>
