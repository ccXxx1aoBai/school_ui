import request from '@/utils/request'

export const getDepartmentList = () => {
  return request({
    url: '/department',
    method: 'get'
  })
}