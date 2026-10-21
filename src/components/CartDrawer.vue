<script setup>
import { ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import ProductImg from './ProductImg.vue'
import { useStore } from '../composables/useStore'
import { moneda } from '../utils/format'

const { carrito, total, totalUnidades, bolsaAbierta, aumentar, disminuir, eliminar } = useStore()

// El total "cuenta" hasta su nuevo valor
const mostrado = ref(total.value)
watch(total, to => {
  const from = mostrado.value, t0 = performance.now()
  const paso = now => {
    const k = Math.min((now - t0) / 450, 1)
    mostrado.value = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)))
    if (k < 1) requestAnimationFrame(paso)
  }
  requestAnimationFrame(paso)
})
</script>

<template>
  <Transition name="fade">
    <div v-if="bolsaAbierta" class="scrim" @click="bolsaAbierta = false"></div>
  </Transition>

  <Transition name="drawer">
    <aside v-if="bolsaAbierta" class="drawer" role="dialog" aria-label="Resumen de compra">
      <header class="drawer-head">
        <h2 class="display m-0">Tu bolsa <span class="count">{{ totalUnidades }}</span></h2>
        <button class="icon-btn" aria-label="Cerrar" @click="bolsaAbierta = false"><i class="bi bi-x-lg"></i></button>
      </header>

      <div class="drawer-body">
        <div v-if="carrito.length === 0" class="empty">
          <i class="bi bi-bag fs-1"></i>
          <p class="fw-bold mb-1">Tu bolsa está vacía</p>
          <p class="text-secondary">Elige algo del drop y aparecerá aquí.</p>
          <RouterLink to="/tienda" class="btn-taxi" @click="bolsaAbierta = false">Ir a la tienda</RouterLink>
        </div>

        <TransitionGroup v-else name="item" tag="ul" class="list-unstyled m-0">
          <li v-for="i in carrito" :key="i.id" class="cart-item">
            <div class="thumb"><ProductImg :product="i" /></div>
            <div class="flex-grow-1">
              <div class="d-flex justify-content-between gap-2">
                <strong>{{ i.nombre }}</strong>
                <button class="icon-btn sm" title="Quitar" @click="eliminar(i)"><i class="bi bi-trash"></i></button>
              </div>
              <small class="text-secondary">{{ moneda(i.precio) }} c/u</small>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <div class="qty">
                  <button :disabled="i.cantidad === 1" aria-label="Menos" @click="disminuir(i.id)">−</button>
                  <span>{{ i.cantidad }}</span>
                  <button aria-label="Más" @click="aumentar(i.id)">+</button>
                </div>
                <strong>{{ moneda(i.precio * i.cantidad) }}</strong>
              </div>
            </div>
          </li>
        </TransitionGroup>
      </div>

      <footer v-if="carrito.length" class="drawer-foot">
        <span>Total</span>
        <span class="display total">{{ moneda(mostrado) }}</span>
      </footer>
    </aside>
  </Transition>
</template>
