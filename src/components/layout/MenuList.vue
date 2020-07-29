<template  lang="pug">
    a-menu.main-menu(mode='inline' :selectedKeys="routeTag" :defaultOpenKeys="['社团管理', '权限管理', '活动管理','社团考核']")
      template(v-for="(route) in routes")
        a-menu-item(v-if="!route.children" :key="route.meta.title")
          router-link(:to="{ path: route.path }")
            a-icon(:type="route.meta.icon")
            span {{route.meta.title}}
        sub-menu(v-else-if="route.children" :menu-info="route" :key="route.meta.title")
</template>
<script>
import SubMenu from './SubMenu'
export default {
	props: ['routes'],
	components: { SubMenu },
	data() {
		return {
			routeTag: []
		}
	},
	watch: {
		$route: {
			handler: 'iSrouteTag',
			immediate: true
        }
	},
	methods: {
		iSrouteTag() {
			this.routeTag = [this.$route.meta.title]
		}
	}
}
</script>
<style lang="scss" scoped>
.ant-menu-inline-collapsed > .ant-menu-submenu /deep/ .ant-menu-submenu-title {
	padding: 0 16px !important;
}
.ant-menu-inline-collapsed > .ant-menu-item {
	padding: 0 16px !important;
}
//菜单栏选择背景颜色
// .ant-menu.ant-menu-dark .ant-menu-item-selected{
//  padding: 0  32px !important;
// background-color: $background-active;
// }
.ant-menu-light {
	// background: $layout-color;
	background: rgba(255, 255, 255, 0);
}
.ant-menu-light /deep/ .ant-menu-inline.ant-menu-sub {
	// background: $menu-sub-color;
	background: rgba(255, 255, 255, 0);
}
.ant-menu-vertical .ant-menu-submenu-selected {
	color: $theme-color;
}
.ant-menu-inline,
.ant-menu-vertical,
.ant-menu-vertical-left {
	border: none;
}

.ant-menu-vertical .ant-menu-item:after, .ant-menu-inline .ant-menu-item:after{
    // border: none;
}

// i {
//     font-size: $AenuSize !important;
// }
</style>