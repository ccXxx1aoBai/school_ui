import request from '@/utils/request'

export const getReportList = (paramObj) => {
  const params = new URLSearchParams()
  Object.keys(paramObj).forEach(key => {
    params.append(key, paramObj[key])
  })
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