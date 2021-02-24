import { registerMicroApps } from 'qiankun'
import router from './router'
registerMicroApps([
  {
    name: 'wsfFinance', // app name registered
    entry: '//localhost:6700',
    container: '#appContainer',
    activeRule: '/app/dc',
    props: {
      router
    }
  },
  {
    name: 'vueApp', // app name registered
    entry: '//localhost:8080',
    container: '#appContainer',
    activeRule: '/old'
  }
])
