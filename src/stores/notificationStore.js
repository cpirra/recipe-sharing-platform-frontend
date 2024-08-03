import { defineStore } from 'pinia'
import axios from 'axios' // Import axios

export const useNotificationStore = defineStore('notificationStore', {
  state: () => ({
    notifications: [],
    unreadCount: 0
  }),
  actions: {
    async fetchNotifications() {
      try {
        const response = await axios.get(
          'https://localhost:7036/api/Notification/user/auth0|669ef66368b02e4d51b236ba',
          {
            withCredentials: true
          }
        )
        this.notifications = response.data
        this.unreadCount = this.notifications.filter((n) => !n.isRead).length
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    },
    addNotification(notification) {
      this.notifications.push(notification)
      this.unreadCount++
    }
  }
})
