import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    userId: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    getUser: (state) => state.user,
    getUserId: (state) => state.userId,
  },
  actions: {
    setUser(user) {
      this.user = user;
    },
    setUserId(userId) {
      this.userId = userId;
    },
    logout() {
      this.user = null;
      this.userId = null;
      localStorage.removeItem('token');
    },
  },
});
