<script setup>
import { useAuth } from './composables/useAuth'
import { useFavorites } from './composables/useFavourites'

useAuth()

useFavorites()
</script>

<template>
  <div class="main">
    <RouterView />
  </div>
</template>

<style scoped></style>
