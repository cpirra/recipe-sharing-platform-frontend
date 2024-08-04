<template>
    <div class="created-recipes">
      <h2 class="text-xl font-semibold mb-2">Created Recipes</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <RecipeCard
          v-for="recipe in createdRecipes"
          :key="recipe.id"
          :imageUrls="recipe.imageUrls"
          :categories="recipe.categories"
          :cuisines="recipe.cuisines"
          :name="recipe.name"
          :id="recipe.id"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { useUserStore } from '@/stores/userStore'
  import RecipeCard from '@/components/Recipe/RecipeCard.vue'
  import { fetchUserCreatedRecipes } from '@/services/recipeApi'
  
  const userStore = useUserStore()
  const createdRecipes = ref([])
  
  const fetchRecipes = async () => {
    const userId = userStore.getUserId
    if (userId) {
      createdRecipes.value = await fetchUserCreatedRecipes(userId)
    }
  }
  
  onMounted(fetchRecipes)
  </script>
  
  <style scoped>
  /* Add any necessary styling for the created recipes section */
  </style>
  