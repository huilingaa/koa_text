/* 基础依赖 */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

/* 其他依赖 */
// import Cookies from 'js-cookie'
// import lodash from "lodash" 
import moment from 'moment'

/* U框架Ant-design */
// import antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';

/* 其他模块引入 */
import './permission' // 路由权限控制
import '@/utils/icons' // svg-icon组件 
import '@/utils/drag' // 拖拽指令

// Vue.use(antd)
// Vue.use(window['vue-cropper'].default)
// Vue.use(window.MavonEditor)

/* 一些配置 */
// 关闭开发环境的警告
Vue.config.productionTip = false

/* 原型链添加 */
Vue.prototype.$Cookies = Cookies;
Vue.prototype.$moment = moment;
Vue.prototype._ = _;
// Vue.prototype.$md = window.MavonEditor.markdownIt

Vue.prototype.$ipPath = process.env.VUE_APP_BASE_API
Vue.prototype.$imgerrorfun = `this.src = ''`

/* 开始业务 */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
