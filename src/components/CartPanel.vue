<script setup>
defineProps({
  items: { type: Array, default: () => [] },
  total: { type: Number, default: 0 }
})
defineEmits(['increase', 'decrease', 'remove'])
const moneda = n => n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
</script>

<template>
  <div class="card border-dark position-sticky" style="top: 1rem">
    <div class="card-header bg-dark text-white fw-bold">
      <i class="bi bi-cart3 me-2"></i>Resumen de compra
    </div>

    <div class="card-body">
      <p v-if="items.length === 0" class="text-muted mb-0">
        Tu carrito está vacío. Agrega productos desde el catálogo.
      </p>

      <ul v-else class="list-group list-group-flush">
        <li v-for="i in items" :key="i.id" class="list-group-item px-0">
          <div class="d-flex justify-content-between">
            <span class="fw-semibold">{{ i.nombre }}</span>
            <button class="btn btn-sm btn-outline-danger" title="Eliminar" @click="$emit('remove', i)">
              <i class="bi bi-trash"></i>
            </button>
          </div>
          <small class="text-muted">{{ moneda(i.precio) }} c/u</small>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <div class="btn-group btn-group-sm" role="group" aria-label="Cantidad">
              <button class="btn btn-outline-dark" :disabled="i.cantidad === 1" @click="$emit('decrease', i.id)">−</button>
              <span class="btn btn-light disabled">{{ i.cantidad }}</span>
              <button class="btn btn-outline-dark" @click="$emit('increase', i.id)">+</button>
            </div>
            <span class="fw-bold">Subtotal: {{ moneda(i.precio * i.cantidad) }}</span>
          </div>
        </li>
      </ul>
    </div>

    <div v-if="items.length" class="card-footer d-flex justify-content-between fw-bold fs-5">
      <span>Total</span><span>{{ moneda(total) }}</span>
    </div>
  </div>
</template>
