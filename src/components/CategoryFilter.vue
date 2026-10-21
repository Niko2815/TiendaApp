<script setup>
defineProps({ categories: { type: Array, default: () => [] }, active: { type: String, default: 'Todos' } })
defineEmits(['select'])
</script>

<template>
  <div class="d-flex flex-wrap gap-2">
    <button v-for="c in categories" :key="c" class="pill" :class="{ on: active === c }" @click="$emit('select', c)">
      {{ c }}
    </button>
  </div>
</template>
