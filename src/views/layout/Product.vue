<template>
  <div class="product-list">
    <product-search
      @search="search"
      @add="add"
      @reset="reset"
      :formData.sync="searchForm"
    />
    <el-table
      ref="table"
      :data="list"
      row-id="key"
      style="width: 100%; margin: 0 20px"
      border
      @expand-change="onExpandChange"
      :cell-class-name="cellClass"
    >
      <el-table-column type="expand" label="详情" width="50">
        <template slot-scope="{ row }">
          <product-detail :detail="row" />
        </template>
      </el-table-column>
      <el-table-column prop="id" label="ID" width="100" align="center">
      </el-table-column>
      <el-table-column prop="name" label="名称" align="center">
      </el-table-column>
      <el-table-column prop="category_name" label="分类" align="center">
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="{ row: { create_time } }">
          <!-- 把两个空格换成br换行 -->
          <span v-html="create_time.replace(' ', '<br>')"></span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center" width="100">
        <template slot-scope="{ row }">
          <el-tag :type="statusTagArr[row.status]" size="small">
            {{ row.status_name }}
          </el-tag>
          <template v-if="row.status > 2 && row.approve_msg">
            <el-tooltip :content="row.approve_msg" placement="top">
              <i class="el-icon-warning" :class="statusTagArr[row.status]"></i>
            </el-tooltip>
          </template>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        v-if="
          is([
            'shop.product.update',
            'shop.product.delete',
            'shop.product.submit',
            'shop.product.approve',
          ])
        "
      >
        <template slot-scope="{ row }">
          <template v-if="!row.on_sale">
            <el-button
              type="primary"
              size="mini"
              v-if="is(['shop.product.update'])"
              @click="edit(row.id)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="del(row.id)"
              v-if="is(['shop.product.delete'])"
              >删除</el-button
            >
            <el-button
              type="success"
              size="mini"
              @click="submit(row.id)"
              v-if="
                is(['shop.product.submit']) &&
                (row.status === 1 || row.status === 4)
              "
              >提交</el-button
            >
            <el-button
              type="success"
              size="mini"
              @click="approve(row.id)"
              v-if="is(['shop.product.approve']) && row.status === 2"
              >审核</el-button
            >
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="b">
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onPageChange"
        :current-page="page + 1"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="limit"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
      >
      </el-pagination>
    </div>
    <!-- 编辑按钮 -->
    <product-edit
      :value.sync="show.edit"
      :id="currentId"
      @confirm="confirm"
      v-if="is(['shop.product.update'])"
    />
    <!-- 审核按钮 -->
    <product-approve
      :value.sync="show.approve"
      :id="currentId"
      @confirm="getList"
    />
  </div>
</template>

<script>
import instance from "@/api/api";
import ProductSearch from "./components/ProductSearch.vue";
import ProductDetail from "./components/ProductDetail.vue";
//编辑组件
import ProductEdit from "./components/ProductEdit.vue";
//审核组件
import ProductApprove from "./components/ProductApprove.vue";
export default {
  components: {
    ProductSearch,
    ProductDetail,
    ProductEdit,
    ProductApprove,
  },
  data() {
    return {
      list: [], //表格数据
      total: 0,
      page: 0, // 请求的当前页码
      limit: 10, //显示条数
      searchForm: {
        name: "",
        category_id: 0,
        status: 0,
      },
      currentId: 0,
      statusTagArr: [null, "info", "", "success", "warning"],
      show: {
        add: false,
        edit: false,
        approve: false,
      },
    };
  },
  created() {
    this.getList();
    //把列表放入数组中,全部分类,search组件好使用
    this.$store.dispatch("shop/getCategoryList");
  },
  methods: {
    //获取列表数据
    getList() {
      const { page, limit, searchForm } = this;
      instance
        .get("/product/list", {
          params: {
            page,
            limit,
            ...searchForm,
          },
        })
        .then(({ data: { data } }) => {
          console.log(data);
          this.list = data.list;
          this.total = data.total;
        });
    },
    //展开详情页的表格事件
    onExpandChange(row, expandedRows) {
      console.log(row, expandedRows);
      if (expandedRows.length === 2) {
        const elseRow = expandedRows.find((i) => i.id !== row.id);
        // console.log(elseRow);
        this.$refs.table.toggleRowExpansion(elseRow);
      }
    },
    cellClass({ row, columnIndex }) {
      //给单表格添加类名
      return row.on_sale && columnIndex === 2 ? "sale" : "";
    },
    //分页器
    onSizeChange(limit) {
      this.limit = limit;
      this.page = 0;
      this.getList();
    },
    //分页器
    onPageChange(page) {
      this.page = page - 1;
      this.getList();
    },
    //搜索商品
    search(formData) {
      this.searchForm = formData;
      this.page = 0;
      this.getList();
    },
    //重置
    reset() {
      this.getList();
    },
    add() {},
    //修改
    edit(id) {
      // console.log(id);
      this.currentId = id;
      this.show.edit = true;
    },
    //删除
    del(id) {
      this.$confirm("信息删除不可恢复，确认操作？", {
        confirmButtonText: "确认删除",
        cancelButtonText: "暂不操作",
        type: "warning",
      }).then(() => {
        instance
          .post("/product/delete", {
            id,
          })
          .then(({ data: { errcode } }) => {
            console.log(errcode);
            if (!errcode) {
              this.$message.success("删除成功!");
              this.getList();
            }
          });
      });
    },
    submit(id) {
      this.$confirm("商品信息已经添加无误，提交给上级审核，确认操作？", {
        confirmButtonText: "确认提交",
        cancelButtonText: "暂不操作",
        type: "warning",
      })
        .then(() => {
          instance
            .post("/product/submit", {
              id,
            })
            .then(({ errcode }) => {
              if (!errcode) {
                this.$message.success("提交成功!");
                this.getList();
              }
            });
        })
        .catch(() => {});
    },
    //修改商品以后刷新列表
    confirm() {
      this.getList();
    },
    //审核
    approve(id) {
      this.currentId = id
      this.show.approve = true
      
    },
  },
};
</script>

<style lang="sass">
.product-list
  .b
    padding-top: 20px
    text-align: right
  .el-table
    .el-tag + .el-tag
      margin-left: 7px
    .el-tag--small
      padding: 0 5px
    .el-icon-warning
      margin-left: 3px
      &.success
        color: #67c23a
      &.warning
        color: #e6a23c
    //王老吉上架商标
    td.sale
      position: relative
      .cell
        padding-left: 20px
      &:after
        content: "已上架"
        display: flex
        justify-content: center
        align-items: center
        position: absolute
        top: 50%
        left: 0
        transform-origin: 0 50%
        transform: translateY(-50%) scale(.8)
        line-height: 1.3em
        padding: 3px 0
        width: 16px
        border-radius: 0 4px 4px 0
        font-size: 12px
        background-color: #67c23a
        color: #fff
</style>