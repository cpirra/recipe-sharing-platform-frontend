import { defineStore } from 'pinia'
import axios from 'axios'

const apiBaseUrl = 'http://34.17.45.194:8080/api' // No trailing slash

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Accept: 'application/json'
  }
})

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const useRecipeStore = defineStore('recipe', {
  state: () => ({}),
  actions: {
    async postGeneralInfo(data) {
      try {
        const response = await axiosInstance.post('/Recipe', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        return response.data
      } catch (error) {
        console.error('Error posting general info:', error)
        throw error
      }
    },
    async postIngredients(data) {
      try {
        await axiosInstance.post('/Ingredient', data)
      } catch (error) {
        console.error('Error posting ingredients:', error)
        throw error
      }
    },
    async postInstructions(data) {
      try {
        await axiosInstance.post('/Instruction', data)
      } catch (error) {
        console.error('Error posting instructions:', error)
        throw error
      }
    },
    async postNutritionalInfo(data) {
      try {
        await axiosInstance.post('/NutritionalInfo', data)
      } catch (error) {
        console.error('Error posting nutritional info:', error)
        throw error
      }
    },
    async updateRecipe(id, data) {
      try {
        const response = await axiosInstance.put(`/Recipe/${id}`, data)
        return response.data
      } catch (error) {
        console.error('Error updating recipe:', error)
        throw error
      }
    },
    async updateIngredients(id, data) {
      try {
        await axiosInstance.put(`/Ingredient/${id}`, data)
      } catch (error) {
        console.error('Error updating ingredients:', error)
        throw error
      }
    },
    async updateInstructions(id, data) {
      try {
        await axiosInstance.put(`/Instruction/${id}`, data)
      } catch (error) {
        console.error('Error updating instructions:', error)
        throw error
      }
    },
    async updateNutritionalInfo(id, data) {
      try {
        await axiosInstance.put(`/NutritionalInfo/${id}`, data)
      } catch (error) {
        console.error('Error updating nutritional info:', error)
        throw error
      }
    },
    async updateRecipeCategory(data) {
      try {
        await axiosInstance.put('/RecipeCategory', data)
      } catch (error) {
        console.error('Error updating recipe category:', error)
        throw error
      }
    },
    async updateRecipeCuisine(data) {
      try {
        await axiosInstance.put('/RecipeCuisine', data)
      } catch (error) {
        console.error('Error updating recipe cuisine:', error)
        throw error
      }
    }
  }
})
