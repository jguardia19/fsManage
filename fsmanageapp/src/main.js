import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import store from './store'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))

//import templates
import LoginLayout from './layout/LoginLayout.vue'
import DasboardLayout from './layout/DasboardLayout.vue'

Vue.component('login-layout', LoginLayout);
Vue.component('dasboard-layout', DasboardLayout); 

// axios.defaults.baseURL = 'http://localhost:5000/';


Vue.config.productionTip = false


new Vue({
  router,
  vuetify,
  axios,
  store,
  render: h => h(App)
}).$mount('#app')
