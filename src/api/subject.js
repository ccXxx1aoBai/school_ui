import request from '@/utils/request'

export const addSubject = (data) => {
  return request({
    url: '/subject',
    method: 'post',
    data
  })
}

export const getSubjectList = (params) => {
  return request({
    url: '/subject',
    method: 'get',
    params
  })
}

export const updateSubject = (data) => {
  return request({
    url: '/subject',
    method: 'put',
    data
  })
}

export const delSubject = (id) => {
  return request({
    url: `/subject/${id}`,
    method: 'delete'
  })
}

export const getSignRecord = (params) => {
  return request({
    url: '/subject/sign/list',
    method: 'get',
    params
  })
}