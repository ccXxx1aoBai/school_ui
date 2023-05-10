import request from '@/utils/request'

export const getGradeList = (id) => {
  return request({
    url: `/score/utils/${id}`,
    method: 'get'
  })
}

export const getScoreList = (params) => {
  return request({
    url: '/score',
    method: 'get',
    params
  })
}

export const getStundentList = (params) => {
  return request({
    url: '/score/student',
    method: 'get',
    params
  })
}

export const addScore = (data) => {
  return request({
    url: '/score',
    method: 'post',
    data
  })
}

export const updateScore = (data) => {
  return request({
    url: '/score',
    method: 'put',
    data
  })
}

export const delScore = (id) => {
  return request({
    url: `/score/${id}`,
    method: 'delete'
  })
}