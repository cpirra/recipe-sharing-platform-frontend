import { ref, watch } from 'vue';

export function useCuisine(cuisineId) {
  const cuisine = ref({});
  const error = ref(null);

  const fetchCuisineDetails = async (id) => {
    // Ensure the cuisineId is a valid number
    if (!id || isNaN(id)) {
      error.value = 'Invalid cuisine ID format';
      console.error('Invalid cuisine ID format:', id);
      return;
    }

    try {
      const response = await fetch(`https://localhost:7036/api/Cuisine/${id}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to fetch cuisine details: ${response.statusText}. Response text: ${errorText}`);
      }
      cuisine.value = await response.json();
    } catch (err) {
      error.value = err.message;
      console.error('Error fetching cuisine details:', error.value);
    }
  }

  fetchCuisineDetails(cuisineId);

  console.log('Fetching cuisine details from URL:', `https://localhost:7036/api/Cuisine/${cuisineId}`);
  return { cuisine, error, fetchCuisineDetails };

 
}
