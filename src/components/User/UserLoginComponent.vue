<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>
      <form @submit.prevent="submitForm" class="space-y-6">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-700 mb-1"
            >Username:</label
          >
          <input
            type="text"
            id="username"
            v-model="username"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1"
            >Password:</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            class="w-full flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </div>
        <div v-if="error" class="mt-4 text-sm text-red-600 text-center">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  error: String
})

const emit = defineEmits(['login'])

const username = ref('')
const password = ref('')

const submitForm = () => {
  emit('login', {
    username: username.value,
    password: password.value
  })
}
</script>
