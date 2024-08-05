<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import RecipeCard from './RecipeCard.vue'

const trendyRecipes = ref([]) // For trendy recipes

const fetchTrendyRecipes = async () => {
  try {
    const response = await axios.get('https://localhost:7036/api/TopRecipe/trendy?count=4')
    console.log(response.data); // Check the data structure here

    trendyRecipes.value = response.data.map(recipe => ({
      id: recipe.id,
      name: recipe.name,
      image: recipe.imageUrls.length > 0 ? recipe.imageUrls[0].url : '', // Ensure correct mapping for imageUrls
      categories: recipe.categories || [], // Ensure categories is an array
      cuisines: recipe.cuisines || [], // Ensure cuisines is an array
      description: recipe.description || '' // Add description if needed
    })).slice(0, 3) // Limit to 3 recipes
  } catch (error) {
    console.error('Error fetching trendy recipes:', error)
  }
}

onMounted(() => {
  fetchTrendyRecipes()
})
</script>

<template>
  <div>
    <!-- TRENDY RECIPE LISTING -->
    <RouterLink to="/recipes/trendy">
      <h1 class="heading-name">Trendy Recipes</h1>
    </RouterLink>
    <div class="recipe-list">
      <RecipeCard
        v-for="recipe in trendyRecipes"
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

