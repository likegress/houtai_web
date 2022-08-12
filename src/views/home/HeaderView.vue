<template>
  <div class="topNav">
    <div class="header">
      <!-- el-icon-s-fold -->
      <div class="left">
        <i
          @click="isShow"
          id="isShow"
          :class="
            $store.state.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
          "
        ></i>

        <el-breadcrumb separator="/">
          <transition-group tag="div" name="animation">
          <el-breadcrumb-item
            v-for="(item, index) in levelList"
            :key="index"
            :to="{ path: item.path }"
          >
            {{ item.meta.pathName }}
          </el-breadcrumb-item>
          </transition-group>
        </el-breadcrumb>
      </div>
      <div class="rightTip">
        <i class="el-icon-s-platform" @click="Full"></i>
        <el-dropdown @command="handleCommand">
          <img
            src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
            alt=""
            class="avatar"
          />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="user">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <Tags />
  </div>
</template>

<script>
import Tags from "@/components/TagView.vue";
import screenfull from "screenfull";

export default {
  components: {
    Tags,
  },
  data() {
    return {
 
      timer: null,
      levelList: null, // 面包屑导航数组
    };
  },
  created() {},
  methods: {
    isShow() {
      this.$store.commit("isShow");
    },
    handleCommand(cmd) {
      if (cmd == "logout") {
        localStorage.removeItem("token");
        this.$router.push("/login");
      }
    },
    //全屏显示
    Full() {
      screenfull.toggle();
    },
    //面包屑导航
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => {
        console.log(item.meta.pathName);
        return item.name;
      });
      if(matched[matched.length-1].name == "index"){
        matched.splice(0,matched.length-1)
      }
      this.levelList = matched;
      // console.log(this.levelList);
    },
  },

  watch: {
    $route: {
      immediate: true,
      handler(val) {
        this.$store.commit("defaultBreadcrumb", val);
        
        //面包屑导航
        this.getBreadcrumb();
      },
    },
  },
};
</script>

<style lang="sass" scoped>
@media screen and (max-width: 1200px)
  i.el-icon-s-platform
    display: none
.topNav

  .header
      display: flex
      align-items: center
      justify-content: space-between
      height: 50px
      transition: all .4s
      padding: 0 20px
      #isShow
          margin-right: 20px
          font-size: 20px
          cursor: pointer
          transition: all .5s
      .animation-enter
          transform: translateX(50px)
      .animation-enter-to
          transform: translateX(0)
      .animation-enter-active,.animation-leave-active
          transition: all .3s
      
    
  
.left
  display: flex
  align-items: center
.avatar
  width: 40px
  height: 40px
  border-radius: 50%
.rightTip
  display: flex
  align-items: center
  i
    margin-right: 10px
    font-size: 20px
</style>
