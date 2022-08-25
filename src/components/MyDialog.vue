<template>
  <div>
    <el-dialog
      title="修改数据"
      :visible="dialogFormVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="onClose"
    >
      <el-form :model="form">
        <!-- format="yyyy-yy-y MM:MM:dd" -->
        <!-- :picker-options="pickerOptions" -->
        <el-form-item label="年份" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.date"
            @change="pickFn"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="作者" :label-width="formLabelWidth">
          <el-input v-model="form.author" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="评分" :label-width="formLabelWidth">
          <el-select v-model="select" placeholder="请选择" @change="onChange">
            <el-option
              v-for="item in selects"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelFn">取 消</el-button>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "MyDialog",
  props: ["form", "dialogFormVisible", "formLabelWidth"],
  data() {
    return {
      select: "",
      selects: [
        {
          value: 0,
          label: "请选择",
        },
        {
          value: 1,
          label: 1,
        },
        {
          value: 2,
          label: 2,
        },
        {
          value: 3,
          label: 3,
        },
        {
          value: 4,
          label: 4,
        },
        {
          value: 5,
          label: 5,
        },
      ],

      val: "",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
    };
  },
  created() {},
  methods: {
    // 日期时间失去焦点的时候把格式改为字符串
    pickFn() {
      // console.log(this.form.date);
      let time = moment(new Date(this.form.date)).format("YYYY-MM-DD");

      this.form.date = time;
    },
    confirmFn() {
      this.$emit("confirmFn_my");
      //事件名
    },
    cancelFn() {
      this.$emit("update:dialogFormVisible", false);
    },
    //关闭弹框
    onClose() {
      this.$emit("update:dialogFormVisible", false);
    },
    //星星选择器发生变化把值传给form表单
    onChange() {
      this.$emit("updateStar", this.select);
    },
  },
  watch: {
    form: {
      deep: true,
      handler(val) {
        this.select = val.star;
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>