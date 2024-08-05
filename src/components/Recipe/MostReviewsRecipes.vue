<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import RecipeCard from './RecipeCard.vue'

const reviewedRecipes = ref([]) // For reviewed recipes

const fetchReviewedRecipes = async () => {
  try {
    const response = await axios.get('http://34.17.45.194:8080/api/TopRecipe/top-by-reviews?page=1&pageSize=4')
    console.log(response.data); // Check the data structure here
    reviewedRecipes.value = response.data.slice(0, 3) // Limit to 4 recipes
  } catch (error) {
    console.error('Error fetching reviewed recipes:', error)
  }
}

onMounted(() => {
  fetchReviewedRecipes()
})
</script>

<template>
  <div>
    <!-- REVIEWED RECIPE LISTING -->
    <RouterLink to="/recipes/reviewed">
      <h1 class="heading-name">Reviewed Recipes</h1>
    </RouterLink>
    <div class="recipe-list">
      <RecipeCard
        v-for="recipe in reviewedRecipes"
        :key="recipe.id"
        :id="recipe.id"
        :name="recipe.name"
        :image="recipe.imageUrls"
        :categories="recipe.categories || []"
        :cuisines="recipe.cuisines || []"
        :description="recipe.description"
      />
    </div>
  </div>
</template>


