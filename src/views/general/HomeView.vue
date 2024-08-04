<!-- HomeView.vue -->
<script setup>
import { ref } from 'vue'
import InstructionModal from '@/components/User/InstructionModal.vue' // Adjust path as necessary
import '@/assets/styles/toprecipes.css'
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
</script>

<template>
  <div>
    <!-- Button to trigger the modal -->
    <button @click="showModal = true" class="fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded">
      Show Instructions
    </button>

    <!-- Instruction Modal -->
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
