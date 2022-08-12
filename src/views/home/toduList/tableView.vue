<template>
  <div class="table">
    <el-table :data="tableData" :cell-style="cellStyle" style="width: 100%">
      <el-table-column prop="title" label="Title" width="300" height="10">
        <template slot-scope="{ row }">
          <div class="tableTitle" v-if="row.flag">
            <el-input v-model="row.title" class="edit-input" size="small" />
            <el-button
              class="cancel-btn"
              size="small"
              icon="el-icon-refresh"
              type="warning"
              @click="cancelEdit(row)"
            >
              取消
            </el-button>
          </div>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="price"
        label="Price"
        width="180"
        align="center"
        height="10"
      >
        <template slot-scope="scope"> ￥{{ scope.row.price }} </template>
      </el-table-column>
      <el-table-column prop="type" label="地址" align="center" height="10">
        <template slot-scope="scope">
          <div>
            <el-tag
              v-if="!scope.row.flag"
              :type="scope.row.type"
              @click="btnFn(scope.row)"
              :disable-transitions="true"
              >success</el-tag
            >
            <el-button
              v-else
              type="success"
              size="mini"
              @click="btnFn2(scope.row)"
              >成功</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import instance from "@/api/api";
//表格行高的回调函数

export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getTable();
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let style = { padding: "5px" };
      return style;
    },
    async getTable() {
      const { data: tableData } = await instance.get("/table");
      this.tableData = tableData.tableData;
      console.log();
    },
    //点击按钮更改表格title 的状态
    btnFn(row) {
      row.flag = !row.flag;
      row.titleOrigin = row.title
    },
    btnFn2(row) {
      row.flag = !row.flag;
      
      this.$message({
        showClose: true,
        message: "修改成功",
        type: 'success'
      });
    },
    //点击取消按钮
    cancelEdit(row) {
      row.flag = !row.flag;
      row.title = row.titleOrigin
      
    },
  },
};
</script>

<style lang="scss" scoped>
.table {
  background: #fff;
  height: 400px;
  margin-top: 20px;
}
.tableTitle {
  display: flex;
  gap: 5px;
}
</style>
