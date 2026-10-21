<script setup>
import ProductImg from './ProductImg.vue'
import { moneda } from '../utils/format'
defineProps({ product: { type: Object, required: true } })
defineEmits(['add'])
</script>

<template>
  <article class="p-card">
    <div class="p-media">
      <ProductImg :product="product" />
      <span v-if="product.etiqueta" class="tag" :class="{ hot: product.etiqueta === 'HOT' }">{{ product.etiqueta }}</span>
    </div>
    <div class="p-body">
      <small class="text-secondary">{{ product.categoria }}</small>
      <h2 class="p-name">{{ product.nombre }}</h2>
      <p class="p-desc">{{ product.descripcion }}</p>
      <div class="d-flex justify-content-between align-items-center mt-auto pt-2">
        <strong class="p-price">{{ moneda(product.precio) }}</strong>
        <button class="btn-ink" @click="$emit('add', product)"><i class="bi bi-bag-plus me-1"></i>Agregar</button>
      </div>
    </div>
  </article>
</template>
