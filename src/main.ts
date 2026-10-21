import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import '@fontsource-variable/inter'
import '@fontsource-variable/source-serif-4'
import '@fontsource-variable/jetbrains-mono'

import './assets/styles/index.scss'

createApp(App).use(createPinia()).use(router).mount('#app')
