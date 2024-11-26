<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()
const $route = useRoute()
</script>

<template>
  <RouterView />
</template>