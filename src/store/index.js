import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import baseinfoset from '@/store/modules/baseinfoset'
import permission from '@/store/modules/permission'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    baseinfoset,
    permission
  },
  getters
})

export default store
