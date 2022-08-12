<template>
  <div class="pie" ref="pie"></div>
</template>

<script>
import * as echarts from "echarts";
require("echarts/theme/macarons");
export default {
  data() {
    return {
      pie: "",
    };
  },
  methods: {
    myResize(){
      this.pie.resize()
    }
  },
  mounted() {
    this.pie = echarts.init(this.$refs.pie, "macarons");
    const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
           axisLine: {
            show: true,
            lineStyle: {
              color: "#3888fa",
              width: 2,
              type: "solid",
            },
          },
        }],
        yAxis: [{
          type: 'value',
          axisLine: {
            show: true,
            lineStyle: {
              color: "#3888fa",
              width: 2,
              type: "solid",
            },
          },
        }],
        series: [{
          name: 'pageA',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [79, 52, 200, 334, 390, 330, 220],
          animationDuration:6000,
        }, {
          name: 'pageB',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [80, 52, 200, 334, 390, 330, 220],
          animationDuration:6000,
        }, {
          name: 'pageC',
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: [30, 52, 200, 334, 390, 330, 220],
          animationDuration:6000,
        }]
      }
    this.pie.setOption(option);
    window.addEventListener("resize",()=>{
        this.myResize()
    })
  },
  beforeDestroy(){
    window.removeEventListener("resize",this.myResize)
  },
  watch: {
    "$store.state.isCollapse"() {
      this.pie.resize();
    },
  },
};
</script>

<style lang="scss" scoped>
.pie {
  height: 300px;
  background: #fff;
  padding: 20px;
    margin-top: 20px;
}
</style>
