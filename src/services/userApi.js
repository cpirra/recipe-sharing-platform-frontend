import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://localhost:7036/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const registerUser = (userData) => {
  return apiClient.post('/User/register', userData)
}

export const loginUser = (userData) => {
  return apiClient.post('/User/login', userData)
}

export const addFavoriteRecipe = (userId, recipeId) => {
  const requestBody = {
    userId,
    recipeId
  }

  return apiClient.post('/FavoriteRecipe', requestBody)
}
