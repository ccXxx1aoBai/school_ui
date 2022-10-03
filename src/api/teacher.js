import request from '@/utils/request'

export const getTeacherList = (parms) => {
  const params = new URLSearchParams()
  Object.keys(parms).forEach(key => {
    params.append(key, parms[key])
  })
  return request({
    url: '/teacher',
    method: 'get',
    params
  })
}

export const addTeacher = (data) => {
  return request({
    url: '/teacher',
    method: 'post',
    data
  })
}

export const updateTeacher = (data) => {
  return request({
    url: '/teacher',
    method: 'put',
    data
  })
}

export const delTeacher = (id) => {
  return request({
    url: '/teacher/' + id,
    method: 'delete',
  })
}