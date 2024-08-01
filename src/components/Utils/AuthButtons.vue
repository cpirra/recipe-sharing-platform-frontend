<template>
  <div>
    <button @click="login" v-if="!userIsAuthenticated">Login</button>
    <button @click="performLogout" v-if="userIsAuthenticated">Logout</button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'

const { isAuthenticated, loginWithRedirect, logout } = useAuth0()

const login = () => {
  loginWithRedirect()
}

const performLogout = () => {
  localStorage.removeItem('auth_token') // Clear the token on logout
  logout({ returnTo: window.location.origin })
}

const userIsAuthenticated = computed(() => isAuthenticated.value)
</script>
