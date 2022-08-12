<template>
  <div class="sixPie" ref="sixPie"></div>
</template>

<script>
import resize from "@/mixin/resize";
import * as echarts from "echarts";
let macarons = require("echarts/theme/macarons");
export default {
  mixins: [resize],
  data() {
    return {
      sixPie: "",
    };
  },
  methods: {
    //封装左侧导航栏变动,图标自动响应
    myResize(){
      this.sixPie.resize();
    }
  },
  created() {},
  mounted() {
    const chart = this.$refs.sixPie
    this.sixPie = echarts.init(chart, "macarons");
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "line", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      radar: {
        radius: "66%",
        center: ["50%", "42%"],
        splitNumber: 8,
        splitArea: {
          areaStyle: {
            color: "rgba(127,95,132,.3)",
            opacity: 1,
            shadowBlur: 45,
            shadowColor: "rgba(0,0,0,.5)",
            shadowOffsetX: 0,
            shadowOffsetY: 15,
          },
        },
        indicator: [
          { name: "Sales", max: 10000 },
          { name: "Administration", max: 20000 },
          { name: "Information Technology", max: 20000 },
          { name: "Customer Support", max: 20000 },
          { name: "Development", max: 20000 },
          { name: "Marketing", max: 20000 },
        ],
      },
      legend: {
        left: "center",
        bottom: "10",
        data: ["Allocated Budget", "Expected Spending", "Actual Spending"],
      },
      series: [
        {
          type: "radar",
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: "rgba(0,0,0,.2)",
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1,
            },
          },
          data: [
            {
              value: [5000, 7000, 12000, 11000, 15000, 14000],
              name: "Allocated Budget",
            },
            {
              value: [4000, 9000, 15000, 15000, 13000, 11000],
              name: "Expected Spending",
            },
            {
              value: [5500, 11000, 12000, 15000, 12000, 12000],
              name: "Actual Spending",
            },
          ],
          animationDuration: 3000,
        },
      ],
    };
    this.sixPie.setOption(option);

    window.addEventListener("resize",()=>{
      this.myResize()
    })
  },
  beforeDestroy(){
    window.removeEventListener("resize",this.myResize)
  },  
  watch: {
    // 当导航栏变动的时候自适应
    "$store.state.isCollapse"() {
      this.sixPie.resize();
    },
  },
};
</script>

<style lang="scss" scoped>
.sixPie {
  height: 300px;
  background: #fff;
  margin-top: 20px;
  padding: 20px;
}
</style>
