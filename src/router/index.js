import { createRouter, createWebHistory } from 'vue-router'

// Sin rutas: la tienda vive completa en App.vue
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: []
})
