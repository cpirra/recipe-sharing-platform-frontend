<template>
    <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute inset-0 bg-gray-800 opacity-50" @click="closeModal"></div>
      <div class="bg-white rounded-lg shadow-lg p-6 z-10 max-w-sm mx-auto">
        <h2 class="text-xl font-semibold mb-4">How to Use Our Website</h2>
        <p class="mb-4">Welcome to our website! Here are some instructions on how to use it:</p>
        <ul class="list-disc pl-5 mb-4">
          <li>Browse our recipe collection using the navigation menu.</li>
          <li>Search for recipes using the search bar in the navbar.</li>
          <li>Click on a recipe card to view the full recipe details.</li>
          <li>Save your favorite recipes by clicking the heart icon.</li>
          <li>Go to Log in, create an account, and <span class="postrecipe">POST YOUR OWN RECIPE</span>.</li>
        </ul>
        <button @click="closeModal" class="bg-blue-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InstructionModal',
    props: {
      isVisible: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      closeModal() {
        this.$emit('update:isVisible', false);
      }
    }
  }
  </script>
  
  <style scoped>
  .postrecipe {
    text-transform: uppercase;
    font-weight: bolder;
  }
  </style>
  