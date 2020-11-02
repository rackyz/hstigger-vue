<template>
  <div id="main" class='hs-container hs-container-full' style='width:100%;height:400px;'></div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted(){
     var myChart = echarts.init(this.$el);
 
        // 指定图表的配置项和数据
        var option = {
            tooltip: {},
            xAxis: {
                data: ["项管","房建","市政","造价","BIM","招标","挂靠"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 76, 10, 10, 20,42,5,2]
            }]
        };
 
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
  }
}
</script>

<style>

</style>