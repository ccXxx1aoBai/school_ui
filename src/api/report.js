import request from '@/utils/request'

export const getReportList = (params) => {
  return request({
    url: '/report',
    method: 'get',
    params
  })
}

export const addBan = (data) => {
  return request({
    url: '/report/ban',
    method: 'post',
    data
  })
}