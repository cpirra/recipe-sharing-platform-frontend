<script setup>
import { ref } from 'vue'
import RecipeCard from '@/components/Recipe/RecipeCard.vue'

const recipeData = ref({
  id: 1,
  image: '/src/assets/images/chickenNoodle.jpg',
  categories: ['Dessert', 'Vegan'],
  cuisines: ['Italian', 'French'],
  title: 'Chocolate Cake'
})
</script>

<template>
  <div>
    <RecipeCard
      :image="recipeData.image"
      :categories="recipeData.categories"
      :cuisines="recipeData.cuisines"
      :title="recipeData.title"
    />
  </div>
</template>

<style scoped>
/* Add any parent view specific styles here */
</style>
