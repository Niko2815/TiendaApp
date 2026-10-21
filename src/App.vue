<script setup>
// App.vue: estructura general (navbar, vistas, bolsa). El estado compartido
// (ref/computed del carrito y los productos) vive en composables/useStore.js
import { onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import MarqueeBar from './components/MarqueeBar.vue'
import CartDrawer from './components/CartDrawer.vue'
import { useStore } from './composables/useStore'

const { totalUnidades, bolsaAbierta, aviso } = useStore()
const alTeclear = e => { if (e.key === 'Escape') bolsaAbierta.value = false }
onMounted(() => window.addEventListener('keydown', alTeclear))
onBeforeUnmount(() => window.removeEventListener('keydown', alTeclear))
</script>

<template>
  <MarqueeBar />

  <nav class="nav-ink">
    <div class="container d-flex align-items-center justify-content-between">
      <RouterLink to="/" class="brand display"><span class="brand-box">27</span> Calle 27</RouterLink>
      <div class="d-flex align-items-center gap-4">
        <RouterLink to="/" class="nav-a d-none d-sm-inline">Inicio</RouterLink>
        <RouterLink to="/tienda" class="nav-a">Tienda</RouterLink>
        <button class="bag-btn" aria-label="Abrir bolsa" @click="bolsaAbierta = true">
          <i class="bi bi-bag"></i>
          <span :key="totalUnidades" class="bag-count">{{ totalUnidades }}</span>
        </button>
      </div>
    </div>
  </nav>

  <RouterView v-slot="{ Component, route }">
    <Transition name="page" mode="out-in">
      <component :is="Component" :key="route.path" />
    </Transition>
  </RouterView>

  <footer class="foot">
    <div class="container d-flex flex-wrap justify-content-between gap-2">
      <span class="display fs-4">Calle 27</span>
      <span>Bogotá, Colombia · Proyecto del taller Vue.js + Bootstrap</span>
    </div>
  </footer>

  <CartDrawer />

  <Transition name="toast">
    <div v-if="aviso" class="toast-pop" role="status">
      <i class="bi bi-check-circle-fill text-warning me-2"></i>{{ aviso }}
      <button class="toast-link" @click="bolsaAbierta = true">Ver bolsa</button>
    </div>
  </Transition>
</template>
