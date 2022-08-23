<template>
  <div class="shop-container">
    <div class="navTop">
      <el-input
        size="small"
        v-model="searchInfo.title"
        placeholder="Title"
        class="iptTitle"
        @change="changeIpt"
      ></el-input>
      <el-select
        size="small"
        v-model="searchInfo.optionVal"
        placeholder="评价几颗星星"
        @change="selectStar"
      >
        <el-option
          v-for="item in searchInfo.options"
          :key="item.label"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
      <el-button
        size="small"
        type="primary"
        v-if="refresh"
        icon="el-icon-refresh"
        @click.prevent="refreshFn"
        >重置</el-button
      >
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click.prevent="add"
        >添加</el-button
      >
    </div>
    <el-table
      :cell-style="cellStyle"
      :data="tableData"
      border
      style="width: 100%"
      @sort-change="sortChange"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      row-key="id"
      ref="dragTable"
    >
      <el-table-column align="center" type="selection" width="55" />

      <el-table-column
        align="center"
        prop="id"
        sortable="custom"
        :sort-orders="['ascending', 'descending']"
        label="ID"
        width="100"
      >
      </el-table-column>
      <el-table-column align="center" prop="date" label="年份" width="200">
      </el-table-column>
      <el-table-column
        align="center"
        prop="title"
        label="标题"
        width="500"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="author"
        label="作者"
        width="100"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="price"
        label="价格"
        width="100"
      ></el-table-column>
      <el-table-column align="center" prop="star" label="评分" width="120">
        <template slot-scope="scope">
          <div class="stars">
            <i
              v-for="item in scope.row.star"
              class="el-icon-star-on"
              style="font-size: 18px"
            ></i>
            <i v-for="item in 5 - scope.row.star" class="el-icon-star-off"></i>
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <div class="btns">
            <el-button size="mini" type="primary" @click.stop="updateFn(scope)"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click.stop="delFn(scope.row.id)"
              >删除</el-button
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 修改业务的弹窗 -->
    <MyDialog
      :form="form"
      :dialogFormVisible="dialogFormVisible"
      :formLabelWidth="formLabelWidth"
      @confirmFn_my="confirmFn"
      @my_cancel="cancelFn"
      @updateStar="uStar"
      ref="updateDia"
    />

    <!-- 增加业务函数 -->
    <AddDialog
      :addForm="addForm"
      :addFormVisible="addFormVisible"
      :incrementFrom="incrementFrom"
      @my_addCancelFn="addCancelFn"
      @my_addConfirmFn="addConfirmFn"
      @selectStar="addStar"
      ref="addDialog"
    />

    <!-- 分页器 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSize"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="1000"
    >
    </el-pagination>
  </div>
</template>

<script>
import instance from "@/api/api";
import MyDialog from "@/components/MyDialog";
import AddDialog from "@/components/AddDialog";
import Sortable from "sortablejs";
//引入滚动动画

