// src/composables/useFavorite.js
import { ref } from 'vue'
import { addFavoriteRecipe } from '../services/userApi'

export const useFavorite = () => {
  const isFavorite = ref(false)

  const toggleFavorite = async (userId, recipeId) => {
    isFavorite.value = !isFavorite.value
    if (isFavorite.value) {
      try {
        const result = await addFavoriteRecipe(userId, recipeId)
        console.log('Favorite added:', result)
      } catch (error) {
        console.error('Error adding favorite:', error)
        isFavorite.value = !isFavorite.value // Revert state if error
      }
    }
  }

  return {
    isFavorite,
    toggleFavorite
  }
}
