import axios from 'axios';
import client, { gql } from '../utils/apollo'; // Ensure correct path and import

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getToken = () => {
  return localStorage.getItem('auth_token');
};

const apiCall = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error during API call:', error);
    return null;
  }
};

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const loginUser = (userData) => {
  return apiClient.post('/User/login', userData);
};

export const addFavoriteRecipe = (recipeId) => {
  const requestBody = { recipeId };
  return apiClient.post('/FavoriteRecipe', requestBody);
};

export const removeFavoriteRecipe = (recipeId) => {
  return apiClient.delete(`/FavoriteRecipe/${recipeId}`);
};

export const getFavoriteRecipes = async () => {
  try {
    const response = await apiClient.get('/FavoriteRecipe');
    return response.data;
  } catch (error) {
    console.error('Error fetching favorite recipes:', error);
    throw error;
  }
};

export const registerToken = async (token) => {
  try {
    const response = await apiClient.post(
      '/User/register',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: '*/*',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error registering token:', error);
    throw error;
  }
};

// export const fetchRecipeById = async (id) => {
//   const GET_RECIPE_BY_ID = gql`
//     query recipe($id: ID!) {
//       recipeById(id: $id) {
//         description
//         id
//         imageUrls
//         name
//         videoUrls
//         cuisineDetails {
//           name
//           id
//         }
//         categoryDetails {
//           name
//           id
//         }
//         ingredients {
//           name
//           quantity
//         }
//         instructions {
//           description
//           stepNumber
//         }
//         user {
//           username
//           id
//         }
//         nutritionalInfo {
//           calories
//           fat
//           carbohydrates
//           protein
//           sugar
//           fiber
//           sodium
//         }
//       }
//     }
//   `;

//   try {
//     const { data } = await client.query({
//       query: GET_RECIPE_BY_ID,
//       variables: { id },
//     });
//     return data.recipeById;
//   } catch (error) {
//     console.error('Error fetching recipe:', error);
//     return null;
//   }
// };

export const fetchReviewsByRecipeId = async (id, page = 1, size = 5) => {
  try {
    const reviews = await apiCall(`/Review/by-recipe/${id}?page=${page}&size=${size}`);
    return reviews || []; // Return an empty array if reviews are null
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return []; // Return an empty array in case of an error
  }
};

export const submitReview = async (review) => {
  return await apiCall(`/Review`, {
    method: 'POST',
    body: JSON.stringify(review),
  });
};

export const fetchCategories = async () => {
  return await apiCall('Categories');
};

export const fetchCuisines = async () => {
  return await apiCall('Cuisine');
};

export const postRecipeCategory = async (data) => {
  return await apiCall('RecipeCategory', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const postRecipeCuisine = async (data) => {
  return await apiCall('RecipeCuisine', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export async function updateRecipe(id, data) {
  const response = await fetch(`${BASE_URL}/Recipe/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function updateRecipeCategory(data) {
  const response = await fetch(`${BASE_URL}/RecipeCategory`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function updateRecipeCuisine(data) {
  const response = await fetch(`${BASE_URL}/RecipeCuisine`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}

// New function to submit a report
export const submitReport = async (report) => {
  return await apiCall('/Reports', {
    method: 'POST',
    body: JSON.stringify(report),
  });
};
