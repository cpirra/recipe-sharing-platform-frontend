<!-- src/components/ShareButton.vue -->
<script setup>
import { defineProps, ref, computed } from 'vue'

// Define component props
const props = defineProps({
  recipeId: {
    type: String,
    required: true
  },
  recipeTitle: {
    type: String,
    required: true
  }
})

// Use environment variables for the base URL
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

// Computed property for the share URL
const shareUrl = computed(() => `${apiBaseUrl}Recipe/${props.recipeId}`)
</script>

<template>
  <ShareNetwork
    network="twitter"
    :url="shareUrl"
    :title="`Check out this recipe: ${props.recipeTitle}`"
    description="A delicious recipe to try out!"
  >
    <button>Share on Twitter</button>
  </ShareNetwork>
</template>

<style scoped>
button {
  background-color: #1da1f2;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0d8bd7;
}
</style>
