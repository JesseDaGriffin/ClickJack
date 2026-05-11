import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueConfetti from 'vue-confetti'

import './clickJack.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.use(VueConfetti)
app.mount('#app')
