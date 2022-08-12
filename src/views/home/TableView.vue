<template>
  <div class="charts">
    <el-row :gutter="20" class="topCount">
      <el-col :span="12" :lg="6">
        <div class="gitCount">
            <img src="@/assets/25.jpg" alt="">
            <CountTo :start-val="0" :end-val="23600" :duration="3600" class="card-panel-num" />
        </div>
      </el-col>
      <el-col :span="12" :lg="6">
        <div class="gitCount">
            <img src="@/assets/31.jpg" alt="">
            <CountTo :start-val="0" :end-val="53600" :duration="3600" class="card-panel-num" />
        </div>
      </el-col>
      <el-col :span="12" :lg="6">
        <div class="gitCount nextCount">
            <img src="@/assets/32.jpg" alt="">
            <CountTo :start-val="0" :end-val="83600" :duration="3600" class="card-panel-num" />
        </div>
      </el-col>
      <el-col :span="12" :lg="6">
        <div class="gitCount nextCount">
            <img src="@/assets/41.jpg" alt="">
            <CountTo :start-val="0" :end-val="20000" :duration="3600" class="card-panel-num" />
        </div>
      </el-col>
    </el-row>
    <el-row>
      <lineCharts />
    </el-row>
    <el-row :gutter="20" class="three">
      <el-col :span="24" :lg="8">
        <sixPie />
      </el-col>
      <el-col :span="24" :lg="8">
        <BarCircle />
      </el-col>
      <el-col :span="24" :lg="8">
        <pieChart />
      </el-col>
    </el-row>
    <el-row :gutter="20" class="four">
      <el-col :span="24" :lg="12">
        <Table />
      </el-col>
      <el-col :span="24" :lg="6" :sm="12">
        <toduList />
      </el-col>
      <el-col :span="24" :lg="6" :sm="12">
        <User />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import lineCharts from "@/views/home/charts/lineCharts.vue";
import sixPie from "@/views/home/charts/sixPieView.vue";
import BarCircle from "@/views/home/charts/BarCircleView.vue";
import pieChart from "@/views/home/charts/pieChartView.vue";
import Table from "@/views/home/toduList/tableView.vue";
import toduList from "@/views/home/toduList/toduListView.vue";
import User from "@/views/home/toduList/userView.vue";
import CountTo from 'vue-count-to'
export default {
  components: {
    lineCharts, //弯曲折线图
    sixPie, //六角星饼图
    BarCircle, //饼图
    pieChart, //柱状图
    Table,
    toduList,
    User,
    CountTo
  },
  data() {
    return {
      img:"@/assets/25.jpg"
    }
  },
};
</script>

<style lang="sass" scoped>

  
.charts
    padding: 20px
    background: #f5f5f5
    overflow: auto
.four
  padding-bottom: 20px
.topCount
  background: #f5f5f5
  margin-bottom: 20px
  .gitCount
    height: 100px
    padding: 25px
    background: #fff
    box-sizing: border-box
    display: flex
    justify-content: space-between
    align-items: center
    img
      width: 70px
      height: 70px
      border-radius: 5px solid  
    .card-panel-num
      color: #999
      font-weight: bold
      font-size: 20px
      letter-spacing: 2px
@media screen and (max-width: 1200px)
  .nextCount
    margin-top: 20px !important



</style>
