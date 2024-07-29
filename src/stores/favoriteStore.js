// src/stores/favoriteStore.js
import { defineStore } from 'pinia'
import { getFavoriteRecipes, addFavoriteRecipe, removeFavoriteRecipe } from '../services/userApi'

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    favoriteRecipes: new Set(),
    loading: false,
    error: null
  }),
  actions: {
    async fetchFavoriteRecipes() {
      this.loading = true
      try {
        const recipes = await getFavoriteRecipes()
        if (recipes && Array.isArray(recipes)) {
          this.favoriteRecipes = new Set(recipes.map((item) => item.recipeId))
        } else {
          console.error('Unexpected response format:', recipes)
        }
      } catch (error) {
        this.error = error
        console.error('Failed to fetch favorite recipes', error)
      } finally {
        this.loading = false
      }
    },
    async addFavorite(recipeId) {
      try {
        await addFavoriteRecipe(recipeId)
        this.favoriteRecipes.add(recipeId)
      } catch (error) {
        this.error = error
        console.error('Failed to add favorite recipe', error)
      }
    },
    async removeFavorite(recipeId) {
      try {
        await removeFavoriteRecipe(recipeId)
        this.favoriteRecipes.delete(recipeId)
      } catch (error) {
        this.error = error
        console.error('Failed to remove favorite recipe', error)
      }
    },
    isFavorite(recipeId) {
      return this.favoriteRecipes.has(recipeId)
    }
  }
})
