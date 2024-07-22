<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import axios from 'axios'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const loading = ref(false)
    const error = ref('')
    const userStore = useUserStore()
    const router = useRouter()

    const handleLogin = async () => {
      error.value = ''
      loading.value = true

      try {
        const response = await axios.post('https://localhost:7036/api/User/login', {
          username: email.value,
          password: password.value
        })

        if (response.status === 200) {
          console.log(response)
          const token = response.data.token
          localStorage.setItem('token', token)
          userStore.login(email.value, token) // Or any other logic to update the store
          router.push('/')
        } else {
          error.value = response.data.message || 'Login failed'
        }
      } catch (err) {
        error.value = 'An error occurred. Please try again later.'
      }

      loading.value = false
    }

    return {
      email,
      password,
      loading,
      error,
      handleLogin
    }
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Username:</label>
          <input
            type="text"
            id="email"
            v-model="email"
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
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember_me"
              type="checkbox"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label for="remember_me" class="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>
          <div class="text-sm">
            <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500"
              >Forgot your password?</a
            >
          </div>
        </div>
        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span v-if="loading">Loading...</span>
            <span v-else>Login</span>
          </button>
        </div>
        <div v-if="error" class="mt-4 text-sm text-red-600 text-center">
          {{ error }}
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Add any additional styles here */
</style>
