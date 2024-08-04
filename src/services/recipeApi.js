import client, { gql } from '../utils/apollo' // Ensure correct path and import

const BASE_URL = 'https://localhost:7036/api'

const getToken = () => {
  return localStorage.getItem('auth_token')
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
  const GET_RECIPE_BY_ID = gql`
    query recipe {
      recipeById(id: ${id}) {
        description
        id
        imageUrls
        name
        videoUrls
        cuisineDetails {
          name
          id
        }
        categoryDetails {
          name
          id
        }
        ingredients {
          name
          quantity
        }
        instructions {
          description
          stepNumber
        }
        user {
          username
          id
        }
        nutritionalInfo {
          calories
          fat
          carbohydrates
          protein
          sugar
          fiber
          sodium
        }
      }
    }
  `

  try {
    const { data } = await client.query({
      query: GET_RECIPE_BY_ID
    })
    return data.recipeById
  } catch (error) {
    console.error('Error fetching recipe:', error)
    return null
  }
}

export const fetchReviewsByRecipeId = async (id, page = 1, size = 5) => {
  try {
    const reviews = await apiCall(`/Review/by-recipe/${id}?page=${page}&size=${size}`)
    return reviews || [] // Return an empty array if reviews are null
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return [] // Return an empty array in case of an error
  }
}

export const submitReview = async (review) => {
  return await apiCall(`/Review`, {
    method: 'POST',
    body: JSON.stringify(review)
  })
}

export const fetchCategories = async () => {
  return await apiCall('/Categories')
}

export const fetchCuisines = async () => {
  return await apiCall('/Cuisine')
}

export const postRecipeCategory = async (data) => {
  return await apiCall('/RecipeCategory', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export const postRecipeCuisine = async (data) => {
  return await apiCall('/RecipeCuisine', {
    method: 'POST',
    body: JSON.stringify(data)
  })
}

export async function updateRecipe(id, data) {
  const response = await fetch(`https://localhost:7036/api/Recipe/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return await response.json()
}

export async function updateRecipeCategory(data) {
  const response = await fetch(`https://localhost:7036/api/RecipeCategory`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return await response.json()
}

export async function updateRecipeCuisine(data) {
  const response = await fetch(`https://localhost:7036/api/RecipeCuisine`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return await response.json()
}

// New function to submit a report
export const submitReport = async (report) => {
  return await apiCall('/Reports', {
    method: 'POST',
    body: JSON.stringify(report)
  })
}
