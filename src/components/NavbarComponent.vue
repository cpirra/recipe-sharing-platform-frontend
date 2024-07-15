<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'

const userStore = useUserStore()

const logout = () => {
  userStore.logout()
}
</script>

<template>
  <!--TO DO
  Fix the navbar with tailwind
  Besarta-->
  <nav class="p-4 bg-[#f8fafc] text-black navbar">
    <RouterLink to="/" class="mr-4"><img class="logo" src="../assets/images/logo.png" alt=""></RouterLink>
    <div>
      <RouterLink to="/" class="mr-4 pr-4 pl-4">Home</RouterLink>
      <RouterLink to="/about" class="mr-4 pr-4 pl-4">About</RouterLink>
      <RouterLink to="/" class="mr-4 pr-4 pl-4">Cuisines</RouterLink>
      <RouterLink to="/" class="mr-4 pr-4 pl-4">Categories</RouterLink>
    </div>
    <div>
      <RouterLink v-if="!userStore.user" to="/login" class="mr-4 pr-4 pl-4">Login</RouterLink>
      <button v-else @click="logout" class="logout-button">Logout</button>
      <input class="search-input" type="text" placeholder="Pasta">
    </div>
  </nav>
  <RouterView />
</template>

<style scoped>
.navbar{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.logo{
  width: 50px;
  height: auto;
}
.search-input{
  padding: 5px;
  border-radius: 5px;
}
.logout-button {
  @apply bg-red-500 text-white px-4 py-2 rounded;
}
</style>
