<template>
  <div class="common-table">
    <el-table :data="tableData" stripe height="90%" v-loading="config.loading">
      <el-table-column label="序号" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index +1}}</span>
        </template>
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        v-for="item in tabelLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width?item.width:100"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @current-change="changePage"
      layout="prev, pager, next"
      :total="config.total"
      :current-page.sync="config.page"
      :page-size="config.limit"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array
    },
    tabelLabel: Array,
    config: Object
  },
  methods: {
    handleEdit(row) {
      this.$emit("edit", row);
    },
    handleDelete(row) {
      this.$emit("del", row);
    },
    changePage(page) {
      this.$emit("changPage", page);
    }
  }
};
</script>

<style lang="scss" scoped>
.common-table {
  height: calc(100% - 62px);
  position: relative;
}

.el-pagination {
  position: absolute;
  right: 0px;
  bottom: 0px;
}
</style>