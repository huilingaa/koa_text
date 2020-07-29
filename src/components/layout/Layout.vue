<template lang="pug">
a-layout.app-container-layout
    a-layout-sider.layout-sider(:class="collapsed?'is-layout-sider':''" :trigger="null" collapsible v-model="collapsed")
            //- .logo-image-box
            //-     svg-icon.logo-image-svg(icon-class="logo")
            //-     svg-icon.logo-image-title(:class="isIcon === ''?'':isIcon?'login-title-animation-true':'login-title-animation-false'" icon-class="title")
            menu-list.layout-menu(:routes="menuArr")
    a-layout
        a-layout-header
            layout-right-head(:collapsed="collapsed" @clickCollapsed="()=> isIcon = collapsed = !collapsed")
        a-layout-content
            keep-alive
                router-view.layout-content-view(:class="{'layout-content-view-loading': local_loading}")
            //- 局部控制的loading
            .public_local_loading(v-show="local_loading")
                .public_local_loading_bg
                    a-spin.public_local_loading_logo(size="large")
                    span.public_local_loading_text Loading...
</template>
<script>
import { mapState } from 'vuex'
import MenuList from './MenuList.vue'
import layoutRightHead from './layoutRightHead'

export default {
    name: 'layout',
    components: { MenuList, layoutRightHead },
    data() {
        return {
            collapsed: false,
            isIcon: '',
            menuArr: []
        }
    },
    watch: {},
    filters: {},
    computed: {
        route() {
            //当前路由
            return this.$route.matched
        },
        ...mapState(['local_loading'])
    },
    created() {},
    mounted() {
        let rolePowers = JSON.parse(localStorage.getItem('user_login_lnformation')).rolePowers
        let menu = this.$router.options.routes[0].children
        this.menuArr = this.recursion(menu, rolePowers)
    },
    methods: {
        recursion(arr, arrShow) {
            let fArr = arr.filter(item => {
                let isReturn = false
                arrShow.map(sItem => {
                    if (sItem == item.name) {
                        isReturn = true
                    }
                })
                if (item.children) {
                    item.children = this.recursion(item.children, arrShow)
                    return true
                }
                if (isReturn) return true
            })
            return fArr
        }
    }
}
</script>
<style scoped lang="scss">
@import '../../assets/css/layout.scss';
</style>