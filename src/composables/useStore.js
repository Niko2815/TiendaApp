// Estado compartido (productos + carrito) para todas las vistas.
import { ref, computed } from 'vue'
import { getProducts } from '../services/productService'

const productos = ref([])
const cargando = ref(false)
const error = ref('')
const carrito = ref([])
const bolsaAbierta = ref(false)
const aviso = ref('')
let timer

const total = computed(() => carrito.value.reduce((s, i) => s + i.precio * i.cantidad, 0))
const totalUnidades = computed(() => carrito.value.reduce((s, i) => s + i.cantidad, 0))

async function cargar(forzar = false) {
  if (productos.value.length && !forzar) return
  cargando.value = true
  error.value = ''
  try {
    productos.value = await getProducts()
  } catch (e) {
    error.value = 'No fue posible cargar los productos.'
  } finally {
    cargando.value = false
  }
}
function agregar(producto) {
  const existente = carrito.value.find(i => i.id === producto.id)
  if (existente) existente.cantidad++
  else carrito.value.push({ ...producto, cantidad: 1 })
  aviso.value = `${producto.nombre} ya está en tu bolsa`
  clearTimeout(timer)
  timer = setTimeout(() => (aviso.value = ''), 2600)
}
const aumentar = id => carrito.value.find(i => i.id === id).cantidad++
const disminuir = id => {
  const item = carrito.value.find(i => i.id === id)
  if (item.cantidad > 1) item.cantidad--
}
function eliminar(item) {
  if (!window.confirm(`¿Quitar "${item.nombre}" de tu bolsa?`)) return
  carrito.value = carrito.value.filter(i => i.id !== item.id)
}

export const useStore = () => ({
  productos, cargando, error, carrito, bolsaAbierta, aviso,
  total, totalUnidades, cargar, agregar, aumentar, disminuir, eliminar
})
