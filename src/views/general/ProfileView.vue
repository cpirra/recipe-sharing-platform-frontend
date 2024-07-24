<script setup>
import { useUserStore } from '../../stores/userStore'

const userStore = useUserStore()
const userName = userStore.getUser
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-bold mb-4">Profile Page</h1>
    <div class="bg-gray-100 p-4 rounded-lg">
      <p class="text-lg font-medium">
        Username: <span class="text-blue-600">{{ userName }}</span>
      </p>
    </div>
  </div>
</template>

<style scoped>
/* Additional scoped styles can go here if needed */
</style>
