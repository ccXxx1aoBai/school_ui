import request from '@/utils/request'

/**
 * 获取员工列表
 * @param {current, size, name, type} {分页当前页，分页大小，员工名称，工种} 
 * @returns 
 */
export const getEmployeeList = (params) => {
  return request({
    url: '/employee',
    method: 'get',
    params
  })
}

/**
 * 获取员工类型
 * @returns 
 */
export const getEmployeeType = () => {
  return request({
    url: '/employee/type',
    method: 'get'
  })
}

/**
 * 新增员工
 * @param {empForm} 员工信息表单 
 * @returns 
 */
export const addEmployee = (data) => {
  return request({
    url: '/employee',
    method: 'post',
    data
  })
}

/**
 * 修改员工信息
 * @param {empForm} 员工信息表单 
 * @returns 
 */
export const updateEmployee = (data) => {
  return request({
    url: '/employee',
    method: 'put',
    data
  })
}

/**
 * 删除员工
 * @param {id} 员工ID
 * @returns 
 */
export const delEmployee = (id) => {
  return request({
    url: `/employee/${id}`,
    method: 'delete'
  })
}

export const getEmpByType = () => {
  return request({
    url: '/employee/repair',
    method: 'get'
  })
}