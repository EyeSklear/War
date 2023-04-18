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
        backgroundColor: '',
  title: {
    text: '主要战绩',
    left: 'center',
    top: 20,
    textStyle: {
      color: 'white'
    }
  },
  tooltip: {
    trigger: 'item'
  },
  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1]
    }
  },
  series: [
    {
      name: '事件名称',
      type: 'pie',
      radius: '55%',
      center: ['50%', '50%'],
      data: [
        { value: 335, name: '平津战役' },
        { value: 310, name: '平型关大捷' },
        { value: 274, name: '庐山会议' },
        { value: 235, name: '反围剿战争' },
        { value: 400, name: '辽沈会战' }
      ].sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: 'radius',
      label: {
        color: 'white',
        fontSize:18
      },
      labelLine: {
        lineStyle: {
          color: 'white'
        },
        smooth: 0.2,
        length: 10,
        length2: 20
      },
      itemStyle: {
        color: '#c23531',
        shadowBlur: 200,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx:any) {
        return Math.random() * 200;
      }
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
    margin-top: 1vh;
    margin-left: -2vh;
    height: 40vh;
    width: 25vmax;
    // height: 35vh;
    // width: 20vmax
}
</style>