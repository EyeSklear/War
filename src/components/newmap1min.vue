<template>
    <div class="fly-container" v-if=" airplane">
        <div class="fly" >
            <el-image src="http://localhost:8060/getImage?name=air9" fit="fill"></el-image>
        </div>
    </div>
    <audio id="audio" ref="audio" class="aud"  :key="audioFlag">
		<source :src=audioIndex />
	</audio>
    
    <!-- v-if="ListShowSum" -->
    <!-- <div class="lists" >
        <div :class="{ 'dis': !listShow, 'app': listShow }"> -->
            
 
    <!-- 战争伤亡情况 -->
    <!-- <div id="bingli"></div> -->
    <!-- 战争解读视频 -->
    <div class='vedio' v-show="videoOn">
        <vue3VideoPlay width="30vmax" height="41vh" title="老爷庙" :src="options.src" :poster="options.poster" :autoPlay="options.autoPlay"  @play="onPlay"
            @pause="onPause" @timeupdate="onTimeupdate" @canplay="onCanplay" style="margin-left:1vw" />
        <div>
            <el-button type="danger" :icon="CloseBold" @click="overVideo" />
        </div>
    </div>
    <div class="jiaohuo" v-if="jiaohuo">
        <dv-border-box1 style="width: 32vw; height: 50vh; position: relative;backdrop-filter: blur(2px)">
            <div class="BingliCon">
                <div class="binglitext">
                    <h1>战争缴获</h1>
                </div>
                <echartsJH></echartsJH>
            </div>
        </dv-border-box1>
    </div>
    <!-- v-if="personVs == true" -->
    <div class="zuo_person" v-if="personVs == true">
        <div class="at-item">
            <dv-border-box-9 :color="['#00a1ff']" style="width: 20vw; height: 42vh; position: relative">

                <div class="flex-row-center">
                    <h1 style="color:brown"> 八路军第115师师长林彪</h1>
                </div>
                <div class="content-part-1">
                    <img class="img" src="@/assets/Lin_Biao.jpg" style="width: 80%;height: 88%" />
                </div>
            </dv-border-box-9>
        </div>
    </div>
    <div class="you_person" v-if="personVs == true">
        <div :class="{ 'at-item': !banyuanDie, 'at-item2': banyuanDie }">
            <dv-border-box-9 :color="['#00a1ff']" style="width: 20vw; height: 42vh; position: relative">
                <div class="flex-row-center">
                    <h1> 日军第5师师长板垣征四郎</h1>
                </div>
                <div class="content-part-2">
                    <img class="img" src="@/assets/banyuan.png" style="width: 80%;height: 88%;" />
                </div>

            </dv-border-box-9>
        </div>
    </div>
    <div class="play-button">
        <button id="play-button" type="button" :class="{ pause: ifPause }" @click="PlayOnClick">
            <span class="progress1"></span>
        </button>
    </div>
    <!-- v-show="ifPause == true" -->
    <div class="text-wrapper" v-show="ifPause == true">
        <!-- <dv-border-box12 style="padding:20px 10px 10px 10px;"> -->
        <p ref="text" class="textsss">{{ textMessage }}</p>

        <!-- </dv-border-box12> -->
    </div>
    <div class="progress-line" v-show="ifPause == true">
        <div class="progress-bar">

            <!-- <div style="width:20%">1</div>
            <div style="width:20%">2</div>
            <div style="width:20%">3</div>
            <div style="width:20%">4</div>
            <div style="width:20%">5</div> -->
        </div>

    </div>
    <div class="progress-line2" v-show="ifPause == true">
        <div class="progress-bar2">

            <div style="width:16%">战前准备,红军部署</div>
            <div style="width:22%">日军行进,红军围堵</div>
            <div style="width:24%">日军求援,红军拦路</div>
            <div style="width:18%">短兵相见,死伤无数</div>
            <div style="width:20%">战后清点,缴获丰富</div>
        </div>

    </div>
    <div id="map" ref="container"></div>
    <!-- <div class="explain" v-if="drawIndex <= 6 && drawIndex >= 4">
        <div class="at-item" v-cloak>
            <dv-border-box7 style=";width:26vw;height: 60vh;padding:10px;">
                <el-image style="width: 25vw; height:58vh;top:1vh;opacity: 0.8; "
                    src="http://localhost:8060/getImage?name=jvbu" fit="fill" />
            </dv-border-box7>
        </div>
    </div> -->
    <!-- v-show="drawIndex > 4 && drawIndex < 6" -->
    <div class="explain4" v-if="gifFlag">
        
            <dv-border-box10 style=";width:32vw;height: 42vh;">
                <!-- <el-image style="width: 30vw; height:45vh;top:1vh; opacity: 0.8" preview-src-list :src="thumImage"
                    fit="fill" /> -->
                    <img :src=textGif alt="your_gif" style="width: 30vw; height:40vh;margin-left: 1vw;margin-top:1vh">
            </dv-border-box10>
       
    </div>
    <div class="explain2" v-if="drawIndex > 6 && warShow == true" >
        <!-- v-if="drawIndex > 6 && warShow == true" -->
        <div class="at-item" >
            <dv-border-box10 style=";width:32vw;height: 43vh;backdrop-filter: blur(2px)">
                <el-image style="width: 30vw; height:41vh; opacity: 0.8;margin-left: 1vw;margin-top:1vh" preview-src-list :src="thumImage"
                    fit="fill" />
                    
            </dv-border-box10>
        </div>
    </div>
    <!-- v-show="drawIndex <= 3 && ifPause == true" -->
    
    <div class="explain3" v-if=" zonglan == true ">
        <div :class="{ 'at-item': imageShow, 'at-item2': !imageShow }">

            <el-image style="width: 20vw; height:47vh;top:1vh;opacity: 0.8 " preview-src-list
                src="http://localhost:8060/getImage?name=wars" fit="fill" />

        </div>
    </div>

    <!-- <div class="menuBar">
    <input type="button" value="开始" @click="startClick()" />
        <input type="button" value="暂停" @click="pauseClick()" />
        <input type="button" value="停止" @click="stopClick()" />
    {{ currentMouseValue[0] }},{{ currentMouseValue[1] }}

    </div> -->
    <!-- <div class="text">
        {{ textValue }}
    </div>
    <div class="play-button">
      <el-button type="primary" :icon="Edit" circle />
    </div> -->
    <!-- <div >
        <div>
      <vue3VideoPlay 
      width="800px"
      title="钢铁侠"
      :src="options.src"
      :poster="options.poster"
      @play="onPlay"
      @pause="onPause" 
      @timeupdate="onTimeupdate" 
      @canplay="onCanplay" />
  </div>

    </div> -->

    <div>
        <!-- <lk-timeline

    ></lk-timeline> -->
    </div>
</template>
<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import mapBoxGl from "mapbox-gl";
import * as turf from "@turf/turf";
import staticData from '../../static/data'
import * as echarts from 'echarts';
import * as echatsCore from 'echarts/core'
import echartsJH from './echartsJH.vue';

