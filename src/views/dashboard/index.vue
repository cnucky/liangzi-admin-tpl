<template>
  <div>
    <div class="clearfix date_filter">
      <!-- 日期筛选 -->
      <div class="daterange_block">
        <span class="demonstration">日期：</span>
        <el-date-picker
          v-model="date_time"
          type="daterange"
          value-format="yyyy-MM-dd"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
      </div>
      <el-button type="primary" class="search_btn" icon="el-icon-search" @click="get_new_echarts_data">搜索</el-button>
      <el-button size="mini" class="refresh_echart" type="default" @click="refresh_echarts_data">
        <i class="el-icon-refresh"></i>
        <span>全部刷新</span>
      </el-button>
    </div>
    <div id="main" style="width: 100%;height:500px;"></div>
    <div id="public_main" style="width: 100%;height:500px;"></div>
    <div id="gic_main" style="width: 100%;height:500px;"></div>

  </div>
</template>
<script>
import echarts from 'echarts'
import{getEcharts, getPublicEcharts, getGicEcharts} from '@/api/api'
export default {
  data(){
    return {
      echart_data:[],
      public_echart_data:[],
      public_echart_legend:[],
      gic_echart_data:[],
      r:'',
      g:'',
      b:'',
      color:'',
      interval:'',
      pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
      
    },
    date_time: ''
    }
  },
  created () {
    window.clearInterval(this.interval);
    this.get_echarts_data();
    this.get_public_echarts_data();
    
    this.get_gic_echarts_data();
    this.set_interval();
  },
  methods: {
    get_echarts_data(){
      getEcharts().then(
        (resData) => {
          this.echart_data = resData.results;
          this.set_chart(this.echart_data[0].active_times, this.echart_data[0].active_count);  
          //this.set_interval();
        }
      )
    },
    get_color(){
      this.r = Math.floor(Math.random()*255);
      this.g = Math.floor(Math.random()*255);
      this.b = Math.floor(Math.random()*255);
      this.color = 'rgba('+ this.r +','+ this.g +','+ this.b +',1)';
      return this.color;
    },
    //公网
    get_public_echarts_data(){
      getPublicEcharts().then(
        (resData) => {
            if(resData && resData.status == 'ok'){
              var yData = [];
              this.public_echart_data = resData.data;
              if(this.public_echart_data.length > 0){
                for(var i = 0;i<this.public_echart_data.length;i++){
                  this.public_echart_legend.push(this.public_echart_data[i].name);
                  yData.push({
                    name: this.public_echart_data[i].name,
                    type: 'line',
                    data: this.public_echart_data[i].monitor_data,
                    itemStyle: {
                        normal: {
                            color: this.get_color()
                        }
                    },
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                  });
                }

                this.set_public_chart(this.public_echart_data[0].monitor_time, yData);  
              }
              
            }
        }
      )
    },
    get_gic_echarts_data(){
      getGicEcharts().then(
        (resData) => {
          if(resData && resData.status == 'ok'){
            var yData = [];
            this.gic_echart_data = resData.data;
            if(this.gic_echart_data.length > 0){

              for(var i = 0;i<this.gic_echart_data.length;i++){
                  this.public_echart_legend.push(this.gic_echart_data[i].name);
                  yData.push({
                    name: this.gic_echart_data[i].name,
                    type: 'line',
                    data: this.gic_echart_data[i].monitor_data,
                    itemStyle: {
                        normal: {
                            color: this.get_color()
                        }
                    },
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }
                  });
                }
              this.set_gic_chart(this.gic_echart_data[0].monitor_time, yData);
            }

          }
          
        }
      )
    },
    //人数
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
    //公网
    set_public_chart(xdata, ydata){
      
      var myChart = echarts.init(document.getElementById('public_main'));
      var option = {
          title: {
              text: '公网监控图'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data: this.public_echart_legend
          },
          
          xAxis:  {
              type: 'category',
              boundaryGap: false,
              data: xdata
              
          },
          yAxis: {
              type: 'value',
              smooth: true,
              name:'单位（M）',
              // splitNumber: 5,
              minInterval: 1,
              min:0
          },
          series: ydata
      }

      myChart.setOption(option);
        // 为每个图添加resize事件监听，解决只有一个图表自适应的问题
      window.addEventListener("resize", function () {
          myChart.resize();
      })
    },
    //GIC
    set_gic_chart(xdata, ydata){
      
      var myChart = echarts.init(document.getElementById('gic_main'));
      var option = {
          title: {
              text: 'GIC监控图'
          },
          tooltip: {
              trigger: 'axis',
          },
          legend: {
              data: this.public_echart_legend
          },
          xAxis:  {
              type: 'category',
              boundaryGap: false,
              data: xdata,
              
          },
          yAxis: {
              type: 'value',
              smooth: true,
              axisLabel: {
                  formatter: '{value} M'
              },
              // splitNumber: 5,
              minInterval: 1,
              min:0
          },
          series: ydata
      }

      myChart.setOption(option);
        // 为每个图添加resize事件监听，解决只有一个图表自适应的问题
      window.addEventListener("resize", function () {
          myChart.resize();
      })
    },
    get_new_echarts_data(){
      if(this.date_time.length > 0){
        console.log(this.date_time);
      }
     
    },
    
    refresh_echarts_data(){
      this.get_echarts_data();
      this.get_public_echarts_data();
      this.get_gic_echarts_data();
    },
    //十分钟刷新
    set_interval(){
      var self = this;
      this.interval = window.setInterval( function (){
        self.get_echarts_data();
        self.get_public_echarts_data();
        self.get_gic_echarts_data();
      }, 60*1000*10);

      
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
.daterange_block,.search_btn{
  float: left;
}
.search_btn{
  margin: 0 0 0 30px;
}
.date_filter{
  margin: 0px 0 30px 0;
}

</style>


