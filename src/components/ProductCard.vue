<script setup>
defineProps({ product: { type: Object, required: true } })
defineEmits(['add'])
const moneda = n => n.toLocaleString('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 })
</script>

<template>
  <div class="card h-100 border-dark product-card">
    <img :src="product.imagen" class="card-img-top" :alt="product.nombre" />
    <div class="card-body d-flex flex-column">
      <span class="badge text-bg-dark align-self-start mb-2">{{ product.categoria }}</span>
      <h2 class="h6 card-title">{{ product.nombre }}</h2>
      <p class="fw-bold mb-3">{{ moneda(product.precio) }}</p>
      <button class="btn btn-warning mt-auto" @click="$emit('add', product)">
        <i class="bi bi-bag-plus me-1"></i>Agregar al carrito
      </button>
    </div>
  </div>
</template>
