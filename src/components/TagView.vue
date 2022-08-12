<template>
  <div class="tags">
    <el-tag
      size="medium"
      :closable="$store.state.routes.length != 1"
      v-for="(item, index) of $store.state.routes"
      :key="index"
      @close="closeTag(item)"
      @click="toPage(item, index)"
      :class="current == index ? 'active' : ''"
      effect="plain"
      >
      
      {{ item.meta.pathName }}</el-tag>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      current: 0,
    };
  },
  methods: {

    // 关闭按钮
    closeTag(item) {
      let state = this.$store.state;
      if (state.routes.length <= 1) {
        return;
      }
      this.$store.commit("closeTag", item);
      const latsRoute = state.routes.length - 1;
      if (state.routes[latsRoute].name != this.$route.name) {
        //当前页面不是该数组的最后一个路由
        this.$router.push(state.routes[latsRoute].path);
      }
      console.log(state.routes);
      this.current = this.routes.length-1
    },
    //点击跳转页面
    toPage({ path }, index) {
      this.current = index;
      this.$router.push(path);
    },
  },

  computed: {
    ...mapState(["routes","breadFlag"]),
  },
  watch: {
    $route: {
      immediate: true,
      handler(val) {
        this.$store.commit("addBreadcrumb", val);
        //点击左侧显示高亮
        this.current = this.routes.findIndex(i=>i.path == val.path) ?? 0

        
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.tags
  border-top: 1px solid #999
  padding: 2px 5px
.el-tag
  
  margin-right: 5px
  &:hover 
    cursor: pointer
.active
    
    background-color: rgb(66 185 131)
    color: rgb(255 255 255)
    border-color: rgb(66 185 131)
.el-tag::before
  content: ""
  background: rgb(255 255 255)
  display: inline-block
  width: 8px
  height: 8px
  border-radius: 50%
  position: relative
  margin-right: 2px
</style>
