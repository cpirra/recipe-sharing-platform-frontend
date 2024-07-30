// src/services/recipeApi.js

const BASE_URL = 'https://localhost:7036/api'

const getToken = () => {
  return localStorage.getItem('token')
}

const apiCall = async (endpoint, options = {}) => {
  const token = getToken()
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Error during API call:', error)
    return null
  }
}

export const fetchRecipeById = async (id) => {
  return await apiCall(`/GetRecipe/${id}`)
}
