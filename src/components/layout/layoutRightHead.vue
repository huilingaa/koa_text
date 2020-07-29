<template lang="pug">
.container
    a-icon.trigger(
        :type="collapsed ? 'menu-unfold' : 'menu-fold'",
        @click="$emit('clickCollapsed')"
    )
    .layout-right
        a-dropdown.layout-right-box(
            :trigger="['hover']",
            placement="bottomCenter"
        )
            a-icon(type="user")
            a-menu.menu-class(slot="overlay")
                a-menu-item.menu-item-class(@click="ev_logout") 退出
</template>

<script>
export default {
    props: ["collapsed"],
    data() {
        return {
            clubData: [],
        };
    },
    mounted() {},
    methods: {
        ev_logout() {
            // logout()
            // .then(res => {
            // this.$store.commit('logout') => 在路由钩子里自动调用了
            this.$notification["success"]({
                message: "退出成功!",
                duration: 1,
            });
            this.$nextTick(() => {
                this.$router.push({
                    name: "login",
                });
            });
            // })
        },
    },
};
</script>
<style scoped lang="scss">
.container {
    font-size: $fontSize;
    color: #222;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;

    .layout-right {
        padding: 0 1rem;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        i {
            cursor: pointer;
        }
    }
    .layout-right-box {
        color: #222831;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        margin-left: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.menu-class {
    max-height: 20rem;
    overflow-y: auto;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.menu-item-class {
    // color: #d4cd96 !important;
    opacity: 0.8;

    &:hover {
        opacity: 1;
    }
}

/deep/ .ant-dropdown-menu-item-group-title {
    font-weight: bold;
    user-select: none;
}
</style>
