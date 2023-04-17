import axios from 'axios'
import { Notification, MessageBox } from 'element-ui'
import Prompt from './enum'
import store from '@/store'

const baseURL = 'http://127.0.0.1:6350/school'
// const baseURL = 'http://localhost:9090'

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'

const service = axios.create({
  baseURL,
  timeout: 30 * 1000
})

service.interceptors.request.use(
  config => {
    const token = store.getters.token
    const uuid = localStorage.getItem('uuid')
    token && (config.headers.token = token)
    uuid && (config.headers.uuid = uuid)
    return config
  },
  error => {
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  res => {
    const {code, msg} = res.data
    if(res.data.code === 200 || code === void 0) {
      successNotification(msg)
      store.dispatch('storeToken', res.headers.token)
      return res
    }
    warnNotification(msg)
  },
  error => {
    if(error.name == 'AxiosError') {
      sysNotification('请求超时')
      return
    }
    const {status} = error.response
    if(status === 400){
      sysNotification('参数错误')
    }else if(status === 401) {
      MessageBox('身份已过期，请重新登陆', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        window.location.href = '/'
      }).catch(() => {
        window.location.href = '/'
      })
    }else if(status === 403) {
      sysNotification(Prompt.ACCESS_PERMISSIONS)
    }else if(status === 404) {
      sysNotification(Prompt.RESOURCE_NO_EXIST)
    }else if(status === 500) {
      sysNotification(Prompt.SYS_ERROR)
    }else if(error.code == 'ERR_NETWORK'){
      sysNotification(Prompt.NETWORK_ERROR)
    }else if(error.code == 'ERR_BAD_RESPONSE'){
      sysNotification(Prompt.SYS_ERROR)
    }
    Promise.reject(error)
  }
)

const successNotification = (desc => {
  if(desc) {
    Notification.success({
      title: '系统提示',
      message: desc,
      showClose: false
    })
  }
}) 

const warnNotification = (desc => {
  Notification.warning({
    title: '系统提示',
    message: desc,
    showClose: false
  })
})
const sysNotification = (desc => {
  Notification.error({
    title: '系统提示',
    message: desc,
    showClose: false
  })
})

export default service