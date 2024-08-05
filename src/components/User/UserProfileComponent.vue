<script setup>
import { computed, onMounted, ref } from 'vue'
import { useFavoriteStore } from '@/stores/favoriteStore'
import { useUserStore } from '@/stores/userStore'
import RecipeCard from '@/components/RecipeCard.vue'
import { getFavoriteRecipes, getRecipe } from '@/services/userApi'

const userStore = useUserStore()
const favoriteStore = useFavoriteStore()
const recipes = ref([])
const favoriteRecipeIds = ref([])

const user = computed(() => userStore.user)

onMounted(async () => {
  if (user.value) {
    try {
      const favoriteData = await getFavoriteRecipes()
      console.log('Favorite Recipes:', favoriteData)
      favoriteRecipeIds.value = favoriteData.map(item => item.recipeId)
      
      recipes.value = await Promise.all(
        favoriteRecipeIds.value.map(id => getRecipe(id))
      )
      console.log('Recipes:', recipes.value)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
})
</script>

<template>
  <div v-if="user">
    <h2 class="text-2xl font-bold mb-4">Your Favorite Recipes</h2>
    <div class="flex flex-wrap gap-4">
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

