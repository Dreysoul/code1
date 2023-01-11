
import '../src/assets/css/global.css'
import 'reset-css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SlideVerify from 'vue-monoplasty-slide-verify';

Vue.use(SlideVerify);
Vue.config.productionTip = false

// axios.defaults.baseURL = 'http://kumanxuan1.f3322.net:8881/cms'
// Vue.prototype.axios = axios
Vue.prototype.imgURL='http://sc.wolfcode.cn'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
