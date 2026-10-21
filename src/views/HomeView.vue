<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import ProductImg from '../components/ProductImg.vue'
import { useStore } from '../composables/useStore'
import { moneda } from '../utils/format'

const { productos, cargar } = useStore()
onMounted(() => cargar())

const destacados = computed(() => [5, 1, 7].map(id => productos.value.find(p => p.id === id)).filter(Boolean))
const calles = [
  { n: 'Camisetas', i: 'bi-person-arms-up' },
  { n: 'Pantalones', i: 'bi-signpost-split' },
  { n: 'Chaquetas', i: 'bi-wind' },
  { n: 'Accesorios', i: 'bi-handbag' }
]
</script>

<template>
  <section class="hero">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-7">
          <h1 class="display hero-title" aria-label="Calle 27">
            <span class="line"><span class="word" style="--i:0">Calle</span></span>
            <span class="line"><span class="word num" style="--i:1">27</span></span>
          </h1>
          <p class="hero-copy">Ropa urbana hecha para caminar Bogotá. Cortes anchos, telas pesadas y un drop nuevo cada mes.</p>
          <div class="d-flex flex-wrap gap-3">
            <RouterLink to="/tienda" class="btn-taxi big">Entrar a la tienda <i class="bi bi-arrow-up-right ms-1"></i></RouterLink>
            <a href="#calles" class="btn-line big">Elegir por categoría</a>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="stickers">
            <figure v-for="(p, i) in destacados" :key="p.id" class="sticker" :class="'s' + (i + 1)">
              <ProductImg :product="p" />
              <figcaption>{{ p.nombre }} · {{ moneda(p.precio) }}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="calles" class="container py-5">
    <h2 class="display section-title">Elige tu calle</h2>
    <div class="row g-3">
      <div v-for="c in calles" :key="c.n" class="col-6 col-lg-3">
        <RouterLink :to="{ path: '/tienda', query: { cat: c.n } }" class="street-tile">
          <i class="bi" :class="c.i"></i>
          <span class="display">{{ c.n }}</span>
          <i class="bi bi-arrow-up-right go"></i>
        </RouterLink>
      </div>
    </div>
  </section>

  <section class="container pb-5">
    <div class="row g-3 perks">
      <div class="col-md-4"><i class="bi bi-truck"></i><div><strong>Envío en 48 horas</strong><br />A toda Colombia.</div></div>
      <div class="col-md-4"><i class="bi bi-arrow-repeat"></i><div><strong>Cambios por 15 días</strong><br />Sin preguntas raras.</div></div>
      <div class="col-md-4"><i class="bi bi-cash-coin"></i><div><strong>Pago contra entrega</strong><br />Pagas cuando lo tienes en la mano.</div></div>
    </div>
  </section>
</template>
