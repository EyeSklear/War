<template>
    <div ref="RDChart" class="RDChart"></div>
</template>

<script lang="ts" setup>
import * as echarts from "echarts";
import { defineComponent, onMounted, ref,watch,computed } from "vue";
import staticData from '../../static/data.js'
const props=defineProps<{
    index:number,  
}>()
const RDChart = ref<HTMLElement>();
let myChart: echarts.ECharts;
const emit = defineEmits(['clickPoint'])
let option: any = {};
const indexMap = computed(()=>{
return props.index

})
const currentIndex = ref(10)
const initData = async () => {
    option = {
        title: {
            text: '时间———官职关系图',
            x:'center'
        },
        backgroundColor: '',
        tooltip: {
            trigger: 'axis',
            formatter(params: any) {
                for (let x in params) {
                    return (
                        // params[x].name +
                        // "月份：" +
                        // params[x].data.value +
                        // "%" +
                        // "<br/>" +
                        // "总数：" +
                        params[x].data.data 
                        // "%" +
                        // "<br/>" 
                        // "总数：" +
                        // params[x].data.value
                    );
                }
            },
        },
        legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            data: [1922, 1926, 1927, 1929, 1933, 1935, 1937, 1938, 1941, 1945, 1946, 1948, 1949, 1958, 1959, 1962]
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                
                data: [
                    {
                        'data': '接受革命思想', 'value': 10, 
                        
                        itemStyle: {
                            normal: {
                                color: currentIndex.value == 10 ? "#ff0000" : 'yellow',
                            },
                        },
                    },
                    { 'data': '弃笔从戎', 'value': 14 ,
                    
                    itemStyle: {
                            normal: {
                                color: currentIndex.value == 14 ? "#ff0000" : 'yellow',
                                size:30
                            },
                        },},
                    { 'data': '南昌、湘南起义', 'value': 22,
                    itemStyle: {
                            normal: {
                                color: currentIndex.value == 22 ? "#ff0000" : 'yellow',
                            },
                        },}, 
                    { 'data': '井冈山会师', 'value': 30,                        
                    itemStyle: {
                            normal: {
                                color: currentIndex.value == 30 ? "#ff0000" : 'yellow',
                            },
                        },},
                    { 'data': '反围剿战争', 'value': 42 ,
                    itemStyle: {
                            normal: {
                                color: currentIndex.value == 42? "#ff0000" : 'yellow',
                            },
                        },},
                    { 'data': '随中央红军战略转移', 'value': 45,
                    itemStyle: {
                            normal: {
                                color: currentIndex.value == 45 ? "#ff0000" : 'yellow',
                            },
                        }, },
                    { 'data': '参与抗日战争', 'value': 55,
                    itemStyle: {
                            normal: {
                                color: currentIndex.value == 55 ? "#ff0000" : 'yellow',
                            },
                        },},
                    { 'data': '赴苏联养伤', 'value': 50,
                    itemStyle: {
                            normal: {
                                color: currentIndex.value == 50 ? "#ff0000" : 'yellow',
                            },
                        },},
                    { 'data': '参与苏德战争', 'value': 53,
                    itemStyle: {
                            normal: {
                                color: currentIndex.value == 53 ? "#ff0000" : 'yellow',
                            },
                        },}, 
                    { 'data': '赴东北挂帅', 'value': 65,
                    itemStyle: {
                            normal: {
                                color: currentIndex.value == 65 ? "#ff0000" : 'yellow',
                            },
                        },}, 
                    { 'data': '失利及逆转困境', 'value': 70 ,
                    itemStyle: {
                            normal: {
                                color: currentIndex.value == 70 ? "#ff0000" : 'yellow',
                            },
                        },},
                    { 'data': '三季攻势及辽沈会战', 'value': 75,
                    itemStyle: {
                            normal: {
                                color: currentIndex.value == 75 ? "#ff0000" : 'yellow',
                            },
                        },}, 
                    { 'data': '平津战役及南下作战', 'value': 80,
                    itemStyle: {
                            normal: {
                                color: currentIndex.value == 80 ? "#ff0000" : 'yellow',
                                
                            },
                        },}, 
                    { 'data': '跃升政治局常委', 'value': 85,
                    itemStyle: {
                            normal: {
                                color: currentIndex.value == 85 ? "#ff0000" : 'yellow',
                            },
                        },}, 
                    { 'data': '1959年庐山会议', 'value': 88,
                    itemStyle: {
                            normal: {
                                color: currentIndex.value == 88 ? "#ff0000" : 'yellow',
                            },
                        },}, 
                        
                    { 'data': '七千人大会', 'value': 92 ,
                    itemStyle: {
                            normal: {
                                color: currentIndex.value == 92 ? "#ff0000" : 'yellow',
                            },
                        },},
                ],
                //{'data':115,'value':21}],
                //data: [120, 200, 150, 80, 70, 110, 130],
                //value: [1200, 2000, 1500, 800, 700, 1100, 1300],
                type: 'line',
                smooth: true,
                markArea: {
                    itemStyle: {
                        color: 'rgba(255, 173, 177, 0.4)'
                    },
                    data: [
                        [
                            {
                                name: '大革命时期',
                                xAxis: '1922',
                                itemStyle: {
                                    color: 'rgba( 	191 ,239, 255   , 0.8)'
                                }
                            },
                            {
                                xAxis: '1927'
                            }
                        ],
                        [
                            {
                                name: '第一次国共内战',
                                xAxis: '1927',
                                itemStyle: {
                                    color: 'rgba( 	 	191 ,239, 255    ,0.7)'
                                }
                            },
                            {
                                xAxis: '1935'
                            }
                        ],
                        [
                            {
                                name: '第二次世界大战',
                                xAxis: '1935',
                                itemStyle: {
                                    color: 'rgba( 	191 ,239, 255  , 0.5)'
                                }
                            },
                            {
                                xAxis: '1945'
                            }
                        ],
                        [
                            {
                                name: '解放战争',
                                xAxis: '1945',
                                itemStyle: {
                                    color: 'rgba( 	 	191 ,239, 255    , 0.3)'
                                }
                            },
                            {
                                xAxis: '1949'
                            }
                        ],
                        [
                            {
                                name: '中华人民共和国建国初期',
                                xAxis: '1949',
                                itemStyle: {
                                    color: 'rgba( 	191 ,239, 255    , 0.1)'
                                }
                            },
                            {
                                xAxis: '1962'
                            }
                        ]
                    ]
                },
                //symbol: 'triangle',
                symbolSize: 15,
                symbolColor: 'red',
                lineStyle: {
                    color: '#5470C6',
                    width: 4,
                    //type: 'dashed'
                },
                itemStyle: {
                    borderWidth: 3,
                    borderColor: '#EE6666',
                    color: 'yellow'
                }
            },
        ]
    };
    //     option = {
    //   xAxis: {
    //     type: 'category',
    //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [
    //     {
    //       data: [120, 200, 150, 80, 70, 110, 130],
    //       type: 'line',
    //       symbol: 'triangle',
    //       symbolSize: 20,
    //       lineStyle: {
    //         color: '#5470C6',
    //         width: 4,
    //         type: 'dashed'
    //       },
    //       itemStyle: {
    //         borderWidth: 3,
    //         borderColor: '#EE6666',
    //         color: 'yellow'
    //       }
    //     },
    //   ]
    // };
}
onMounted(async () => {
    initData()
    myChart = echarts.init(RDChart.value as HTMLElement, 'dark');
    myChart.setOption(option);
    myChart.on('click', function (params: any) {
        currentIndex.value = params.value
        
        initData()
        myChart = echarts.init(RDChart.value as HTMLElement, 'dark');
        myChart.setOption(option);
        emit('clickPoint',params.value)
    })
    watch(indexMap,()=>{
        
        currentIndex.value = indexMap.value
        initData()
        myChart = echarts.init(RDChart.value as HTMLElement, 'dark');
        myChart.setOption(option);

    })
    //         myChart.getZr().on('click', function(params:any) {

    //  //点击的时候切换高亮的数据
    // //  myChart.dispatchAction({
    // //      type: 'downplay',
    // //      seriesIndex: params.seriesIndex
    // //  });
    //  let currentIndex = -1
    //  let pointInPixel = [params.offsetX, params.offsetY];
    //  if(myChart.containPixel('grid', pointInPixel)) {
    //      let xIndex = myChart.convertFromPixel({
    //          seriesIndex: 0
    //      }, [params.offsetX, params.offsetY])[0];
    //          myChart.dispatchAction({
    //              type: 'highlight',
    //              seriesIndex: params.seriesIndex,
    //              dataIndex: xIndex
    //          });
    //      currentIndex = xIndex;
    //  }
    // });

    //         myChart.getZr().on('click', function(params:any) {
    //   // 获取像素坐标点
    //   const pointInPixel = [params.offsetX, params.offsetY]
    //   const { target, topTarget } = params
    //   // 判断点击的点在  点击在折线的拐点 || 折线上
    //   if (target?.z === 2 || topTarget?.z === 2) {
    //   // 获取这条折线的 信息 也就是 index
    //   // 如果是拐点，直接读取 target.seriesIndex
    //   // 如果是折线上的点，读取 topTarget 对象下的继续寻找parent的信息的index
    //     const axs = target
    //       ? target.seriesIndex
    //       : topTarget.parent?.parent?.__ecComponentInfo?.index
    //     //console.log(axs)
    //   }
    // })
    // // 将可以响应点击事件的范围内，鼠标样式设为pointer--------------------
    // myChart.getZr().on('mousemove', function(params:any) {
    //   const { topTarget } = params
    //   // 给折线的鼠标悬浮 变为 小手
    //   if (topTarget?.z === 2) {
    //     myChart.getZr().setCursorStyle('pointer')
    //   }
    // })

})
</script>

<style lang="scss" scoped>
.RDChart {
    margin-top: 1vh;
    margin-left: 1vh;
    height: 35vh;
    width: 46vmax;
    // height: 35vh;
    // width: 20vmax
}
</style>