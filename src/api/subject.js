import request from '@/utils/request'

export const addSubject = (data) => {
  return request({
    url: '/subject',
    method: 'post',
    data
  })
}

export const getSubjectList = (paramObj) => {
  const params = new URLSearchParams()
  Object.keys(paramObj).forEach(key => {
    params.append(key, paramObj[key])
  })
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

export const getSignRecord = (paramObj) => {
  const params = new URLSearchParams()
  Object.keys(paramObj).forEach(key => {
    params.append(key, paramObj[key])
  })
  return request({
    url: '/subject/sign/list',
    method: 'get',
    params
  })
}