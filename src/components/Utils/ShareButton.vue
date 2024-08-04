<!-- src/components/ShareButton.vue -->
<script setup>
import { defineProps, ref } from 'vue'

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

const shareUrl = ref(`https://localhost:7036/api/Recipe/${props.recipeId}`)
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
