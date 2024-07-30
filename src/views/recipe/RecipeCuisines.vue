<template>
  <div>
    <h2 v-if="!error">{{ cuisine.name }}</h2>
    <p v-if="error">{{ error }}</p>
    <!-- Add more details as needed -->
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCuisine } from '@/composables/useCuisine'; // Adjust the path as necessary

const route = useRoute();
const cuisineId = ref(Number(route.params.id)); // Convert ID to number

const { cuisine, error, fetchCuisineDetails } = useCuisine(cuisineId.value);

watch(() => route.params.id, (newId) => {
  const id = Number(newId);
  if (isNaN(id)) {
    console.error('Invalid cuisine ID format:', newId);
    error.value = 'Invalid cuisine ID format';
  } else {
    error.value = null;
    cuisineId.value = id;
    fetchCuisineDetails(id);
  }
});

console.log('Route parameter ID:', route.params.id);
</script>
