<template lang="pug">
el-dialog(
  title="编辑用户"
  :visible="value"
  width="400px"
  @close="onCancel"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
)
  el-form(ref="form" :model="formData" :rules="rules" label-width="60px")
    el-form-item(label="账号" prop="username")
      el-input(v-model="formData.username")
    el-form-item(label="头像" prop="avatar")
      image-upload(v-model="formData.avatar" width="100" height="100")
      .form-tip.el-alert--info.is-light 图片尺寸80px * 80px
    el-form-item(label="角色" prop="role_ids")
      el-select(v-model="formData.role_ids" multiple filterable placeholder="请选择")
        el-option(v-for="d in roleList" :key="d.value" :label="d.label" :value="d.value")
    el-form-item(label="电话" prop="tel")
      el-input(v-model="formData.tel")
    el-form-item(label="邮箱" prop="mail")
      el-input(v-model="formData.mail")
    el-form-item(label="描述" prop="desc")
      el-input(v-model="formData.desc" type="textarea")
  .dialog-footer(slot="footer")
    el-button(@click="onCancel") 取消
    el-button(type="primary" @click="onConfirm") 确定
</template>

<script>
import instance from "@/api/api";
import ImageUpload from "@/components/ImageUpload.vue";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: {
      type: Number,
      default: 0,
    },
  },
  components: {
    ImageUpload,
  },
  data() {
    return {
      formData: {
        username: "",
        avatar: "",
        role_ids: [],
        tel: "",
        mail: "",
        desc: "",
      },
      roleList: [],
      rules: {
        username: [
          { required: true, message: "请输入用户名/账号", trigger: "blur" },
        ],
        avatar: [{ required: true, message: "请设置头像", trigger: "blur" }],
        tel: [{ required: true, message: "请输入电话", trigger: "blur" }],
        mail: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getAllRoles();
  },
  watch: {
    value(v) {
      if (!v) return;
      this.getUserDetail();
    },
  },
  methods: {
    getUserDetail() {
      instance.get("/user/detail?id=" + this.id).then(({ data }) => {
        delete data.id;
        delete data.role_names;
        this.formData = data;
      });
    },
    getAllRoles() {
      instance.get("/role/list?limit=100").then(({ data }) => {
        this.roleList = ((data.data || {}).list || []).map((i) => ({
          value: i.id,
          label: i.name,
        }));
      });
    },
    onCancel() {
      this.$refs.form.clearValidate();
      this.formData = {
        username: "",
        avatar: "",
        role_ids: [],
        tel: "",
        mail: "",
        desc: "",
      };
      this.$emit("input", false);
    },
    onConfirm() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        instance
          .post("/user/edit", {
            ...this.formData,
            id: this.id,
          })
          .then(({ data: { errcode } }) => {
            if (!errcode) {
              this.$message.success("用户编辑成功");
              this.onCancel();
              this.$emit("confirm");
            }
          });
      });
    },
  },
};
</script>

<style lang="sass">
.el-select
  width: 100%
</style>