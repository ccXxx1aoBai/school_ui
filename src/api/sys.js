import request from '@/utils/request'

export const getSysInfo = () => {
  return request({
    url: '/sys',
    method: 'get'
  })
}

export const getCpuRate = () => {
  return request({
    url: '/sys/cpu',
    method: 'get'
  })
}

export const getNetInfo = () => {
  return request({
    url: '/sys/net',
    method: 'get'
  })
}

export const getMemory = () => {
  return request({
    url: '/sys/memory',
    method: 'get'
  })
}

export const getLogList = (params) => {
  const param = new URLSearchParams()
  param.append("current", params.page)
  param.append("size", params.size)
  return request({
    url: '/log',
    method: 'get',
    params: param
  })
}