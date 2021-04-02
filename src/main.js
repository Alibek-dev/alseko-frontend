import Vue from 'vue'
import App from './App.vue'
import Vuetify from "vuetify";
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.min.css'
import Vuelidate from "vuelidate/src";


Vue.config.productionTip = false

Vue.use(Vuetify)
Vue.use(Vuelidate)

new Vue({
  vuetify: new Vuetify(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
