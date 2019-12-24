<template>
  <div class="manager">
    <el-dialog :title="operateType==='add'?'新增':'编辑'" :visible.sync="isShow" width="40%">
      <common-form :formLabel="operateFormLabel" :form="operateForm" ref="form"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manager-header">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addUser">新增</el-button>
      <common-form :inline="true" :formLabel="formLabel" :form="searchForm">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tabelLabel="tabelLabel"
      :config="config"
      @changPage="changPage"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonForm from "../../components/CommonForm.vue";
import CommonTable from "../../components/CommonTable.vue";
export default {
  components: {
    CommonForm,
    CommonTable
  },
  data() {
    return {
      isShow: false,
      operateType: "",
      tableData: [],
      tabelLabel: [
        {
          prop: "username",
          label: "用户名"
        },
        {
          prop: "password",
          label: "密码"
        },
        {
          prop: "mobile",
          label: "电话"
        },
        {
          prop: "email",
          label: "邮箱"
        },
        {
          prop: "role",
          label: "角色"
        },
        {
          prop: "add_time",
          label: "创建时间"
        },
        {
          prop: "is_super",
          label: "超级管理"
        }
      ],
      config: {
        page: 1,
        total: 0,
        limit: 10,
        loading: false
      },
      // searchForm: {
      //   keyword: ""
      // },
      searchForm: {
        keyword: ""
      },
      formLabel: [
        {
          model: "keyword",
          label: "",
          palceholder: "请输入内容",
          opts: {}
        }
      ],
      operateFormLabel: [
        {
          model: "username",
          label: "用户名"
        }
        // {
        //   model: "name",
        //   label: "姓名"
        // },
        // {
        //   model: "age",
        //   label: "年龄"
        // },
        // {
        //   model: "sex",
        //   label: "性别",
        //   type: "select",
        //   opts: [
        //     {
        //       label: "男",
        //       value: 1
        //     },
        //     {
        //       label: "女",
        //       value: 0
        //     }
        //   ]
        // },
        // {
        //   model: "birth",
        //   label: "出生日期",
        //   type: "date"
        // },
        // {
        //   model: "addr",
        //   label: "地址"
        // }
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: ""
      }
    };
  },
  methods: {
    getList() {
      this.config.loading = true;
      setTimeout(() => {
        this.config.loading = false;
        this.$message("请求失败");
      }, 1000);
      // this.$http
      //   .get("/api/user/getUser", {
      //     params: {
      //       name: "",
      //       page: this.config.page, //当前第几页
      //       limit: this.config.limit //每页的数量
      //     }
      //   })
      //   .then(res => {
      //     this.tableData = res.data.list.map(item => {
      //       item.sexLabel = item.sex === 0 ? "女" : "男";
      //       return item;
      //     });
      //     this.config.total = res.data.count;
      //     this.config.loading = false;
      //   });
    },
    changPage(val) {
      this.config.page = val;
      this.getList();
    },
    editUser(row) {
      this.isShow = true;
      this.operateType = "edit";
      this.operateForm = row;
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该数据，是否继续", "删除提示", {
        type: "warning"
      })
        .then(() => {
          let id = row.id;
          this.$http
            .get("/api/user/del", {
              params: {
                id
              }
            })
            .then(res => {
              console.log("del:", res.data);
              this.$message({
                type: "success",
                message: "删除成功"
              });
              this.getList();
            });
        })
        .catch(() => {
          // this.$message({
          //   type:'info',
          //   message:'已取消删除'
          // })
        });
    },
    addUser() {
      this.isShow = true;
      this.operateType = "add";
      this.operateForm = "";
    },
    confirm() {
      console.log(this.operateForm);
    }
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/common.scss";
</style>