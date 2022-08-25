<template>
  <div class="layoutShop">
    <pro-table :data="list" :columns="columns">
      <template #name="{ row }">
        {{ row.name }}
        <span
          v-if="row.name.includes('老')"
          style="
            display: inline-block;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: green;
          "
        ></span>
      </template>
      <template #action>
        <el-button type="primary">操作</el-button>
      </template>
    </pro-table>

    <!-- <pro-form :value="formData" :list="formList" @input="formData = $event"></pro-form> -->
    <pro-form :list="formList" v-model="formData"></pro-form>

 </div>
</template>

<script>
import instance from "@/api/api";
export default {
  
  data() {
    return {
      list: [
        {
          id: 1,
          name: "老王",
        },
        {
          id: 2,
          name: "小王",
        },
        {
          id: 3,
          name: "小李",
        },
      ],
      columns: [
        {
          prop: "id",
          label: "编号",
        },
        {
          prop: "name",
          label: "姓名",
          slot: true,
        },
        {
          prop: "action",
          label: "操作",
          slot: true,
        },
      ],
      formData: {
        username: "老王",
        password: "123456",
        city: "",
      },
      formList: [
        { type: "input", prop: "username", label: "用户名" },
        { type: "input", prop: "password", label: "密码" },
        {
          type: "select",
          prop: "city",
          label: "城市",
          optionList: [
            {
              label: "北京",
              value: "bj",
            },
            {
              label: "上海",
              value: "sh",
            },
          ],
        },
      ],
    };
  },
  created() {
    //请求商品列表
    // this.getTopShop();
  },
  methods: {
    // async getTopShop() {
    //   const res = await instance.get("/main/shop/sale");
    //   //   this.product = list;
    //   console.log(res);
    // },
  },
};
</script>

<style lang="scss" scoped></style>
