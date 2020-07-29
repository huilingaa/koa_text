import store from '@/store'
import Router from '@/router'
import axios from 'axios'

import Cookies from 'js-cookie'
import message from 'ant-design-vue/es/message'
import notification from 'ant-design-vue/es/notification'

const requestState = {
    //得到正确响应
    success: 200,
    //token 失效
    beOverdue: 10001,
    //没有访问权限
    NotAccessRight: 10002
}

// 创建axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 10000
})

const pathArr = ['/user/login', '/user/register']

// 添加请求拦截器
service.interceptors.request.use(
    config => {
        // 在发送请求之前做些什么
        store.dispatch('control_loading')
        if (!pathArr.includes(config.url)) {
            if (Cookies.get('token')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
                config.headers.token = `${Cookies.get('token')}`;
            }
        }

        return config
    },
    error => {
        // 对请求错误做些什么
        store.dispatch('control_loading', 'hide')
        return error
    }
)

// 添加响应拦截器
service.interceptors.response.use(
    // store.control_loading
    response => {
        // 对响应数据做点什么
        store.dispatch('control_loading', 'hide')
        const res = response.data
        const state = res.code
        if (state == requestState.beOverdue) {
            // hasNotHandle = true;
            message.error('登录已失效，请重新登录', 2)
            Router.push({
                name: 'login',
                query: { hasWait: true }
            })
            return
        }
        if (state == requestState.NotAccessRight) {
            notification.warn({
                message: "权限异常",
                description: res.message
            })
            return res
        }
        if (state !== requestState.success) {
            notification.error({
                message: "系统出现异常",
                description: res.message
            })
            return Promise.reject(res)
        }
        return res
    },
    error => {
        // 对响应错误做点什么
        store.dispatch('control_loading', 'hide')
        if (error.response.data.code == requestState.beOverdue) {
            message.error('登录已失效，请重新登录', 2)
            Router.push({
                name: 'login'
            })
            return Promise.reject(error)
        }
        notification.error({
            message: "系统出现异常",
            description: error.response ? error.response.data.message : ''
        })
        return Promise.reject(error)
    }
)

export default service
