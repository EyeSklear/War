<template>
    <div class="all">
      <el-row class="header">
        <dv-decoration6 style="width:300px;height:30px;" />
        <el-divider direction="vertical" border-style="hidden" />
        <div id="title">
          <dv-decoration-11 style="width:300px;height:60px;">
            <div class="textCon">
              <span class="titletext">平型关战役</span>
            </div>
          </dv-decoration-11>
        </div>
        <el-divider direction="vertical" border-style="hidden" />
        <dv-decoration6 style="width:300px;height:30px;" />
      </el-row>
      <el-row class="mid">
        <div class="startAndpause">
          <img v-if="isStarted" :src="pause" @click="pauseAnimation">
          <img v-else :src="bofang">
        </div>
        <dv-decoration5 :dur="2" style="width:300px;height:40px;" />
      </el-row>
      <el-row class="main">
        <el-col :span="12" style="height: 100%;">
          <dv-border-box11 title="战役过程一览" :title-width="400">
            <div class="mapOutCon">
              <div id="mapContainer"></div>
              <div id="textArea">
                <dv-border-box10 style="background-color: rgba(1, 5, 27, 0.3);">
                  <div class="warDescription">
                    {{ warDescription }}
                  </div>
                </dv-border-box10>
              </div>
            </div>
          </dv-border-box11>
        </el-col>
        <el-col :span="12" style="height: 100%;">
          <el-row style="height: 50%;">
            <el-col :span="12" style="height: 100%;">
  
              <dv-border-box1>
                <div class="terrianCon">
                  <div class="binglitext">
                    <span>战区概况</span>
                  </div>
                  <div id="terrian"></div>
                </div>
              </dv-border-box1>
            </el-col>
            <el-col :span="12" style="height: 100%;">
              <dv-border-box8 :reverse="true">
                <div class="BingliCon">
                  <div class="binglitext">
                    <span>兵力及伤亡情况(/人)</span>
                  </div>
                  <div id="bingli"></div>
                </div>
              </dv-border-box8>
            </el-col>
          </el-row>
          <el-row style="height: 50%;">
            <el-col :span="12" style="height: 100%;">
              <dv-border-box8>
                <div class="BingliCon">
                  <div class="binglitext">
                    <span>中方战争损耗</span>
                  </div>
                  <div id="sunhaoCon">
                    <div id="zhongfang"></div>
                    <!-- <div id="rifang"></div> -->
                  </div>
                </div>
              </dv-border-box8>
            </el-col>
            <el-col :span="12" style="height: 100%;">
              <dv-border-box1>
                <div class="BingliCon">
                  <div class="binglitext">
                    <span>战争缴获</span>
                  </div>
                  <div id="wuqi"></div>
                </div>
              </dv-border-box1>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row class="footer">
        <!-- <el-divider style="margin-top: 5px;margin-bottom:5px;" border-style="hidden" /> -->
        <div class="footerContentCon">
          <div class="footer-left">
            <dv-decoration2 :dur="2" style="width:90%;height:1px; transform: rotate(180deg);" />
          </div>
          <div class="footer-right">
            <dv-decoration2 :dur="2" style="width:90%;height:1px;" />
          </div>
        </div>
      </el-row>
      <!-- <div class="toDetail">
        <dv-border-box12>
      <div @click="router.push('/herodetail')"  style="background-color:honeydew">
        <el-button @click="router.push('/herodetail') " type="primary" size="large">

        </el-button>
      </div>
    </dv-border-box12>
      </div> -->
      <div class="Guandes">
    <dv-border-box12 :dur="5" style="align-self:center;text-align: center;vertical-align: middle;">
      <div dv-bg @click="router.push('/herodetail')" >
        <h1 style="font-family:楷体;;margin-top: 1vh;" class="colorGuan" >人物介绍</h1>
      </div>
    </dv-border-box12>
    <dv-border-box12 :dur="5" style="align-self:center;text-align: center;vertical-align: middle;">
      <div dv-bg @click="router.push('/didian')" >
        <h1 style="font-family:楷体;;margin-top: 1vh;" class="colorGuan" >地点介绍</h1>
      </div>
    </dv-border-box12>
  </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, reactive, nextTick } from 'vue'
  import mapboxgl from 'mapbox-gl';
  import MapboxLanguage from '@mapbox/mapbox-gl-language';
  import * as echarts from 'echarts';
  import * as echatsCore from 'echarts/core'
  import router from '../router'
  import $ from 'jquery'
  import {
    TooltipComponent,
    TooltipComponentOption,
    LegendComponent,
    LegendComponentOption
  } from 'echarts/components';
  import { PieChart, PieSeriesOption } from 'echarts/charts';
  import { LabelLayout } from 'echarts/features';
  import { CanvasRenderer } from 'echarts/renderers';
  import bofang from '/image/24gl-play.png'
  import pause from '/image/24gl-pause.png'
  
  echatsCore.use([
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout
  ]);
  
  type EChartsOption = echarts.EChartsOption;
  mapboxgl.accessToken = 'pk.eyJ1IjoibmluamFhIiwiYSI6ImNsYXYzd3JwaDAyMGwzdm44ZmI3M212eHQifQ.h_dGMMOvQXNfmheNd0_j8A';
  type SourceOptions = {
    sourceId: string,
    data: string
  }
  type LayerOptions = {
    layerId: string,
    type: string,
    paint?: any,
    layout?: Object
  }
  type CameraPosition = {
    center: Array<number>,
    zoom: number,
    speed: number,
    curve?: number,
    duration: number,
    easing?: (progress: any) => any
  }
  interface FlyRouteSingleObject {
    id: number,
    story?: string,
    animationDelay: number,
    sourceOptions: SourceOptions,
    layerOptions: LayerOptions,
    cameraPosition: CameraPosition
  }
  const flyRouteSingleObjectList = reactive({
    data: [] as FlyRouteSingleObject[]
  })
  const mapboxCon = reactive({
    map: null as any
  })
  const iconImageLoadTime = ref(0)
  const intevalId = ref<number>()
  const timer = ref(0)
  const warDescription = ref('')
  const isStarted = ref(true)
  onMounted(() => {
    initMap()
    initBingliCharts()
    initTerrian()
    initSunhao()
    initJiaohuo()
    executeFlyAnimation()
  
  })
  const initMap = () => {
    mapboxCon.map = new mapboxgl.Map({
      container: 'mapContainer', // container ID
      style: 'mapbox://styles/ninjaa/clavuvso9000015o4mz9i8k55', // style URL
      center: [114, 30], // starting position [lng, lat]
      zoom: 2, // starting zoom
    });
    mapboxCon.map.addControl(new MapboxLanguage({
      defaultLanguage: 'zh-Hans'
    }));
    // mapboxCon.map!.easeTo({
    //   center: [112.66092206278627,
    //     39.523507939600876],
    //   zoom: 7,
    //   speed: 0.1,
    //   curve: 1,
    //   duration: 3000,
    //   easing(t: any) {
    //     //console.log(t)
    //     return t;
    //   }
    // });
    return new Promise(resolve => {
      resolve(true)
    })
  }
  const initBingliCharts = () => {
    var chartDom = document.getElementById('bingli')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: {
          color: "azure"
        }
      },
      dataset: {
        source: [
          ['type', '战前', '伤亡'],
          ['八路军115师', 15000, 600],
          ['日军', 20000, 2952]
        ]
      },
      series: [
        {
          name: '战前兵力概况',
          type: 'pie',
          radius: ['20%', '50%'],
          center: ['25%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold',
              // color: "azure"
            }
          },
          labelLine: {
            show: true
          },
          encode: {
            itemName: 'type',
            value: '战前'
          }
        },
        {
          name: '伤亡情况',
          type: 'pie',
          radius: ['20%', '50%'],
          center: ['75%', '50%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold',
              // color: "azure"
            }
          },
          labelLine: {
            show: true
          },
          encode: {
            itemName: 'type',
            value: '伤亡'
          }
        }
      ]
    };
    option && myChart.setOption(option);
  }
  const initTerrian = () => {
    var chartDom = document.getElementById('terrian')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    $.get('/pingxingguanwar2.svg', function (svg: any) {
      echarts.registerMap('lingqiu_svg', { svg: svg });
  
      option = {
        tooltip: {},
        geo: {
          tooltip: {
            show: true
          },
          map: 'lingqiu_svg',
          roam: true
        },
        series: {
          type: 'custom',
          coordinateSystem: 'geo',
          geoIndex: 0,
          zlevel: 1,
          data: [
            [348.2358421078053, 789.70913833075736, "平型关战役遗址"],
          ],
          encode: {
            tooltip: 2
          },
          renderItem(params: any, api: any) {
            const coord = api.coord([
              api.value(0, params.dataIndex),
              api.value(1, params.dataIndex)
            ]);
  
            const circles = [];
            for (let i = 0; i < 5; i++) {
              circles.push({
                type: 'circle',
                shape: {
                  cx: 0,
                  cy: 0,
                  r: 30
                },
                style: {
                  stroke: 'red',
                  fill: 'none',
                  lineWidth: 3
                },
                // Ripple animation
                keyframeAnimation: {
                  duration: 4000,
                  loop: true,
                  delay: (-i / 4) * 4000,
                  keyframes: [
                    {
                      percent: 0,
                      scaleX: 0,
                      scaleY: 0,
                      style: {
                        opacity: 1
                      }
                    },
                    {
                      percent: 1,
                      scaleX: 1,
                      scaleY: 0.4,
                      style: {
                        opacity: 0
                      }
                    }
                  ]
                }
              });
            }
            return {
              type: 'group',
              x: coord[0],
              y: coord[1],
              children: [
                ...circles,
                {
                  type: 'path',
                  shape: {
                    d: 'M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z',
                    x: -10,
                    y: -35,
                    width: 20,
                    height: 40
                  },
                  style: {
                    fill: 'red'
                  },
                  // Jump animation.
                  keyframeAnimation: {
                    duration: 1000,
                    loop: true,
                    delay: Math.random() * 1000,
                    keyframes: [
                      {
                        y: -10,
                        percent: 0.5,
                        easing: 'cubicOut'
                      },
                      {
                        y: 0,
                        percent: 1,
                        easing: 'bounceOut'
                      }
                    ]
                  }
                }
              ]
            } as echarts.CustomSeriesRenderItemReturn;
          }
        }
      };
  
      myChart.setOption(option);
    });
    const initJiaohuo = () => {
      var chartDom = document.getElementById('main')!;
      var myChart = echarts.init(chartDom);
      var option: EChartsOption;
  
      option = {
        backgroundColor: '#2c343c',
  
        title: {
          text: 'Customized Pie',
          left: 'center',
          top: 20,
          textStyle: {
            color: '#ccc'
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
            name: 'Access From',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              { value: 335, name: 'Direct' },
              { value: 310, name: 'Email' },
              { value: 274, name: 'Union Ads' },
              { value: 235, name: 'Video Ads' },
              { value: 400, name: 'Search Engine' }
            ].sort(function (a, b) {
              return a.value - b.value;
            }),
            roseType: 'radius',
            label: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
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
            animationDelay: function (idx) {
              return Math.random() * 200;
            }
          }
        ]
      };
  
      option && myChart.setOption(option);
    }
  }
  const initSunhao = () => {
    var chartDom = document.getElementById('zhongfang')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
  
    option = {
      title: {
        text: '八路军685团战争损耗',
        textStyle: {
          color: "azure"
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        textStyle: {
          color: "azure"
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
      },
      yAxis: {
        type: 'category',
        data: ['步马弹', '驳壳弹', '重机枪弹', '轻机枪弹', '手榴弹']
      },
      series: [
        {
          name: '数量',
          type: 'bar',
          data: [15402, 1069, 253, 8803, 617]
        }
      ]
    };
  
    option && myChart.setOption(option);
  
  }
  const initJiaohuo = () => {
    var wuqichartDom = document.getElementById('wuqi')!;
    var wuqimyChart = echarts.init(wuqichartDom);
    var wuqioption: EChartsOption;
  
    wuqioption = {
      dataset: [
        {
          dimensions: ['name', 'value'],
          source: [
            ['92步兵炮', 1],
            ['步枪', 1000],
            ['短枪', 13],
            ['轻重机枪', 20],
            ['炮弹', 2840],
            ['步枪子弹', 3595],
            ['机枪子弹', 6700],
            ['汽车', 79],
            ['摩托车', 3],
            ['马车', 200],
            ['骡', 3],
            ['军马', 50],
            ['防毒器具', 100],
            ['工兵器具', 18],
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
        axisLabel: { interval: 0, rotate: 30 }
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
    wuqioption && wuqimyChart.setOption(wuqioption);
  }
  const executeFlyAnimation = () => {
    const initStart = new Date().getTime()
    initFlyRoute().then(res => {
      //console.log(res)
      addLayersToMap().then(res => {
        ////console.log(res)
        const initEnd = new Date().getTime()
        timer.value += (initEnd - initStart)
        flyRouteEntry()
        ////console.log(mapboxCon.map.getLayer('layer_ribendiaobing'))
      })
    })
  }
  const initFlyRoute = () => {
    //
    return new Promise((resolve, reject) => {
      $.ajax({
        url: '/data.json',
        type: 'GET',
        async: false,
        success: (res: any) => {
          res.forEach((flyObj: any) => {
            const { id, story, sourceOptions, layerOptions, cameraPosition } = flyObj
            const funEasing = new Function('progress', 'mapbox', 'warD', cameraPosition.easing)
            flyRouteSingleObjectList.data.push({
              id: id,
              story: story,
              sourceOptions: sourceOptions as SourceOptions,
              layerOptions: layerOptions as LayerOptions,
              cameraPosition: {
                center: cameraPosition.center as Array<number>,
                zoom: cameraPosition.zoom,
                speed: cameraPosition.speed,
                curve: cameraPosition.curve,
                duration: cameraPosition.duration,
                easing: (t: any) => {
                  return funEasing(t, mapboxCon, warDescription)
                }
              } as CameraPosition
            } as FlyRouteSingleObject)
          })
          // mapboxCon.map.easeTo(flyRouteSingleObjectList.data[1].cameraPosition)
          ////console.log(flyRouteSingleObjectList.data)
          resolve("数据初始化完毕！")
        },
        error: (err: any) => {
          reject("数据初始化失败！")
        }
      })
    })
  
  }
  const addLayersToMap = () => {
    return new Promise((resolve, reject) => {
      mapboxCon.map.on('load', () => {
        flyRouteSingleObjectList.data.forEach(flyObj => {
          // //console.log(flyObj.layerOptions.type)
          if (flyObj.layerOptions.type === 'fill') {
            mapboxCon.map.addSource(flyObj.sourceOptions.sourceId, {
              type: 'geojson',
              data: flyObj.sourceOptions.data
            })
            mapboxCon.map.addLayer({
              id: flyObj.layerOptions.layerId,
              source: flyObj.sourceOptions.sourceId,
              type: flyObj.layerOptions.type,
              paint: flyObj.layerOptions.paint,
              layout: flyObj.layerOptions.layout
            })
          } else if (flyObj.layerOptions.type === 'symbol') {
            mapboxCon.map.loadImage('https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png', (error: any, image: any) => {
              if (error) throw error
              // //console.log(image)
              if (iconImageLoadTime.value === 0) {
                mapboxCon.map.addImage('custom-marker', image)
                iconImageLoadTime.value++;
              }
              mapboxCon.map.addSource(flyObj.sourceOptions.sourceId, {
                type: 'geojson',
                data: flyObj.sourceOptions.data
              })
              mapboxCon.map.addLayer({
                id: flyObj.layerOptions.layerId,
                source: flyObj.sourceOptions.sourceId,
                type: flyObj.layerOptions.type,
                paint: flyObj.layerOptions.paint,
                layout: flyObj.layerOptions.layout
              })
            })
          }
        })
        resolve("图层加载完毕！")
      })
    })
  }
  const flyRouteEntry = () => {
    ////console.log("开始飞行~~~")
    ////console.log(flyRouteSingleObjectList.data)
    // mapboxCon.map.easeTo(flyRouteSingleObjectList.data[0].cameraPosition)
    // intevalId.value = setInterval(() => {
    //   flyRoute()
    //   timer.value = 0    //每次飞行 timer清0
    // }, 3000)             //每次飞行间隔3s
    flyRoute()
  }
  const flyRoute = () => {
    // mapboxCon.map.easeTo(flyRouteSingleObjectList.data[0].cameraPosition)
    warDescription.value = flyRouteSingleObjectList.data[0].story as string
    flyToStation(flyRouteSingleObjectList.data[0].cameraPosition, 0).then(res => {
      ////console.log("jjjjjj")
      timer.value += 3000           //第一次飞行的duration时间
      flyRouteWithoutFirst()
    })
  
  }
  const flyRouteWithoutFirst = async () => {
    for (var i = 1; i < flyRouteSingleObjectList.data.length; i++) {
      await flyToStation(flyRouteSingleObjectList.data[i].cameraPosition, 5000)
    }
  }
  const flyToStation = (flyObj: any, delay: number) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        mapboxCon.map.easeTo(flyObj)
        timer.value += flyObj.duration
        resolve(true)
      }, delay)
    })
  }
  const pauseAnimation = () => {
    clearInterval(intevalId.value)
  }
  </script>
  
  
  
  <style scoped>
  .all {
    height: 100%;
    width: 100%;
    background-color: #000c1b;
  }
  .Guandes {
  position: absolute;
  top: 5vh;
  right: 4vmax;
  z-index: 999;
  margin-left:1vmax;
  padding:1vh;
  width: 16vmax;
  height: 5vh;
  display: flex;
  color:white;
  cursor: pointer;
  
}
  
  .header {
    width: 100%;
    height: 8%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  #title {
    width: 300px;
    height: 80%;
    display: flex;
  
  }
  
  .textCon {
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
  
  .titletext {
    font-size: 30px;
    color: azure;
  }
  
  .mid {
    height: 5%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
  }
  
  .main {
    height: 80%;
    width: 100%;
  
  }
  
  .footer {
    height: 5%;
  }
  
  .footerContentCon {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
  
  .mapOutCon {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
  }
  
  #mapContainer {
    width: 95%;
    height: 88%;
    margin-bottom: 20px;
    border-radius: 20px;
  }
  
  #bingli {
    width: 95%;
    height: 88%;
    margin-bottom: 20px;
  }
  
  .BingliCon {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 30px;
    align-items: center;
    justify-content: space-around;
  }
  
  .binglitext {
    font-size: 20px;
    color: azure;
  }
  
  .terrianCon {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 15px;
    align-items: center;
    justify-content: space-around;
  }
  
  #terrian {
    width: 93%;
    height: 88%;
    margin-bottom: 20px;
    border-radius: 20px;
    overflow: hidden;
  }
  
  #sunhaoCon {
    width: 93%;
    height: 88%;
    display: flex;
  }
  
  #zhongfang {
    width: 100%;
    height: 90%;
    /* background-color: aqua; */
  }
  
  #rifang {
    width: 100%;
    height: 90%;
    /* background-color: red; */
  }
  
  .rifangsunhaoCon {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 5px;
    align-items: center;
    justify-content: space-around;
  }
  
  .top {
    display: flex;
    width: 100%;
    height: 100%;
    /* background-color: aqua; */
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  
  .bottom {
    display: flex;
    width: 100%;
    height: 100%;
    /* background-color: red; */
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  
  #wuqi {
    width: 93%;
    height: 88%;
    /* background-color: #ebecee; */
    margin-bottom: 10px;
  }
  
  #danyao {
    width: 45%;
    height: 100%;
    /* background-color: #ebecee; */
  }
  
  #jiaotong {
    width: 41%;
    height: 88%;
    /* background-color: #ebecee; */
  }
  
  #qita {
    width: 41%;
    height: 88%;
    /* background-color: #ebecee; */
  }
  
  .footer-right {
    height: 100%;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
    /* position: absolute; */
  }
  
  .footer-left {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    height: 100%;
  }
  
  #textArea {
    position: absolute;
    width: 150px;
    /* height: 100px; */
    left: 3%;
    top: 50%;
    /* margin-top: -50px; */
    margin-top: -200px;
  }
  
  .mapboxgl-ctrl-bottom-left div {
    display: none !important;
  }
  
  .warDescription {
    padding: 20px;
    font-size: 20px;
    font-family: KaiTi;
    color: aliceblue;
    background-color: rgba(1, 5, 27, 0.5);
    /* overflow-y: hidden; */
    border-radius: 20px;
  }
  
  .startAndpause {
    position: absolute;
    top: 20px;
    left: 30px;
  }
  </style>
  