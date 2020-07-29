<template lang="pug">
.container
    .page-block
        .page-title 
            div 账号信息管理
    .page-content
        a-table(
            :columns="table.columns"
            :loading="table.loading"
            :dataSource="table.tbody"
            :pagination="false"
            :rowKey="record => record.name")
            template(slot="_id"  slot-scope="text,e,index") 
                a(@click="findClubMember(e._id)") 查看成员
    .showDataForPagesComponent(v-if="table.tbody.length")
        a-pagination(
            showSizeChanger 
            :current="table.page"
            :total="table.total"
            :pageSize.sync="table.pageSize"
            @change="pageChange(...arguments, 'page')"
            @showSizeChange="onShowSizeChange(...arguments, 'size')")
</template>
<script>
import { clubInfoGet } from "@/api/clubs";
export default {
    data() {
        return {
            table: {
                columns: [],
                tbody: [],
                loading: false,
                pageSize:10,
                total: 10,
                page: 1,
                type:1,
            }
        }
    },
    methods: {
        re_clubInfoGet(page,pageSize) {
            clubInfoGet({ page, pageSize,type:1}).then(res => {
                if (res.code == 200) {
                    const { columns, tbody,total } = res.data;
                    this.table.columns = columns.map(item => {
                        item['align'] =  "center"
                        return item
                    })
                    this.table.tbody = tbody
                    this.table.pageSize = pageSize
                    this.table.page = page
                    this.table.total = total
                }
            });
        },
        onShowSizeChange(page, pageSize) {
            this.re_clubInfoGet(page,pageSize);
        },
        pageChange(page) {
            this.re_clubInfoGet(page,this.table.pageSize);
        },
        findClubMember(clubId){
            this.$router.push({path:'/clubMember',query:{clubId:clubId}})
        }
    },
    mounted() {
        this.re_clubInfoGet(this.table.page,this.table.pageSize);
    }
};
</script>
<style lang="scss" scoped>
.showDataForPagesComponent {
    display: flex;
    justify-content: center;
    transform: translateY(50%);
}
</style>