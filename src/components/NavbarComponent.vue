<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'
import { ref } from 'vue'

const userStore = useUserStore()
const showDropdownCuisines = ref(false)
const showDropdownCategories = ref(false)
const showMenu = ref(false)

const cuisines = [
  "Italian", "Indian", "Chinese", "Mexican", "American", "French", "Greek", "Turkish", "Spanish", "Korean", "Brazilian"
]

const categories = [
  "Pasta", "Dessert", "Baking", "Vegetarian", "Vegan", "Seafood", "Grilling", "Breakfast", "Brunch", "Holiday"
]

const logout = () => {
  userStore.logout()
}

const toggleDropdownCuisines = () => {
  showDropdownCuisines.value = !showDropdownCuisines.value
}

const toggleDropdownCategories = () => {
  showDropdownCategories.value = !showDropdownCategories.value
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <nav class="p-4 bg-[#f8fafc] text-black navbar flex flex-wrap items-center justify-between">
    <div class="flex items-center justify-between w-full sm:w-auto">
      <RouterLink to="/" class="mr-4"><img class="logo" src="../assets/images/logo.png" alt="Logo"></RouterLink>
      <button @click="toggleMenu" class="block sm:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
    <div :class="{'block': showMenu, 'hidden': !showMenu}" class="w-full sm:flex sm:items-center sm:w-auto">
      <div class="flex flex-col sm:flex-row sm:items-center">
        <RouterLink to="/" class="mr-4 pr-4 pl-4">Home</RouterLink>
        <RouterLink to="/about" class="mr-4 pr-4 pl-4">About</RouterLink>
        <div class="relative">
          <button @click="toggleDropdownCuisines" class="mr-4 pr-4 pl-4 focus:outline-none">Cuisines</button>
          <div v-if="showDropdownCuisines" class="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <RouterLink v-for="cuisine in cuisines" :key="cuisine" :to="'/cuisines/' + cuisine.toLowerCase()" class="block px-4 py-2 text-black hover:bg-gray-200">
              {{ cuisine }}
            </RouterLink>
          </div>
        </div>
        <div class="relative">
          <button @click="toggleDropdownCategories" class="mr-4 pr-4 pl-4 focus:outline-none">Categories</button>
          <div v-if="showDropdownCategories" class="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <RouterLink v-for="category in categories" :key="category" :to="'/categories/' + category.toLowerCase()" class="block px-4 py-2 text-black hover:bg-gray-200">
              {{ category }}
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row sm:items-center mt-4 sm:mt-0">
        <RouterLink v-if="!userStore.user" to="/login" class="mr-4 pr-4 pl-4">Login</RouterLink>
        <button v-else @click="logout" class="logout-button">Logout</button>
        <input class="search-input mt-4 sm:mt-0 sm:ml-4" type="text" placeholder="Pasta">
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>
.navbar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.logo {
  width: 50px;
  height: auto;
}
.search-input {
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.logout-button {
  @apply bg-red-500 text-white px-4 py-2 rounded;
}
@media (min-width: 640px) {
  .navbar {
    flex-direction: row;
    align-items: center;
  }
  .navbar div {
    width: auto;
    margin-top: 0;
  }
  .navbar img {
    margin-bottom: 0;
  }
}
</style>
