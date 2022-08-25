<template>
  <el-dialog title="审核商品" :visible="value" width="425px" @close="onCancel">
    <el-form ref="form" :model="formData" :rules="rules" label-width="85px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="分类" prop="category_id">
        <el-select v-model="formData.category_id">
          <el-option
            v-for="d in $store.getters['shop/categoryList']"
            :key="d.id"
            :label="d.name"
            :value="d.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="create_time">
        <el-date-picker
          type="datetime"
          v-model="formData.create_time"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="标签" prop="tags">
        <product-tag v-model="formData.tags" />
      </el-form-item>
      <el-form-item label="图片" prop="pic">
        <image-upload v-model="formData.pic" width="225" height="150" />
        <div class="form-tip">图片尺寸750px * 500px</div>
      </el-form-item>
      <el-form-item label="介绍" prop="detail">
        <el-input type="textarea" v-model="formData.detail"></el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer" slot="footer">
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import instance from "@/api/api";
import ProductTag from "./ProductTag.vue";
import ImageUpload from "@/components/ImageUpload.vue";
export default {
  components: {
    ProductTag,
    ImageUpload,
  },
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
  data() {
    return {
      formData: {
        name: "",
        category_id: null,
        create_time: "",
        tags: [],
        pic: "",
        detail: "",
        desc: "",
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        category_id: [
          { required: true, message: "请选择分类", trigger: "blur" },
        ],
        create_time: [
          { required: true, message: "请设置创建时间", trigger: "blur" },
        ],
        pic: [{ required: true, message: "请设置图片", trigger: "blur" }],
        detail: [{ required: true, message: "请输入介绍", trigger: "blur" }],
      },
    };
  },
  watch: {
    // 当值变化的时候
    value(v) {
      if (!v) return;
      this.getProductDetail();
    },
  },
  methods: {
    getProductDetail() {
      instance
        .get("/product/detail", {
          params: { id: this.id },
        })
        .then(({ data: { data } }) => {
          delete data.id;
          delete data.category_name;
          delete data.status;
          delete data.status_name;
          delete data.approve_msg;
          delete data.on_sale;

          this.formData = data;
        });
    },
    onCancel() {
      this.$emit("update:value", false);
    },
    onConfirm() {
      this.$refs.form.validate((valid) => {
        if (!valid) return;
        instance
          .post("/product/edit", {
            ...this.formData,
            id: this.id,
          })
          .then((data) => {
            if (!data.errcode) {
              this.$message.success("商品编辑成功");
              this.onCancel();
              this.$emit("confirm");
            }
            this.$emit("update:value", false);
          });
      });
    },
  },
};
</script>

<style lang="sass" scoped>
.el-select, .el-date-editor.el-input
  width: 100%
.form-tip
  border-radius: 10px
  height: 20px
  line-height: 20px
  background: #f5f5f5
  margin-top: 5px
</style>