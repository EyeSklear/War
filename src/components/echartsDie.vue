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
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  title: {
      text: '日军死伤统计',
      x:'center',
      y:'top',
      padding: 45, 
      textStyle: {
        fontSize: 30,
       
        color: 'white',
        fontFamily2: '微软雅黑',                             // 主标题文字颜色
    },
    },
  legend: {
    data: [
      '死亡',
      '负伤',
      '失踪',
            '步21联队主力' ,
      '步21联队3平岩大队' ,
       '步42联队' ,
      '步11联队1尾家大队' ,
       '兵站自动车部队' ,
       '师团炮兵、其他' ,
        '师团本部、其他',
       '关东军混成15B（筱原）' 
    ]
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      selectedMode: 'single',
      radius: [0, '30%'],
      label: {
        position: 'inner',
        fontSize: 14
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 527, name: '死亡' },
        { value: 961, name: '负伤' },
        { value: 18, name: '失踪', selected: true }
      ]
    },
    {
      name: '来自',
      type: 'pie',
      radius: ['45%', '60%'],
      labelLine: {
        length: 30
      },
      label: {
        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
        backgroundColor: '#F6F8FC',
        borderColor: '#8C8D8E',
        borderWidth: 1,
        borderRadius: 4,
        rich: {
          a: {
            color: '#6E7079',
            lineHeight: 22,
            align: 'center'
          },
          hr: {
            borderColor: '#8C8D8E',
            width: '100%',
            borderWidth: 1,
            height: 0
          },
          b: {
            color: '#4C5058',
            fontSize: 14,
            fontWeight: 'bold',
            lineHeight: 33
          },
          per: {
            color: '#fff',
            backgroundColor: '#4C5058',
            padding: [3, 4],
            borderRadius: 4
          }
        }
      },
      data: [
        { value: 201, name: '步21联队主力' },
        { value: 320, name: '步21联队3平岩大队' },
        { value: 218, name: '步42联队' },
        { value: 250, name: '步11联队1尾家大队' },
        { value: 133, name: '兵站自动车部队' },
        { value: 80, name: '师团炮兵、其他' },
        { value: 50, name: '师团本部、其他' },
        { value: 254, name: '关东军混成15B（筱原）' }
      ]
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
    height: 43vh;
    width: 38vw;
    // height: 35vh;
    // width: 20vmax
}
</style>