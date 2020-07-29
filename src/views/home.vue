<template lang="pug">
.container
    .page-block
        .page-title 
            div 社团信息
    .page-content
        a-table(
            bordered
            :columns="table.columns"
            :loading="table.loading"
            :dataSource="table.tbody"
            :pagination="false"
            :rowKey="record => record.name"
            )
    .showDataForPagesComponent(
            v-if="table.tbody.length"
        )
        a-pagination(
            showSizeChanger 
            :current="table.page"
            :total="table.total"
            :pageSize.sync="table.pageSize"
            @change="pageChange(...arguments, 'page')"
            @showSizeChange="onShowSizeChange(...arguments, 'size')"
            )
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
        };
    },
    methods: {
        re_clubInfoGet(page,pageSize) {
            clubInfoGet({ page, pageSize,type:1}).then(res => {
                if (res.code == 200) {
                    const { columns, tbody,total } = res.data;
                    this.table.columns = columns;
                    this.table.tbody = tbody;
                    this.table.pageSize = pageSize;
                    this.table.page = page
                    this.table.total = total;
                }
            });
        },
        onShowSizeChange(page, pageSize) {
            this.re_clubInfoGet(page,pageSize);
        },
        pageChange(page) {
            this.re_clubInfoGet(page,this.table.pageSize);
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