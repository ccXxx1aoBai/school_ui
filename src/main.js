import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import '@/assets/css/element-variables.scss'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
