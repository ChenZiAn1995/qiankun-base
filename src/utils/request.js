import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, setToken } from '@/utils/token'

console.log('process.env: ', process.env)
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 判断是否有token 有token就在头里面设置token
    if (getToken()) {
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  (response) => {
    // 判断请求头是否有newtoken,有则替换登录接口返回的token
    response.headers.newtoken ? setToken(response.headers.newtoken) : null
    // console.log(response);
    return response.data
  },
  (error) => {
    let status = 0
    try {
      status = error.response.status
    } catch (e) {
      if (error.toString().indexOf('Error: timeout') !== -1) {
        Message({
          message: '网络请求超时！',
          type: 'error',
          duration: 3000
        })
        return Promise.reject(error)
      }
      if (error.toString().indexOf('Error: Network Error') !== -1) {
        Message({
          message: '网络请求错误！',
          type: 'error',
          duration: 3000
        })
        return Promise.reject(error)
      }
    }

    if (status == 403) {
      Message({
        message: '您没有此权限！',
        type: 'error',
        duration: 3000
      })
    } else if (status == 401) {
      MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('logout').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
    } else {
      Message({
        message: '网络异常请重试',
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error.response)
  }
)

export default service