import {
    Check,
    Delete,
    CloseBold,
    Edit,
    Message,
    Search,
    Star,
    Document,
    UserFilled,
    Clock,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import axios from "axios";
import { defineComponent, onMounted, ref, reactive, watch } from "vue";
import { url } from "inspector";
import { flashLayer } from '../utils/mapUtils'
import { promiseTimeout } from "@vueuse/shared";
import { resolve } from "path";
let map: mapBoxGl.Map;
const ifPause = ref(false)
const zonglan = ref(false)
const text = ref(null)
const task = ref<any[]>([])
const thumImage = ref('http://localhost:8060/getImage?name=all-check')
const container = ref<HTMLElement>();
const currentMouseValue = ref<any[]>([]);
let playSpeed: 1000;// 播放速度
let play: false; // 自动播放
let lockFlag: false;
let markFlag: false;
const banyuanDie = ref(false)
const personVs = ref(false)
const imageShow = ref(true)
const jiaohuo = ref(false)
const warShow = ref(true)
//事件列表
const listShow =ref(false)
const ListShowSum = ref(false)
type EChartsOption = echarts.EChartsOption;
let lockDate: []; // 锁定的日期（滑动结束时自动跳到指定的日期）
let markDate: []; // 做标记的日期
let mask: true;
const textLen = ref(0)
//用于判断是否已经开始重映
const rePlayFlag =ref('false')
const removeLayer = (layerId: string, sourceId: string) => {
    map.removeLayer(layerId);
    map.removeSource(sourceId);

}
const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const onPlay = (ev: any) => {
    //console.log('播放')
}
const onPause = (ev: any) => {
    //console.log(ev, '暂停')
}

const onTimeupdate = (ev: any) => {
    // console.log(ev, '时间更新')
}
const gifFlag=ref(false)
const hasReSet =ref(false)
const dyDrawTest = async () => {


return new Promise(resolve => {
    //hasReSet用于判断是否已经重置drawIndex
    if(rePlayFlag.value == 'zhanqian' && hasReSet.value == true){
        drawIndex.value=2
        hasReSet.value=false
        console.log('我走这里')
    }
    // if(rePlayFlag.value == 'zhanqian'){
    //     drawIndex.value=2
    // }

    let testgeoj = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': []
                }
            }
        ]
    };
    //staticData.rijun21lvxian
    map.addSource(drawSet[drawIndex.value]?.sourceId, {
        type: 'geojson',
        data: testgeoj
    });
    map.addLayer({
        id: drawSet[drawIndex.value]?.layerId,
        type: drawSet[drawIndex.value]?.type,
        source: drawSet[drawIndex.value].sourceId,
        paint: drawSet[drawIndex.value].layerConfig?.paint,
        layout: drawSet[drawIndex.value].layerConfig?.layout,
    })
    let counter = 0;
    const timer = setInterval(() => {
        if (counter >= drawSet[drawIndex.value].data.geometry.coordinates.length) {
            clearInterval(timer)
            //setTimeout(dyDraw1, 20)
            drawIndex.value++
            map?.setPaintProperty(drawSet[drawIndex.value - 1]?.layerId, 'line-opacity', 0.6);
            resolve("resolve")

            // if (drawIndex.value <= drawSet.length) {

            //     setTimeout(dyDrawTest, 200)


            // }
            //else
            return
        };
        (testgeoj.features[0].geometry.coordinates as any).push(drawSet[drawIndex.value]?.data.geometry.coordinates[counter]);
        //map.setCenter(staticData.tuan6871xian.geometry.coordinates[counter]);
        map.getSource(drawSet[drawIndex.value]?.sourceId)?.setData(testgeoj);
        counter++;
    }, drawSet[drawIndex.value]?.speed);

    //clearInterval(timer2)


})
}
const onCanplay = (ev: any) => {
    // console.log(ev, '可以播放')
}
const textGif=ref('/static/111slow.gif')
const videoOn = ref(false)
const options = reactive({

    color: "#409eff", //主题色
    title: "", //视频名称
    src: "../../laoye.mp4", //视频源
    webFullScreen: false,//网页全屏
    speed: true,//是否支持快进快退
    currentTime: 0,//跳转到固定播放时间(s)
    muted: false,//静音
    autoPlay: true, //自动播放
    loop: false,//循环播放
    mirror: false,//镜像画面
    control: true, //是否显示控制器
    ligthOff: false,//关灯模式
    volume: 0.3,//默认音量0-1

    poster: '', //封面
    speedRate: [1.0, 1.25, 1.5, 2.0], // 可选的播放速度
    controlBtns: [
        //   "audioTrack",//音轨切换按钮
        //   "quality",//视频质量切换按钮
        //   "speedRate",//速率切换按钮
        //   "volume",//音量
        //   "setting",//设置
        //   "pip",//画中画按钮
        //   "pageFullScreen",//网页全屏按钮
        //   "fullScreen",//全屏按钮
        //显示所有按钮,
    ]
})
let date: '2022-06-01';
let ids: any
const rotateCamera = async (timestamp: any) => {
    return new Promise(resolve => {
        // clamp the rotation between 0 -360 degrees
        // Divide timestamp by 100 to slow rotation to ~10 degrees / sec
        map.rotateTo((timestamp / 100) % 360, { duration: 0 });
        map.setPitch(31.206280407732994)
        // Request the next frame of the animation.
        ids = requestAnimationFrame(rotateCamera);
        setTimeout(() => {
            cancelAnimationFrame(ids)
            resolve('resolve')
        }, 5000)
    })
}
const typewriter11 = async () => {
    return new Promise((resolve) => {
        let texts: string = textMessage.value
        textLen.value = textMessage.value.length + 10
        const delays = texts?.split('').map((char: any, index: any) => index * 50);

        // 逐字绘制文本
        texts?.split('').forEach((char: any, index: any) => {
            setTimeout(() => {
                (text.value as any).innerHTML = texts?.slice(0, index + 1);
                resolve('resolve')
            }, delays[index]);

        });
    })
    // 获取文本内容和每个字符的延迟时间

}
const drawIndex = ref(0)
const textMessage = ref('9月25日，八路军115师在师长林彪与副师长聂荣臻的带领下在平型关展开了部署')
const drawSet = [
    //大同到灵丘
    {
        sourceId: 'datong2lingqiuxian',
        layerId: 'datong2lingqiuxian',
        data: staticData.datong2lingqiuxian,
        speed: 10,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': '#191970',
                'line-width': 12
            }, layout: {}, filter: []

        },


    },
    //平型到太原
    {
        sourceId: 'ping2taiyuanxian',
        layerId: 'ping2taiyuanxian',
        data: staticData.ping2taiyuanxian,
        speed: 10,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': '#191970',
                'line-width': 25
            }, layout: {}, filter: []

        },


    },
    //红军部署
    {
        sourceId: 'shizhuli115',
        layerId: 'shizhuli115',
        data: staticData.shizhuli115,
        speed: 10,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': '#ff0000',
                'line-width': 8
            }, layout: {}, filter: []

        },


    },
    {
        sourceId: 'shizhuli6851',
        layerId: 'shizhuli6851',
        data: staticData.shizhuli6851,
        speed: 10,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': '#ff0000',
                'line-width': 8
            }, layout: {}, filter: []

        },


    },
    {
        sourceId: 'shizhuli6852',
        layerId: 'shizhuli6852',
        data: staticData.shizhuli6852,
        speed: 10,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': '#ff0000',
                'line-width': 8
            }, layout: {}, filter: []

        },


    },
    {
        sourceId: 'shizhuli6861',
        layerId: 'shizhuli6861',
        data: staticData.shizhuli6861,
        speed: 10,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': '#ff0000',
                'line-width': 8
            }, layout: {}, filter: []

        },


    },
    {
        sourceId: 'shizhuli6863',
        layerId: 'shizhuli6863',
        data: staticData.shizhuli6863,
        speed: 10,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': '#ff0000',
                'line-width': 8
            }, layout: {}, filter: []

        },


    },
    //日军行进
    // {
    //     sourceId: 'rijun21lvxian',
    //     layerId: 'rijun21lvxian',
    //     data: staticData.rijun21lvxian,
    //     speed: 20,
    //     type: 'line',

    //     layerConfig:
    //     {
    //         paint: {
    //             'line-color': '#191970',
    //             'line-width': 8
    //         }, layout: {}, filter: []

    //     },


    // },
    {
        sourceId: 'tuan6865xian',
        layerId: 'tuan6865xian',
        data: staticData.tuan6865xian,
        speed: 10,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': 'red',
                'line-width': 8
            }, layout: {}, filter: []

        },


    },
    {
        sourceId: 'tuan6866xian',
        layerId: 'tuan6866xian',
        data: staticData.tuan6866xian,
        speed: 10,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': 'red',
                'line-width': 8
            }, layout: {}, filter: []

        },


    },
    {
        sourceId: 'baoweiquanrijun',
        layerId: 'baoweiquanrijun',
        data: staticData.baoweiquanrijun,
        speed: 10,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': '#191970',
                'line-width': 8
            }, layout: {}, filter: []

        },


    },
    {
        sourceId: 'baoweiquanhongjun',
        layerId: 'baoweiquanhongjun',
        data: staticData.baoweiquanhongjun,
        speed: 10,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': 'red',
                'line-width': 8
            }, layout: {}, filter: []

        },


    },
    //蔡家峪
    {
        sourceId: 'ricaijia1',
        layerId: 'ricaijia1',
        data: staticData.ricaijia1xian,
        speed: 20,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': '#191970',
                'line-width': 8
            }, layout: {}, filter: []

        },
    },

    {
        sourceId: 'tuan6871xian',
        layerId: 'tuan6871xian',
        data: staticData.tuan6871xian,
        speed: 20,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': 'red',
                'line-width': 8
            }, layout: {}, filter: []

        },


    },

    {
        sourceId: 'tuan6875xian',
        layerId: 'tuan6875xian',
        data: staticData.tuan6875xian,
        speed: 20,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': 'red',
                'line-width': 8
            }, layout: {}, filter: []

        },


    },

    {
        sourceId: 'tuan6874xian',
        layerId: 'tuan6874xian',
        data: staticData.tuan6874xian,
        speed: 20,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': 'red',
                'line-width': 8
            }, layout: {}, filter: []

        },


    },

    {
        sourceId: 'tuan6873xian',
        layerId: 'tuan6873xian',
        data: staticData.tuan6873xian,
        speed: 20,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': 'red',
                'line-width': 8
            }, layout: {}, filter: []

        },


    },
    {
        sourceId: 'tuan6873xian2',
        layerId: 'tuan6873xian2',
        data: staticData.tuan6873xian2,
        speed: 20,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': 'red',
                'line-width': 8
            }, layout: {}, filter: []

        },


    },
    {
        sourceId: 'tuan6872xian',
        layerId: 'tuan6872xian',
        data: staticData.tuan6872xian,
        speed: 20,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': 'red',
                'line-width': 8
            }, layout: {}, filter: []

        },


    },
    {
        sourceId: 'tuan6872xian2',
        layerId: 'tuan6872xian2',
        data: staticData.tuan6872xian2,
        speed: 20,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': 'red',
                'line-width': 8
            }, layout: {}, filter: []

        },


    },
    {
        sourceId: 'ricaijia2xian',
        layerId: 'ricaijia2xian',
        data: staticData.ricaijia2xian,
        speed: 20,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': '#191970',
                'line-width': 8
            }, layout: {}, filter: []

        },
    },


    {
        sourceId: 'caijiayuquan',
        layerId: 'caijiayuquan',
        data: staticData.caijiayuquan,
        speed: 20,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': 'red',
                'line-width': 8
            }, layout: {}, filter: []

        },
    },

    {
        sourceId: 'rijuntuancheng',
        layerId: 'rijuntuancheng',
        data: staticData.rijuntuancheng,
        speed: 20,
        type: 'line',

        layerConfig:
        {
            paint: {
                'line-color': '#191970',
                'line-width': 8
            }, layout: {}, filter: []

        },
    },
    // {
    //     sourceId: 'tuan6872xian2',
    //     layerId: 'tuan6872xian2',
    //     data: staticData.tuan6872xian2,
    //     speed: 5,
    //     type: 'line',

    //     layerConfig:
    //     {
    //         paint: {
    //             'line-color': 'red',
    //             'line-width': 8
    //         }, layout: {}, filter: []

    //     },
    // },
    // {
    //     sourceId: 'tuan6872xian2',
    //     layerId: 'tuan6872xian2',
    //     data: staticData.tuan6872xian2,
    //     speed: 5,
    //     type: 'line',

    //     layerConfig:
    //     {
    //         paint: {
    //             'line-color': 'red',
    //             'line-width': 8
    //         }, layout: {}, filter: []

    //     },
    // },


]
// const PlayOnClick= () => {
//   ifPause.value = !ifPause.value;
//   // if(ifPause.value) {
//   //   autoPlay = setInterval(() => {
//   //     tabsInfo.value[activeTabIndex]["ifActive"] = false;
//   //     activeTabIndex = (activeTabIndex+1)%(tabsInfo.value.length)
//   //     tabsInfo.value[activeTabIndex]["ifActive"] = true;
//   //   }, 1000);
//   // }
//   // else {
//   //   clearInterval(autoPlay)
//   // }
// }
const textValue = ref('gag')
let newRouteGeoJson: any
const cameraAlong = async (path: any[]) => {
    return new Promise(resolve => {
        const animationDuration = 2000;
        const cameraAltitude = 5000;
        // get the overall distance of each route so we can interpolate along them
        const routeDistance = turf.lineDistance(turf.lineString(path));
        const cameraRouteDistance = turf.lineDistance(
            turf.lineString(path)
        );

        let start: any;
        let isAnimating = true;
        function frame(time: any) {
            if (!isAnimating) return;
            if (!start) start = time;
            // phase determines how far through the animation we are
            const phase = (time - start) / animationDuration;
            // phase is normalized between 0 and 1
            // when the animation is finished, reset start to loop the animation
            if (phase > 1) {
                // wait 1.5 seconds before looping
                // setTimeout(() => {
                //     start = 0.0;
                // }, 1500);
                resolve('resolve')
                return
            }

            // use the phase to get a point that is the appropriate distance along the route
            // this approach syncs the camera and route positions ensuring they move
            // at roughly equal rates even if they don't contain the same number of points
            const alongRoute = turf.along(
                turf.lineString(path),
                routeDistance * phase
            ).geometry.coordinates;

            const alongCamera = turf.along(
                turf.lineString(path),
                cameraRouteDistance * phase
            ).geometry.coordinates;

            const camera = map.getFreeCameraOptions();

            // set the position and altitude of the camera
            camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
                {
                    lng: alongCamera[0],
                    lat: alongCamera[1]
                },
                cameraAltitude
            );

            // tell the camera to look at a point along the route
            camera.lookAtPoint({
                lng: alongRoute[0],
                lat: alongRoute[1]
            });

            map.setFreeCameraOptions(camera);

            window.requestAnimationFrame(frame);
        }

        window.requestAnimationFrame(frame);
    })

}

const svgXML =
    `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"> 
                <path d="M529.6128 512L239.9232 222.4128 384.7168 77.5168 819.2 512 384.7168 946.4832 239.9232 801.5872z" p-id="9085" fill="#ffffff"></path> 
            </svg>
            `
const svgBase64 = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgXML)));
//闪烁函数

// const flashLayer = (layerid: any) => {
//     // Set the initial opacity to 0
//     map?.setPaintProperty(layerid, 'fill-opacity', 0);
//     console.log(map)
//     let delta = -0.05
//     let opacity = 1;
//     // Define the duration of the flashing effect
//     const duration = 1500; // in milliseconds

//     // Set up the interval to alternate the layer's opacity
//     let start = Date.now();
//     let interval = setInterval(() => {
//         let timePassed = Date.now() - start;
//         opacity += delta
//         //不能设置为0 否则会报错
//         if (opacity < 0.01 || opacity > 1) {
//             delta = -delta; // 到达最小或最大值时，逆转透明度的变化方向
//         }
//         //let opacity = Math.sin((timePassed / duration) * Math.PI);
//         map?.setPaintProperty(layerid, 'fill-opacity', opacity);
//         if (timePassed > duration) {
//             clearInterval(interval);
//             map?.setPaintProperty(layerid, 'fill-opacity', 0.8);
//         }
//     }, 20);
// }
const startClick = () => {

    //     //console.log(counter)
}
const airplane =ref(false)
const pauseClick = () => {
    isPlay = false
    animate()
}

