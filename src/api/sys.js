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

export const getLogList = (paramObj) => {
  const params = new URLSearchParams()
  params.append("current", paramObj.current)
  params.append("size", paramObj.size)
  return request({
    url: '/log',
    method: 'get',
    params
  })
}