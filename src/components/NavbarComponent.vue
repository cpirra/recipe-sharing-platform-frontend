<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'

const userStore = useUserStore()

const logout = () => {
  userStore.logout()
}
</script>

<template>
  <!--TO DO
  Fix the navbar with tailwind
  Besarta-->
  <nav class="p-4 bg-gray-800 text-white">
    <RouterLink to="/" class="mr-4">Home</RouterLink>
    <RouterLink to="/about" class="mr-4">About</RouterLink>
    <RouterLink to="/profile" class="mr-4">Profile</RouterLink>
    <RouterLink v-if="!userStore.user" to="/login" class="mr-4">Login</RouterLink>
    <button v-else @click="logout" class="logout-button">Logout</button>
  </nav>
  <RouterView />
</template>

<style scoped>
.logout-button {
  @apply bg-red-500 text-white px-4 py-2 rounded;
}
</style>
