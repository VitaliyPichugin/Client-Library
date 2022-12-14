import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

window.axios = require('axios');

window.api = process.env.VUE_APP_API;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
