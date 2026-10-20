import { createApp } from 'vue'
import router from './router' // conserva el enrutador existente

// Orden importante: Bootstrap primero, estilos propios después
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './style.css'

import App from './App.vue'

createApp(App).use(router).mount('#app')
