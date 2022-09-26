import request from '@/utils/request'

export const getEquipType = () => {
  return request({
    url: 'equip/type',
    method: 'get'
  })
}