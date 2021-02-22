import { registerMicroApps } from 'qiankun'

registerMicroApps([
  {
    name: 'wsfFinance', // app name registered
    entry: '//localhost:6700',
    container: '#appContainer',
    activeRule: '/app/dc'
  }
])
