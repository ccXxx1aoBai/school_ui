import request from '@/utils/request'

export const addNotice = (data) => {
  return request({
    url: '/notice',
    method: 'post',
    data
  })
}