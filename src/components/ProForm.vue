<template>
  <div class="pro-form">
    <el-form :model="formData" :rules="{}" label-width="80px">
      <el-from-item
        v-for="d in list"
        :key="d.prop"
        :label="d.label"
        :prop="d.prop"
      >
        <el-input
          v-if="d.type === 'input'"
          v-model="formData[d.prop]"
          @change="onChange"
        >
        </el-input>
        <el-select
          v-if="d.type === 'select'"
          v-model="formData[d.prop]"
          @change="onChange"
        >
          <el-option
            v-for="o in d.optionList"
            :key="o.value"
            :label="o.label"
            :value="o.value"
          ></el-option>
        </el-select>
      </el-from-item>

      <!-- <el-from-item label="密码" prop="password">
        <el-input v-model="value.password"> </el-input>
      </el-from-item>
      <el-from-item label="城市" prop="city">
        <el-select v-model="value.city">
          <el-option label="北京" value="bj" />
          <el-option label="上海" value="sh" />
        </el-select>
      </el-from-item> -->
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    //el-form 的model
    formData: {
      type: Object,
      default: () => ({}),
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  // data() {
  //   return {
  //     formData: {},
  //   };
  // },

  // created() {
  //   this.formData = { ...this.value };
  // },
  methods: {
    onChange() {
      this.$emit("input", this.formData);
    },
  },
  watch: {
    // value: {
    //   deep: true,
    //   handler() {
    //     this.formData = { ...this.value };
    //   },
    // },
    // formData: {
    //     deep: true,
    //     handler(){
    //         this.$emit('input', {...this.formData})
    //     }
    // }
  },
};
</script>

<style lang="scss"></style>