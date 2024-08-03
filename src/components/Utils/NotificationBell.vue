<template>
  <div class="relative">
    <button @click="toggleNotifications" class="relative">
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9"
        ></path>
      </svg>
      <span
        v-if="notificationStore.unreadCount > 0"
        class="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"
      ></span>
    </button>
    <div
      v-if="showNotifications"
      class="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg"
    >
      <div
        v-for="(notification, index) in notificationStore.notifications"
        :key="notification.id"
        class="p-4 border-b last:border-0"
      >
        {{ index + 1 }}. {{ notification.message }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useNotificationStore } from '@/stores/notificationStore'
import createSignalRConnection from '@/services/notificationService'

const showNotifications = ref(false)
const notificationStore = useNotificationStore()

const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value
}

onMounted(async () => {
  await notificationStore.fetchNotifications()

  try {
    const connection = await createSignalRConnection()

    connection.on('ReceiveNotification', (notification) => {
      console.log('Received notification via SignalR:', notification) // Log to verify
      notificationStore.addNotification(notification)
    })

    await connection.start()
    console.log('SignalR connection established') // Log to verify connection
  } catch (error) {
    console.error('Failed to establish SignalR connection:', error)
  }
})
</script>

<style scoped>
/* Add any additional styling you need here */
</style>
