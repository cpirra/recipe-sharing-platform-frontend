<script setup>
import { ref } from 'vue'
import { submitReport } from '@/services/recipeApi' // Import the submitReport function

const reporterId = 1 // Replace with the actual reporter ID (e.g., from user authentication)
const recipeId = 1 // This should be passed as a prop or derived from the recipe being viewed
const reason = ref('')
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  try {
    const report = {
      reporterId,
      recipeId,
      reason: reason.value
    }
    await submitReport(report)
    successMessage.value = 'Report submitted successfully.'
    errorMessage.value = ''
  } catch (error) {
    successMessage.value = ''
    errorMessage.value = 'Failed to submit report. Please try again.'
  }
}
</script>

<template>
  <div class="report-recipe">
    <h2 class="text-xl font-semibold mb-2">Report Recipe</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="reason" class="block text-sm font-medium text-gray-700">Reason</label>
        <textarea
          id="reason"
          v-model="reason"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          rows="4"
          required
        ></textarea>
      </div>
      <button type="submit" class="bg-red-500 text-white font-bold py-2 px-4 rounded">
        Submit Report
      </button>
    </form>
    <p v-if="successMessage" class="text-green-500 mt-4">{{ successMessage }}</p>
    <p v-if="errorMessage" class="text-red-500 mt-4">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.report-recipe {
  background-color: #fff;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}
</style>
