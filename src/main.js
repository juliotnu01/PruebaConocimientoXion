import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'

Vue.config.productionTip = false
window.toastr = require('toastr')
 
Vue.use(VueToastr2)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
