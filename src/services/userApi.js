// src/services/userApi.js
import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://localhost:7036/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

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
    return response.data
  } catch (error) {
    console.error('Error fetching favorite recipes:', error)
    throw error
  }
}

export const registerToken = async (token) => {
  try {
    const response = await apiClient.post(
      '/Sample/Register',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*'
        }
      }
    )
    return response.data
  } catch (error) {
    console.error('Error registering token:', error)
    throw error
  }
}
