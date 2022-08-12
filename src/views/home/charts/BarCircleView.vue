<template>
  <div class="bar" ref="bar"></div>
</template>

<script>
import * as echarts from "echarts";
let macarons = require("echarts/theme/macarons");
export default {
  data() {
    return {
      barChart: "",
    };
  },
  methods: {
    myResize(){
      this.barChart.resize();
    }
  },
  mounted() {
    this.barChart = echarts.init(this.$refs.bar, "macarons");
    let option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        left: "center",
        bottom: "10",
        data: ["小日本", "中国", "美国", "意大利", "俄罗斯"],
       
      },
      series: [
        {
          name: "WEEKLY WRITE ARTICLES",
          type: "pie",
          roseType: "radius",
          radius: [15, 95],
          center: ["50%", "38%"],
          data: [
            { value: 320, name: "小日本" },
            { value: 240, name: "中国" },
            { value: 149, name: "美国" },
            { value: 100, name: "意大利" },
            { value: 59, name: "俄罗斯" },
          ],
          animationEasing: "cubicInOut",
          animationDuration: 2600,
          
        },
      ],
    };
    this.barChart.setOption(option);
    window.addEventListener("resize", () => {
      this.myResize()
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.myResize);
  },
  watch: {
    // 当导航栏变动的时候自适应
    "$store.state.isCollapse"() {
      this.barChart.resize();
    },
  },
};
</script>

<style lang="scss" scoped>
.bar {
  background: #fff;
  height: 300px;
  margin-top: 20px;
  padding: 20px;
}
</style>
