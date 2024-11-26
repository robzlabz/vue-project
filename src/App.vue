<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()
const $route = useRoute()
</script>

<template>
  <RouterView />
</template>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

body {
  @apply m-0 p-0 overflow-x-hidden;
}
</style>

<style scoped>
@media (min-width: 1024px) {
  header {
    @apply flex items-center pr-8;
  }

  .logo {
    @apply mr-8;
  }

  header .wrapper {
    @apply flex flex-wrap items-start;
  }

  nav {
    @apply text-left -ml-4 text-base pt-4 mt-4;
  }
}
</style>
