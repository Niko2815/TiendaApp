<script setup>
defineProps({
  categories: { type: Array, default: () => [] },
  active: { type: String, default: 'Todos' }
})
defineEmits(['select'])
</script>

<template>
  <div class="d-flex flex-wrap gap-2 mb-3">
    <button
      v-for="c in categories" :key="c"
      class="btn btn-sm"
      :class="active === c ? 'btn-dark' : 'btn-outline-dark'"
      @click="$emit('select', c)"
    >{{ c }}</button>
  </div>
</template>
