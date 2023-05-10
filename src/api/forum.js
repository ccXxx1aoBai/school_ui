import request from '@/utils/request'

export const getForumList = (params) => {
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