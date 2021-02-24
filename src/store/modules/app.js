import Cookies from 'js-cookie'
import Layout from '@/layout/index'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  sidebarList: [
    {
      title: '看板',
      path: '/dashboard',
      children: [
        {
          title: '系统',
          path: 'dashboard'
        }
      ]
    },
    {
      title: '旧系统',
      path: '/old/',
      children: [
        {
          title: '系统',
          path: 'dashboard'
        }
      ]
    },
    {
      title: '数据',
      path: '/app/dc',
      children: [
        {
          path: '/app/dc',
          title: '数据看板'
        }
      ]
    }
  ]
}

const mutations = {
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
