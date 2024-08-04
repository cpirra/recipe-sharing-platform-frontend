<template>
  <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-3xl font-bold mb-4 align-center color-red text-center">Profile Page</h1>
    <div class="p-4 rounded-lg">
      <div class="profile-image">
        <img src="@/assets/images/profilepage.png" alt="Profile Image">
      </div>
      <div>
        <p class="text-lg font-medium">
          Username: <span class="text-blue-600">{{ userName }}</span>
        </p>
      </div>
      <div class="created-recipes">
        <UserCreatedRecipes />
      </div>
      <div class="favourites">
        <UserFavourites />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import UserRecipes from '@/components/User/UserRecipes.vue'
import UserFavourites from '@/components/User/UserFavourites.vue'
import UserCreatedRecipes from '@/components/User/UserRecipes.vue'

const userStore = useUserStore()
const userName = userStore.getUser?.username // Use the getter for user
</script>

<style scoped>
/* Add any necessary styling for the profile page */
</style>
