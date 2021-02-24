import request from '@/utils/request'
/**
 * 获得基本信息
 */
export function getBaseInfoSet() {
  return request({
    url: '/baseinfoset',
    method: 'get'
  })
}
