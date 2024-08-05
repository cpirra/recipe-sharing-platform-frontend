<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import RecipeCard from './RecipeCard.vue'

const favoriteRecipes = ref([]) // For favorite recipes

const fetchFavoriteRecipes = async () => {
  try {
    const response = await axios.get('http://34.17.45.194:8080/api/TopRecipe/top-by-favorite?page=1&pageSize=4')
    console.log(response.data); // Check the data structure here
    favoriteRecipes.value = response.data.slice(0, 2) // Limit to 4 recipes
  } catch (error) {
    console.error('Error fetching favorite recipes:', error)
  }
}

onMounted(() => {
  fetchFavoriteRecipes()
})
</script>

<template>
  <RouterLink to="/recipes/favourites">
        <h1 class="heading-name">The Most Favorite Recipes</h1>
    </RouterLink>
  <div class="favourites">
    <!-- FAVORITE RECIPE LISTING -->
    <div class="recipe-list">
      <RecipeCard
        v-for="recipe in favoriteRecipes"
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

<style>
.favourites{
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>