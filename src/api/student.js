import request from '@/utils/request'

export const getStudent = (params) => {
  return request({
    url: '/student',
    method: 'get',
    params
  })
}

export const delStudent = (id) => {
  return request({
    url: `/student/${id}`,
    method: 'delete'
  })
}