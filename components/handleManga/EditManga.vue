<template>
  <div>
    <dialog id="editModal" class="modal" @click.self="closeModal">
      <div class="modal-box">
        <button
          onclick="editModal.close()"
          class="absolute btn btn-sm btn-circle btn-ghost right-2 top-2"
        >
          ✕
        </button>
        <h3 class="text-lg font-bold">Edit {{ mangaTitle }} in your list</h3>
        <p class="py-4 text-sm">
          Press
          <kbd class="kbd">ESC</kbd>
          or click on the ✕ to close
        </p>
        <form method="dialog">
          <form class="gap-2 form-control align-center" @submit.prevent="submitEditForm">
            <label for="status" class="label-text-alt">Status:</label>
            <select
              id="status"
              v-model="editedManga.status"
              class="w-full input input-bordered"
              @change="handleStatusChange"
            >
              <option value="1">Watching</option>
              <option value="2">Completed</option>
              <option value="3">On Hold</option>
              <option value="4">Dropped</option>
              <option value="6">Plan to Watch</option>
            </select>
            <label for="readchapters" class="label-text-alt">Read Chapters:</label>
            <div class="join">
              <input
                id="readchapters"
                v-model="editedManga.readchapters"
                type="number"
                class="w-full remove-arrow input input-bordered join-item"
                min="0"
                :max="mangaChapters"
              />
              <span class="p-2.5 join-item input input-bordered">/{{ mangaChapters }}</span>
            </div>
            <!-- Rating -->
            <label for="rating" class="label-text-alt">Rating:</label>
            <div class="mx-auto rating rating-lg rating-half">
              <input
                v-model="editedManga.rating"
                type="radio"
                name="rating-10"
                class="rating-hidden"
                value="0"
              />
              <input
                v-model="editedManga.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-1"
                value="1"
              />
              <input
                v-model="editedManga.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-2"
                value="2"
              />
              <input
                v-model="editedManga.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-1"
                value="3"
              />
              <input
                v-model="editedManga.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-2"
                value="4"
              />
              <input
                v-model="editedManga.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-1"
                value="5"
              />
              <input
                v-model="editedManga.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-2"
                value="6"
              />
              <input
                v-model="editedManga.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-1"
                value="7"
              />
              <input
                v-model="editedManga.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-2"
                value="8"
              />
              <input
                v-model="editedManga.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-1"
                value="9"
              />
              <input
                v-model="editedManga.rating"
                type="radio"
                name="rating-10"
                class="bg-yellow-300 mask mask-star-2 mask-half-2"
                value="10"
              />
            </div>
            <button class="mt-8 btn btn-primary" type="submit">Save Changes</button>
          </form>
        </form>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
const jwt = useCookie('sb-access-token');
const { value: yourJwtToken } = jwt;

const { mangaId, mangaTitle, mangaChapters, currentReadChapters, currentStatus, currentRating } =
  defineProps([
    'mangaId',
    'mangaTitle',
    'mangaChapters',
    'currentReadChapters',
    'currentStatus',
    'currentRating',
  ]);
const emit = defineEmits(['manga-updated']);

const editedManga = ref({
  status: currentStatus,
  readchapters: currentReadChapters,
  rating: currentRating,
});

const submitEditForm = async () => {
  const jsonPayload = {
    statusId: editedManga.value.status,
    readchapters: editedManga.value.readchapters,
    rating: editedManga.value.rating,
  };
  console.log(jsonPayload);
  try {
    await useFetch(`https://localhost:7081/api/manga/list/update/${mangaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${yourJwtToken}`,
      },
      body: JSON.stringify(jsonPayload),
    });
    emit('manga-updated');
    const modal = document.getElementById('editModal');

    modal.close();
  } catch (error) {
    console.error(error);
  }
};

watch(editedManga, () => {
  console.log(editedManga.value);
});

const handleStatusChange = () => {
  if (editedManga.value.status === 2) {
    editedManga.value.readchapters = mangaChapters;
  }
};

const closeModal = () => {
  const modal = document.getElementById('editModal');
  modal.close();
};
</script>
