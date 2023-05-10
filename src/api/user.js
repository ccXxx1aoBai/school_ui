import request from '@/utils/request'

/**
 * 获取用户列表
 * @param {*} params 
 * @returns 
 */
export const getUserList = (params) => {
  return request({
    url: '/user',
    method: 'get',
    params
  })
}