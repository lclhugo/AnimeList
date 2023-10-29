<template>
  <div>
    <CenterLayout>
      <h2>{{ errorMessage }}</h2>
      <NuxtLink class="btn btn-accent" :to="backLink">Go back to {{ backText }}</NuxtLink>
    </CenterLayout>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    errorMessage: {
      type: String,
      default: 'An error occurred',
    },
    backLink: {
      type: String,
      default: '/',
    },
    backText: {
      type: String,
      default: 'Home',
    },
  },
});
</script>
