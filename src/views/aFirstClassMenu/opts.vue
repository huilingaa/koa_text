<template lang="pug">
.container
    .page-block
        .page-title 
            div 脚本配置
    .page-content
        a-checkbox(
            v-model="item.state",
            v-for="item in configList",
            :key="item.title"
        ) {{ item.title }}
        .search-box
            .search-box-row
                .search-box-title 角色等级范围：
                a-input-number(
                    size="small",
                    v-model="formData.grade_min",
                    :min="0",
                    :max="formData.grade_max"
                )
                span ~
                a-input-number(
                    size="small",
                    v-model="formData.grade_max",
                    :min="formData.grade_min",
                    :max="9999"
                )
            .search-box-row
                .search-box-title 查询n小时内的账号：
                a-input-number(
                    size="small",
                    v-model="formData.before_time",
                    :min="1",
                    :max="9999"
                )
            .search-box-row
                .search-box-title 角色所在服务区：
                a-input(
                    size="small",
                    v-model="formData.area",
                    placeholder="搜索角色所在服务区"
                )
        a-button(type="primary", value="large", @click="re_configModifyUser") 保存配置
</template>

<script>
import { configUser, configModifyUser } from "@/api/all";

export default {
    data() {
        return {
            configList: [],
            formData: {
                grade_min: 0,
                grade_max: 100,
                before_time: 48,
                area: "",
            },
        };
    },
    mounted() {
        this.re_configUser();
    },
    methods: {
        re_configUser(id) {
            configUser().then((res) => {
                this.configList = res.data.config;
                this.formData = { ...res.data.findConfig };
            });
        },
        re_configModifyUser() {
            console.log(this.configList);
            console.log(this.formData);
            configModifyUser({
                findConfig: this.formData,
                configList: this.configList,
            }).then(() => {
                this.$message.success("保存成功!");
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.search-box {
    font-size: 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    box-sizing: border-box;
    .search-box-row {
        display: flex;
        align-items: center;
        margin: 2rem 2rem 2rem 0;
    }
    .search-box-title {
        font-weight: bold;
        white-space: nowrap;
    }
}
</style>