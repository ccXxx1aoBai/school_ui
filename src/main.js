import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import '@/assets/css/element-variables.scss'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
