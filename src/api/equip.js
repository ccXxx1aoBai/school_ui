import request from '@/utils/request'

/**
 * 获取设备类型
 * @returns 
 */
export const getEquipType = () => {
  return request({
    url: 'equip/type',
    method: 'get'
  })
}