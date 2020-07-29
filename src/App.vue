<template lang="pug">
a-locale-provider(:locale="zh_CN")
    router-view#app
</template>

<script>
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN.js'

export default {
    name: 'app',
    data() {
        return {
            zh_CN
        }
    },
    created() { },
    mounted() { },
    methods: {}
}
</script>

<style lang="scss">
html {
    font-size: 62.5%;
    line-height: 1.25 !important;
    //   font-family: "Monda", "PingFang SC", "Microsoft YaHei", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    overflow-x: hidden;
}

body {
    font-family: "Microsoft Yahei", "Helvetica Neue", "Helvetica Neue",
        Helvetica, Arial, "Lantinghei SC", "Hiragino Sans GB", sans-serif,
        "Times New Roman" !important;
}

@media (max-width: 600px) {
    #app {
        font-size: 1.5rem;
    }
}
@media (min-width: 600px) {
    #app {
        font-size: 1.7rem;
    }
}
@media (min-width: 768px) {
    #app {
        font-size: 1.9rem;
    }
}
@media (min-width: 992px) {
    #app {
        font-size: 2.1rem;
    }
}
@media (min-width: 1200px) {
    #app {
        font-size: 2.3rem;
    }
}
</style>
