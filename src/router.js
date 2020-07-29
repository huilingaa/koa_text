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
        redirect: '/clubData',
        component: LAYOUT,
        children: [
            {
                path: '/clubData',
                name: '5e36f2569a498806041d1117',
                meta: { title: '信息管理', icon: 'flag' },
                component: () => import('@/views/aFirstClassMenu/clubData.vue')
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
