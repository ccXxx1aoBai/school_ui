import request from '@/utils/request'

export const getStudent = (paramsObj) => {
  const params = new URLSearchParams()
  Object.keys(paramsObj).forEach(key => {
    params.append(key, paramsObj[key])
  })
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