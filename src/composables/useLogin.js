import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginUser } from '../services/userApi'
import { useUserStore } from '../stores/userStore'
import { getUserInfoFromToken } from '../utils/authUtils'

export function useLogin() {
  const error = ref(null)
  const router = useRouter()
  const userStore = useUserStore()

  const handleLogin = async (userData) => {
    try {
      const response = await loginUser(userData)
      console.log('User logged in successfully:', response.data)
      error.value = null
      const token = response.data.token
      localStorage.setItem('token', token)
      const decodedToken = getUserInfoFromToken()

      if (decodedToken) {
        const name = decodedToken['https://RecipeAPI/name']
        console.log('Extracted user name:', name)

        // Store the name in the state
        userStore.setUser(name)

        router.push({ name: 'Home' })
      } else {
        error.value = 'Failed to decode user information. Please try again.'
      }
    } catch (err) {
      console.error('Error logging in:', err)
      error.value = 'Invalid username or password. Please try again.'
    }
  }

  return {
    error,
    handleLogin
  }
}
