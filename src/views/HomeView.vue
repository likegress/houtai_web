<template>
  <div class="home">
    <el-container>
      <el-aside
        v-bind:width="$store.state.isCollapse ? '56px' : '200px'"
        style="overflow: hidden"
      >
        <AsideMenu />
      </el-aside>
      <el-container>
        <el-header>
          <HeaderTop />
          <Draw />
        </el-header>
        <keep-alive>
          <router-view v-if="$route.name == 'shop'"></router-view>
        </keep-alive>
        <router-view v-if="$route.name != 'shop'"></router-view>
      </el-container>
    </el-container>
    <!-- 主页的抽屉侧栏效果 -->
  </div>
</template>

<script>
import AsideMenu from "@/views/home/AsideMenuView";
import HeaderTop from "@/views/home/HeaderView";
import Draw from "@/components/DrawView.vue";
export default {
  name: "homeView",
  components: {
    AsideMenu,
    HeaderTop,
    Draw,
  },
};
</script>

<style lang="sass" scoped>
.el-container
  height: 100vh
  overflow: auto
.el-header
  // background: deepskyblue
  padding: 0
  height: 90px !important
</style>