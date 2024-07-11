<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/userStore'

const userStore = useUserStore()

const logout = () => {
  userStore.logout()
}
</script>

<template>
  <!--TO DO
  Fix the navbr with tailwind
  Besarta-->
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/profile">Profile</RouterLink>
    <RouterLink v-if="!userStore.user" to="/login">Login</RouterLink>
    <button v-else @click="logout" class="logout-button">Logout</button>
  </nav>
  <RouterView />
</template>

<style scoped></style>