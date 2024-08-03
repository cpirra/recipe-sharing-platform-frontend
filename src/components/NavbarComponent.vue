<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/userStore.js';
import { fetchCuisines, fetchCategories } from '@/services/navApi.js';
import { useRouter } from 'vue-router';
import AuthButtons from '@/components/Utils/AuthButtons.vue';
import { useSearch } from '@/composables/useSearch';

const { searchQuery } = useSearch();
const userStore = useUserStore();
const showDropdownCuisines = ref(false);
const showDropdownCategories = ref(false);
const showMenu = ref(false);
const cuisines = ref([]);
const categoriesData = ref([]);
const router = useRouter();

const loadCuisines = async () => {
  try {
    cuisines.value = await fetchCuisines();
  } catch (error) {
    console.error('Error loading cuisines:', error);
  }
};

const loadCategories = async () => {
  try {
    categoriesData.value = await fetchCategories();
  } catch (error) {
    console.error('Error loading categories:', error);
  }
};

const toggleDropdownCuisines = (value) => {
  showDropdownCuisines.value = value;
  if (showDropdownCuisines.value && cuisines.value.length === 0) {
    loadCuisines();
  }
};

const toggleDropdownCategories = (value) => {
  showDropdownCategories.value = value;
  if (showDropdownCategories.value && categoriesData.value.length === 0) {
    loadCategories();
  }
};

const toggleMenu = () => {
  showMenu.value = !showMenu.value;
};

const handleSearchInput = () => {
  router.push({ path: '/', query: { search: searchQuery.value } });
};
</script>


<template>
  <nav class="p-4 bg-[#f8fafc] text-black navbar flex flex-wrap items-center justify-between">
    <div class="flex items-center justify-between w-full sm:w-auto">
      <RouterLink to="/" class="mr-4">
        <img class="logo" src="../assets/images/logo.png" alt="Logo" />
      </RouterLink>
      <button @click="toggleMenu" class="block sm:hidden">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>
    <div :class="{ block: showMenu, hidden: !showMenu }" class="w-full sm:flex sm:items-center sm:w-auto">
      <div class="flex flex-col sm:flex-row sm:items-center">
        <RouterLink to="/" class="mr-4 pr-4 pl-4">Home</RouterLink>
        <RouterLink to="/about" class="mr-4 pr-4 pl-4">About</RouterLink>
        <div class="relative">
          <button @mouseenter="toggleDropdownCuisines(true)" @mouseleave="toggleDropdownCuisines(false)" class="mr-4 pr-4 pl-4 focus:outline-none">
            Cuisines
          </button>
          <div v-if="showDropdownCuisines" @mouseenter="toggleDropdownCuisines(true)" @mouseleave="toggleDropdownCuisines(false)" class="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <RouterLink v-for="cuisine in cuisines" :key="cuisine.id" :to="'/cuisines/' + cuisine.id" class="block px-4 py-2 text-black hover:bg-gray-200">
              {{ cuisine.name }}
            </RouterLink>
          </div>
        </div>
        <div class="relative">
          <button @mouseenter="toggleDropdownCategories(true)" @mouseleave="toggleDropdownCategories(false)" class="mr-4 pr-4 pl-4 focus:outline-none">
            Categories
          </button>
          <div v-if="showDropdownCategories" @mouseenter="toggleDropdownCategories(true)" @mouseleave="toggleDropdownCategories(false)" class="absolute mt-2 w-48 bg-white rounded-md shadow-lg z-10">
            <RouterLink v-for="category in categoriesData" :key="category.id" :to="'/categories/' + category.id" class="block px-4 py-2 text-black hover:bg-gray-200">
              {{ category.name }}
            </RouterLink>
          </div>
        </div>
      </div>
      <AuthButtons />
      <div class="flex flex-col sm:flex-row sm:items-center mt-4 sm:mt-0">
      <div class="user-logged-in flex gap-5 items-center">
        <RouterLink v-if="userStore.user" :to="{ path: '/profile' }">
          <img src="../assets/images/profile.png" alt="Profile Icon" class="profile-icon w-10 h-10 rounded-full" />
        </RouterLink>
      </div>
      <input
        v-model="searchQuery"
        @input="handleSearchInput"
        class="search-input mt-4 sm:mt-0 sm:ml-4"
        type="text"
        placeholder="Search..."
      />
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
