<script setup>
const props = defineProps({
  path: {
    type: String,
    required: true,
  },
});
const { path } = toRefs(props);

const emit = defineEmits(['update:path', 'upload']);

const supabase = useSupabaseClient();

const uploading = ref(false);
const src = ref('');
const files = ref();
const errorMsg = ref('');

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(path.value);
    if (error) throw error;
    src.value = URL.createObjectURL(data);
  } catch (error) {
    console.error('Error downloading image: ', error.message);
  }
};

const uploadAvatar = async evt => {
  errorMsg.value = '';
  files.value = evt.target.files;
  try {
    uploading.value = true;

    if (!files.value || files.value.length === 0) {
      errorMsg.value = 'You must select an image to upload.';
    }

    if (files.value[0].size > 2000000) {
      errorMsg.value = 'Image must be under 2MB.';
    }

    if (!files.value[0].type.includes('image')) {
      errorMsg.value = 'You must select an image file (png, jpg, jpeg).';
    }

    const file = files.value[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file);

    if (uploadError) throw uploadError;

    emit('update:path', filePath);
    emit('upload');
  } catch (error) {
    alert(error.message);
  } finally {
    uploading.value = false;
  }
};

downloadImage();

watch(path, () => {
  if (path.value) {
    downloadImage();
  }
});
</script>

<template>
  <div v-if="src" class="flex flex-col items-center justify-center gap-4">
    <img :src="src" alt="Avatar" class="avatar max-w-[200px] max-h-[200px] rounded-full" />
    <h3 class="font-bold title">Edit your avatar:</h3>

    <div>
      <span v-if="uploading" class="loading loading-spinner text-primary"></span>
      <label for="single" hidden></label>
      <input
        id="single"
        class="w-full max-w-xs file-input file-input-bordered file-input-primary"
        type="file"
        accept="image/*"
        :disabled="uploading"
        @change="uploadAvatar"
      />
      <p class="text-sm text-center text-error">{{ errorMsg }}</p>
    </div>
  </div>
</template>
