import { createApp } from 'vue'
import App from './App.vue'

import TheSearch from './components/TheSearch.vue'

const app = createApp(App)

app.component('the-search', TheSearch)

app.mount('#app')
