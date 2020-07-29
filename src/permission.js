import router from './router'
import store from './store'
import Cookies from 'js-cookie'


/* 申明变量和方法等 */
// 跳转到注册方法
let gotoLogin = (path, next) => {
    if(path === '/login'){
        next();
    }
    else {
        next('/login');
    }
}
/*公共路由*/ 
const pathArr = ['/login', '/register']

/* 路由拦截器 */
router.beforeEach((to, from, next) => {
    // 如果用户进入了登录页面就相当于退出
    if(pathArr.includes(to.path)){
        store.commit('logout');
        next();
        return;
    }
    // 每次校验用户数据是否存在
    if(!Object.keys(store.state.userLoginInformation).length){
        // 校验用户信息是否存在 | 后面的所有store字段校验都需要基于这个字段进行后续校验
        let user_login_lnformation = localStorage.getItem("user_login_lnformation");
        if(user_login_lnformation){
            try {
                user_login_lnformation = JSON.parse( user_login_lnformation );
                if(!user_login_lnformation.rolePowers.includes(to.name) && to.path !== '/errors'){
                    next('/errors');
                    return
                }
            }
            catch(e){
                console.error('数据被破坏');
                localStorage.clear();
                gotoLogin(to.fullPath, next);
                return;
            }
            store.commit(
                'setUserLoginInformation',
                user_login_lnformation
            )
        }
        else {
            gotoLogin(to.fullPath, next);
            return;
        }
    }
      // 权限的校验
    let permissions = store.state.userLoginInformation.rolePowers
    if(!permissions.includes(to.name) && to.path !== '/errors'){
        // 校验权限列表是否存在
        next('/errors');
        return;
    }
    // token写入业务存储
    if(!Cookies.get('token')){
        // 校验凭证是否存在
            gotoLogin(to.fullPath, next);
            return;
    }
    
    next()
})
router.afterEach(() => {
    
})