import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import '@/assets/css/element-variables.scss'
import router from '@/router'
import store from '@/store'
import { Notification } from 'element-ui'
import { FILE_BASE_URL } from '@/utils/config'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.FILE_BASE_URL = FILE_BASE_URL

Vue.use(ElementUI, {size: 'small'});

let loading
Vue.prototype.$fullLoading = {
  load: (message = '加载中') => {
    loading = new Vue().$loading({
      lock: true,
      text: message,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  },
  close: () => {
    loading && loading.close()
  }
}

const ws = new WebSocket('ws://127.0.0.1:9090/notice/push')
ws.onopen = (res) => {
  console.log('连接成功');
}
ws.onerror = (err) => {
  console.log('连接失败');
}
ws.onmessage = (msg) => {
  console.log(msg);
  Notification.info({
    title: '系统提示',
    message: '您有一条新消息',
    showClose: false,
    position: 'top-right'
  })
  store.dispatch('NOTICE_TOTAL', 1)
}

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
