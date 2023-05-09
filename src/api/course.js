import request from '@/utils/request'

export const arrangeCourse = (data) => {
  return request({
    url: '/course',
    method: 'post',
    data
  })
}

export const getCourseList = (paramObj) => {
  const params = new URLSearchParams()
  Object.keys(paramObj).forEach(key => {
    params.append(key, paramObj[key])
  })
  return request({
    url: '/course',
    method: 'get',
    params
  })
}

export const delCourse = (id) => {
  return request({
    url: `/course/${id}`,
    method: 'delete'
  })
}

export const getYearList = () => {
  return request({
    url: '/course/year',
    method: 'get'
  })
}

export const getStudentCourse = (paramObj) => {
  const params = new URLSearchParams()
  Object.keys(paramObj).forEach(key => {
    params.append(key, paramObj[key])
  })
  return request({
    url: '/course/pc',
    method: 'get',
    params
  })
}

export const getTeacherCourse = (paramObj) => {
  const params = new URLSearchParams()
  Object.keys(paramObj).forEach(key => {
    params.append(key, paramObj[key])
  })
  return request({
    url: '/course/forteacher',
    method: 'get',
    params
  })
}