<!-- src/components/Utils/AuthButtons.vue -->
<script setup>
import { useUserStore } from '@/stores/userStore';
import { useAuth0 } from '@auth0/auth0-vue';

const userStore = useUserStore();
const { loginWithRedirect, logout } = useAuth0();

const handleLogout = () => {
  userStore.logout();
  logout({ returnTo: window.location.origin });
};
</script>

<template>
  <div>
    <button v-if="!userStore.isAuthenticated" @click="loginWithRedirect">Login</button>
    <button v-else @click="handleLogout">Logout</button>
  </div>
</template>

<style scoped>
button {
  margin: 0 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
