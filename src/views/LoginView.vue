<template>
  <div class="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
    >
      <OwlLogin :password="closeEye" />
      <h3 class="title">梦溪后台管理系统</h3>
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="账号"
          prefix-icon="el-icon-user-solid"
        >
          <!-- <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          /> -->
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          prefix-icon="el-icon-lock"
          @keyup.enter.native="handleLogin"
          @focus="closeEye = true"
          @blur="closeEye = false"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input
          v-model="loginForm.code"
          type="code"
          auto-complete="off"
          placeholder="验证码"
          prefix-icon="el-icon-s-order"
          @keydown.enter.native="handleLogin"
        >
          <template #append>
            <el-tooltip content="点击刷新" placement="top">
              <div class="svgImg" v-html="svgImg" @click="toggleCode"></div>
            </el-tooltip>
          </template>
        </el-input>
      </el-form-item>
      <el-checkbox
        v-model="loginForm.rememberMe"
        style="margin: 0px 0px 25px 0px"
        >记住密码</el-checkbox
      >
      <el-form-item style="width: 100%">
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width: 100%"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <!-- <div style="float: right" v-if="register">
          <router-link class="link-type" :to="'/register'"
            >立即注册</router-link
          >
        </div> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import instance from "@/api/api";
// import debounce from "@/plugin/debounce";
//猫头鹰动画组件
import OwlLogin from "@/components/OwlLogin";
import { resetRouter } from "@/router/index";
export default {
  name: "login",
  components: {
    OwlLogin,
  },
  data() {
    return {
      loginForm: {
        username: "administrator",
        password: "Qwe123",
        rememberMe: false,
        code: "",
      },
      closeEye: false, //控制猫头鹰的眼睛
      svgImg: "", //验证码图片
      loginRules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      register: "",
      loading: false, //load过度动画
      debounceFn: null,
    };
  },

  created() {
    //给登录做防抖
    // this.debounceFn = debounce(this.onLogin, 2000);
    //请求验证码
    this.toggleCode();
  },
  methods: {
    onLogin() {
      //功能函数
      if (this.loading) return;
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          let { username, password, code } = this.loginForm;
          const {
            data: { errcode, errmsg },
          } = await instance.post("/login", { username, password, code });
          console.log(errcode, errmsg);
          if (errcode == 0 && errmsg == "login ok") {
            // resetRouter();
            let token = "12123www";
            localStorage.setItem("token", token);
            this.$message({
              showClose: true,
              message: "恭喜你，登陆成功",
              type: "success",
              duration: 500,
              onClose: () => {
                this.$router.push("/home/index");
                this.loading = true;
              },
            });
          } else {
            this.loading = false;
          }
          // else {
          //   this.loading = false;
          //   this.$message({
          //     showClose: true,
          //     message: `${(errcode, errmsg)}`,
          //     type: "error",
          //   });
          // }
        }
      });
    },
    //请求验证码方法
    toggleCode() {
      instance.get("/captcha").then(({ data: { data } }) => {
        // console.log(data);
        this.svgImg = data;
      });
    },
    handleLogin() {
      this.onLogin();
    },
  },
};
</script>

<style lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/images/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  position: relative;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
svg {
  height: 33px !important;
}
</style>