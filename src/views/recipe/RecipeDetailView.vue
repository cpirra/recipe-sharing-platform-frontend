<template>
  <div v-if="loading" class="text-center p-6">
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
    <p>Loading...</p>
  </div>

  <div v-if="!loading && errorMessage" class="text-center p-6 text-red-500">
    <p>{{ errorMessage }}</p>
  </div>

  <div
    v-if="!loading && !errorMessage && recipe"
    class="recipe-detail max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8"
  >
    <img :src="recipe.imageUrls[0]?.url" alt="Recipe Image" class="w-full h-64 object-cover" v-if="recipe.imageUrls && recipe.imageUrls.length > 0"/>
    <div class="p-6">
      <button @click="goBack" class="text-blue-500 mb-4">← Back to Recipes</button>
      <h1 class="text-3xl font-bold mb-2">{{ recipe.name }}</h1>
      <p class="text-gray-700 mb-4">{{ recipe.description }}</p>
      <div class="flex flex-wrap mb-4">
        <span
          v-for="category in recipe.categoryDetails"
          :key="category.id"
          class="bg-blue-200 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
        >
          {{ category.name }}
        </span>
      </div>
      <div class="flex flex-wrap mb-4">
        <span
          v-for="cuisine in recipe.cuisineDetails"
          :key="cuisine.id"
          class="bg-green-200 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
        >
          {{ cuisine.name }}
        </span>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Ingredients</h2>
        <ul class="list-disc list-inside ml-4">
          <li v-for="ingredient in recipe.ingredients" :key="ingredient.name">
            {{ ingredient.quantity }} {{ ingredient.name }}
          </li>
        </ul>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Instructions</h2>
        <ol class="list-decimal list-inside ml-4">
          <li v-for="instruction in recipe.instructions" :key="instruction.stepNumber">
            {{ instruction.description }}
          </li>
        </ol>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Nutritional Information</h2>
        <p v-if="recipe.nutritionalInfo?.calories !== undefined"><strong>Calories:</strong> {{ recipe.nutritionalInfo.calories }}</p>
        <p v-if="recipe.nutritionalInfo?.fat !== undefined"><strong>Fat:</strong> {{ recipe.nutritionalInfo.fat }}g</p>
        <p v-if="recipe.nutritionalInfo?.carbohydrates !== undefined"><strong>Carbohydrates:</strong> {{ recipe.nutritionalInfo.carbohydrates }}g</p>
        <p v-if="recipe.nutritionalInfo?.protein !== undefined"><strong>Protein:</strong> {{ recipe.nutritionalInfo.protein }}g</p>
        <p v-if="recipe.nutritionalInfo?.sugar !== undefined"><strong>Sugar:</strong> {{ recipe.nutritionalInfo.sugar }}g</p>
        <p v-if="recipe.nutritionalInfo?.fiber !== undefined"><strong>Fiber:</strong> {{ recipe.nutritionalInfo.fiber }}g</p>
        <p v-if="recipe.nutritionalInfo?.sodium !== undefined"><strong>Sodium:</strong> {{ recipe.nutritionalInfo.sodium }}mg</p>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Author</h2>
        <router-link :to="`/profile/${recipe.user.id}`" class="text-blue-500">
          {{ recipe.user?.username }}
        </router-link>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Video</h2>
        <video :src="recipe.videoUrls[0]?.url" controls class="w-full" v-if="recipe.videoUrls && recipe.videoUrls.length > 0"></video>
      </div>
      <div class="mb-4">
        <ShareButton :recipeId="id" :recipeTitle="recipe.name" />
      </div>
    </div>
    <div class="reviews-section p-6 border-t mt-8">
      <Reviews />
    </div>
    <div class="report-section p-6 border-t mt-8">
      <ReportRecipe :recipeId="recipe.id" :reporterId="1" />
      <!-- Pass the actual reporter ID -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchRecipeById } from '@/utils/apollo'
import Reviews from '@/components/Recipe/RecipeReview.vue'
import ReportRecipe from '@/components/Recipe/RecipeReport.vue'
import ShareButton from '@/components/Utils/ShareButton.vue' // Import the ShareButton component

const route = useRoute()
const router = useRouter()
const recipe = ref(null)
const loading = ref(true)
const errorMessage = ref(null)
const id = String(route.params.id) // Ensure id is a string

const fetchRecipe = async (id) => {
  try {
    recipe.value = await fetchRecipeById(id)
    if (!recipe.value) {
      errorMessage.value = 'Recipe not found.'
    }
  } catch (error) {
    console.error('Error fetching recipe:', error)
    errorMessage.value = 'An error occurred while fetching the recipe.'
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push('/')
}

onMounted(() => {
  fetchRecipe(id)
})
</script>

<style scoped>
.recipe-detail {
  max-width: 800px;
  margin: auto;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  margin-top: 2rem;
}
.recipe-detail img {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.recipe-detail .p-6 {
  padding: 1.5rem;
}
.reviews-section {
  background-color: #f9fafb; /* light gray background to distinguish */
}
.report-section {
  background-color: #f9fafb; /* light gray background to distinguish */
}
</style>
