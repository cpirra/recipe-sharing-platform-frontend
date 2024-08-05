<template>
    <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 class="text-3xl font-bold mb-4 align-center text-center text-red-600">Profile Page</h1>
      <div class="p-4 rounded-lg">
        <div class="profile-image">
          <img :src="userImage" alt="Profile Image">
        </div>
        <div>
          <p class="text-lg font-medium">
            Username: <span class="text-blue-600">{{ userName }}</span>
          </p>
        </div>
        <div class="mb-4 text-center">
          <button @click="handleFollowUser" class="follow-btn">
            Follow
          </button>
          <button @click="handleUnfollowUser" class="unfollow-btn">
            Unfollow
          </button>
        </div>
        <div class="created-recipes">
          <UserCreatedRecipes :userId="userId" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { useUserStore } from '@/stores/userStore'
  import UserCreatedRecipes from '@/components/User/UserCreatedRecipes.vue'
  import { fetchUserData, followUser, unfollowUser } from '@/services/userApi' // Import the necessary functions
  
  const route = useRoute()
  const userStore = useUserStore()
  const userId = ref(route.params.userId)
  const userName = ref('')
  const userImage = ref('@/assets/images/profilepage.png') // Default image
  const followerId = ref(userStore.getUserId) // Get the current user's ID from the store
  
  onMounted(async () => {
    // Fetch user data using userId
    const response = await fetchUserData(userId.value)
    if (response) {
      userName.value = response.username
      userImage.value = response.image || userImage.value
    }
  })
  
  const handleFollowUser = async () => {
    try {
      await followUser(followerId.value, userId.value)
    } catch (error) {
      console.error('Error following user:', error)
    }
  }
  
  const handleUnfollowUser = async () => {
    try {
      await unfollowUser(followerId.value, userId.value)
    } catch (error) {
      console.error('Error unfollowing user:', error)
    }
  }
  </script>
  
  <style scoped>
  .follow-btn, .unfollow-btn {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease, color 0.3s ease;
    margin-right: 0.5rem; /* Add some spacing between buttons */
  }
  
  .follow-btn {
    background-color: #007bff;
    color: white;
  }
  
  .follow-btn:hover {
    background-color: #0056b3;
  }
  
  .unfollow-btn {
    background-color: #dc3545;
    color: white;
  }
  
  .unfollow-btn:hover {
    background-color: #a71d2a;
  }
  </style>
  