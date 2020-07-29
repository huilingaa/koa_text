import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'

/* 申明变量和方法等 */
const INITIALIZE = {
    local_loading: false,
    userLoginInformation: {},           // 用户信息
    userClub: [],
    toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
    }
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
            //   for (let key in state) {
            //     let item = INITIALIZE[key];
            //     if (typeof item !== 'undefined' && INITIALIZE.hasOwnProperty(key)) {
            //       state[key] = item;
            //     }
            //   }
        },
        setUserLoginInformation(state, res) {
            state.userLoginInformation = res
        },
        setUserClub(state, res) {
            state.userClub = res
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
