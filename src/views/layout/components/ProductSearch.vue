<template>
  <div class="product-search-form">
    <el-input
      size="mini"
      v-model="formData.name"
      placeholder="请输入商品名称"
      clearable
      @clear="search"
    ></el-input>
    <el-select size="mini" v-model="formData.category_id" @change="searchFn">
      <el-option
        v-for="d in categoryList"
        :key="d.id"
        :value="d.id"
        :label="d.name"
      ></el-option>
    </el-select>
    <el-select size="mini" v-model="formData.status" @change="searchFn">
      <el-option label="全部状态" :value="0"></el-option>
      <el-option label="未提交" :value="1"></el-option>
      <el-option label="待审核" :value="2"></el-option>
      <el-option label="审核通过" :value="3"></el-option>
      <el-option label="审核拒绝" :value="4"></el-option>
    </el-select>
    <el-button size="mini" type="primary" icon="el-icon-search" @click="search"
      >查找</el-button
    >
    <el-button
      size="mini"
      type="primary"
      icon="el-icon-refresh"
      @click="reset"
      v-if="isSearch"
      >重置</el-button
    >
    <el-button size="mini" type="primary" icon="el-icon-plus">添加</el-button>
  </div>
</template>

<script>
export default {
  props: {
    formData: Object,
  },
  // data() {
  //   return {
  //     formData: {
  //       name: "",
  //       category_id: 0,
  //       status: 0,
  //     },
  //   };
  // },
  methods: {
    //搜索
    search() {
      this.$emit("search", this.formData);
    },
    //重置
    reset() {
      this.$emit("update:formData", {
        name: "",
        category_id: 0,
        status: 0,
      });
      this.$emit("reset");
    },
    //把数据formData双向绑定
    searchFn() {
      this.$emit("update:formData", this.formData);
    },
  },
  computed: {
    //第一个select框
    categoryList() {
      return [{ name: "全部分类", id: 0 }].concat(
        this.$store.state.shop.categoryList
      );
    },
    //表单中有一个为强转布尔为false,让重置
    isSearch() {
      const { name, category_id, status } = this.formData;
      return name || category_id || status;
    },
  },
  // watch:{
  //   isSearch(l){
  //     console.log(l);
  //   }
  // }
};
</script>

<style lang="sass" scoped>
.product-search-form
  padding-bottom: 20px
  padding-left: 20px
  display: flex
  & >.el-input
    width: 200px
    margin-right: 10px

  & >.el-select
    display: inline-block
    width: 150px
    margin-right: 10px
</style>