import request from '@/utils/request'

export const getRoleList = (data) => {
  const params = new URLSearchParams()
  params.append('name', data.name)
  return request({
    url: '/role',
    method: 'get',
    params
  })
}

export const updateRoleInfo = (data) => {
  return request({
    url: '/role',
    method: 'put',
    data
  })
}

export const addRole = (data) => {
  return request({
    url: '/role',
    method: 'post',
    data
  })
}

export const delRole = (id) => {
  return request({
    url: '/role/' + id,
    method: 'delete'
  })
}

export const getRoleOption = () => {
  return request({
    url: '/role/all',
    method: 'get'
  })
}