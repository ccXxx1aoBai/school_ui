import request from '@/utils/request'

export const addLeave = (data) => {
  return request({
    url: '/leave',
    method: 'post',
    data
  })
}

export const getLeaveList = (uid, current, size) => {
  const params = new URLSearchParams()
  params.append('current', current)
  params.append('size', size)
  return request({
    url: `/leave/${uid}`,
    method: 'get',
    params
  })
}