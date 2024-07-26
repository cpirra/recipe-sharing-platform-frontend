import { ref } from 'vue'
import { addFavoriteRecipe, removeFavoriteRecipe, getFavoriteRecipes } from '../services/userApi'

export const useFavorite = () => {
  const isFavorite = ref(false)
  const loading = ref(false)
  const favoriteRecipes = ref([])

  const checkIfFavorite = async (userId, recipeId) => {
    try {
      const result = await getFavoriteRecipes(userId)
      favoriteRecipes.value = result
      isFavorite.value = favoriteRecipes.value.some((recipe) => recipe.id === recipeId)
    } catch (error) {
      console.error('Error checking favorite status:', error)
    }
  }

  const toggleFavorite = async (userId, recipeId) => {
    if (loading.value) return
    loading.value = true
    if (isFavorite.value) {
      try {
        await removeFavoriteRecipe(userId, recipeId)
        isFavorite.value = false
        console.log('Favorite removed')
      } catch (error) {
        console.error('Error removing favorite:', error)
      }
    } else {
      try {
        await addFavoriteRecipe(userId, recipeId)
        isFavorite.value = true
        console.log('Favorite added')
      } catch (error) {
        console.error('Error adding favorite:', error)
      }
    }
    loading.value = false
  }

  return {
    isFavorite,
    loading,
    checkIfFavorite,
    toggleFavorite
  }
}
