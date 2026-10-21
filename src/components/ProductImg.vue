<script setup>
import { ref, computed } from 'vue'
const props = defineProps({ product: { type: Object, required: true } })
const paso = ref(0)
const fuentes = computed(() => [props.product.foto, props.product.fotoRemota, props.product.arte])
const src = computed(() => fuentes.value[paso.value])
const fallo = () => { if (paso.value < 2) paso.value++ }
</script>

<template>
  <img :src="src" :alt="product.nombre" loading="lazy" @error="fallo" />
</template>
