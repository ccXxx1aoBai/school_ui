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