import request from '@/utils/request'
import AES from '@/utils/AES'
/**
 * 用户登录
 * @param data
 */
export function login(data) {
  data = AES.encrypt(data)
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

/**
 * 获得用户信息
 */
export function getInfo() {
  return request({
    url: '/managerinfo',
    method: 'get'
  })
}

/**
 * 获得用户的菜单
 */
export function getMenus() {
  return request({
    url: '/managermenus',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
