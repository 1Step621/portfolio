import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue'

import App from './App.vue'
import router from './router'
import Tres from '@tresjs/core'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(Tres)
app.use(head)

app.mount('#app')
