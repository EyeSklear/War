<template>
    <div ref="RDsChart" class="RDsChart"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { defineComponent, onMounted, ref } from "vue";
import staticData from '../../static/data.js'
const RDsChart = ref<HTMLElement>();
// const emit = defineEmits(['clickPoint'])
let myChart: echarts.ECharts;

let option: any = {};
const initData = async()=>{
  option = {
    title: {
      text: '战争缴获',
      x:'center',
      y:'top',
      padding: 10, 
      textStyle: {
        fontSize: 40,
       
        color: 'white',
        fontFamily2: '微软雅黑',                             // 主标题文字颜色
    },
    },
      dataset: [
        {
          dimensions: ['name', 'value'],
          source: [
          
            ['步枪', 1000],
        
          
            ['炮弹', 2840],
            ['步枪子弹', 3595],
            ['机枪子弹', 6700],
     
        
            ['马车', 200],
         
      
            ['防毒器具', 100],
          
          ]
        },
        {
          transform: {
            type: 'sort',
            config: { dimension: 'value', order: 'desc' }
          }
        }
      ],
      xAxis: {
        type: 'category',
        axisLabel: { interval: 0, rotate: 30,        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontSize: 20,
          fontFamily2: '微软雅黑',
        } }
      },
      yAxis: {},
      series: [
        {
          type: 'bar',
          encode: { x: 'name', y: 'value' },
          datasetIndex: 1,
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: { //数值样式
                  color: 'azure',
                  fontSize: 13
                }
              }
            },
            barBorderRadius: 5,
            borderWidth: 1,
            borderType: 'solid',
            borderColor: '#73c0de',
            shadowColor: '#5470c6',
            shadowBlur: 3
          } as any,
        }
      ]
    };
}
onMounted(async () => {
    initData()
    myChart = echarts.init(RDsChart.value as HTMLElement, 'dark');
    myChart.setOption(option);
    // myChart.on('click', function (params: any) {
        
    //     //console.log(params.value)
    //     initData()
    //     myChart = echarts.init(RDChart.value as HTMLElement, 'dark');
    //     myChart.setOption(option);
     }
     )
</script>
<style scoped lang="scss">

.RDsChart {
  margin-top: 2vh;
    margin-left: 5px;
    height: 42vh;
    width: 38vw;
    // height: 35vh;
    // width: 20vmax
}
</style>