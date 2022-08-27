<template>
  <el-row>
    <el-col>
      <!-- <el-menu
        :default-active="$route.path"
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
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message-solid"></i>
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item index="/home/sale/current">
            <i class="el-icon-user-solid"></i>
            <span slot="title">备餐配餐</span>
          </el-menu-item>
          <el-menu-item index="/home/sale/history">
            <i class="el-icon-s-check"></i>
            <span slot="title">历史订单</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/home/xiajia/shop">
            <i class="el-icon-user-solid"></i>
            <span slot="title">分类管理</span>
          </el-menu-item>
          <el-menu-item index="/home/xiajia/product">
            <i class="el-icon-s-check"></i>
            <span slot="title">商品管理</span>
          </el-menu-item>
          <el-menu-item index="/home/xiajia/sale">
            <i class="el-icon-s-check"></i>
            <span slot="title">上架下架</span>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item index="/home/admin/user">
            <i class="el-icon-user-solid"></i>
            <span slot="title">用户管理</span>
          </el-menu-item>
          <el-menu-item index="/home/admin/role">
            <i class="el-icon-s-check"></i>
            <span slot="title">角色管理</span>
          </el-menu-item>
        </el-submenu>
      </el-menu> -->
      <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="deepskyblue"
        :collapse="$store.state.isCollapse"
        router
      >
        <fragment v-for="d in $store.getters['user/menus']" :key="d.path">
          <el-menu-item
            :index="d.path"
            v-if="!d.children "
          >
            <i :class="d.icon"></i>
            <span slot="title">{{ d.name }}</span>
          </el-menu-item>
          <el-submenu
            v-else-if="d.children "
            :index="d.path"
          >
            <template slot="title">
              <i :class="d.icon"></i>
              <span slot="title">{{ d.name }}</span>
            </template>
            <el-menu-item v-for="g in d.children" :index="g.path" :key="g.path">
              <i :class="g.icon"></i>
              <span slot="title">{{ g.name }}</span>
            </el-menu-item>
          </el-submenu>
        </fragment>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Aside",
  created() {
    console.log(this.$store.getters["user/menus"]);
    console.log(this.$store.getters["user/permissions"]);
  },
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