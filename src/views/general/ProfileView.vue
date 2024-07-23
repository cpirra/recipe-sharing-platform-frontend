<template>
  <div class="profile">
    <h1>User Profile</h1>
    <div v-if="user">
      <p><strong>Username:</strong> {{ user['https://RecipeAPI/name'] }}</p>
      <p><strong>Email:</strong> {{ user['https://RecipeAPI/email'] }}</p>
      <!-- Add more user details as needed -->
    </div>
    <div v-else>
      <p>Please log in to view your profile.</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useUserStore } from '../../stores/userStore'

const userStore = useUserStore()

const user = computed(() => userStore.user)

// Load user data from local storage when the component is mounted
onMounted(() => {
  userStore.loadUserFromLocalStorage()
  console.log('Loaded user from local storage:', userStore.user) // Debugging statement
})
</script>

<style scoped>
.profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}
</style>
