<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

const user = computed(() => userStore.user)
</script>


<template>
  <div v-if="user">
    <h1>Welcome, {{ user.username }}</h1>
    <p>Email: {{ user.email }}</p>
  </div>
  <div v-else>
    <p>Please log in.</p>
  </div>
</template>
