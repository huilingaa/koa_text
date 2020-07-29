import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

/* 申明变量和方法等 */
const INITIALIZE = {
    local_loading: false,
    userLoginInformation: {},           // 用户信息
}

Vue.use(Vuex)
export default new Vuex.Store({
    state: Object.assign(
        {},
        INITIALIZE
    ),
    mutations: {
        local_loading(state) {
            state.local_loading = true
        },
        hide_loading(state) {
            state.local_loading = false
        },
        logout(state) {
            localStorage.removeItem('user_login_lnformation')
            Cookies.remove('token')
        },
        setUserLoginInformation(state, res) {
            state.userLoginInformation = res
        },
    },
    actions: {
        control_loading(context, type = 'local') {
            context.commit('hide_loading')
            switch (type) {
                case 'local':
                    context.commit('local_loading')
                    break;
                default:
                    return;
            }
        }
    },
    getters: {}
})
