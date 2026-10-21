<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import CategoryFilter from '../components/CategoryFilter.vue'
import ProductCard from '../components/ProductCard.vue'
import { useStore } from '../composables/useStore'

const { productos, cargando, error, cargar, agregar } = useStore()
const route = useRoute()
const elegida = ref(route.query.cat || 'Todos')
watch(() => route.query.cat, v => (elegida.value = v || 'Todos'))
onMounted(() => cargar())

const categorias = computed(() => ['Todos', ...new Set(productos.value.map(p => p.categoria))])
const activa = computed(() => (categorias.value.includes(elegida.value) ? elegida.value : 'Todos'))
const filtrados = computed(() =>
  activa.value === 'Todos' ? productos.value : productos.value.filter(p => p.categoria === activa.value)
)
</script>

<template>
  <div class="container py-5">
    <div class="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
      <div>
        <h1 class="display section-title m-0">La tienda</h1>
        <p class="text-secondary mb-0">{{ filtrados.length }} prendas en {{ activa.toLowerCase() }}</p>
      </div>
      <CategoryFilter :categories="categorias" :active="activa" @select="elegida = $event" />
    </div>

    <div v-if="error" class="alert alert-danger">
      {{ error }} <button class="btn btn-sm btn-outline-danger ms-2" @click="cargar(true)">Reintentar</button>
    </div>

    <div v-if="cargando" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4">
      <div v-for="n in 8" :key="n" class="col"><div class="skeleton"></div></div>
    </div>

    <TransitionGroup v-else name="grid" tag="div" class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-4" appear>
      <div v-for="(p, i) in filtrados" :key="p.id" class="col" :style="{ '--d': i * 70 + 'ms' }">
        <ProductCard :product="p" @add="agregar" />
      </div>
    </TransitionGroup>
  </div>
</template>
