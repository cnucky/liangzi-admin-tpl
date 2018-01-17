<template>
  <div>
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
        }
      )
    },
    set_chart(xdata, ydata){
      var myChart = echarts.init(document.getElementById('main'));
      var option = {
          tooltip: {
              trigger: 'axis'
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
                  name:'',
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
    }
  }
}
</script>

