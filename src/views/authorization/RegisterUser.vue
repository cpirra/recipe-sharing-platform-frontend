<template>
  <div>
    <UserRegisterComponent @register="handleRegister" :error="error" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import UserRegisterComponent from '../../components/User/UserRegisterComponent.vue'
import { registerUser } from '../../services/userApi'

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
</script>
