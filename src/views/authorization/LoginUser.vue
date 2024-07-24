<script setup>
import { useLogin } from '../../composables/useLogin'
import UserLoginComponent from '../../components/User/UserLoginComponent.vue'

const { error, handleLogin } = useLogin()
</script>

<template>
  <div>
    <UserLoginComponent @login="handleLogin" :error="error" />
  </div>
</template>
