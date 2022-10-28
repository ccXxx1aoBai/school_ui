import request from '@/utils/request'

export const addNotice = (data) => {
  return request({
    url: '/notice',
    method: 'post',
    data
  })
}

export const getNotice = (paramsObj) => {
  const params = new URLSearchParams()
  Object.keys(paramsObj).forEach(key => {
    params.append(key, paramsObj[key])
  })
  return request({
    url: '/notice',
    method: 'get',
    params
  })
}