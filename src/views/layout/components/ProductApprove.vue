<template>
  <el-dialog
    title="审核商品"
    :visible="value"
    width="400"
    @close="onCancel"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form ref="form" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="审核意见" prop="approve">
        <el-radio-group v-model="formData.approve">
          <el-radio :label="true" border>审核通过</el-radio></el-radio>
          <el-radio :label="false" border>审核拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="审核说明" prop="msg">
        <el-input type="textarea" v-model="formData.msg"> </el-input>
      </el-form-item>
    </el-form>
    <div class="dialog-footer" slot="footer">
      <el-button size="mini" @click="onCancel">取消</el-button>
      <el-button size="mini" @click="onConfirm" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import instance from '@/api/api';
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
  data() {
    return {
      formData: {
        approve: true,
        msg: "",
      },
      rules: {
        approve: [
          { required: true, message: "请选择审核意见", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //取消
    onCancel() {
      this.$refs.form.clearValidate();
      this.formData = {
        approve: true,
        msg: "",
      }
      this.$emit("update:value", false);
    },
    //确定
    onConfirm() {
      this.$refs.form.validate(valid=>{
        if(valid){
            instance.post("/product/approve",{
                id:this.id,
                ...this.formData
            }).then(({data})=>{
                console.log(data.errcode);
                if(!data.errcode){
                    this.$message.success("已审核"+(this.formData.approve ? '通过' : '拒绝'))
                    this.onCancel()
                    this.$emit("confirm")
                }
            })
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped></style>