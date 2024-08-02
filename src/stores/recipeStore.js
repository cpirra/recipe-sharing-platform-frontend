// stores/recipeStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

const apiBaseUrl = 'https://localhost:7036/api/'

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
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
        const response = await axiosInstance.post('Recipe', data)
        return response.data
      } catch (error) {
        console.error('Error posting general info:', error)
        throw error
      }
    },
    async postIngredients(data) {
      try {
        await axiosInstance.post('Ingredient', data)
      } catch (error) {
        console.error('Error posting ingredients:', error)
        throw error
      }
    },
    async postInstructions(data) {
      try {
        await axiosInstance.post('Instruction', data)
      } catch (error) {
        console.error('Error posting instructions:', error)
        throw error
      }
    },
    async postNutritionalInfo(data) {
      try {
        await axiosInstance.post('NutritionalInfo', data)
      } catch (error) {
        console.error('Error posting nutritional info:', error)
        throw error
      }
    }
  }
})
