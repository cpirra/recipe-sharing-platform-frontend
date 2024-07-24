import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '../services/userApi'

export function useRegister() {
  const error = ref(null)
  const router = useRouter()

  const handleRegister = async (userData) => {
    try {
      const response = await registerUser(userData)
      console.log('User registered successfully:', response.data)
      error.value = null
      router.push({ name: 'Home' })
    } catch (err) {
      console.error('Error registering user:', err)
      error.value = 'Error registering user. Please try again.'
    }
  }

  return {
    error,
    handleRegister
  }
}
