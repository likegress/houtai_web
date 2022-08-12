<template>
  <div class="lineChartData" ref="lineChartData"></div>
</template>

<script>
import * as echarts from "echarts";
import instance from "@/api/api";
//引入mixin

export default {
  data() {
    return {
      lineChart: "",
      // 折线图的2条线
      line1: [],
      line2: [],
    };
  },
  methods: {
    async getData() {
      const {
        data: { line1, line2 },
      } = await instance.get("/lineCharts");

      this.line1 = line1;
      this.line2 = line2;
    },
    myResize() {
      this.lineChart.resize();
    },
  },
 
  mounted() {
    this.getData().then(() => {
      const chartDom = this.$refs.lineChartData;
      this.lineChart = echarts.init(chartDom);

      const option = {
        xAxis: {
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#3888fa",
              width: 2,
              type: "solid",
            },
          },
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
          },
          padding: [5, 10],
        },
        yAxis: {
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#3888fa",
              width: 2,
              type: "solid",
            },
          },
        },
        legend: {
          data: ["我爱拉屎", "甘妮奈"],
        },
        series: [
          {
            name: "我爱拉屎",
            itemStyle: {
              normal: {
                color: "#FF005A",
                lineStyle: {
                  color: "#FF005A",
                  width: 2,
                },
              },
            },
            smooth: true,
            type: "line",
            data: this.line1,
            animationDuration: 2800,
            animationEasing: "cubicInOut",
          },
          {
            name: "甘妮奈",
            smooth: true,
            type: "line",
            itemStyle: {
              normal: {
                color: "#3888fa",
                lineStyle: {
                  color: "#3888fa",
                  width: 2,
                },
                areaStyle: {
                  color: "#f3f8ff",
                },
              },
            },
            data: this.line2,
            animationDuration: 2800,
            animationEasing: "quadraticOut",
          },
        ],
      };

      this.lineChart.setOption(option);

      window.addEventListener("resize", () => {
        this.myResize()
      });
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.myResize);
  },
  watch: {
    // 当导航栏变动的时候自适应
    "$store.state.isCollapse"() {
      this.lineChart.resize();
    },
  },
};
</script>

<style lang="sass" scoped>
.lineChartData
    height: 350px
    background: #fff
</style>
