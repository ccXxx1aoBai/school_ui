import request from '@/utils/request'

export const getForumList = (paramObj) => {
  const params = new URLSearchParams()
  Object.keys(paramObj).forEach(key => {
    params.append(key, paramObj[key])
  })
  return request({
    url: '/forum',
    method: 'get',
    params
  })
}

export const forumApprove = (data) => {
  return request({
    url: '/forum/approve',
    method: 'post',
    data
  })
}