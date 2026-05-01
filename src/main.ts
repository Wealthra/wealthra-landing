import './assets/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

import { createApp } from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faArrowUp,
  faCheck,
  faXmark,
  faSun,
  faMoon,
  faLanguage,
  faGlobe
} from '@fortawesome/free-solid-svg-icons'

import App from './App.vue'
import router from './router'

library.add(
  faArrowUp,
  faCheck,
  faXmark,
  faSun,
  faMoon,
  faLanguage,
  faGlobe
)

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.mount('#app')
