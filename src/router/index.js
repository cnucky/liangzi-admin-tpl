import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import store from '@/store'

Vue.use(Router)

/* Layout */
const login = () => import('@/views/login/index')


const Layout = () => import('@/views/layout/index')
const dashboard = () => import('@/views/dashboard/index')
const accountRight = () => import('@/views/account/index')
const tree = () => import('@/views/tree/index')
const form = () => import('@/views/form/index')



/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: login, hidden: true,meta: { title: '登录' } },
  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name:'Dashboard',
      component: dashboard,
      meta: { title: '控制台', icon: 'el-icon-menu' }
    }]
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/account_right',
    name: 'Account',
    // meta: { title: '用户权限', icon: 'el-icon-menu' },
    children: [
      {
        path: 'account_right',
        name: 'Account',
        component: accountRight,
        meta: { title: '账户管理', icon: 'el-icon-setting' }
      },
      // {
      //   path: 'tree',
      //   name: 'Tree',
      //   component: tree,
      //   meta: { title: 'Tree', icon: 'tree' }
      // }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: form,
        meta: { title: '导航二', icon: 'el-icon-star-on' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const router = new Router({
  mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  NProgress.start();
  document.title = to.meta.title;

  store.dispatch('GetInfo').then(
    (resData) => {
      localStorage.removeItem('username');
      if(resData && resData.status == 'ok'){
       
        localStorage.setItem('username', resData.data.username);
        next();
        NProgress.done()
      }else{
        localStorage.removeItem('username');
        next({ path: '/login' })
        NProgress.done()
      }
    }
  ).catch( (err) => {
    localStorage.removeItem('username');
    store.dispatch('FedLogOut').then(() => {
      Message.error('验证失败,请重新登录')
      next({ path: '/login' })
    })
  })
  next();
  // if (getToken()) {
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //   } else {
  //     next();
  //     // if (store.getters.roles.length === 0) {
  //     //   store.dispatch('GetInfo').then(res => { // 拉取用户信息
  //     //     next()
  //     //   }).catch(() => {
  //     //     store.dispatch('FedLogOut').then(() => {
  //     //       Message.error('验证失败,请重新登录')
  //     //       next({ path: '/login' })
  //     //     })
  //     //   })
  //     // } else {
  //     //   next()
  //     // }
  //   }
  // } else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()
  //   } else {
  //     next('/login')
  //     NProgress.done()
  //   }
  // }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default router