const audio = ref(null);
const audioIndex= ref('/static/datong.mp3')
const audioFlag= ref(0)
const playAudio = () => {
    console.log("wobei")
		let dom = audio.value
        console.dir(dom);
		dom.play()
		
		// data.musicSrc = ''
	}
const stopClick = () => {
    isPlay = false
    counter = 0
    animate()
}
const geojsonss = {
    type: "FeatureCollection",
    features: [
        {
            type: "Feature",
            properties: { id: 0, size: 10, color: "red" },
            geometry: {
                type: "Point",
                coordinates: [113.95404, 39.34311],
            },
        },
    ],
};
const zhanqianFlag=ref(false)
const zhanqianbushu =async()=>{
    if(zhanqianFlag.value == false){
        zhanqianFlag.value=true
    }
    rePlayFlag.value = 'zhanqian'
    hasReSet.value = true
    map.easeTo({
                    center: [113.975862799999, 39.329949959999],
                    pitch: 47,
                    bearing: -67.9999999999,
                    zoom: 13.34,
                    duration: 1000, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                });
await sleep(100)

    removeLayer('chufadian','chufadian')
    removeLayer('shizhuli115','shizhuli115')
    removeLayer('shizhuli6851','shizhuli6851')
    removeLayer('shizhuli6852','shizhuli6852')
    removeLayer('shizhuli6861','shizhuli6861')
    removeLayer('shizhuli6863','shizhuli6863')
    await sleep(200)
    asyncAddLayer('chufadian', 'chufadian', staticData.chufadian, 'line', {
                    paint: {
                        'line-color': '#ff0000',
                        'line-width': 8
                    }, layout: {}, filter: []

                })
    
    for (let i = 2; i < 7; i++) {
                    await dyDrawTest()
                }
                await asyncAddLayer('linesDes', 'linesDes', staticData.line3des, 'symbol',
                    {
                        layout: {
                            'text-field': ['get', 'description'],
                            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                            'text-size': 35,
                            'text-offset': [0, 0.6],
                            'text-anchor': 'top'
                        },
                        paint: {
                            'text-color': 'red',
                            'text-halo-color': '#000000',
                            'text-halo-width': 2,
                            'text-opacity': 0.8
                        }
                    })
                    zhanqianFlag.value=false


}

