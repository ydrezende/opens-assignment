import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.apiUrl = process.env.VUE_APP_API_URL;

new Vue({
  render: h => h(App),
}).$mount('#app')
