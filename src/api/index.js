import request from '@/utils/request'

export const geneCode = () => {
  return request({
    url: '/code',
    method: 'get',
    responseType: 'blob'
  })
}

export const login = (data) => {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export const getPositionList = () => {
  return request({
    url: '/getPosition',
    method: 'get'
  })
}

export const uploadImage = (file, paramsObj) => {
  const {uid, type} = paramsObj
  return request({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    url: '/file/upload/image',
    method: 'post',
    data: {
      file,
      uid,
      type
    }
  })
}

export const getSysAvatar = () => {
  return request({
    url: '/file/avatar',
    method: 'get'
  })
}

export const delSysAvatar = (id) => {
  return request({
    url: `/file/avatar/${id}`,
    method: 'delete'
  })
}