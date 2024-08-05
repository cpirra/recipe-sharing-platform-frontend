<script setup>
import { ref } from 'vue';
import InstructionModal from '@/components/User/InstructionModal.vue';
import '@/assets/styles/toprecipes.css';
import NewsComponent from '@/components/NewsComponent.vue';
import LatestRecipes from '@/components/Recipe/LatestRecipes.vue';
import TrenyRecipes from '@/components/Recipe/TrendyRecipes.vue';
import CookingClasses from '@/components/Recipe/CookingClasses.vue';
import FavouritesRecipes from '@/components/Recipe/FavouritesRecipes.vue';
import MostReviewsRecipes from '@/components/Recipe/MostReviewsRecipes.vue';
import MostCommentsRecipe from '@/components/Recipe/MostCommentsRecipe.vue';
import SearchRecipe from '@/components/Recipe/SearchRecipe.vue';
import BePartOfUs from '@/components/Recipe/BePartOfUs.vue';

const showModal = ref(false);
const isDarkTheme = ref(false);

function toggleTheme() {
  isDarkTheme.value = !isDarkTheme.value;
  document.documentElement.classList.toggle('dark-theme', isDarkTheme.value);
}
</script>

<template>
  <div :class="{ 'dark-theme': isDarkTheme }">
    <button @click="showModal = true" class="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded">
      Show Instructions
    </button>
    <button @click="toggleTheme" class="fixed bottom-4 left-4 bg-green-500 text-white px-4 py-2 rounded">
      Dark Theme
    </button>
    <InstructionModal
      :isVisible="showModal"
      @update:isVisible="showModal = $event"
    />

    <!-- Other Components -->
    <SearchRecipe />
    <NewsComponent />
    <TrenyRecipes :limit="4" :showPagination="false" />
    <LatestRecipes :limit="4" :showPagination="false" />
    <CookingClasses />
    <FavouritesRecipes />
    <MostReviewsRecipes />
    <MostCommentsRecipe />
    <BePartOfUs/>
  </div>
</template>
 

<style>

/* Add these to your main CSS or SCSS file */

:root {
  --background-color: #ffffff;
  --text-color: #000000;
}

.dark-theme {
  --background-color: #121212;
  --text-color: #ffffff;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}
</style>