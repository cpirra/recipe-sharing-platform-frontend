<template>
  <div
    v-if="recipe"
    class="recipe-detail max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8"
  >
    <img :src="recipe.image_url" alt="Recipe Image" class="w-full h-64 object-cover" />
    <div class="p-6">
      <button @click="goBack" class="text-blue-500 mb-4">← Back to Recipes</button>
      <h1 class="text-3xl font-bold mb-2">{{ recipe.title }}</h1>
      <p class="text-gray-700 mb-4">{{ recipe.description }}</p>
      <div class="flex flex-wrap mb-4">
        <span
          class="bg-green-200 text-green-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
          >{{ recipe.type }}</span
        >
        <span
          v-for="category in recipe.categories"
          :key="category"
          class="bg-blue-200 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded"
          >{{ category }}</span
        >
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Ingredients</h2>
        <ul class="list-disc list-inside ml-4">
          <li v-for="ingredient in recipe.ingredients" :key="ingredient">{{ ingredient }}</li>
        </ul>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Instructions</h2>
        <ol class="list-decimal list-inside ml-4">
          <li v-for="instruction in recipe.instructions" :key="instruction">{{ instruction }}</li>
        </ol>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Details</h2>
        <p><strong>Prep Time:</strong> {{ recipe.prep_time }}</p>
        <p><strong>Cook Time:</strong> {{ recipe.cook_time }}</p>
        <p><strong>Total Time:</strong> {{ recipe.total_time }}</p>
        <p><strong>Difficulty:</strong> {{ recipe.difficulty }}</p>
        <p><strong>Servings:</strong> {{ recipe.servings }}</p>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Author</h2>
        <p>
          <a :href="recipe.author.profile_url" class="text-blue-500">{{ recipe.author.name }}</a>
        </p>
      </div>
      <div class="mb-4">
        <h2 class="text-xl font-semibold mb-2">Ratings</h2>
        <div class="flex items-center">
          <span class="text-yellow-500">
            <svg
              v-for="n in Math.floor(recipe.ratings)"
              :key="n"
              class="w-4 h-4 inline-block"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-label="Full star"
            >
              <path
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
            <svg
              v-if="recipe.ratings % 1 !== 0"
              class="w-4 h-4 inline-block"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-label="Half star"
            >
              <defs>
                <linearGradient id="half">
                  <stop offset="50%" stop-color="currentColor" />
                  <stop offset="50%" stop-color="transparent" />
                </linearGradient>
              </defs>
              <path
                fill="url(#half)"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          </span>
          <span class="ml-2 text-gray-600">{{ recipe.ratings }} / 5</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="text-center p-6">
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
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const recipe = ref(null)

const fetchRecipe = async (id) => {
  try {
    const response = await fetch('/data/recipeApi.json')
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
    const data = await response.json()
    recipe.value = data.recipes.find((r) => r.id === parseInt(id))
  } catch (error) {
    console.error('Error fetching recipe:', error)
  }
}

const goBack = () => {
  router.push('/recipes')
}

onMounted(() => {
  const id = route.params.id
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
</style>
