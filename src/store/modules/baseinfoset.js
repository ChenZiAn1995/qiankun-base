import { getBaseInfoSet } from '@/api/system'

const baseinfoset = {
  namespaced: true,
  state: {
    baseinfoset: false
  },
  mutations: {
    SET_BASEINFO_SET: (state, baseinfoset) => {
      state.baseinfoset = baseinfoset
    }
  },
  actions: {
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
}

export default baseinfoset
