import { createApp } from 'vue'
import '@/assets/index.css'
import App from './App.vue'
import {router} from "@/routes/index.route"
import 'remixicon/fonts/remixicon.css'
import { TOKEN } from './services/token.services'
import { createPinia } from 'pinia'

TOKEN()
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
