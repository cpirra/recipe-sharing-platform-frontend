<template>
  <nav class="p-4 bg-[#f8fafc] text-black navbar flex flex-wrap items-center justify-between">
    <div class="flex items-center justify-between w-full sm:w-auto">
      <RouterLink to="/" class="mr-4">
        <img class="logo" src="../assets/images/logo.png" alt="Logo" />
      </RouterLink>
      <button @click="toggleMenu" class="block sm:hidden">
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>
    <div
      :class="{ block: showMenu, hidden: !showMenu }"
      class="w-full sm:flex sm:items-center sm:w-auto"
    >
      <div class="flex flex-col sm:flex-row sm:items-center">
        <RouterLink to="/" class="mr-4 pr-4 pl-4">Home</RouterLink>
        <RouterLink to="/about" class="mr-4 pr-4 pl-4">About</RouterLink>
        <div class="relative">
          <button
            @mouseenter="toggleDropdownCuisines(true)"
            @mouseleave="toggleDropdownCuisines(false)"
            class="mr-4 pr-4 pl-4 focus:outline-none"
          >
            Cuisines
          </button>
          <div
            v-if="showDropdownCuisines"
            @mouseenter="toggleDropdownCuisines(true)"
            @mouseleave="toggleDropdownCuisines(false)"
            class="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10"
          >
            <RouterLink
              v-for="cuisine in cuisines"
              :key="cuisine.id"
              :to="'/cuisines/' + cuisine.id"
              class="block px-4 py-2 text-black hover:bg-gray-200"
            >
              {{ cuisine.name }}
            </RouterLink>
          </div>
        </div>
        <div class="relative">
          <button
            @mouseenter="toggleDropdownCategories(true)"
            @mouseleave="toggleDropdownCategories(false)"
            class="mr-4 pr-4 pl-4 focus:outline-none"
          >
            Categories
          </button>
          <div
            v-if="showDropdownCategories"
            @mouseenter="toggleDropdownCategories(true)"
            @mouseleave="toggleDropdownCategories(false)"
            class="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10"
          >
            <RouterLink
              v-for="category in categoriesData"
              :key="category.id"
              :to="'/categories/' + category.name.toLowerCase()"
              class="block px-4 py-2 text-black hover:bg-gray-200"
            >
              {{ category.name }}
            </RouterLink>
          </div>
        </div>
      </div>
      <AuthButtons />
      <div class="flex flex-col sm:flex-row sm:items-center mt-4 sm:mt-0">
        <NotificationBell />
        <div class="user-logged-in flex gap-5 items-center">
          <RouterLink v-if="userStore.user" :to="{ path: '/profile' }">
            <img
              src="../assets/images/profile.png"
              alt="Profile Icon"
              class="profile-icon w-10 h-10 rounded-full"
            />
          </RouterLink>
        </div>
        <input
          class="search-input mt-4 sm:mt-0 sm:ml-4"
          type="text"
          placeholder="Search..."
          v-model="searchQuery"
          @input="handleSearchInput"
        />
      </div>
    </div>
  </nav>
  <RouterView />
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'
import { ref } from 'vue'
import AuthButtons from '@/components/Utils/AuthButtons.vue'
import NotificationBell from '@/components/Utils/NotificationBell.vue'
import axios from 'axios'

const userStore = useUserStore()
const showDropdownCuisines = ref(false)
const showDropdownCategories = ref(false)
const showMenu = ref(false)
const searchQuery = ref('')
const recipes = ref([])

const cuisines = ref([]) // Use ref for reactive array

const fetchCuisines = async () => {
  try {
    const response = await fetch('https://localhost:7036/api/Cuisine')
    if (!response.ok) {
      throw new Error('Failed to fetch cuisines')
    }
    cuisines.value = await response.json()
  } catch (error) {
    console.error('Error fetching cuisines:', error)
  }
}

const categoriesData = ref([])

const fetchCategories = async () => {
  try {
    const response = await fetch('https://localhost:7036/api/Categories')
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    categoriesData.value = await response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

const searchRecipes = async (query) => {
  try {
    const response = await axios.get(
      `https://localhost:7036/api/Elastisearch/search?query=${query}`
    )
    recipes.value = response.data // Update recipes with search results
  } catch (error) {
    console.error('Error searching recipes:', error)
  }
}

const handleSearchInput = () => {
  searchRecipes(searchQuery.value)
}

const toggleDropdownCuisines = (value) => {
  showDropdownCuisines.value = value
  if (showDropdownCuisines.value && cuisines.value.length === 0) {
    fetchCuisines()
  }
}

const toggleDropdownCategories = (value) => {
  showDropdownCategories.value = value
  if (showDropdownCategories.value && categoriesData.value.length === 0) {
    fetchCategories()
  }
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>

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
