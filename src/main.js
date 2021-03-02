import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

let vm = new Vue({
  el: '#baseApp',
  router,
  store,
  render: (h) => h(App)
})

import { registerMicroApps } from 'qiankun'
registerMicroApps(
  [
    {
      name: 'wsfFinance', // app name registered
      entry: '//172.16.3.27:6700',
      container: '#appContainer',
      activeRule: '/client/dc',
      props: {
        router,
        store
      }
    },
    {
      name: 'wsfPlatform', // app name registered
      entry: '//172.16.3.27:8080',
      container: '#appContainer',
      activeRule: '/client/old',
      props: {
        router,
        store
      }
    }
  ],
  {
    afterMount: () => {
      console.log('子应用加载完成')
      console.log('window.__QIANKUN_SUB_APP_VM__: ', window.__QIANKUN_SUB_APP_VM__)
      if (window.__QIANKUN_SUB_APP_VM__ && process.env.NODE_ENV === 'development') {
        vm.$children.push(window.__QIANKUN_SUB_APP_VM__)
      }
    }
  }
)
