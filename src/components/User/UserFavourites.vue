<script setup>
import { computed, onMounted, ref } from 'vue'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useUserStore } from '@/stores/userStore'
import RecipeCard from '@/components/Recipe/RecipeCard.vue'
import { getFavoriteRecipes, getRecipe } from '@/services/userApi'

const userStore = useUserStore()
const favoriteStore = useFavoriteStore()
const recipes = ref([]) // Store detailed recipes here

const user = computed(() => userStore.user)
const favoriteRecipeIds = ref([]) // Store favorite recipe IDs here

onMounted(async () => {
  if (user.value) {
    // Fetch favorite recipe IDs
    const favoriteData = await getFavoriteRecipes()
    favoriteRecipeIds.value = favoriteData.map(item => item.recipeId)
    
    // Fetch detailed information for each favorite recipe
    recipes.value = await Promise.all(
      favoriteRecipeIds.value.map(id => getRecipe(id))
    )
  }
})
</script>

<template>
  <div v-if="user">
    <h2 class="text-2xl font-bold mb-4 text-center text-red-500">Your Favorite Recipes</h2>
    <div class="flex flex-wrap gap-4 justify-evenly align-center py-10">
      <RecipeCard
        v-for="recipe in recipes"
        :key="recipe.id"
        :imageUrls="recipe.imageUrls"
        :categories="recipe.categories"
        :cuisines="recipe.cuisines"
        :name="recipe.name"
        :id="recipe.id"
      />
    </div>
  </div>
  <div v-else>
    <p>Please log in to view your favorite recipes.</p>
  </div>
</template>

<style scoped>
/* Additional styling if needed */
</style>
