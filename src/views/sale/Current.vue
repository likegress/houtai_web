<template>
  <div>
    <Trans />
  </div>
</template>

<script>
import instance from "@/api/api";
import Trans from "./components/Trans.vue";
export default {
  components: {
    Trans,
  },
  data() {
    return {
      list: [],
    };
  },
  created() {
    // instance
    //   .get("http://60.10.193.68:8889/applet-ym-service/ym/message/getEditDep")
    //   .then((res) => {
    //     console.log(res);
    //   });
  },
};
</script>

<style lang="scss" scoped></style>