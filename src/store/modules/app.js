import Cookies from 'js-cookie'
import Layout from '@/layout/index'
import { getBaseInfoSet } from '@/api/system'
import { loadView } from '@/store/modules/permission'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  baseinfoset: false,
  menus: undefined
}

const mutations = {
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_BASEINFO_SET: (state, baseinfoset) => {
    state.baseinfoset = baseinfoset
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  }
}

const actions = {
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  /**
   * 查询基础配置信息
   */
  getBaseInfoSet({ commit }) {
    return new Promise((resolve, reject) => {
      getBaseInfoSet()
        .then((response) => {
          commit('SET_BASEINFO_SET', response)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

export const filterMenus = (routers, mergeRouters) => {
  // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = routers.map((router, index) => {
    let menus = {
      title: (router.meta && router.meta.title) || '未知',
      path: mergeRouters ? (mergeRouters += `/${router.path}`) : router.path,
      hidden: router.hidden ? router.hidden : false,
      moduleUrl: router.moduleUrl
    }
    if (!mergeRouters) {
      menus.activeMoudleIdx = index
    }
    /* 递归处理 */
    if (router.children && router.children.length) {
      menus.children = filterMenus(router.children, menus.path)
    }
    return menus
  })
  return accessedRouters
}
