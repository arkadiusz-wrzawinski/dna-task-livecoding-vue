import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { clickOutside } from '@/directives/clickOutside.directive'

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin)
app.directive('clickOutside', clickOutside)

app.mount('#app')
