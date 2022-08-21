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
            <el-dropdown-item command="user">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <Tags />
    <el-dialog
      title="修改密码"
      :visible.sync="dialogVisible"
      width="30%"
      :show-close="false"
    >
      <el-form :model="formData" :rules="rules" ref="form">
        <el-form-item prop="oldPassword">
          <el-input
            v-model="formData.oldPassword"
            placeholder="修改密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="newPassword">
          <el-input
            v-model="formData.newPassword"
            placeholder="旧密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="new2Password">
          <el-input
            v-model="formData.new2Password"
            placeholder="新密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeFn">取 消</el-button>
        <el-button type="primary" @click="savePass">确 定</el-button>
      </span>
    </el-dialog>
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
    const validator = ({ field }, value, callback) => {
      // console.log(field,value);
      if (field == "newPassword" && this.formData.newPassword != "") {
        this.$refs.form.validateField("new2Password");
      }
      if (field == "new2Password") {
        if (value != this.formData.newPassword) {
          callback(new Error("新密码和旧密码输入不一样"));
        } else {
          callback()
        }
      }
    };
    return {
      timer: null,
      levelList: null, // 面包屑导航数组
      dialogVisible: false, //修改密码的弹层
      formData: {
        oldPassword: "",
        newPassword: "",
        new2Password: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入旧密码", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { validator, trigger: "blur" },
        ],
        new2Password: [
          { required: true, message: "请确定新密码", trigger: "blur" },
          { validator, trigger: "blur" },
        ],
      },
      valid: true, // 保存
    };
  },
  created() {},
  methods: {
    //提交修改密码
    savePass() {
      this.$refs.form.validate((valid=true) => {
        // console.log(valid);
        // this.valid = valid || false;
        // //验证不通过无法关闭
        if(!valid )return
        console.log(valid);
        this.dialogVisible = false
      });

    },
    //取消关闭窗口
    closeFn() {
      this.dialogVisible = false;
      for (let k in this.formData) {
        this.formData[k] = "";
      }
    },
    isShow() {
      this.$store.commit("isShow");
    },
    handleCommand(cmd) {
      //退出登录
      if (cmd == "logout") {
        localStorage.removeItem("token");
        this.$router.push("/login");
      } else if (cmd == "user") {
        // 修改密码
        this.dialogVisible = true;
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
      if (matched[matched.length - 1].name == "index") {
        matched.splice(0, matched.length - 1);
      }
      this.levelList = matched;
      // console.log(this.levelList);
    },
  },

  watch: {
    "$route": {
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
