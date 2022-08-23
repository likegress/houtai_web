<template>
  <div>
    <el-dialog
      title="角色授权"
      :visible="value"
      width="400px"
      @close="handleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-tree
        v-if="show"
        :data="data"
        show-checkbox
        node-key="id"
        :default-checked-keys="rolePermissions"
        default-expand-all
        ref="tree"
      >
        <template slot-scope="{ node, data }">
          <span>
            {{ data.label }}
            <i v-if="node.isLeaf">{{ data.id }}</i>
          </span>
        </template>
      </el-tree>
      <div class="dialog-footer" slot="footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button @click="onConfirm" type="primary">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import instance from "@/api/api";
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    id: Number,
  },
  data() {
    return {
      show: true, //显示控件的显示隐藏
      data: [], //树形控件数组
      rolePermissions: [],
    };
  },
  watch: {
    value(v) {
      //当开关改变的时候
      console.log(v);
      if (!v) return;
      this.getRolePermissions();
    },
    rolePermissions(){
      this.show = false;
      this.$nextTick(()=>{
        this.show = true
      })
    }
  },
  created() {
    //获取树形控件数据
    this.getAllPermissions();
    // this.getRolePermissions();
  },
  methods: {
    //获取树形控件的数组
    async getAllPermissions() {
      const { data } = await instance.get("/permission/list");
      //   console.log(data);
      this.data = data.data;
    },
    //派发父元素关闭按钮
    handleClose() {
      this.rolePermissions = [];
      this.$emit("input", false);
    },
    //获取显示的权限列表
    getRolePermissions() {
      console.log(this.id);
      instance.get("/role/detail?id=" + this.id).then(({ data }) => {
        this.rolePermissions = (data.data || {}).permissions || [];
        console.log(this.rolePermissions);
      });
    },
    //取消
    onCancel() {
      this.rolePermissions = [];
      this.$emit("input", false);
    },
    //确定
    async onConfirm() {
      //获取选中的控件节点
      const permissions = this.$refs.tree.getCheckedKeys();
      console.log(permissions);
      //把角色的权限请求接口给后台
      const data = await instance.post("/role/set", {
        id: this.id,
        permissions,
      });
      if(!data.errcode){ //为0 成功
          //弹窗成功信息
          this.$message.success("角色授权成功")
          //关闭弹窗
          this.onCancel();
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>