export default {
  components: {
    MyDialog,
    AddDialog,
  },
  data() {
    return {
      refresh: false,
      searchInfo: {
        title: "",
        number: "",
        options: [
          {
            value: "选项1",
            label: "1",
          },
          {
            value: "选项2",
            label: "2",
          },
          {
            value: "选项3",
            label: "3",
          },
          {
            value: "选项3",
            label: "4",
          },
          {
            value: "选项3",
            label: "5",
          },
        ],
        optionVal: "",
        city: [
          {
            value: "",
            label: "河北",
          },
          {
            value: "",
            label: "河南",
          },
          {
            value: "",
            label: "新疆",
          },
        ],
        cityVal: "",
      },
      tableData: [],
      loading: false,
      pageSize: [],
      currentPage: 1,
      formLabelWidth: "120px", //弹框的宽度
      dialogFormVisible: false, //弹框的显示隐藏
      form: {
        //修改每行表格的字段
        author: "", //名字
        checked: true,
        date: null,
        price: "",
        star: "",
        title: "",
      },

      addForm: {
        //增加业务数据
        author: "", //名字
        checked: true,
        date: null,
        price: "",
        star: "",
        title: "",
      },
      addFormVisible: "120px",
      incrementFrom: false,
      sortable: null,
      newList: [],
    };
  },
  created() {
    //请求数据
    this.getTableData().then(({ tableData }) => {
      this.tableData = tableData;
      //把表格数据放在缓存深拷贝
      localStorage.setItem("tableArr", JSON.stringify(this.tableData));
      let len = parseInt(this.tableData.length);
      const arr = [];
      for (let i = 0; i < len; i++) {
        arr.push((i + 1) * 10);
      }
      this.pageSize = arr;
    });
  },
  methods: {
    //设置表格的样式
    cellStyle({ row, column, rowIndex, columnIndex }) {
      let style = { padding: "6px" };
      return style;
    },
    sortChange({ column, prop, order }) {
      this.loading = true;
      if (order == "ascending") {
        this.tableData.sort((a, b) => {
          return a.id - b.id;
        });
      } else if (order == "descending") {
        this.tableData.sort((a, b) => {
          return b.id - a.id;
        });
      }
      setTimeout(() => {
        this.loading = false;
      }, 500);
    },
    async getTableData() {
      const {
        data: {
          data: { tableArr },
          table: { tableData },
        },
      } = await instance.get("/adusTable");
      return { tableArr, tableData };
    },

    handleSizeChange() {
      this.getTableData().then(({ tableArr }) => {
        this.tableData = tableArr;
      });
    },
    handleCurrentChange() {
      this.getTableData().then(({ tableArr }) => {
        this.tableData = tableArr;
      });
    },
    // 删除操作
    async del(id) {
      const {
        data: { status, message, tableArr },
      } = await instance.delete(`/delete`, {
        params: { id },
      });
      this.tableData = tableArr;
    },
    //删除
    delFn(id) {
      this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.del(id);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    // 修改操作
    updateFn({ row }) {
      //为了让接口传参使用

      this.form = row;
      // this.$refs.updateDia.form = row
      // console.log(this.$refs.updateDia.form);
      this.dialogFormVisible = true;
    },

    //请求修改函数接口
    async update() {
      // console.log(this.form);
      const { data } = await instance({
        method: "put",
        data: { ...this.form },
        url: "/update",
      });
      this.tableData = data;
    },
    //子组件的开启关闭窗口
    confirmFn() {
      this.dialogFormVisible = false;
      this.update();
    },
    cancelFn() {
      this.dialogFormVisible = false;
    },

    //添加逻辑
    add() {
      this.incrementFrom = true;
    },
    async addFn() {
      const {
        data: { tableArr },
      } = await instance.post("/add", { ...this.addForm });
      this.tableData = tableArr;
    },
    addCancelFn(val) {
      this.incrementFrom = val;
    },

    //添加确定
    addConfirmFn(val) {
      this.incrementFrom = val;
      this.addFn().then(() => {
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        this.addForm = {
          //增加业务数据
          author: "", //名字
          checked: true,
          date: "",
          price: "",
          star: "",
          title: "",
        };
      });
    },
    //添加星星数量
    addStar(val) {
      this.$set(this.addForm, "star", val);
    },

    //修改的添加星星
    uStar(val) {
      console.log(val);
      this.$set(this.form, "star", val);
    },
    //拖拽表格
    setSort() {
      const el = this.$refs.dragTable.$el.querySelectorAll(
        ".el-table__body-wrapper > table > tbody"
      )[0];
      this.sortable = Sortable.create(el, {
        ghostClass: "sortable-ghost",
        setData: function (dataTransfer) {
          dataTransfer.setData("Text", "");
        },
        onEnd: (evt) => {
          const targetRow = this.tableData.splice(evt.oldIndex, 1)[0];
          this.tableData.splice(evt.newIndex, 0, targetRow);
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0];
          this.newList.splice(evt.newIndex, 0, tempIndex);
        },
      });
    },
    //搜索功能几颗星
    selectStar() {
      this.loading = true;
      let { optionVal } = this.searchInfo;
      let table = JSON.parse(localStorage.getItem("tableArr"));
      // console.log(table);
      setTimeout(() => {
        this.tableData = table.filter((i) => i.star == optionVal);
        this.loading = false;
      }, 300);
      this.refresh = true;
    },
    // 点击重置按钮
    refreshFn() {
      let table = JSON.parse(localStorage.getItem("tableArr"));
      this.tableData = table;
      this.refresh = false;
    },
    //搜索标题
    changeIpt() {
      this.loading = true;
      let { title } = this.searchInfo;
      let table = JSON.parse(localStorage.getItem("tableArr"));
      console.log(title);
      setTimeout(() => {
        this.tableData = table.filter((i) => i.title.includes(title));
        this.loading = false;
      }, 300);
    },
  },

  mounted() {
    this.setSort();
  },
};
</script>

<style lang="scss" scoped>
.shop-container {
  box-sizing: border-box;
  padding: 20px;
  background: #f5f5f5;
  // overflow: auto;
  .navTop {
    display: flex;
    margin-bottom: 20px;
    gap: 10px;
    .iptTitle {
      width: 200px;
    }
  }

  .btns {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
.el-pagination {
  margin-top: 10px;
}
//星星
.stars {
  display: flex;
  align-items: center;
}
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
.el-table {
  background: #f5f5f5;
}
</style>