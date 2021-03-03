import router from './router'
import store from './store'
import Layout from '@/layout'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/token' // get token from cookie
import { getMenus } from '@/api/user'
import { filterAsyncRouter } from './store/modules/permission'
import { filterMenus } from '@/store/modules/app'
import { baseRouterMap } from './router'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

// 不需要拦截的路径
const whiteList = ['/login']

// 路由拦截器
router.beforeEach(async (to, from, next) => {
  // // 加载基本信息
  try {
    await store.dispatch('app/getBaseInfoSet')
  } catch (err) {
    console.log(err)
  }
  // 加载中的导航条
  NProgress.start()

  if (to.meta.title) {
    // 设置标签名称
    document.title = to.meta.title + ' - ' + store.getters.baseinfoset.siteName
  } else {
    // 设置标签名称
    document.title = store.getters.baseinfoset.siteName
  }
  // 设置标签图片
  document.getElementById('page_icon').href = store.getters.baseinfoset.labelLog

  if (getToken()) {
    // 已登录且要跳转的页面是登录页
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      // 判断是否已经拉取用户信息
      if (!store.getters.name) {
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch('user/getInfo')
          .then(() => {
            // 拉取user_info
            // 动态路由，拉取菜单
            loadMenus(next, to)
          })
          .catch(() => {
            store.dispatch('user/logout').then(() => {
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          })
      } else {
        next()
      }
    }
  } else {
    // 没有登录
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

export const loadMenus = (next, to) => {
  getMenus().then((res) => {
    const asyncRouter = filterAsyncRouter(res)

    // 第一个路由前面插入首页的页面
    // baseRouterMap.push({
    //   path: '/',
    //   redirect: getChildPath(asyncRouter[0], ''),
    //   component: Layout
    // })
    // 404 路由放最后面
    baseRouterMap.push({
      path: '*',
      redirect: '/404',
      hidden: true
    })
    asyncRouter.push({
      path: '*',
      redirect: '/404',
      hidden: true
    })
    // 替换首页及默认路由

    console.log('baseRouterMap: ', baseRouterMap)
    store.dispatch('permission/generateRoutes', asyncRouter).then(() => {
      // 存储路由
      router.addRoutes(baseRouterMap) // 动态添加可访问路由表
      next({
        ...to,
        replace: true
      }) // hack方法 确保addRoutes已完成
    })
    const menus = filterMenus(asyncRouter)
    store.commit('app/SET_MENUS', menus)
    console.log('menus: ', menus)
  })
}

// 获得最终子节点的路径
function getChildPath(route, path) {
  let temp = route.path //暂存路径
  if (route.children && route.children.length) {
    route.children = route.children.filter((i) => i.hidden !== true) //过滤掉隐藏的路由
    let splitStr = route.path.indexOf('/') == 0 ? '' : '/'
    return getChildPath(route.children[0], path + splitStr + route.path)
  } else {
    if (route.meta) {
      route.meta.affix = true
      route.path = path + '/' + route.path
    }
    return path ? route.moduleName + path + '/' + temp : route.moduleName + temp
  }
}

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
