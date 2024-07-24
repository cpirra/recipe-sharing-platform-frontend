<template>
  <div>
    <div class="recipe-list flex flex-wrap justify-center gap-4">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.title"
        :image="recipe.image"
        :category="recipe.category"
        :title="recipe.title"
        :ratings="recipe.ratings"
      />
    </div>
    <div class="recipe-list flex flex-wrap justify-center gap-4">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.title"
        :image="recipe.image"
        :category="recipe.category"
        :title="recipe.title"
        :ratings="recipe.ratings"
      />
    </div>
    <div class="recipe-list flex flex-wrap justify-center gap-4">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.title"
        :image="recipe.image"
        :category="recipe.category"
        :title="recipe.title"
        :ratings="recipe.ratings"
      />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import RecipeCard from '../../components/Recipe/RecipeCard.vue'

const recipes = ref([])

const loadRecipes = async () => {
  try {
    const response = await fetch('/data/recipeCard.json')
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    recipes.value = data
  } catch (error) {
    console.error('Error fetching recipes:', error)
  }
}

onMounted(() => {
  loadRecipes()
})
</script>

<style scoped>
.recipe-list {
  padding: 16px;
}
</style>
