<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { getUserInfoFromToken } from '@/utils/getUserInfoFromToken.vue'

export default {
  setup() {
    const name = ref('')
    const age = ref(0)
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const userStore = useUserStore()
    const router = useRouter()

    const handleRegister = async () => {
      if (password.value !== confirmPassword.value) {
        userStore.error = 'Passwords do not match'
        return
      }

      const userData = {
        name: name.value,
        age: age.value,
        email: email.value,
        password: password.value
      }

      console.log('Registering with data:', userData) // Log the userData object

      try {
        const response = await fetch('https://your-backend-api.com/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        })

        if (!response.ok) {
          const errorData = await response.json()
          userStore.error = errorData.message || 'Registration failed'
          return
        }

        const result = await response.json()
        console.log('Registration successful:', result)

        // Save the token to localStorage
        localStorage.setItem('token', result.token)

        // Use getUserInfoFromToken to decode the token and get user info
        const userInfo = getUserInfoFromToken()
        console.log('Decoded user info:', userInfo)

        // Assuming you want to store the userInfo in userStore
        if (userInfo) {
          userStore.setUser(userInfo) // Ensure setUser method is defined in your userStore
        }

        userStore.error = null // Clear any previous error
        router.push('/')
      } catch (error) {
        console.error('Registration error:', error)
        userStore.error = 'Registration failed'
      }
    }

    return {
      name,
      age,
      email,
      password,
      confirmPassword,
      handleRegister,
      error: userStore.error
    }
  }
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
      <h2 class="text-2xl font-bold text-center text-gray-800">Register</h2>
      <form @submit.prevent="handleRegister" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Name:</label>
          <input
            type="text"
            id="name"
            v-model="name"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="age" class="block text-sm font-medium text-gray-700 mb-1">Age:</label>
          <input
            type="number"
            id="age"
            v-model.number="age"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email:</label>
          <input
            type="email"
            id="email"
            v-model="email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <button
            type="submit"
            class="w-full flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
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
