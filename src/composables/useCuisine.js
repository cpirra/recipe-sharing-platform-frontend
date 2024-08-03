// src/composables/useCuisine.js
import { ref } from 'vue';
import { cuisineService } from '@/services/cuisineservice';

export function useCuisine(cuisineId) {
  const cuisine = ref({});
  const recipes = ref([]);
  const error = ref(null);

  const fetchCuisineDetails = async (id) => {
    try {
      cuisine.value = await cuisineService.getCuisine(id);
    } catch (err) {
      error.value = err.message;
    }
  };

  const fetchCuisineRecipes = async (id) => {
    try {
      recipes.value = await cuisineService.getCuisineRecipes(id);
    } catch (err) {
      error.value = err.message;
    }
  };

  fetchCuisineDetails(cuisineId);
  fetchCuisineRecipes(cuisineId);

  return { cuisine, recipes, error, fetchCuisineDetails, fetchCuisineRecipes };
}
