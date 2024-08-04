<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import RecipeCard from './RecipeCard.vue'

const commentedRecipes = ref([]) // For commented recipes

const fetchCommentedRecipes = async () => {
  try {
    const response = await axios.get('https://localhost:7036/api/TopRecipe/top-by-reviews?page=1&pageSize=4')
    console.log(response.data); // Check the data structure here
    commentedRecipes.value = response.data.slice(0, 3) // Limit to 4 recipes
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
        :image="recipe.imageUrls"
        :categories="recipe.categories || []"
        :cuisines="recipe.cuisines || []"
        :description="recipe.description"
      />
    </div>
    
  </div>
</template>


