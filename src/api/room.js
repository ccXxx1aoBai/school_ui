import request from '@/utils/request'

export const getRoom = (paramsObj) => {
  const params = new URLSearchParams()
  Object.keys(paramsObj).forEach(key => {
    params.append(key, paramsObj[key])
  })
  return request({
    url: 'room',
    method: 'get',
    params
  })
}