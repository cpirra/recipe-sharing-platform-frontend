// src/services/userApi.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://localhost:7036/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const registerUser = (userData) => {
  return apiClient.post('/User/register', userData)
}

export const loginUser = (userData) => {
  return apiClient.post('/User/login', userData)
}

export const addFavoriteRecipe = (recipeId) => {
  const requestBody = { recipeId }
  return apiClient.post('/FavoriteRecipe', requestBody)
}

export const removeFavoriteRecipe = (recipeId) => {
  return apiClient.delete(`/FavoriteRecipe/${recipeId}`)
}

export const getFavoriteRecipes = async () => {
  try {
    const response = await apiClient.get('/FavoriteRecipe')
    console.log('API Response:', response.data) // Log the API response
    return response.data
  } catch (error) {
    console.error('Error fetching favorite recipes:', error)
    throw error
  }
}
