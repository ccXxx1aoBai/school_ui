import request from '@/utils/request'

export const addLeave = (data) => {
  return request({
    url: '/leave',
    method: 'post',
    data
  })
}

export const getLeaveList = (uid) => {
  return request({
    url: `/leave/${uid}`,
    method: 'get'
  })
}