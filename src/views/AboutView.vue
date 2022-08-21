<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <el-button
          :type="flag ? 'success' : 'warning'"
          size="mini"
          @click="flag = !flag"
          >{{ flag ? "关闭动画" : "开启动画" }}</el-button
        >
        <transition
          enter-active-class="animated bounceInLeft"
          leave-active-class="animated bounceOutUp"
        >
          <div class="box" v-show="flag">html</div>
        </transition>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second" class="list2">
        <div class="formDate">
          <el-input placeholder="请输入账号" v-model="formDate.username" />
          <el-input placeholder="请输入验证码" v-model="formDate.password">
            <template v-slot:append>
              <el-button type="primary" :disabled="disabled" @click="sendCode">
                {{ time }}
              </el-button>
            </template>
          </el-input>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import "animate.css";
let timer = null;// 倒计时存储器
export default {
  data() {
    return {
      activeName: "second",
      flag: false,
      formDate: {
        username: "admin",
        password: "12345",
      },
      time: 5, //倒计时
      disabled: false, //是否禁用
    };
  },
  created() {},
  methods: {
    handleClick(tab, event) {},
    //倒计时
    sendCode() {
      this.disabled = true;
      this.time--;
      timer = setInterval(() => {
        this.time--;
        console.log(timer);
        if (this.time <= 0) {
          clearInterval(timer);
          this.disabled = false;
          this.time = 5
        }
      }, 1000);
    },
  },
};
</script>

<style lang="sass" scoped>
@import "@/style/animate.css"
.list2
  position: relative
.box
  width: 100px
  height: 100px
  background: red
  color: #fff
.formDate
  width: 400px
  height: 400px
  box-sizing: border-box
  padding: 20px
  border: 1px solid #ddd
  border-radius: 10px
  margin: 10px auto
  .el-input
    margin-bottom: 20px
    .el-input-group__append button.el-button
      width: 100px
      color: #FFF
      background-color: #409EFF
      border-color: #409EFF
      &:hover
        background: #66b1ff
        border-color: #66b1ff
        color: #FFF
      &.is-disabled
        color: #FFF
        background-color: #a0cfff
        border-color: #a0cfff
    .el-tabs__nav-wrap::after
      background:transparent
</style>
