<template lang="pug">
.container
    .page-block
        .page-title 
            div 账号信息管理
        a-upload(
            style="margin-left:auto;",
            name="file",
            :file-list="fileList",
            :showUploadList="false",
            :beforeUpload="beforeUpload"
        )
            a-button 上传文件{{ fileDataList }}
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
            .search-box-title 查询前{{ formData.before_time }}小时的数据：
            a-input-number(
                size="small",
                v-model="formData.before_time",
                :min="1",
                :max="9999"
            )
        .search-box-row
            .search-box-title 账号查询：
            a-input(
                size="small",
                v-model="formData.userid",
                placeholder="搜索角色账号"
            )
    .search-box
        .search-box-row
            .search-box-title 角色所在服务区：
            a-input(
                size="small",
                v-model="formData.area",
                placeholder="搜索角色所在服务区"
            )
        .search-box-row
            .search-box-title 设备标识(uuid)：
            a-input(
                size="small",
                v-model="formData.uuid",
                placeholder="搜索设备标识uuid"
            )
        .search-box-row
            a-button(size="small", type="primary", @click="pageChange(1)") 查询

    .page-content
        a-table(
            :columns="table.columns",
            :loading="table.loading",
            :dataSource="table.tbody",
            :pagination="false",
            :rowKey="(record) => record.name"
        )
            template(slot="userid", slot-scope="text,e,index")
                span {{ e.userid }}
                a-popover(title="账号设置" trigger="click")
                    template(slot="content")
                        p(v-for="(item, index) in tableConfigList" :key="index")
                            a-badge(:status="item.state == 0 ? 'default' : 'processing'" :text="item.title")
                    a-icon.click-opacity-css(@click="re_configUser(e._id)" type="eye" style="margin-left: 6px;")
            template(slot="_id", slot-scope="text,e,index")
                a-radio-group(size="small")
                    //- a-button(
                    //-     size="small",
                    //-     type="link",
                    //-     @click="re_deleteUser(e._id)"
                    //- ) 编辑
                    a-button(
                        size="small",
                        type="link",
                        @click="re_deleteUser(e._id)"
                    ) 删除
    .showDataForPagesComponent(v-if="table.tbody.length")
        a-pagination(
            size="small",
            showSizeChanger,
            :current="table.page",
            :total="table.total",
            :pageSize.sync="table.pageSize",
            @change="pageChange(...arguments, 'page')",
            @showSizeChange="onShowSizeChange(...arguments, 'size')"
        )
</template>
<script>
import { findUser, deleteUser, uploadUser, configUser } from "@/api/login";

export default {
    data() {
        return {
            table: {
                columns: [],
                tbody: [],
                loading: false,
                pageSize: 10,
                total: 10,
                page: 1,
                type: 1,
            },
            tableConfigList: [],
            fileList: [],
            allFileContent: "",
            formData: {
                grade_min: 1,
                grade_max: 100,
                before_time: 48,
                area: "",
                uuid: "",
                userid: "",
            },
        };
    },
    computed: {},
    methods: {
        beforeUpload(file) {
            this.fileList = [file];
            this.readFile(file);
            return false;
        },
        readFile(f) {
            let rd = new FileReader();
            rd.onload = (e) => {
                this.allFileContent = e.currentTarget.result;
                let list = this.fn_getFileDataList(this.allFileContent);
                uploadUser({ data: list }).then((res) => {
                    console.log(res);
                });
            };
            rd.readAsBinaryString(f);
        },
        fn_getFileDataList(fileContent) {
            let str = fileContent;
            let strArr = str.split(/[(\r\n)\r\n]+/);
            let newArr = [];
            strArr.map((item) => {
                if (item) {
                    let itemArr = item.split(/----/);
                    newArr.push({
                        uid: itemArr[0],
                        pwd: itemArr[1],
                    });
                }
            });
            return newArr;
        },
        re_findUser(page, pageSize) {
            // grade_min, grade_max, before_time, area, page, page_size, uuid
            findUser({ page, page_size: pageSize, ...this.formData }).then(
                (res) => {
                    if (res.code == 200) {
                        const { columns, tbody, total } = res.data;
                        this.table.columns = columns.map((item) => {
                            item["align"] = "center";
                            return item;
                        });
                        this.table.tbody = tbody;
                        this.table.pageSize = pageSize;
                        this.table.page = page;
                        this.table.total = total;
                    }
                }
            );
        },
        re_deleteUser(id) {
            deleteUser({
                _id: id,
            }).then((res) => {
                if (res.code == 200) {
                    this.$message.success("删除成功!");
                    this.pageChange(1);
                }
            });
        },
        re_configUser(id) {
            this.tableConfigList = []
            configUser({
                _id: id
            }).then(res=>{
                this.tableConfigList = res.data.data
            })
        },
        onShowSizeChange(page, pageSize) {
            this.re_findUser(page, pageSize);
        },
        pageChange(page) {
            this.re_findUser(page, this.table.pageSize);
        },
    },
    mounted() {
        this.pageChange(1);
    },
};
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;
}

.showDataForPagesComponent {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
    position: sticky;
    bottom: 0;
    background: #fff;
}

.search-box {
    font-size: 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 2rem;
    .search-box-row {
        min-width: 30%;
        max-width: 33%;
        display: flex;
        align-items: center;
        margin: 0 0 2rem 2rem;
    }
    .search-box-title {
        font-weight: bold;
        white-space: nowrap;
    }
}
</style>