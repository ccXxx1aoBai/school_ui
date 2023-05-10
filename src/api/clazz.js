import request from '@/utils/request'

/**
 * 
 * @param {current, size, siftDept, siftName} {分页当前页，分页大小，所属学院，班级名称} 
 * @returns 
 */
export const getClazzList = (params) => {
  return request({
    url: '/clazz',
    method: 'get',
    params
  })
}

/**
 * 
 * @param {form} 表单 
 * @returns 
 */
export const addClazz = (data) => {
  return request({
    url: '/clazz',
    method: 'post',
    data
  })
}

/**
 * 
 * @param {form} 表单 
 * @returns 
 */
 export const updateClazz = (data) => {
  return request({
    url: '/clazz',
    method: 'put',
    data
  })
}

/**
 * 
 * @param {id} 主键 
 * @returns 
 */
 export const delClazz = (id) => {
  return request({
    url: `/clazz/${id}`,
    method: 'delete'
  })
}