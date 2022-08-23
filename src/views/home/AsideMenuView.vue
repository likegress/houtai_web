<template>
  <el-row>
    <el-col>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="deepskyblue"
        :collapse="$store.state.isCollapse"
        router
      >
        <el-menu-item index="/home/index">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/home/about">
          <i class="el-icon-menu"></i>
          <span slot="title">关于页面</span>
        </el-menu-item>
        <el-menu-item index="/home/shop">
          <i class="el-icon-document"></i>
          <span slot="title">商品管理</span>
        </el-menu-item>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品下架</span>
          </template>
          <el-menu-item index="/home/xiajia/todu">
            <i class="el-icon-user-solid"></i>
            <span slot="title">角色管理</span>
          </el-menu-item>
          <el-menu-item index="/home/xiajia/role">
            <i class="el-icon-s-check"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Aside",
  methods: {
    handleOpen() {},
    handleClose() {},
    //向tag组件传值
  },
};
</script>

<style lang="scss" scoped>
.el-col {
  height: 100vh;
}
.el-menu-vertical-demo {
  height: 100%;
  overflow: hidden;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>