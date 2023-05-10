import request from '@/utils/request'

export const addStudyRoom = (data) => {
  return request({
    url: '/study',
    method: 'post',
    data
  })
}

export const getStudyList = (params) => {
  return request({
    url: '/study',
    method: 'get',
    params
  })
}

export const delStudyRoom = (id) => {
  return request({
    url: `/study/${id}`,
    method: 'delete'
  })
}