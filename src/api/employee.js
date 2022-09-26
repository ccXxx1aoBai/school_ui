import request from '@/utils/request'

export const getEmployeeList = (parms) => {
  const params = new URLSearchParams()
  params.append('current', parms.current)
  params.append('size', parms.size)
  params.append('name', parms.name)
  params.append('type', parms.type)
  return request({
    url: 'employee',
    method: 'get',
    params
  })
}