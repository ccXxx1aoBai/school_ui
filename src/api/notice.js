import request from '@/utils/request'

export const addNotice = (data) => {
  return request({
    url: '/notice',
    method: 'post',
    data
  })
}

export const getNotice = (params) => {
  return request({
    url: '/notice',
    method: 'get',
    params
  })
}

export const getDetail = (id) => {
  return request({
    url: `/notice/detail/${id}`,
    method: 'get'
  })
}

export const updateNotice = (data) => {
  return request({
    url: '/notice',
    method: 'put',
    data
  })
}

export const delNotice = (id) => {
  return request({
    url: `/notice/${id}`,
    method: 'delete'
  })
}