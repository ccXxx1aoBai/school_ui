import request from '@/utils/request'

export const geneCode = () => {
  return request({
    url: '/code',
    method: 'get',
    responseType: 'blob'
  })
}

export const login = (data) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export const getPositionList = () => {
  return request({
    url: '/getPosition',
    method: 'get'
  })
}