<template>
  <div class="user-list">
    <div class="form">
      <el-input
        size="mini"
        v-model="username"
        placeholder="请输入角色名/账号"
        clearable
        @search="search"
      ></el-input>
      <el-button size="mini" type="primary" icon="el-icon-search"
        >查找</el-button
      >
      <el-button size="mini" type="primary" icon="el-icon-plus">添加</el-button>
      <el-table :data="list" border style="margin-top: 20px">
        <el-table-column
          label="ID"
          prop="id"
          width="100"
          align="center"
        ></el-table-column>
        <el-table-column
          label="角色名称"
          prop="name"
          align="center"
        ></el-table-column>
        <el-table-column label="角色描述" prop="desc" width="200">
        </el-table-column>
        <el-table-column label="操作" align="center" width="250">
          <template slot-scope="{ row }">
            <el-button size="mini" type="primary">编辑</el-button>
            <el-button size="mini" type="danger" @click="del">删除</el-button>
            <el-button size="mini" type="warning" @click="authFn(row)"
              >授权</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="b">
        <el-pagination
          @size-change="onSizeChange"
          @current-change="onPageChange"
          :current-page="page + 1"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="limit"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
          >
        </el-pagination>
      </div>

      <!-- 授权树形控件 -->
      <user-auth
        v-model="show.auth"
        :id="role.id"
        :value="show.auth"
      ></user-auth>
    </div>
  </div>
</template>

<script>
import instance from "@/api/api";
import UserAuth from "./components/UserAuth.vue";
export default {
  components: {
    UserAuth,
  },
  data() {
    return {
      username: "",
      list: [], //表格数组
      page: 0,
      limit: 10,
      total: 0,
      show: {
        auth: false,
      },
      role: {}, //存储授权的信息
    };
  },
  created() {
    this.getList();
  },
  methods: {
    //获取角色权限表格
    async getList() {
      const { limit, page, username } = this;
      const {
        data: { data },
      } = await instance.get("/role/list", {
        limit,
        page,
        username,
      });
      this.list = data.list;
      this.total = data.total;
      // console.log(data.total);
    },
    //授权开关
    authFn(role) {
      this.show.auth = true;
      //   console.log(role);
      this.role = role;
      console.log(role.id);
    },

    //清空表单按钮
    search() {
      this.page = 0;
      this.getList();
    },
    onSizeChange(limit) {
      this.limit = limit;
      this.page = 0;
      this.getList();
    },
    onPageChange(page) {
      this.page = page - 1;
      this.getList();
    },
    //删除
    del() {
      this.$message.error("你么有权限?");
    },
  },
};
</script>

<style lang="sass" scoped>
.user-list
    padding-left: 20px
    .form
        padding-bottom: 20px
    .el-input
        width: 200px
        margin-right: 10px
    .b
        padding-top: 20px
        text-align: right
    .el-table
        .el-avatar
            display: block
            margin: 0 auto
            border-radius: 4px
            background-repeat: no-repeat
            background-position: center
            background-size: cover
    .el-tag + .el-tag
        margin-left: 7px
    .el-tag--small
        padding: 0 5px
    .contact
        white-space: nowrap
        i
            margin-right: 5px
            color: #909399
</style>
