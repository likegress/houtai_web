<template>
  <div>
    <el-dialog title="添加新用户" :visible="incrementFrom" @close="addCancelFn">
      <el-form :model="addForm" :rules="addRules" ref="addForm">
        <el-form-item label="日期" :label-width="addFormVisible">
          <el-date-picker
            v-model="addForm.date"
            type="date"
            placeholder="选择日期"
            @change="addPickFn"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="标题" :label-width="addFormVisible" prop="title">
          <el-input v-model="addForm.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="addFormVisible" prop="author">
          <el-input v-model="addForm.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="addFormVisible" prop="price">
          <el-input v-model="addForm.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="评分" :label-width="addFormVisible" prop="rate">
          <el-select v-model="select" placeholder="请选择" @change="onChange">
            <el-option
              v-for="item in 5"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.prevent="addCancelFn">取 消</el-button>
        <el-button type="primary" @click.prevent="addConfirmFn"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "AddDialog",
  props: {
    addForm: Object,
    addFormVisible: String,
    incrementFrom: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      pattern: "",
      select: "",
      addFlag: false,
      addRules: {
        // data: [{ required: true, message: "请填写时间", trigger: "change" }],
        title: [{ required: true, message: "请填写标题", trigger: "change" }],
        author: [{ required: true, message: "请填写作者", trigger: "change" }],
        price: [
          { required: true, message: "请填写数字", trigger: "blur" },
          {
            pattern: /^[1-9]\d*$/,
            message: "请至少填写一位非0数",
          },
        ],
        rate: [
          { pattern: /^[1-5]\d*$/, message: "请填写分数", trigger: "blur" },
        ],
      },
      // 验证表达是否准确
      valid: false,
    };
  },
  methods: {
    addPickFn() {
      let time = moment(this.addForm.date).format("YYYY-MM-DD");
      this.addForm.date = time;
    },
    //取消按钮
    addCancelFn() {
      this.$emit("my_addCancelFn", false);
    },
    addConfirmFn() {
      this.$refs.addForm.validate((valid) => {
        this.valid = valid;
        if (!valid) {
          this.$message({
            showClose: true,
            message: "请正确填写表单信息",
            type: "error",
          });
        }
      });
      //如果表单验证失败返回
      if (!this.valid) {
        return;
      }
      this.$emit("my_addConfirmFn", false);
    },
    //星星选择器发生变化把值传给form表单
    onChange() {
      this.$emit("selectStar", this.select);
    },

    // //添加表单校验
    // modelClose(){
    //   this.$emit("update:incrementFrom",false)
    // }
  },
};
</script>

<style lang="scss" scoped></style>