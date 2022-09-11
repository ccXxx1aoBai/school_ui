import request from '@/utils/request'

// 获取用户列表
export const getUserList = (params) => {
  const param = new URLSearchParams()
  Object.keys(params).forEach(key => {
    param.append(key, params[key])
  })
  return request({
    url: '/user',
    method: 'get',
    params: param
  })
}