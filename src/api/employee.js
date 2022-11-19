import request from '@/utils/request'

/**
 * 获取员工列表
 * @param {current, size, name, type} {分页当前页，分页大小，员工名称，工种} 
 * @returns 
 */
export const getEmployeeList = (parms) => {
  const params = new URLSearchParams()
  params.append('current', parms.current)
  params.append('size', parms.size)
  params.append('name', parms.name)
  params.append('type', parms.type)
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

export const addEmployee = (data) => {
  return request({
    url: '/employee',
    method: 'post',
    data
  })
}

export const updateEmployee = (data) => {
  return request({
    url: '/employee',
    method: 'put',
    data
  })
}

export const delEmployee = (id) => {
  return request({
    url: `/employee/${id}`,
    method: 'delete'
  })
}