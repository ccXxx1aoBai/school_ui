import request from '@/utils/request'


export const addDict = (data) => {
  return request({
    url: '/dict',
    method: 'post',
    data
  })
}


export const getDict = (paramsObj) => {
  const params = new URLSearchParams()
  Object.keys(paramsObj).forEach(key => {
    params.append(key, paramsObj[key])
  })
  return request({
    url: '/dict',
    method: 'get',
    params
  })
}

export const updateDict = (data) => {
  return request({
    url: '/dict',
    method: 'put',
    data
  })
}

export const delDict = (id) => {
  return request({
    url: `/dict/${id}`,
    method: 'delete'
  })
}