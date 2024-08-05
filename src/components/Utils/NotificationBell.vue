<script setup>
import { ref, onMounted } from 'vue'
import { getNotifications } from '@/services/userApi'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const userId = userStore.getUserId

const notifications = ref([])
const showNotifications = ref(false)

const fetchNotifications = async () => {
  try {
    const data = await getNotifications(userId)
    notifications.value = data
  } catch (error) {
    console.error('Error fetching notifications:', error)
  }
}

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

onMounted(fetchNotifications)
</script>

<template>
  <div class="relative">
    <button @click="toggleNotifications" class="relative">
      <i class="fa fa-bell"></i>
    </button>
    <div v-if="showNotifications" class="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg">
      <ul>
        <li v-for="notification in notifications" :key="notification.id" class="p-2 border-b">
          {{ notification.message }}
        </li>
        <li v-if="notifications.length === 0" class="p-2 text-center">No notifications</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
button {
  font-size: 1.5rem;
  position: relative;
}
</style>
