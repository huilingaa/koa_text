import Vue from 'vue'
import VueRouter from 'vue-router'

/* 以下为视图模块 */
// 基础模块
// import EMPTY_VIEW from '@/components/layout/RouteView'
// 异步模块
const LAYOUT = () => import('@/components/layout/Layout')
const LOGIN = () => import('@/views/login/login')

/* 注册路由对象到Vue实例 */
Vue.use(VueRouter)

let constantRouterMap = [
    {
        path: '/',
        alias: '/home',
        redirect: '/info',
        component: LAYOUT,
        children: [
            {
                path: '/info',
                name: '5e36f2569a498806041d1117',
                meta: { title: '信息管理', icon: 'unordered-list' },
                component: () => import('@/views/aFirstClassMenu/info.vue')
            },
            {
                path: '/opts',
                name: '5e3819ce61093720bacff133',
                meta: { title: '脚本配置', icon: 'control' },
                component: () => import('@/views/aFirstClassMenu/opts.vue')
            }
        ]
    },


    {
        path: '/login',
        name: 'login',
        component: LOGIN
    },
    {
        path: '*',
        name: '/errors',
        meta: {
            title: 'errors'
        },
        component: () => import('@/views/errors')
    },
]

export default new VueRouter({
    mode: 'hash',
    base: '/',
    routes: constantRouterMap
})
