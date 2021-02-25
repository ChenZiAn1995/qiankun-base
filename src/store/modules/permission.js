import { constantRouterMap } from '@/router'
import Layout from '@/layout'

const permission = {
  namespaced: true,
  state: {
    routers: constantRouterMap, // 最终的路由
    addRouters: [] // 后台动态新增的路由
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    generateRoutes({ commit }, asyncRouter) {
      commit('SET_ROUTERS', asyncRouter)
    }
  }
}

export const filterAsyncRouter = (routers, upperRouters) => {
  // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = routers.filter((router) => {
    if (router.component) {
      if (router.component === 'Layout') {
        // Layout组件特殊处理
        router.component = Layout
      } else {
        const component = router.component
        router.component = loadView(component)
      }
    }
    /* 加入模块值 */
    if (upperRouters) {
      router.meta.moduleUrl = '/alient/dc'
    } else {
      router.path = '/client/old' + router.path
    }
    /* 递归处理 */
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children, router)
    }
    return true
  })
  return accessedRouters
}

export const loadView = (view) => {
  // 路由懒加载
  return () => import(`@/views/${view}`)
}

export default permission
