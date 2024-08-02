<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { fetchReviewsByRecipeId, submitReview } from '@/services/recipeApi'
import StarReview from '../Utils/StarReview.vue'

const route = useRoute()
const reviews = ref([])
const page = ref(1)
const size = ref(5)
const loading = ref(false)
const newReview = ref({
  comment: '',
  rating: 0, // Initialize to 0 instead of null
  recipeId: route.params.id
})
const submitting = ref(false)

const fetchReviews = async () => {
  loading.value = true
  const recipeId = route.params.id
  const newReviews = await fetchReviewsByRecipeId(recipeId, page.value, size.value)
  reviews.value = [...reviews.value, ...newReviews]
  loading.value = false
}

const loadMore = () => {
  page.value += 1
  fetchReviews()
}

const submitNewReview = async () => {
  submitting.value = true
  await submitReview(newReview.value)
  // Reset form
  newReview.value.comment = ''
  newReview.value.rating = 0 // Reset to 0 instead of null
  // Refresh reviews
  reviews.value = []
  page.value = 1
  fetchReviews()
  submitting.value = false
}

onMounted(() => {
  fetchReviews()
})
</script>

<template>
  <div class="reviews mt-8">
    <h2 class="text-2xl font-bold mb-4">Reviews</h2>
    <div v-if="reviews.length === 0 && !loading" class="text-gray-600">No reviews available.</div>
    <div v-else>
      <div
        v-for="review in reviews"
        :key="review.id"
        class="review p-4 mb-4 bg-gray-100 rounded-lg"
      >
        <p class="text-gray-800">
          <strong>{{ review.username }}:</strong> {{ review.comment }}
        </p>
        <StarReview :modelValue="review.rating" :readOnly="true" />
        <p class="text-gray-500 text-sm">{{ new Date(review.createdAt).toLocaleString() }}</p>
      </div>
      <button
        @click="loadMore"
        class="bg-blue-500 text-white px-4 py-2 rounded"
        :disabled="loading"
      >
        Load More
      </button>
    </div>
    <div v-if="loading" class="text-center mt-4">
      <svg
        class="animate-spin h-8 w-8 text-gray-600 mx-auto mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
      </svg>
      Loading...
    </div>

    <!-- Review Form -->
    <div class="review-form mt-8 p-4 bg-white rounded-lg shadow">
      <h3 class="text-xl font-semibold mb-4">Add a Review</h3>
      <form @submit.prevent="submitNewReview">
        <div class="mb-4">
          <label for="comment" class="block text-gray-700 mb-2">Comment</label>
          <textarea
            id="comment"
            v-model="newReview.comment"
            class="w-full p-2 border rounded-lg"
            rows="4"
            required
          ></textarea>
        </div>
        <div class="mb-4">
          <label for="rating" class="block text-gray-700 mb-2">Rating</label>
          <StarReview v-model="newReview.rating" />
        </div>
        <button
          type="submit"
          class="bg-green-500 text-white px-4 py-2 rounded"
          :disabled="submitting"
        >
          Submit Review
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.review {
  border: 1px solid #e2e8f0;
}
.review-form {
  margin-top: 2rem;
}
</style>
