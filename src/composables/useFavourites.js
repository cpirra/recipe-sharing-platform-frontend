// src/composables/useFavorites.js
import { ref, onMounted } from 'vue'
import { useFavoriteStore } from '../stores/favoriteStore'

export function useFavorites() {
  const favoriteStore = useFavoriteStore()
  const loading = ref(false)
  const error = ref(null)

  const fetchFavorites = async () => {
    loading.value = true
    try {
      await favoriteStore.fetchFavoriteRecipes()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  const addFavorite = async (recipeId) => {
    try {
      await favoriteStore.addFavorite(recipeId)
    } catch (err) {
      error.value = err
    }
  }

  const removeFavorite = async (recipeId) => {
    try {
      await favoriteStore.removeFavorite(recipeId)
    } catch (err) {
      error.value = err
    }
  }

  const isFavorite = (recipeId) => {
    return favoriteStore.isFavorite(recipeId)
  }

  onMounted(async () => {
    if (favoriteStore.favoriteRecipes.length === 0) {
      await fetchFavorites()
    }
  })

  return {
    favoriteRecipes: favoriteStore.favoriteRecipes,
    loading,
    error,
    fetchFavorites,
    addFavorite,
    removeFavorite,
    isFavorite
  }
}
