<template>
  <div>
    <UserLoginComponent @login="handleLogin" :error="error" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UserLoginComponent from '../../components/User/UserLoginComponent.vue'
import { loginUser } from '../../services/userApi'
import { useUserStore } from '../../stores/userStore'
import { getUserInfoFromToken } from '../../utils/authUtils'

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
    const decodedUser = getUserInfoFromToken()

    console.log('Decoded user:', decodedUser)

    // Store the token and user information in local storage and state
    userStore.setUser(decodedUser, token)

    router.push({ name: 'Home' })
  } catch (err) {
    console.error('Error logging in:', err)
    error.value = 'Invalid username or password. Please try again.'
  }
}
</script>