const geojson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'coordinates': [
                    [-73.97003, 40.67264],
                    [-73.96985, 40.67235],
                    [-73.96974, 40.67191],
                    [-73.96972, 40.67175],
                    [-73.96975, 40.67154],
                    [-73.96987, 40.67134],
                    [-73.97015, 40.67117],
                    [-73.97045, 40.67098],
                    [-73.97064, 40.67078],
                    [-73.97091, 40.67038],
                    [-73.97107, 40.67011],
                    [-73.97121, 40.66994],
                    [-73.97149, 40.66969],
                    [-73.97169, 40.66985],
                    [-73.97175, 40.66994],
                    [-73.97191, 40.66998],
                    [-73.97206, 40.66998],
                    [-73.97228, 40.67008]
                ],
                'type': 'LineString'
            }
        }
    ]
};
const initMap = async () => {

    mapboxgl.accessToken =
        "pk.eyJ1IjoiMTY2NTE2OTkzNzYiLCJhIjoiY2ttMDh5amJpMHE2dzJ3cTd5eWZsMGQxZyJ9.XErH3kSOuRC_OWXWCpDLkQ";
    map = new mapboxgl.Map({
        container: 'map',
        zoom: 5.898936707180018,
        center: [109.66294936881894, 38.33825450310795],
        pitch: 6.343045841856863,
        bearing: 0,
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        //style: 'mapbox://styles/mapbox/outdoors-v12'
        style: 'mapbox://styles/mapbox/satellite-streets-v10', // style URL
        //style: 'http://172.21.212.168:8899/mapProject/getPublishedMap/6436b83d7be541574d7b1d94'
    });
    map.on("mousemove", (e: any) => {


        currentMouseValue.value[0] = String(Number(e.lngLat.lng).toFixed(5),);
        currentMouseValue.value[1] = String(Number(e.lngLat.lat).toFixed(5));
    });

    map.on('click', (e: any) => {
        console.log('当前的bearing值为：' + map.getBearing());
        console.log('当前的pitch值为：' + map.getPitch());
        console.log('当前的center值为：' + map.getCenter());
        console.log('当前的zoom值为：' + map.getZoom());
    })

    map.on('style.load', () => {
        map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
        });
        // add the DEM source as a terrain layer with exaggerated height
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 3 });

    });


    map.on('load', async () => {

        //重新部署


        const setImage = async () => {

            return new Promise(resolve => {

                map.addSource('images', {
                    type: "image",
                    url: `http://localhost:8060/getImage?name=wars`,
                    coordinates:
                        [
                            [113.91345, 39.40586],
                            [114.02812, 39.37383],
                            [113.947875, 39.27091],
                            [113.81328, 39.30673],
                        ],
                });
                // [113.93351, 39.48148],
                //     [114.06333, 39.4708],
                //     [113.98508, 39.30845],
                //     [113.85263,39.35719],
                // [113.90439, 39.30814],
                //     [113.99397, 39.30814],
                //     [113.99397, 39.20993],
                //     [113.90439, 39.20993],
                map.addLayer({
                    id: 'imageWar',
                    type: "raster",
                    source: 'images',

                    //   'raster-resampling': 'nearest',
                    //   'raster-translate': [0, 0, 3000], 
                    //   'raster-translate-anchor': 'map'
                    paint: {
                        'raster-opacity': 0,

                    }
                });
                //map?.setPaintProperty('imageWar', 'fill-opacity', 0);
                let opacity = 0;

                const interval = setInterval(() => {
                    if (opacity < 0.99) {
                        opacity = opacity + 0.01
                        //map?.setPaintProperty('imageWar', 'raster-opacity', opacity);
                    }
                    else {
                        clearInterval(interval)
                        resolve('resolve')
                        return
                    }
                }, 20)


            })
        }


        // addLayer('source', 'mylayer2', staticData.rijun21lv, 'fill', {
        //     paint: {
        //         'fill-color': 'red',
        //         'fill-opacity': 1
        //     }, layout: {}, filter: []
        // })

        const dyDraw1 = () => {
            const testgeoj = {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': []
                        }
                    }
                ]
            };
            //staticData.rijun21lvxian
            map.addSource('source', {
                type: 'geojson',
                data: testgeoj
            });
            map.addLayer({
                id: 'mylayer2',
                type: 'line',
                source: 'source',
                paint: {
                    'line-color': '#ff0000',
                    'line-width': 5
                }
            });
            let counter = 0;

            map.easeTo({
                center: staticData.tuan6872xian.geometry.coordinates[0],
                pitch: 55.5,
                bearing: 10.26619,
                duration: 1000, // 缓动动画的时间
                easing: function (t: any) { // 缓动函数
                    return t;
                }
            });

            const timeout = setTimeout(() => {
                const timer1 = setInterval(() => {
                    if (counter >= staticData.tuan6872xian.geometry.coordinates.length) {
                        clearInterval(timer1)
                        clearTimeout(timeout)
                        return
                    }

                    (testgeoj.features[0].geometry.coordinates as number[][]).push(staticData.tuan6872xian.geometry.coordinates[counter]);
                    //map.setCenter(staticData.tuan6872xian.geometry.coordinates[counter]);
                    map.getSource('source').setData(testgeoj);
                    counter++;
                }, 20);
            }, 1500)


        }
        const dyDraw = (sourceId: string, layerId: string, data: any, index: number, type: string, layerConfig?: any) => {
            const testgeoj = {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': []
                        }
                    }
                ]
            };
            //staticData.rijun21lvxian
            map.addSource(sourceId, {
                type: 'geojson',
                data: testgeoj
            });
            map.addLayer({
                id: layerId,
                type: type,
                source: sourceId,
                paint: layerConfig?.paint,
                layout: layerConfig?.layout,
            })

            let counter = 0;
            const timer = setInterval(() => {

                if (counter >= data.geometry.coordinates.length) {
                    clearInterval(timer)
                    //setTimeout(dyDraw1, 20)
                    return
                };
                (testgeoj.features[0].geometry.coordinates as number[][]).push(data.geometry.coordinates[counter]);
                //map.setCenter(staticData.tuan6871xian.geometry.coordinates[counter]);
                map.getSource(sourceId).setData(testgeoj);
                counter++;
            }, 300);
            //clearInterval(timer2)
        }

        const dyDraw2 = () => {
            const testgeoj = {
                'type': 'FeatureCollection',
                'features': [
                    {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'LineString',
                            'coordinates': []
                        }
                    }
                ]
            };
            //staticData.rijun21lvxian
            map.addSource('source2', {
                type: 'geojson',
                data: testgeoj
            });

            map.addLayer({
                id: 'mylayer3',
                type: 'line',
                source: 'source2',
                paint: {
                    'line-color': '#ff0000',
                    'line-width': 8
                }
            });

            let counter = 0;
            const timer2 = setInterval(() => {

                if (counter >= staticData.tuan6871xian.geometry.coordinates.length) {
                    clearInterval(timer2)
                    setTimeout(dyDraw1, 20)
                    return
                };
                (testgeoj.features[0].geometry.coordinates as number[][]).push(staticData.tuan6871xian.geometry.coordinates[counter]);
                map.setCenter(staticData.tuan6871xian.geometry.coordinates[counter]);
                map.getSource('source2').setData(testgeoj);
                counter++;
            }, 20);
            //clearInterval(timer2)
        }



        // 绘制第一条线
        // dyDraw2();


        //     // 绘制第一条线
        //     setTimeout(dyDraw1, 3000);
        // 绘制第二条线
        task.value = [
            //红军部署
            async () => {
                gifFlag.value=true
                playAudio()
                map.flyTo({
                    center: [113.18883047209192, 38.46825060280423],
                    pitch: 28.343045841856856,
                    bearing: -73.6000000000003,
                    zoom: 8.509009513393568,
                    speed: 0.5,
                    curve: 1,
                    duration: 2000, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                });

                //await setImage()
                //map?.setPaintProperty('imageWar', 'raster-opacity', 0);
                textMessage.value = '随着山西省大同市的失守，日军已经逼近了山西的内防线，华北地区情况不容乐观'
                ////typewriter11()

                await asyncAddLayer('warpre', 'warpre', staticData.warpre, 'symbol',
                    {
                        layout: {
                            'text-field': ['get', 'description'],
                            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                            'text-size': 35,
                            'text-offset': [0, 0.6],
                            'text-anchor': 'top'
                        },
                        paint: {
                            'text-color': '#ffffff',
                            'text-halo-color': '#000000',
                            'text-halo-width': 2,
                            'text-opacity': 0.8
                        }
                    })
               
               
                //playAudio()
                await sleep(100)

                for (const marker of staticData.warpre.features) {
                    const el = document.createElement("div");
                    el.className = "marker";
                    el.style.backgroundImage =
                        "url(http://localhost:8060/getImage?name=pingxing)"
                    el.style.width = "50px";
                    el.style.height = "50px";
                    el.style.backgroundSize = "100%";
                    // Add markers to the map.
                    new mapboxgl.Marker(el)
                        .setLngLat(marker.geometry.coordinates as any)
                        .addTo(map);
                }
               
                //大同到灵丘
                await dyDrawTest()

                await asyncAddLayer('datong2lingqiu', 'datong2lingqiu', staticData.datong2lingqiu, 'fill',
                    {
                        paint: {
                            'fill-color': '#191970',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    })
                textMessage.value = '只要突破了平行关，日军即可沿着平坦宽阔的的河谷地带，直插整个山西的要害——太原'
                ////typewriter11()
                audioIndex.value='/static/tupo.mp3'
                audioFlag.value=1
                await sleep(200)
                playAudio()
                await sleep(500)
                //平型到太原
                await dyDrawTest()
                await asyncAddLayer('ping2taiyuan', 'ping2taiyuan', staticData.ping2taiyuan, 'fill',
                    {
                        paint: {
                            'fill-color': '#191970',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    })
                textMessage.value = '1937年9月23日，阎锡山策划25日以3个师的兵力，出长城合围平型关下的日军，歼灭日军于关外'
                ////typewriter11()
                audioIndex.value='/static/1937.mp3'
                audioFlag.value=2
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                //await sleep(1000)
                               map.easeTo({
                    zoom: 11.370078472807089,
                    center: [113.9793012280939, 39.353238498150944],
                    pitch: 6.499999999999999,
                    bearing: 0,
                    duration: 1000, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                })
                await asyncAddLayer('pingxingfanwei', 'pingxingfanwei', staticData.pingxingfanwei, 'line',

                    {
                        paint: {
                            'line-color': 'red',
                            'line-width': 12,
                        }, layout: {}, filter: []
                    })
                // map.easeTo({
                //     zoom: 11.370078472807089,
                //     center: [113.9793012280939, 39.353238498150944],
                //     pitch: 6.499999999999999,
                //     bearing: 0,
                //     duration: 1000, // 缓动动画的时间
                //     easing: function (t: any) { // 缓动函数
                //         return t;
                //     }
                // })
                await sleep(100)
                zonglan.value=true
                await sleep(300)
                zonglan.value = false
                imageShow.value = false


                await asyncAddLayer('places', 'places-labels', staticData.pointsImp, 'symbol',
                    {
                        layout: {
                            'text-field': ['get', 'description'],
                            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                            'text-size': 35,
                            'text-offset': [0, 0.6],
                            'text-anchor': 'top'
                        },
                        paint: {
                            'text-color': '#ffffff',
                            'text-halo-color': '#000000',
                            'text-halo-width': 2,
                            'text-opacity': 0.8
                        }
                    })
                for (const marker of staticData.pointsImp.features) {
                    const el = document.createElement("div");
                    el.className = "marker";
                    el.style.backgroundImage =
                        "url(http://localhost:8060/getImage?name=pingxing)"
                    el.style.width = "50px";
                    el.style.height = "50px";
                    el.style.backgroundSize = "100%";
                    // Add markers to the map.
                    new mapboxgl.Marker(el)
                        .setLngLat(marker.geometry.coordinates as any)
                        .addTo(map);
                }

                map.easeTo({
                    center: [113.975862799999, 39.329949959999],
                    pitch: 47,
                    bearing: -67.9999999999,
                    zoom: 13.34,
                    duration: 1000, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                });
                addLayer('chufadian', 'chufadian', staticData.chufadian, 'line', {
                    paint: {
                        'line-color': '#ff0000',
                        'line-width': 8
                    }, layout: {}, filter: []

                })
                thumImage.value = 'http://localhost:8060/getImage?name=all-check-hong'
                map?.setPaintProperty('chufadian', 'line-opacity', 0.4);
                textMessage.value = '大战开始，115师兵分三路，343旅之685团由杨得志率领,686团由杨勇率领埋伏于10里长沟。'
                ////typewriter11()
                
                audioIndex.value='/static/大战开始.mp3'
                audioFlag.value=3
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                await sleep(200)
                for (let i = 2; i < 7; i++) {
                    await dyDrawTest()
                }
                await asyncAddLayer('linesDes', 'linesDes', staticData.line3des, 'symbol',
                    {
                        layout: {
                            'text-field': ['get', 'description'],
                            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                            'text-size': 35,
                            'text-offset': [0, 0.6],
                            'text-anchor': 'top'
                        },
                        paint: {
                            'text-color': 'red',
                            'text-halo-color': '#000000',
                            'text-halo-width': 2,
                            'text-opacity': 0.8
                        }
                    })

                await sleep(100)
                // await dyDrawTest()
                // console.log("Guagua")
                // await dyDrawTest()
                // console.log("haha")
            },
            async () => {

                textMessage.value = '1937年9月25日晨，日军第5师第21旅一部和大批辎重车辆，沿灵丘至平型关公路西进。7时许，全部进入第115师设伏地域。'

                 ////typewriter11()
                textGif.value='./static/222slow.gif'
                audioIndex.value='/static/日军行进.mp3'
                audioFlag.value=4
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                //await dyDrawTest()
                await sleep(200)
                // dyDrawTest();
                map.easeTo({
                    center: [113.96645215857234, 39.361178424920865],
                    pitch: 47.848000000000056,
                    bearing: -15.636600148357616,
                    zoom: 14.133200956626503,
                    duration: 1000, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                });
                thumImage.value = 'http://localhost:8060/getImage?name=all-check-ri'
                map.easeTo({
                    center: staticData.rijun21lvxian.geometry.coordinates[0],
                    pitch: 0,
                    bearing: 0,
                    zoom: 14.133200956626503,
                    duration: 1000, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                });
                //console.log(drawIndex.value)
                addLayer('rijun21lvxian', 'rijun21lvxian', staticData.rijun21lvxian, 'line', { paint: { 'line-color': '#191970', 'line-width': 13 }, layout: {}, filter: [] })
                await sleep(100)
                await asyncAddLayer('rijun21lv', 'rijun21lv', staticData.rijun21lv, 'fill',
                    {
                        paint: {
                            'fill-color': '#191970',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    })
                //await dyDrawTest()
                await cameraAlong(staticData.rijun21lvxian.geometry.coordinates)




                map?.setPaintProperty('rijun21lv', 'fill-opacity', 0.4);

                let popup4 = new mapboxgl.Popup({ offset: 25, })
                    .setLngLat([113.96673, 39.36022])
                    .setHTML('<h1 style=";color:#191970;">日军第5师21旅</h1>')
                    .addTo(map);
                //
                //await ////typewriter11() 
                map.flyTo({
                    center: [113.97496812712012, 39.34280192790092],
                    pitch: 35.260330578511265,
                    bearing: -17.65420514898358,
                    zoom: 13.771419543884582,
                    speed: 0.5,
                    curve: 1,
                    duration: 1000, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                });
                thumImage.value = 'http://localhost:8060/getImage?name=all-check-weigong'
                map.easeTo({
                    center: [113.95007145232819, 39.340621294206585],
                    pitch: 36.087685950382685,
                    bearing: 14.948428631981187,
                    zoom: 14.10504267767176,
                    duration: 200, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                });
                await sleep(200)
                textMessage.value = '由于道路狭窄，雨后路面泥泞，其车辆人马拥挤堵塞，行动缓慢,第115师立即抓住有利战机，发起冲击。'
                ////typewriter11()
                audioIndex.value='/static/道路狭窄.mp3'
                audioFlag.value=5
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                
 
                await asyncAddLayer('tuan6851', 'tuan6851', staticData.tuan6851, 'fill',
                    {
                        paint: {
                            'fill-color': '#ff0000',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    })
                flashLayer('tuan6851', map)
                map?.setPaintProperty('tuan6851', 'fill-opacity', 0.4);


                await asyncAddLayer('tuan6852', 'tuan6852', staticData.tuan6852, 'fill',
                    {
                        paint: {
                            'fill-color': '#ff0000',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    })
                flashLayer('tuan6852', map)
                map?.setPaintProperty('tuan6852', 'fill-opacity', 0.4);
                await asyncAddLayer('tuan6853', 'tuan6853', staticData.tuan6853, 'fill',
                    {
                        paint: {
                            'fill-color': '#ff0000',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    })
                flashLayer('tuan6853', map)
                await sleep(100)
                textMessage.value = '第685团迎头截击，歼日军一部。'
                ////typewriter11()
                audioIndex.value='/static/迎头痛击.mp3'
                audioFlag.value=6
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                await sleep(200)
                map?.setPaintProperty('tuan6853', 'fill-opacity', 0.4);

                let popup1 = new mapboxgl.Popup({ offset: 25, })
                    .setLngLat([113.94922, 39.33621])
                    .setHTML('<h1 style=";color:red;">八路军115师685团</h1>')
                    .addTo(map);
                map.easeTo({
                    center: [113.95897143527827, 39.34081003807614],
                    pitch: 36.499999999999,
                    bearing: -13.599999999,
                    zoom: 13.83414796,
                    duration: 1000, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                });

            },
            // () => {
            //     addLayer('tuan6872xian', 'tuan6872xian', staticData.tuan6872xian2, 'line',
            //         {
            //             paint: {
            //                 'line-color': '#ff0000',
            //                 'line-width': 8
            //             }, layout: {}, filter: []
            //         })
            // },
            async () => {

                // await asyncAddLayer('tuan6872', 'tuan6872', staticData.tuan6872, 'fill',
                //     {
                //         paint: {
                //             'fill-color': '#ff0000',
                //             'fill-opacity': 1,
                //         }, layout: {}, filter: []
                //     })


            },
            //686团进攻
            async () => {


                await asyncAddLayer('tuan686summian', 'tuan686summian', staticData.tuan686summian, 'fill',
                    {
                        paint: {
                            'fill-color': '#ff0000',
                            'fill-opacity': 0,
                        }, layout: {}, filter: []
                    })

                flashLayer('tuan686summian', map)
                map?.setPaintProperty('tuan686summian', 'fill-opacity', 0.4);
                let popup2 = new mapboxgl.Popup({ offset: 25, })
                    .setLngLat([113.97414, 39.34887])
                    .setHTML('<h1 style=";color:red;">八路军115师686团</h1>')
                    .addTo(map);
                await sleep(200)
                textMessage.value = '日军其中一部企图抢占老爷庙高地，掩护突围。第686团迅速冲过公路，先敌占领老爷庙，以此对日军构成两面夹击之势。'

                ////typewriter11()
                audioIndex.value='/static/先敌占领.mp3'
                audioFlag.value=7
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                await sleep(200)
                //tuan6865
                await dyDrawTest()

                //tuan6866
                await dyDrawTest()
                await asyncAddLayer('tuan6864', 'tuan6864', staticData.tuan6864, 'fill',
                    {
                        paint: {
                            'fill-color': '#ff0000',
                            'fill-opacity': 0,
                        }, layout: {}, filter: []
                    })
                map?.setPaintProperty('tuan6864', 'fill-opacity', 0.4);
                let popup3 = new mapboxgl.Popup({ offset: 25, })
                    .setLngLat([113.95526, 39.36343])
                    .setHTML('<h1 style=";color:red;">八路军115师686团</h1>')
                    .addTo(map);
                flashLayer('tuan6864', map)
                map.easeTo({
                    center: [113.95944018637402, 39.34464163187076],
                    pitch: 0,
                    bearing: 21.59999999999968,
                    zoom: 13.265321822909323,
                    duration: 2000, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                });
                //日军包围圈
                await dyDrawTest()
                airplane.value = true
                //红军



                await sleep(900)
                await dyDrawTest()
                airplane.value= false
            },
            //蔡家峪进攻
            async () => {
                thumImage.value = 'http://localhost:8060/getImage?name=all-check-caijia'
                map.easeTo({
                    center: [114.013786047096, 39.370113660992416],
                    pitch: 0,
                    bearing: -3.4432812988264914,
                    zoom: 13.662795415152122,
                    duration: 1000, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                });
                textMessage.value = '日军第5师师长板垣征四郎急令其在蔚县、涞源的部队速向平型关增援，又被第115师阻击于灵丘以北和以东地区'
                ////typewriter11()

                
                textGif.value='./static/333slow.gif'
                audioIndex.value='/static/日军求援.mp3'
                audioFlag.value=8
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                await sleep(200)
                //ricaijia1
                await dyDrawTest()
                let popup5 = new mapboxgl.Popup({ offset: 25, })
                    .setLngLat([114.01397, 39.37603])
                    .setHTML('<h1 style=";color:#191970;">灵丘日军增援部队</h1>')
                    .addTo(map);
                //tuan6871xian
                await dyDrawTest()
                //tuan6875xian
                await dyDrawTest()
                //tuan6874xian
                await dyDrawTest()
                //tuan6873xian
                await dyDrawTest()
                //tuan6873xian2
                await dyDrawTest()
                //tuan6873
                await asyncAddLayer('tuan6873', 'tuan6873', staticData.tuan6873, 'fill',
                    {
                        paint: {
                            'fill-color': 'red',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    })
                flashLayer('tuan6873', map)
                map?.setPaintProperty('tuan6873', 'fill-opacity', 0.4);


                let popup3 = new mapboxgl.Popup({ offset: 25, })
                    .setLngLat([114.00728, 39.36636])
                    .setHTML('<h1 style=";color:red;">八路军115师687团</h1>')
                    .addTo(map);
                removeLayer('linesDes', 'linesDes')
                //tuan6872xian
                await dyDrawTest()
                //tuan6872xian2
                await dyDrawTest()
                ///tuan6872
                await asyncAddLayer('tuan6872', 'tuan6872', staticData.tuan6872, 'fill',
                    {
                        paint: {
                            'fill-color': 'red',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    })
                flashLayer('tuan6872', map)
                map?.setPaintProperty('tuan6872', 'fill-opacity', 0.4);
                map.easeTo({
                    center: [114.00905586184763, 39.37955581507637],
                    pitch: 0,
                    bearing: 0,
                    zoom: 13.586005216860592,
                    duration: 1000, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                });
                //ricaijia2
                await dyDrawTest()
                // textMessage.value = '687团与独立团阻击日军增援部队于韩家湾地区，并爆发了小规模战争，直至28日，日军再度进入乔沟'
                // ////typewriter11()
                audioIndex.value='/static/日军求援.mp3'
                audioFlag.value=9
                //让浏览器缓一缓
                await sleep(200)
                //playAudio()
                await sleep(200)
                //caijia687zuo
                await asyncAddLayer('caijia687zuo', 'caijia687zuo', staticData.caijia687zuo, 'fill',
                    {
                        paint: {
                            'fill-color': 'red',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    })
                flashLayer('caijia687zuo', map)
                map?.setPaintProperty('caijia687zuo', 'fill-opacity', 0.4);
                //caijia687you
                await asyncAddLayer('caijia687you', 'caijia687you', staticData.caijia687you, 'fill',
                    {
                        paint: {
                            'fill-color': 'red',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    })
                flashLayer('caijia687you', map)
                map?.setPaintProperty('caijia687you', 'fill-opacity', 0.4);


                //caijiayuquan
                await dyDrawTest()
                thumImage.value = 'http://localhost:8060/getImage?name=all-check-run'



                //videoOn.value = true
                await asyncAddLayer('bridgeIntro', 'bridgeIntro', geojsonss, 'circle',
                    {
                        paint: {
                            'circle-color': 'red',
                            'circle-radius': 30,
                        },
                        layout: {}, filter: []
                    })
                map.easeTo({
                    center: [113.955570760797, 39.34130385967589],
                    pitch: 65.76033057851129,
                    bearing: -11.199999999999932,
                    zoom: 14.541533462025555,
                    duration: 1000, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                });
                textMessage.value = '在老爷庙地区，日军与八路军发生了了空前惨烈的白刃战，日军死伤惨重'
                ////typewriter11()
                textGif.value='./static/444slow.gif'
                audioIndex.value='/static/老爷庙.mp3'
                audioFlag.value=10
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                await sleep(200)
                map.addSource('imagessss', {
                    type: "image",
                    url: `http://localhost:8060/getImage?name=04332`,
                    coordinates:
                        [
                            [113.815, 39.448],
                            [114.056, 39.448],
                            [114.056, 39.207],
                            [113.815, 39.207],
                        ],
                });
                // [113.93351, 39.48148],
                //     [114.06333, 39.4708],
                //     [113.98508, 39.30845],
                //     [113.85263,39.35719],
                // [113.90439, 39.30814],
                //     [113.99397, 39.30814],
                //     [113.99397, 39.20993],
                //     [113.90439, 39.20993],
                map.addLayer({
                    id: 'imageWar2',
                    type: "raster",
                    source: 'imagessss',

                    //   'raster-resampling': 'nearest',
                    //   'raster-translate': [0, 0, 3000], 
                    //   'raster-translate-anchor': 'map'
                    paint: {
                        'raster-opacity': 0.7,

                    }
                });
                let tick = 1.0
                setInterval(() => {
                    map.setPaintProperty('bridgeIntro', 'circle-blur', 0.6 + tick / 5);
                    tick = (tick + 1.0) % 10;
                }, 20);
                //videoOn.value = true
                const content = `    <div   style="width:100%;height: 100%;;"><video style="width:100%;height: 100%" autoplay preload  muted>
<source src="../../laoye.mp4"type="video/mp4">
</video> </div>`
                // <vue3VideoPlay width="40vmax" height="45vh" title="老爷庙" :src="options.src" :poster="options.poster" @play="onPlay" @pause="onPause" @timeupdate="onTimeupdate" @canplay="onCanplay" />
                //         <div>
                //             <el-button type="danger" :icon="CloseBold"  @click="overVideo" />
                //         </div>
                map.easeTo({
                    center: [113.95316992113567, 39.343012813407086],
                    pitch: 0,
                    bearing: 0,
                    zoom: 16.569294887091626,
                    duration: 1000, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                });
                await sleep(500)
                videoOn.value = true
                await rotateCamera(0)
                videoOn.value = false
                removeLayer('imageWar2','imagessss')
                // let popup10 = new mapboxgl.Popup({ offset: 30, maxWidth: '44vw', maxHeight: '38vh', anchor: 'top', autoClose: 25000, closeOnClick: false })
                //     .setLngLat([113.95404, 39.34311])
                //     .setHTML(content)
                //     .addTo(map);
                map.easeTo({
                    center: [113.92299880899526, 39.340844556285106],
                    pitch: 34.26033057851127,
                    bearing: -19.999999999999773,
                    zoom: 13.562447828007302,
                    duration: 1000, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                });

                // map.easeTo({
                //     center: [113.96210534596526, 39.34361926956976],
                //     pitch: 34.26033057851127,
                //     bearing: -19.999999999999773,
                //     zoom: 13.562447828007302,
                //     duration: 1000, // 缓动动画的时间
                //     easing: function (t: any) { // 缓动函数
                //         return t;
                //     }
                // });
                await dyDrawTest()

                // await dyDrawTest()
                // await asyncAddLayer('rijuntuanchengmian', 'rijuntuanchengmian', staticData.rijuntuanchengmian, 'fill',
                //     {
                //         paint: {
                //             'fill-color': '#191970',
                //             'fill-opacity': 1,
                //         }, layout: {}, filter: []
                //     })


                //rijuntuancheng
                // await dyDrawTest()
                await sleep(500)
                textMessage.value = '由于国军未按原定计划作战，最终日军由东跑池方向从团城口突围'
                ////typewriter11()
                
                audioIndex.value='/static/逃跑.mp3'
                audioFlag.value=11
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                await sleep(500)
                console.log("11")
                warShow.value = false
                personVs.value = true
                textMessage.value = '这是林彪与板垣征四郎的第一次正面交锋，最终以八路军获胜作为结果'
                ////typewriter11()
                textGif.value='./static/555slow.gif'
                audioIndex.value='/static/交锋获胜.mp3'
                audioFlag.value=12
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                await sleep(3000)
                gifFlag.value=false
                banyuanDie.value = true
                await sleep(1000)
                personVs.value = false
                jiaohuo.value = true
                await sleep(3000)
                jiaohuo.value = false
                await sleep(3000)
                listShow.value=true
                ListShowSum.value =true
                


            },


        ];





        //dyDraw1()
        //await setImage()
        //map?.setPaintProperty('imageWar', 'raster-opacity', 0);
        //await dyDraw2()
        // await  dyDraw1()

        // addLayer('my-source', 'my-layer', staticData.tuan6851, 'fill',
        //     {
        //         paint: {
        //             'fill-color': '#00f',
        //             'fill-opacity': 0,
        //         }, layout: {}, filter: []
        //     })
        //flashLayer('my-layer', map)
        //加入重要地名



        // 1000ms表示1秒钟

        // 动画函数
        //   function animate() {
        //     // 增加填充面积透明度
        //     var opacity = map.getPaintProperty('my-layer', 'fill-opacity');
        //     opacity += 0.01;
        //     if (opacity > 1) {
        //       opacity = 1;
        //     }
        //     map.setPaintProperty('my-layer', 'fill-opacity', opacity);

        //     // 如果透明度未达到最大值，则继续动画
        //     if (opacity < 1) {
        //       requestAnimationFrame(animate);
        //     }
        //   }
        //   animate()

        // map.addLayer({
        //     id: 'my-layer',
        //     type: 'fill-extrusion',
        //     source: 'my-source',
        //     paint: {
        //       'fill-extrusion-color': '#00f',
        //       'fill-extrusion-height': 0,
        //       'fill-extrusion-opacity': 0.8,
        //       'fill-extrusion-transition': {
        //         duration: 2000
        //       }
        //     }
        //   });

        //   // 动画函数
        //   function animate() {
        //     // 增加填充面积高度
        //     var height = map.getPaintProperty('my-layer', 'fill-extrusion-height');
        //     height += 1;
        //     if (height > 1000) {
        //       height = 1000;
        //     }
        //     map.setPaintProperty('my-layer', 'fill-extrusion-height', height);

        //     // 如果高度未达到最大值，则继续动画
        //     if (height < 1000) {
        //       requestAnimationFrame(animate);
        //     }
        //   }

        // map.addLayer({
        //     id: 'my-layer',
        //     type: 'fill-extrusion',
        //     source: 'my-source',
        //     paint: {
        //       'fill-extrusion-color': '#00f',
        //       'fill-extrusion-height': 0,
        //       'fill-extrusion-opacity': 0.8
        //     }
        //   });

        //   // 定义动画函数
        //   function animate(height) {
        //     // 如果高度未达到最大值，则继续动画
        //     if (height <= 1000) {
        //       // 增加填充面积高度
        //       height += 1;
        //       map.setPaintProperty('my-layer', 'fill-extrusion-height', height);
        //       setTimeout(function() {
        //         animate(height);
        //       }, 20);
        //     }
        //   }

        //   // 开始动画
        //   animate(0);
        // map.addLayer({
        //     id: 'my-layer',
        //     type: 'fill',
        //     source: 'my-source',
        //     paint: {
        //       'fill-color': '#00f',
        //       'fill-opacity': 0.8
        //     }
        //   });
        //   let bufferRadius = 0;
        //   // 创建生长动画
        //   function grow() {
        //     // 缓冲面要素
        //     var buffer = turf.buffer(map.getSource('my-source')._data.features[0], bufferRadius, {units: 'miles'});

        //     // 更新地图上的要素
        //     map.getSource('my-source').setData(buffer);

        //     // 增加缓冲区半径
        //     bufferRadius += 0.1;

        //     // 如果缓冲区半径未达到最大值，则继续动画
        //     if (bufferRadius <= 1) {
        //       setTimeout(grow, 50);
        //     }
        //   }

        //   // 开始动画
        //   grow();

        // 添加面图层
        // 添加面图层
        //    map.addLayer({
        //     id: 'my-layer',
        //     type: 'fill',
        //     source: 'my-source',
        //     paint: {
        //       'fill-color': '#00f',
        //       'fill-opacity': 0,
        //       'fill-outline-color': '#00f'
        //     }
        //   });

        //   // 获取面积
        //   var features = map.querySourceFeatures('my-source');
        //   console.log(features)
        //   var areas = features.map(function(feature:any) {
        //     return turf.area(feature.geometry);
        //   });

        //   // 将面积转换为每毫秒增加的面积
        //   var increment = Math.max.apply(null, areas) / 200;
        //   var currentArea = 0;

        //   // 动画函数
        //   function animate() {
        //     if (currentArea < Math.max.apply(null, areas)) {
        //         console.log(areas)
        //       currentArea += increment;
        //       map.setPaintProperty('my-layer', 'fill-opacity', currentArea / Math.max.apply(null, areas));
        //       requestAnimationFrame(animate);
        //     }
        //   }
        //   console.log("jajha")
        //   // 开始动画
        //   animate();
        // map.addSource('mapbox-terrain', {
        //     type: 'vector',
        //     // Use any Mapbox-hosted tileset using its tileset id.
        //     // Learn more about where to find a tileset id:
        //     // https://docs.mapbox.com/help/glossary/tileset-id/
        //     url: 'mapbox://mapbox.mapbox-terrain-v2'
        // });
        // map.addLayer(
        //     {
        //         'id': 'terrain-data',
        //         'type': 'line',
        //         'source': 'mapbox-terrain',
        //         'source-layer': 'contour',
        //         'layout': {
        //             'line-join': 'round',
        //             'line-cap': 'round'
        //         },
        //         'paint': {
        //             'line-color': '#ff69b4',
        //             'line-width': 1
        //         }
        //     },
        //     // 'road-label-simple' // Add layer below labels
        // );
        //卫星影像
        // map.addSource('strs', {
        //     type: "raster",
        //     tiles: [`http://localhost:8070/getTile2?x={x}&y={y}&z={z}`],
        //   });
        //   map.addLayer({
        //     id: 'strs',
        //     type: "raster",
        //     source: 'strs',
        //   });

        // map.addSource('dem', {
        //     type: "raster-dem",
        //     //tiles: [`${prefix}visual/ObliqueImage/{x}/{y}/{z}`],
        //     tiles: [`http://localhost:4090/getTiles?x={x}&y={y}&z={z}`],
        //     'tileSize': 512,
        //   });
        //   map.addLayer({
        //     id: 'dem',
        //     type: 'hillshade',
        //     source: 'dem',

        //   });
        //   map.setTerrain({ 'source': 'dem', 'exaggeration': 0.004 })

        //       map.addSource('image', {
        //     'type': 'image',
        //     'url': 'https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif',
        //     'coordinates': [
        //         [113.844175, 39.41013],
        //         [114.092054, 39.41013],
        //         [113.844175, 39.162826],
        //         [114.092054, 39.162826]
        //     ]
        // });
        // map.addLayer({
        //     id: 'image-layer',
        //     'type': 'raster',
        //     'source': 'image',
        //     'paint': {
        //         'raster-fade-duration': 0,

        //     }
        // });

        // map.addSource('image', {
        //     'type': 'geojson',
        //     'data': {
        //         'type': 'Feature',
        //         'geometry': {
        //             'type': 'Polygon',
        //             'coordinates': [[
        //             [-80.425, 46.437],
        //                 [-71.516, 46.437],
        //                 [-71.516, 37.936],
        //                 [-80.425, 37.936],
        //                 [-80.425, 46.437]
        //             ]]
        //         }
        //     }
        // });
        // map.addLayer({
        //     id: 'image-layer',
        //     'type': 'fill-extrusion',
        //     'source': 'image',
        //     'paint': {
        //         'fill-extrusion-color': 'red',
        //         'fill-extrusion-height': ['get', 'height'],
        //         'fill-extrusion-base': 0,
        //         'fill-extrusion-opacity': 0.6
        //     }
        // });


        // map.addSource("bridgeIntro", {
        //     type: "geojson",
        //     data: geojsonss,
        // });
        // map.addLayer({
        //     id: "bridgeIntro",
        //     type: "circle",
        //     paint: {
        //         'circle-color': 'red',
        //         'circle-radius': 30,
        //     },
        //     source: "bridgeIntro",
        // });



        // map.addSource('route', {
        //     'type': 'geojson',
        //     'data': {
        //         'type': 'Feature',
        //         'properties': {},
        //         'geometry': {
        //             'type': 'LineString',
        //             'coordinates': [
        //                 [-122.483696, 37.833818],
        //                 [-122.483482, 37.833174],
        //                 [-122.483396, 37.8327],
        //                 [-122.483568, 37.832056],
        //                 [-122.48404, 37.831141],
        //                 [-122.48404, 37.830497],
        //                 [-122.483482, 37.82992],
        //                 [-122.483568, 37.829548],
        //                 [-122.48507, 37.829446],
        //                 [-122.4861, 37.828802],
        //                 [-122.486958, 37.82931],
        //                 [-122.487001, 37.830802],
        //                 [-122.487516, 37.831683],
        //                 [-122.488031, 37.832158],
        //                 [-122.488889, 37.832971],
        //                 [-122.489876, 37.832632],
        //                 [-122.490434, 37.832937],
        //                 [-122.49125, 37.832429],
        //                 [-122.491636, 37.832564],
        //                 [-122.492237, 37.833378],
        //                 [-122.493782, 37.833683]
        //             ]
        //         }
        //     }
        // });
        // map.addLayer({
        //     'id': 'route',
        //     'type': 'line',
        //     'source': 'route',
        //     'layout': {
        //         'line-join': 'round',
        //         'line-cap': 'round'
        //     },
        //     'paint': {
        //         'line-color': 'red',
        //         'line-width': 15
        //     }
        // });
        // map.addSource('route', {
        //     'type': 'geojson',
        //     'data': staticData.rijun21lvxian
        // });
        // map.addLayer({
        //     'id': 'route',
        //     'type': 'line',
        //     'source': 'route',
        //     'layout': {
        //         'line-join': 'round',
        //         'line-cap': 'round'
        //     },
        //     'paint': {
        //         'line-color': 'red',
        //         'line-width': 10
        //     }
        // });

        // map.addSource('route2', {
        //     'type': 'geojson',
        //     'data': staticData.mian
        // });
        // map.addLayer({
        //     'id': 'route2',
        //     'type': 'line',
        //     'source': 'route2',
        //     'layout': {
        //         'line-join': 'round',
        //         'line-cap': 'round'
        //     },
        //     'paint': {
        //         'line-color': 'red',
        //         'line-width': 5
        //     }
        // });
        //进攻面
        // map.addSource('route2', {
        //     'type': 'geojson',
        //     'data': staticData.mian
        // });
        // map.addLayer({
        //     'id': 'route2',
        //     'type': 'fill',
        //     'source': 'route2',
        //     'layout': {
        //     },
        //     'paint': {
        //         'fill-color':'red',
        //         'fill-opacity':0.5
        // }
        // });





        map.addSource('line', {
            type: 'geojson',
            data: geojson
        });

        // add a line layer without line-dasharray defined to fill the gaps in the dashed line
        map.addLayer({
            type: 'line',
            source: 'line',
            id: 'line-background',
            paint: {
                'line-color': 'yellow',
                'line-width': 6,
                'line-opacity': 0.4
            }
        });

        // add a line layer with line-dasharray set to the first value in dashArraySequence
        map.addLayer({
            type: 'line',
            source: 'line',
            id: 'line-dashed',
            paint: {
                'line-color': 'yellow',
                'line-width': 6,
                'line-dasharray': [0, 4, 3]
            }
        });

        // technique based on https://jsfiddle.net/2mws8y3q/
        // an array of valid line-dasharray values, specifying the lengths of the alternating dashes and gaps that form the dash pattern
        const dashArraySequence = [
            [0, 4, 3],
            [0.5, 4, 2.5],
            [1, 4, 2],
            [1.5, 4, 1.5],
            [2, 4, 1],
            [2.5, 4, 0.5],
            [3, 4, 0],
            [0, 0.5, 3, 3.5],
            [0, 1, 3, 3],
            [0, 1.5, 3, 2.5],
            [0, 2, 3, 2],
            [0, 2.5, 3, 1.5],
            [0, 3, 3, 1],
            [0, 3.5, 3, 0.5]
        ];

        let step = 0;

        function animateDashArray(timestamp: any) {
            // Update line-dasharray using the next value in dashArraySequence. The
            // divisor in the expression `timestamp / 50` controls the animation speed.
            const newStep = parseInt(
                (timestamp / 50) % dashArraySequence.length
            );

            if (newStep !== step) {
                map.setPaintProperty(
                    'line-dashed',
                    'line-dasharray',
                    dashArraySequence[step]
                );
                step = newStep;
            }

            // Request the next frame of the animation.
            requestAnimationFrame(animateDashArray);
        }

        // start the animation
        animateDashArray(0);

    })
    //     map.on('data', function(e:any) {
    //   if (e.sourceId === 'my-data' && e.isSourceLoaded) {
    //     // 使用动画功能在地图上绘制多边形

    //     animatePolygon();
    //   }
    //   function animatePolygon() {
    //   var draw = false;
    //   var timer = null;
    //   map.on('mousemove', function(e:any) {
    //     if (draw) {
    //       var polygon = turf.circle([e.lngLat.lng, e.lngLat.lat], 0.1, { steps: 30 });
    //       map.getSource('my-data').setData(polygon);
    //       map.addLayer({
    //       'id': 'my-layer',
    //       'type': 'fill',
    //       'source': 'my-data',
    //       'paint': {
    //         'fill-color': '#088',
    //         'fill-opacity': 0.8
    //       },
    //       'layout': {
    //         'visibility': 'visible'
    //       },
    //       'filter': ['==', '$type', 'Polygon']
    //     });
    //     }
    //   });
    //   map.on('mousedown', function() {
    //     draw = true;
    //   });
    //   map.on('mouseup', function() {
    //     draw = false;
    //   });
    // }
    // });


    // 添加填充面图层


    // map?.flyTo({
    //     center: [113.8758628, 39.02994996],
    //     zoom: 8,
    //     speed: 300,
    // });

}
//闪烁函数


const addLayer = (sourceId: string, layerId: string, data: any, type: string, layerConfig?: any) => {

    map.addSource(sourceId, {
        type: 'geojson',
        data: data
    });
    map.addLayer({
        id: layerId,
        type: type,
        source: sourceId,
        paint: layerConfig?.paint,
        layout: layerConfig?.layout,
        //filter: layerConfig?.filter
    });
}

const asyncAddLayer = async (sourceId: string, layerId: string, data: any, type: string, layerConfig?: any) => {
    return new Promise(resolve => {
        setTimeout(() => {
            map.addSource(sourceId, {
                type: 'geojson',
                data: data
            });
            map.addLayer({
                id: layerId,
                type: type,
                source: sourceId,
                paint: layerConfig?.paint,
                layout: layerConfig?.layout,
                //filter: layerConfig?.filter
            });
            resolve("resolve")

        }, 500)
    })

}

const overVideo = async () => {
    videoOn.value = false
    map.easeTo({
        center: [113.96210534596526, 39.34361926956976],
        pitch: 34.26033057851127,
        bearing: -19.999999999999773,
        zoom: 13.562447828007302,
        duration: 1000, // 缓动动画的时间
        easing: function (t: any) { // 缓动函数
            return t;
        }
    });

    await asyncAddLayer('rijuntuanchengmian', 'rijuntuanchengmian', staticData.rijuntuanchengmian, 'fill',
        {
            paint: {
                'fill-color': '#191970',
                'fill-opacity': 1,
            }, layout: {}, filter: []
        })
}
var isPlay = false
var counter = 0
var steps = 0
let aLength = 0;
const runTasks = async (index: any) => {
    if (index < task.value.length) {
        const task2: any = task.value[index];
        await task2();
        await runTasks(index + 1);
        // 每个任务之间间隔2秒
    }
}
const PlayOnClick = () => {
    ifPause.value = !ifPause.value
    runTasks(0);
}
const startHuangGang = [114.88005, 30.43472];
const midHuangPu = [113.42526, 23.08652];
const midNanChang = [115.94422, 28.54538];
const midJingGangShan = [114.28953, 26.74808]
const midHuangPi = [114.37509, 30.88131]
const midLuding = [102.232124, 29.911751]
const midYiChang = [111.43471, 30.5307]
const midPingXingGuan = [121.458259, 31.28067]
//const midMosike = [55.45,37.35]
const midShenYang = [123.46987, 41.80515]
const midChhangChun = [125.28845, 43.83327]
const midTianJin = [117.30983, 39.71755]
const midBeijing = [116.04512, 29.44821]
const midLushan = [116.04512, 29.44821]
const midBeijing2 = [116.23128, 40.22077]
const sumCoordinates = [startHuangGang, midHuangPu, midNanChang, midJingGangShan, midHuangPi, midLuding, midYiChang, midPingXingGuan, midShenYang, midChhangChun, midTianJin, midBeijing, midLushan, midBeijing2]
const routeGeoJson = {
    'type': 'FeatureCollection',
    'features': [{
        'type': 'Feature',
        'geometry': {
            'type': 'LineString',
            'coordinates': sumCoordinates
            //[
            // [116.391844, 39.898457],
            // [116.377947, 39.898595],
            // [116.368001, 39.898341],
            // [116.357144, 39.898063],
            // [116.351934, 39.899095],
            // [116.35067, 39.905871],
            // [116.3498, 39.922329],
            // [116.349671, 39.931017],
            // [116.349225, 39.939104],
            // [116.34991, 39.942233],
            // [116.366892, 39.947263],
            // [116.387537, 39.947568],
            // [116.401988, 39.947764],
            // [116.410824, 39.947929],
            // [116.42674, 39.947558],
            // [116.427338, 39.9397],
            // [116.427919, 39.932404],
            // [116.428377, 39.923109],
            // [116.429583, 39.907094],
            // [116.41404, 39.906858],
            // [116.405321, 39.906622],
            // [116.394954, 39.906324],
            // [116.391264, 39.906308],
            // [116.390748, 39.916611]
            //]
        }
    }]
}

const realRouteGeoJson = {
    'type': 'FeatureCollection',
    'features': [{
        'type': 'Feature',
        'geometry': {
            'type': 'LineString',
            'coordinates': []
        }
    }]
}

const animatePointGeoJson = {
    'type': 'FeatureCollection',
    'features': [{
        'type': 'Feature',
        'properties': {},
        'geometry': {
            'type': 'Point',
            'coordinates': []
        }
    }]
}


// 获取轨迹数据
function setRouteData() {
    (animatePointGeoJson.features[0].geometry.coordinates as number[]) = routeGeoJson.features[0].geometry.coordinates[0]
    aLength = routeGeoJson.features[0].geometry.coordinates.length;
    newRouteGeoJson = resetRoute(routeGeoJson.features[0], 7000, 'kilometers')
    steps = newRouteGeoJson.geometry.coordinates.length

    //addRoutelayer() // 添加轨迹线图层
    addRealRouteSource() // 添加实时轨迹线图层
    addArrowlayer() // 添加箭头图层
    addAnimatePointSource() // 添加动态点图层
}

// 添加轨迹线图层
function addRoutelayer() {
    map.addLayer({
        'id': 'routeLayer',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'lineMetrics': true,
            'data': routeGeoJson
        },
        'paint': {
            'line-width': 10,
            'line-opacity': 1,
            'line-color': '#009EFF',
        }
    });
}

// 添加实时轨迹线
function addRealRouteSource() {
    map.addLayer({
        'id': 'realRouteLayer',
        'type': 'line',
        'source': {
            'type': 'geojson',
            'lineMetrics': true,
            'data': realRouteGeoJson
        },
        'paint': {
            'line-width': 10,
            'line-opacity': 1,
            'line-color': '#FF9900',
        }
    });
}

// 添加箭头图层
function addArrowlayer() {
    map.addLayer({
        'id': 'arrowLayer',
        'type': 'symbol',
        'source': {
            'type': 'geojson',
            'data': routeGeoJson //轨迹geojson格式数据
        },
        'layout': {
            'symbol-placement': 'line',
            'symbol-spacing': 50, // 图标间隔，默认为250
            'icon-image': 'arrowIcon', //箭头图标
            'icon-size': 0.5
        }
    });
}

// 添加动态点图层
function addAnimatePointSource() {
    map.addLayer({
        'id': 'animatePointLayer',
        'type': 'symbol',
        'source': {
            'type': 'geojson',
            'data': animatePointGeoJson
        },
        'layout': {
            'icon-image': 'carIcon',
            'icon-size': 0.5,
            'icon-rotate': ['get', 'bearing'],
            'icon-rotation-alignment': 'map',
            'icon-allow-overlap': true,
            'icon-ignore-placement': true
        }
    });

    animate()
}

function animate() {
    if (counter > 995) {
        //console.log(realRouteGeoJson)
        const saveJSON = (data: any, filename: any) => {
            if (!data) {
                alert("保存的数据为空");
                return;
            }
            if (!filename) filename = "json.json";
            if (typeof data === "object") {
                data = JSON.stringify(data, undefined, 4);
            }
            var blob = new Blob([data], { type: "text/json" }),
                e = document.createEvent("MouseEvents"),
                a = document.createElement("a");
            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ["text/json", a.download, a.href].join(":");
            e.initMouseEvent(
                "click",
                true,
                false,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
            );
            a.dispatchEvent(e);
        }
        //saveJSON(realRouteGeoJson,'jsons.json')
    }
    if (counter >= steps) {
        return
    }
    var startPnt, endPnt
    if (counter == 0) {
        realRouteGeoJson.features[0].geometry.coordinates = []
        startPnt = newRouteGeoJson.geometry.coordinates[counter]
        endPnt = newRouteGeoJson.geometry.coordinates[counter + 1]
    } else if (counter !== 0) {
        startPnt = newRouteGeoJson.geometry.coordinates[counter - 1]
        endPnt = newRouteGeoJson.geometry.coordinates[counter]
    }

    // animatePointGeoJson.features[0].properties.bearing = turf.bearing(
    //     turf.point(startPnt),
    //     turf.point(endPnt)
    // ) - 90;
    animatePointGeoJson.features[0].geometry.coordinates = newRouteGeoJson.geometry.coordinates[counter];
    (realRouteGeoJson.features[0].geometry.coordinates as any[]).push(animatePointGeoJson.features[0].geometry.coordinates as any)

    map.getSource('animatePointLayer').setData(animatePointGeoJson);
    map.getSource('realRouteLayer').setData(realRouteGeoJson);
    if (isPlay) {
        requestAnimationFrame(animate);
    }
    counter = counter + 1;

    map.flyTo({
        center: (animatePointGeoJson.features[0].geometry.coordinates as any[]),
        zoom: 8,
        speed: 300,
    });
    //console.log(counter)
}

function resetRoute(route: any, nstep: any, units: any) {
    var newroute = {
        'type': 'Feature',
        'geometry': {
            'type': 'LineString',
            'coordinates': []
        }
    }
    var lineDistance = turf.lineDistance(route);
    var nDistance = lineDistance / nstep;
    for (let i = 0; i < aLength - 1; i++) {
        var from = turf.point(route.geometry.coordinates[i]);
        var to = turf.point(route.geometry.coordinates[i + 1]);
        let lDistance = turf.distance(from, to, {
            units: units
        });
        if (i == 0) {
            (newroute.geometry.coordinates as any[]).push(route.geometry.coordinates[0])
        }
        if (lDistance > nDistance) {
            let rings = lineMore(from, to, lDistance, nDistance, units)
            newroute.geometry.coordinates = newroute.geometry.coordinates.concat(rings)
        } else {
            (newroute.geometry.coordinates as any[]).push(route.geometry.coordinates[i + 1])
        }
    }
    return newroute
}

function lineMore(from: any, to: any, distance: number, splitLength: number, units: any) {
    var step = Number(distance / splitLength)
    var leftLength = distance - step * splitLength
    var rings = []
    var route = turf.lineString([from.geometry.coordinates, to.geometry.coordinates])
    for (let i = 1; i <= step; i++) {
        let nlength = i * splitLength
        let pnt = turf.along(route, nlength, {
            units: units
        });
        rings.push(pnt.geometry.coordinates)
    }
    if (leftLength > 0) {
        rings.push(to.geometry.coordinates)
    }
    return rings
}

async function sleep(delay: any) {
    await new Promise(resolve => setTimeout(resolve, delay));
    console.log(`等待了${delay}秒钟，继续执行`);
}


onMounted(async () => {
    initMap()
   

    
    
    // initJiaohuo()
})
</script>

<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
    overflow: hidden;

}
.lists{
    position: absolute;
    width:10vw;
    height:80vh;
    left:88vw;
    top:8vh;
    //background-color: #0040a1;
    z-index:2000;
.dis{
    animation-name: slide-out-fwd-right;
		animation-duration: 1s;
		animation-timing-function: linear;
		animation-delay: 0s;
		animation-iteration-count: 1;
		animation-direction: normal;
		animation-fill-mode: forwards;
}

        
        @keyframes slide-out-fwd-right {
			
            0% {
                transform:translateZ(0) translateX(0);
                opacity:1;
            }
            100% {
                transform:translateZ(20px) translateX(20px);
                opacity:0;
                
            }
        }
        .app{
            animation-name: slide-in-bck-right;
		animation-duration: 1s;
		animation-timing-function: linear;
		animation-delay: 0s;
		animation-iteration-count: 1;
		animation-direction: normal;
		animation-fill-mode: none;
        @keyframes slide-in-bck-right {
			
            0% {
                transform:translateZ(700px) translateX(400px);
                opacity:0;
            }
            100% {
                transform:translateZ(0) translateX(0);
                opacity:1;
                
            }
        }
        }
    .layer{
        width:100%;
        height:5vh;
        line-height: 5vh;
        text-align: center;
        color: white;


    }
}
.fly-container {
    z-index: 100;
    width: 100vw;
    height: 100vh;
    position: absolute;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100%;

    .fly {
        width: 20vw;
        height: 40vh;
        //margin:auto;
        z-index: 100;

        animation-name: slide-out-br;
        animation-duration: 2.5s;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: forwards;
    }

    @keyframes slide-out-br {

        0% {
            transform: translateY(0) translateX(0);
            opacity: 1;
        }

        100% {
            transform: translateY(1200px) translateX(2500px);
            opacity: 0;
        }
    }
}

.jiaohuo {
    position: absolute;
    display: flex;
    justify-content: center;
    left: 0vw;
    top: 0vh;
    align-items: center;

    width: 32vw;
    height: 50vh;
    z-index: 1000;
    animation-name: scale-up-tr;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-delay: 0s;
    animation-iteration-count: 1;
    animation-direction: normal;
    animation-fill-mode: none;

    @keyframes scale-up-tr {

        0% {
            transform: scale(.2);
            transform-origin: 100% 0%;
        }

        100% {
            transform: scale(1);
            transform-origin: 100% 0%;
        }
    }

    .BingliCon {
        width: 100%;
        height: 95%;
        display: flex;
        flex-direction: column;
        padding-top: 30px;
        align-items: center;
        justify-content: center;
        z-index: 1000;

    }

    .binglitext {
        margin-bottom: 20px;
        font-size: 20px;
        color: azure;
    }
}

.zuo_person {
    position: absolute;
    // left: 20vw;
    // top: 30vh;
    left: 0vw;
    top: 0vh;
    z-index: 1200;
    height: 42vh;
    width: 20vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
   
    .at-item {
        animation-name: roll-in-blurred-left;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: none;
    }

    @keyframes roll-in-blurred-left {

        0% {
            transform: translateX(-1000px) rotate(-720deg);
            filter: blur(50px);
            opacity: 0;
        }

        100% {
            transform: translateX(0) rotate(0deg);
            filter: blur(0);
            opacity: 1;
        }
    }

    .flex-row-center {
        display: flex;
        justify-content: center;
        align-items: center;
        color: yellow;
        font-family: 楷体;
        font-size: large;

    }

    .content-part-1 {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        //align-items: center;

    }
}

.you_person {
    position: absolute;
    left:0vw;
    //right: 20vw;
    top: 42.5vh;
    z-index: 1200;
    height: 43vh;
    width: 20vw;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    .at-item {
        animation-name: roll-in-blurred-right;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: none;

    }


    @keyframes roll-in-blurred-right {

        0% {
            transform: translateX(1000px) rotate(720deg);
            filter: blur(50px);
            opacity: 0;
        }

        100% {
            transform: translateX(0) rotate(0deg);
            filter: blur(0);
            opacity: 1;
        }
    }

    .at-item2 {
        animation-name: roll-out-blurred-bottom;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: forwards;
    }

    @keyframes roll-out-blurred-bottom {

        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }

        100% {
            transform: translateY(800px) rotate(720deg);
            filter: blur(50px);
            opacity: 0;
        }
    }

    .flex-row-center {
        display: flex;
        justify-content: center;
        align-items: center;
        color: yellow;
        font-family: 楷体;
        font-size: large;

    }

    .content-part-2 {

        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        //align-items: center;


    }
}

div.play-button {
    position: absolute;
    top: 1vh;
    right: 2vw;
    display: flex;
    z-index: 999;
    justify-content: center;
    align-items: center;
    height: 6vh;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 5vh;
        width: 6vh;
        border-radius: 5px;
        border: none;
        background: rgb(34, 66, 126);
        transition: transform 0.1s ease-in-out;
        position: relative;
        overflow: hidden;

        &:hover {
            transform: scale(1.1);
        }

        &:before,
        &:after {
            transition: transform 0.25s ease-in-out;
        }

        &:before {
            position: relative;
            content: "";
            display: block;
            border-left: 15px solid lighten(#7bd2f6, 10);
            border-top: 12px solid transparent;
            border-bottom: 12px solid transparent;
            opacity: 1;
            z-index: 0;
        }

        &:after {
            content: "";
            display: block;
            position: absolute;
            height: 1.6vh;
            width: 1.6vh;
            box-shadow: inset 8px 0 0 #004969, inset -8px 0 0 #004969;
            transform: scale(0);
            z-index: 2;
        }

        .progress1 {
            position: absolute;
            z-index: 999;
            width: 100%;
            height: 5vh;
            bottom: 0px;
            left: 0;

            &:before {
                content: "";
                display: block;
                height: 100%;
                width: 100%;
                opacity: 0.35;
                background: #0040a1;
                transform: scaleX(0);
                transform-origin: left;
            }
        }

        &.pause {
            &:before {
                transform: scale(20);
                pointer-events: none;
            }

            &:after {
                transform: scale(1);
            }

            .progress {
                transform: translateY(0px);

                &:before {
                    transition: transform 10s linear;
                    transform: scaleX(1);
                }
            }
        }
    }
}

.vedio {
    position: fixed;
    top: 43vh;
    left:1vw;
    z-index: 999;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: left;
    //margin-top:2vh
}

.explain {
    position: absolute;
    // top: 5vh;
    // left: 10vw;


    .at-item {
        animation-name: scale-up-center;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: none;
    }

    @keyframes scale-up-center {

        0% {
            transform: scale(.2);
        }

        100% {
            transform: scale(1);
        }
    }
}

.explain2 {
    position: absolute;
    top: 42vh;
    // left: 3vw;

    .at-item {
        animation-name: shutter-in-left;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: none;
    }

    @keyframes shutter-in-left {

        0% {
            transform: rotateY(100deg);
            transform-origin: left;
            opacity: 0;
        }

        100% {
            transform: rotateY(0);
            transform-origin: left;
            opacity: 1;
        }
    }
}
.explain4{
    position: absolute;
}
.explain3 {

    //position: absolute;
    // top: 25vh;
    //left: 36vw;
    // width:80vw;
    // height:80vh;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;

    .at-item {

        // animation-name: slide-in-elliptic-bottom-bck;
        // animation-duration: 1s;
        // animation-timing-function: linear;
        // animation-delay: 0s;
        // animation-iteration-count: 1;
        // animation-direction: normal;
        // animation-fill-mode: none;
        animation-name: bounce-in-zoomin;
        animation-duration: 2.2s;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: none;
    }

    .at-item2 {
        animation-name: fade-out;
        animation-duration: 2s;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: forwards;
    }

    @keyframes bounce-in-zoomin {

        0% {
            transform: scale(7);
            animation-timing-function: ease-in;
            opacity: 0;
        }

        35% {
            transform: scale(1);
            animation-timing-function: ease-out;
            opacity: 1;
        }

        55% {
            transform: scale(1.5);
            animation-timing-function: ease-in;
        }

        70% {
            transform: scale(1);
            animation-timing-function: ease-out;
        }

        80% {
            transform: scale(1.24);
            animation-timing-function: ease-in;
        }

        90% {
            transform: scale(1);
            animation-timing-function: ease-out;
        }

        95% {
            transform: scale(1.04);
            animation-timing-function: ease-in;
        }

        100% {
            transform: scale(1);
            animation-timing-function: ease-out;
        }
    }

    @keyframes fade-out {

        0% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }

    @keyframes slide-in-elliptic-bottom-bck {

        0% {
            transform: translateY(600px) rotateX(-30deg) scale(6.5);
            transform-origin: 50% -100%;
            opacity: 0;
        }

        100% {
            transform: translateY(0) rotateX(0) scale(1);
            transform-origin: 50% 500px;
            opacity: 1;
        }
    }
}


.textsss {
    font-size: 3em;
    color: white;
    margin-top: 0.5vh;
    text-align: center;
    //align-items: center;
    font-family: sans-serif;
    white-space: nowrap;
    overflow: hidden;
    border-right: .15em solid black;
    animation: typing 3s steps(30, end);
    z-index: 40;


}

.text-wrapper {
    position: absolute;
    display: inline-block;
    background-color: black;
    top: 85vh;
    //margin:auto;
    width: 100%;
    //left: 1vw;
    //border: 3px solid black;
    padding-top: 1vh;

    //width:v-bind(textLen);
    height: 7vh;
    z-index: 999;

    // width:500px;
    // height: auto;
}

.progress-line {
    position: absolute;
    top: 93vh;
    //background-color: rgba(220,220, 220 ,0.8);
    //background: linear-gradient(to right, gray 0%, gray 0%, blue 100%, blue 100%);
    //animation: progress 5s linear forwards;
    width: 100vw;
    height: 7vh;
    z-index: 999;
    background-color: rgba(205, 133, 63, 0.6);

    overflow: hidden;

    .progress-bar {
        display: inline-block;
        height: 100%;
        background-color: rgba(58, 95, 205, 0.8);
        width: 100%;
        animation: progress 60s linear forwards;

        div {
            display: inline-block;

        }
    }
}

@keyframes progress {
    0% {
        width: 0%;
    }

    100% {
        width: 100%;
    }
}


.progress-line2 {
    position: absolute;
    top: 93vh;
    //background-color: rgba(220,220, 220 ,0.8);
    //background: linear-gradient(to right, gray 0%, gray 0%, blue 100%, blue 100%);
    //animation: progress 5s linear forwards;
    width: 100vw;
    height: 7vh;
    z-index: 2000;
    //background-color: #f2f2f2;
    overflow: hidden;
    text-align: center;

    .progress-bar2 {
        display: inline-block;
        height: 100%;
        width: 100%;
        z-index: 3000;
        text-align: baseline;
        // align-items: center;


        div {
            //margin-top: 1vh;;
            margin: auto;
            line-height: 7vh;




            // text-align: center;
            // align-items: center;
            // line-height: -2vh;
            height: 7vh;
            font-size: 2.5em;
            box-sizing: border-box;
            display: inline-block;
            color: white;
            border-right: 10px solid #ccc;
        }
    }
}



//     @keyframes progress {
//   0% {
//     background-position: 0 0;
//   }
//   100% {
//     background-position: 100% 0;
//   }
// }


@keyframes typing {
    from {
        width: 0
    }

    to {
        width: 100%
    }
}

//     .at-item{
//         animation-name: scale-up-center;
// 		animation-duration: 1s;
// 		animation-timing-function: linear;
// 		animation-delay: 0s;
// 		animation-iteration-count: 1;
// 		animation-direction: normal;
// 		animation-fill-mode: none;
//     }
// }
// @keyframes scale-up-center {

//             0% {
//                 transform:scale(.2);
//             }
//             100% {
//                 transform:scale(1);
//             }
//         }
.menuBar {
    position: relative;
    top: 10px;
    margin: 0 50px;
    padding: 5px;
    border-radius: 3px;
    z-index: 999;
    background-color: rgba(0, 168, 0, 0.7);
}

.text {
    position: absolute;
    top: 10vh;
    background-color: antiquewhite;
    z-index: 999;
    left: 70vmax;
    width: 12vmax;
    height: 12vh;

}

input[type=button] {
    font-size: 16px;
}

#map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
}

/* 删除mapbox logo */
.mapboxgl-ctrl {
    display: none !important;
}

div.play-button {
    position: absolute;
    right: 2vw;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 6vh;

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 5vh;
        width: 6vh;
        border-radius: 5px;
        border: none;
        background: rgb(34, 66, 126);
        cursor: pointer;
        transition: transform 0.1s ease-in-out;
        position: relative;
        overflow: hidden;

        &:hover {
            transform: scale(1.1);
        }

        &:before,
        &:after {
            transition: transform 0.25s ease-in-out;
        }

        &:before {
            position: relative;
            content: "";
            display: block;
            border-left: 15px solid lighten(#7bd2f6, 10);
            border-top: 12px solid transparent;
            border-bottom: 12px solid transparent;
            opacity: 1;
            z-index: 0;
        }

        &:after {
            content: "";
            display: block;
            position: absolute;
            height: 1.6vh;
            width: 1.6vh;
            box-shadow: inset 8px 0 0 #004969, inset -8px 0 0 #004969;
            transform: scale(0);
            z-index: 2;
        }

        .progress {
            position: absolute;
            z-index: 1;
            width: 100%;
            height: 5vh;
            bottom: 0px;
            left: 0;

            &:before {
                content: "";
                display: block;
                height: 100%;
                width: 100%;
                opacity: 0.35;
                background: #0040a1;
                transform: scaleX(0);
                transform-origin: left;
            }
        }

        &.pause {
            &:before {
                transform: scale(20);
                pointer-events: none;
            }

            &:after {
                transform: scale(1);
            }

            .progress {
                transform: translateY(0px);

                &:before {
                    transition: transform 10s linear;
                    transform: scaleX(1);
                }
            }
        }
    }
}</style>