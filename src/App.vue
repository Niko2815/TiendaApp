<script setup>
// App.vue = componente raíz: guarda el estado (ref), los cálculos (computed)
// y la lógica del carrito. Los hijos reciben datos por props y avisan por emits.
import { ref, computed, onMounted } from 'vue'
import { getProducts } from './services/productService'
import CategoryFilter from './components/CategoryFilter.vue'
import ProductCard from './components/ProductCard.vue'
import CartPanel from './components/CartPanel.vue'

const productos = ref([])
const carrito = ref([])
const categoriaActiva = ref('Todos')
const cargando = ref(false)
const error = ref('')
const mensaje = ref('')

const categorias = computed(() => ['Todos', ...new Set(productos.value.map(p => p.categoria))])
const productosFiltrados = computed(() =>
  categoriaActiva.value === 'Todos'
    ? productos.value
    : productos.value.filter(p => p.categoria === categoriaActiva.value)
)
const total = computed(() => carrito.value.reduce((s, i) => s + i.precio * i.cantidad, 0))
const totalUnidades = computed(() => carrito.value.reduce((s, i) => s + i.cantidad, 0))

async function cargarProductos() {
  cargando.value = true
  error.value = ''
  try {
    productos.value = await getProducts()
  } catch (e) {
    error.value = 'No fue posible cargar los productos. Intenta nuevamente.'
  } finally {
    cargando.value = false
  }
}

function avisar(texto) {
  mensaje.value = texto
  setTimeout(() => (mensaje.value = ''), 2500)
}

function agregar(producto) {
  const existente = carrito.value.find(i => i.id === producto.id)
  if (existente) existente.cantidad++
  else carrito.value.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 })
  avisar(`${producto.nombre} agregado al carrito.`)
}
// RETO Grupo 2: + / − (mínimo 1) y eliminar como acción independiente
function aumentar(id) {
  carrito.value.find(i => i.id === id).cantidad++
}
function disminuir(id) {
  const item = carrito.value.find(i => i.id === id)
  if (item.cantidad > 1) item.cantidad--
}
function eliminar(item) {
  if (!window.confirm(`¿Eliminar "${item.nombre}" del carrito?`)) return
  carrito.value = carrito.value.filter(i => i.id !== item.id)
}

onMounted(cargarProductos)
</script>

<template>
  <nav class="navbar navbar-dark bg-dark shadow-sm mb-4">
    <div class="container">
      <span class="navbar-brand fw-bold"><i class="bi bi-lightning-charge-fill text-warning me-2"></i>Calle 27</span>
      <span class="badge text-bg-warning fs-6"><i class="bi bi-cart3 me-1"></i>{{ totalUnidades }}</span>
    </div>
  </nav>

  <main class="container pb-5">
    <div v-if="mensaje" class="alert alert-success py-2" role="status">{{ mensaje }}</div>
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }} <button class="btn btn-sm btn-outline-danger ms-2" @click="cargarProductos">Reintentar</button>
    </div>

    <div class="row g-4">
      <section class="col-12 col-lg-8">
        <CategoryFilter :categories="categorias" :active="categoriaActiva" @select="categoriaActiva = $event" />

        <div v-if="cargando" class="text-center py-5">
          <div class="spinner-border text-dark" role="status"><span class="visually-hidden">Cargando...</span></div>
          <p class="mt-2 mb-0">Cargando productos...</p>
        </div>

        <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-3">
          <div v-for="p in productosFiltrados" :key="p.id" class="col">
            <ProductCard :product="p" @add="agregar" />
          </div>
        </div>
      </section>

      <aside class="col-12 col-lg-4">
        <CartPanel
          :items="carrito"
          :total="total"
          @increase="aumentar"
          @decrease="disminuir"
          @remove="eliminar"
        />
      </aside>
    </div>
  </main>
</template>
