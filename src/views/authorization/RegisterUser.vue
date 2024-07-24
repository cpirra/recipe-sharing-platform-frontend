<script setup>
import { useRegister } from '../../composables/useRegister'
import UserRegisterComponent from '../../components/User/UserRegisterComponent.vue'

const { error, handleRegister } = useRegister()
</script>

<template>
  <div>
    <UserRegisterComponent @register="handleRegister" :error="error" />
  </div>
</template>
