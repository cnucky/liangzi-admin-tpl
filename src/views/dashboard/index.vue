<template>
  <div>
    <el-button size="mini" class="refresh_echart" type="default" @click="get_echarts_data">
      <i class="el-icon-refresh"></i>
    </el-button>
    <div id="main" style="width: 100%;height:500px;"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import{getEcharts} from '@/api/api'
export default {
  data(){
    return {
      echart_data:[]
    }
  },
  created () {
    this.get_echarts_data();
  },
  methods: {
    get_echarts_data(){
      getEcharts().then(
        (resData) => {
          this.echart_data = resData.results;
          this.set_chart(this.echart_data[0].active_times, this.echart_data[0].active_count);  
          this.set_interval();
        }
      )
    },
    set_chart(xdata, ydata){
      var myChart = echarts.init(document.getElementById('main'));
      var option = {
          title: {
              text: '在线人数监控图'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['人数']
          },
          xAxis:  {
              type: 'category',
              boundaryGap: false,
              data: xdata
          },
          yAxis: {
              type: 'value',
              smooth: true,
              name:'单位（人）',
              // splitNumber: 5,
              minInterval: 1,
              min:0
          },
          series: [
              {
                  name:'人数',
                  type:'line',
                  data:ydata
              }
          ]
      }

      myChart.setOption(option);
        // 为每个图添加resize事件监听，解决只有一个图表自适应的问题
      window.addEventListener("resize", function () {
          myChart.resize();
      })
    },
    set_interval(){
      var self = this;
      var interval = window.setInterval(function(){
        getEcharts().then(
          (resData) => {
            self.echart_data = resData.results;
            self.set_chart(self.echart_data[0].active_times, self.echart_data[0].active_count);  
          }
        )
      
      }, 60*1000*10)
    }
  }
}
</script>
<style>
.refresh_echart{
  float: right;
  margin: 0 10% 0 0;
  cursor: pointer;
}
#main{
  clear: both;
}

</style>


