import request from '@/utils/request'

export const getRoleList = () => {
  return request({
    url: '/role',
    method: 'get'
  })
}