// src/plugins/toast.js
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export function setupToast(app) {
  app.use(Toast, {
    // Default options for toast notifications
    position: 'top-right',
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: false,
    closeButton: 'button',
    icon: true,
    rtl: false
  })
}
