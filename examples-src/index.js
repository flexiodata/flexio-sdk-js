import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'
import App from './App.vue'

// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS)

const app = new Vue({
  el: '#app',
  render: h => h(App)
})
