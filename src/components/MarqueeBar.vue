<script setup>
const frases = ['Drop 27 ya disponible', 'Envío en 48 horas', 'Cambios hasta 15 días', 'Hecho para caminar Bogotá', 'Pago contra entrega']
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee-track">
      <span v-for="(f, i) in [...frases, ...frases]" :key="i">{{ f }} <i class="bi bi-asterisk"></i></span>
    </div>
  </div>
</template>
