import request from '@/utils/request'

export const getRoutes = (data) => {
  const params = new URLSearchParams()
  params.append('uid', data)
  return request({
    url: '/menu/routes',
    method: 'get',
    params
  })
}

export const getMenuList = (data) => {
  const params = new URLSearchParams()
  Object.keys(data).forEach(key => {
    params.append(key, data[key])
  })
  return request({
    url: '/menu',
    method: 'get',
    params
  })
}

export const getAllMenu = () => {
  return request({
    url: '/menu/all',
    method: 'get'
  })
}

export const updateMenu = (data) => {
  return request({
    url: '/menu',
    method: 'put',
    data
  })
}

export const addMenu = (data) => {
  return request({
    url: '/menu',
    method: 'post',
    data
  })
}

export const delMenu = (id) => {
  return request({
    url: '/menu/' + id,
    method: 'delete'
  })
}

export const lockMenu = (id) => {
  return request({
    url: '/menu/lock/' + id,
    method: 'put'
  })
}