import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import '@/assets/css/element-variables.scss'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store

Vue.use(ElementUI, {size: 'small'});

let loading
Vue.prototype.$fullLoading = {
  load: () => {
    loading = new Vue().$loading({
      lock: true,
      text: '加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  },
  close: () => {
    loading.close()
  }
}

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
