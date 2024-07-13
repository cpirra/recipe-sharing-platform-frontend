<template>
  <div class="recipe-card border rounded-lg overflow-hidden shadow-lg">
    <img :src="image" alt="Recipe Image" class="w-full h-48 object-cover" />
    <div class="p-4">
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm font-medium text-gray-500">{{ category }}</span>
        <button class="text-red-500">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>
      <h3 class="text-xl font-semibold text-gray-800">{{ title }}</h3>
      <div class="flex items-center mt-2">
        <span class="text-yellow-500 flex items-center">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
            />
          </svg>
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
            />
          </svg>
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
            />
          </svg>
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
            />
          </svg>
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 17.27l6.18 3.73-1.64-7.03L21 9.24l-7.19-.61L12 2 10.19 8.63 3 9.24l5.46 4.73L6.82 21z"
            />
          </svg>
        </span>
        <span class="ml-2 text-gray-600">{{ ratings }} Ratings</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'RecipeCard',
  props: {
    image: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    ratings: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const { image, category, title, ratings } = toRefs(props)
    // eslint-disable-next-line vue/no-dupe-keys
    return { image, category, title, ratings }
  }
})
</script>

<style scoped>
.recipe-card {
  width: 320px;
}
</style>
