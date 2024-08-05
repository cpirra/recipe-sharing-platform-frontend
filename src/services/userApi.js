// src/services/userApi.js

import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
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

export const getRecipe = async (recipeId) => {
  try {
    const response = await apiClient.get(`/Recipe/${recipeId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching recipe:', error)
    throw error
  }
}

export const registerToken = async (token) => {
  try {
    const response = await apiClient.post(
      '/User/register',
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

// Add the new function for fetching notifications
export const getNotifications = async (userId) => {
  try {
    const response = await apiClient.get(`/Notification/user/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching notifications:', error)
    throw error
  }
}
