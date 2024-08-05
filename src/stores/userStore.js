import { defineStore } from 'pinia';
import { getUserInfoFromToken } from '../utils/authUtils';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    userId: null,
    token: localStorage.getItem('auth_token') || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
    getUserId: (state) => state.userId,
    isAdmin: (state) => state.user?.roles.includes('Admin'),
  },
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem('auth_token', token);
      this.setUserFromToken();
    },
    setUserFromToken() {
      const userInfo = getUserInfoFromToken();
      if (userInfo) {
        this.user = userInfo;
        this.userId = userInfo.userId;
        this.token = localStorage.getItem('auth_token'); // Ensure token is set
      } else {
        this.token = null;
      }
    },
    setUser(name) {
      this.user = name;
    },
    setUserId(userId) {
      this.userId = userId;
    },
    logout() {
      this.user = null;
      this.userId = null;
      this.token = null;
      localStorage.removeItem('auth_token');
    },
    checkToken() {
      const token = localStorage.getItem('auth_token');
      if (token) {
        if (token !== this.token) {
          this.setToken(token);
        }
      } else {
        this.logout();
      }
    },
  },
});
