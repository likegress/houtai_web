<template>
  <div>
    <el-drawer title="我是标题" :visible.sync="drawer" :direction="direction">
      <span>我来啦!</span>
 
        <el-button
          @click="drawer = true"
          type="primary"
          style="margin-left: 16px"
        
        >
          点我打开
        </el-button>

    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      direction: "rtl",
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.el-drawer {
    position: relative;
     .el-button {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(-100%,-50%);
    }
}
   
</style>
