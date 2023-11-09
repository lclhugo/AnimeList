<template>
  <div>
    <TheNavbar />
    <main class="min-h-screen">
      <CenterLayout>
        <div v-motion-pop-visible-once class="text-center hero-content">
          <div class="max-w-md prose">
            <h1
              class="mb-4 text-6xl font-extrabold text-transparent title bg-clip-text bg-gradient-to-r from-primary from-10 via-30% to-secondary to-90%"
            >
              Error {{ error.statusCode }}
            </h1>
            <p class="py-6">
              <strong>{{ error.message }}</strong>
            </p>
            <p>It looks like something broke.</p>
            <Button class="btn btn-primary" @click="handleError">Go back home</Button>
          </div>
        </div>
      </CenterLayout>
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: '/' });
</script>
