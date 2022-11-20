import request from '@/utils/request'

/**
 * 获取教室列表
 * @param {current, size, siftName} {分页当前页，页大小，教室名称} 
 * @returns 
 */
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

/**
 * 添加教室
 * @param {roomForm} 表单 
 * @returns 
 */
export const addRoom = (data) => {
  return request({
    url: '/room',
    method: 'post',
    data
  })
}

/**
 * 修改教室信息
 * @param {roomForm} 表单 
 * @returns 
 */
 export const updateRoom = (data) => {
  return request({
    url: '/room',
    method: 'put',
    data
  })
}

/**
 * 删除教室信息
 * @param {id} 教室编号
 * @returns 
 */
export const delRoom = (id) => {
  return request({
    url: `/room/${id}`,
    method: 'delete'
  })
}