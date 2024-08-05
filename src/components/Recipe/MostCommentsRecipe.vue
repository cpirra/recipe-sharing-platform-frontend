<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import RecipeCard from './RecipeCard.vue'

// Use environment variables
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

const commentedRecipes = ref([]) // For commented recipes

const fetchCommentedRecipes = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}TopRecipe/top-by-reviews?page=1&pageSize=4`)
    console.log('Response:', response.data); // Check the data structure here

    commentedRecipes.value = response.data.map(recipe => ({
      id: recipe.id,
      name: recipe.name,
      image: recipe.imageUrls?.[0]?.url || '', // Safely access imageUrls
      categories: recipe.categories || [], // Ensure categories is an array
      cuisines: recipe.cuisines || [], // Ensure cuisines is an array
      description: recipe.description || '' // Ensure description is a string
    })).slice(0, 3) // Limit to 3 recipes
  } catch (error) {
    console.error('Error fetching commented recipes:', error)
  }
}

onMounted(() => {
  fetchCommentedRecipes()
})
</script>

<template>
  <div>
    <!-- COMMENTED RECIPE LISTING -->
    <RouterLink to="/recipes/commented">
      <h1 class="heading-name">Most Commented Recipes</h1>
    </RouterLink>
    <div class="recipe-list">
      <RecipeCard
        v-for="recipe in commentedRecipes"
        :key="recipe.id"
        :id="recipe.id"
        :name="recipe.name"
        :image="recipe.image"
        :categories="recipe.categories"
        :cuisines="recipe.cuisines"
        :description="recipe.description"
      />
    </div>
  </div>
</template>

<style scoped>
/* Styling for the commented recipes component */
.recipe-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: space-around;
  padding: 2% 10%;
  color: black;
}

.heading-name {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  font-size: 20px;
  font-weight: bolder;
  color: black;
}
</style>
