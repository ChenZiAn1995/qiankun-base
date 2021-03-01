import { registerMicroApps } from 'qiankun'
import router from './router'
import store from './store'
registerMicroApps([
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
])
