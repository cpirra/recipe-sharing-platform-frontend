<script setup>
import { ref } from 'vue'
import RecipeCard from '@/components/Recipe/RecipeCard.vue'

const recipes = [
  {
    id: 7,
    title: 'Classic Margherita Pizza',
    image: 'https://example.com/images/margherita-pizza.jpg',
    categories: ['Appetizers'],
    cuisines: ['Italian']
  },
  {
    id: 8,
    title: 'Spaghetti Carbonara',
    image: 'https://example.com/images/spaghetti-carbonara.jpg',
    categories: ['Main Course'],
    cuisines: ['Italian']
  }
]
</script>

<template>
  <div class="recipe-list">
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe.id"
      :id="recipe.id"
      :title="recipe.title"
      :image="recipe.image"
      :categories="recipe.categories"
      :cuisines="recipe.cuisines"
    />
  </div>
</template>

<style scoped>
.recipe-list {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
