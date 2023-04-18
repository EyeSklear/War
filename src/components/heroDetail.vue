<template>
  <div class="mapBut">
    
    <el-button type="primary" :icon="VideoPlay" circle size="large" @click="startClick()" />
    <el-button type="primary" :icon="VideoPause" circle size="large" @click="pauseClick()"/>
    <el-button type="primary" :icon="RefreshLeft" circle size="large" @click="stopClick()"/>
  </div>
  <div class="Guandes">
    <dv-border-box8 :dur="5" style="align-self:center;text-align: center;vertical-align: middle;">
      <div dv-bg >
        <h1 style="font-family:楷体;;margin-top: 1vh;" class="colorGuan">{{Guan}}</h1>
      </div>
    </dv-border-box8>
  </div>
  <div class="toWar">
    <dv-border-box12 :dur="5" style="align-self:center;text-align: center;vertical-align: middle;">
      <div dv-bg @click="router.push('/pingxingguanwar')" >
        <h2 style="font-family:楷体;;margin-top: 1.5vh; " >战役介绍</h2>
      </div>
    </dv-border-box12>
  </div>
  <div class="rainForecast-back">
    <!--    标题-->
    <div class="flex-row-center" style="height: 75px;overflow: hidden;">
      <!--      <h2 style="color:#fafafa"></h2>-->
      <dv-decoration-3 style="width: 250px; height: 40px" />
      <dv-decoration-11 style="width: 400px; height: 75px; color: #fafafa">
        <h1>作战人物介绍---{{ heroName }}

        </h1>
      </dv-decoration-11>
      <dv-decoration-3 style="width: 250px; height: 40px" />
    </div>

    <!--    内容-->
    <div class="content-container flex-row-evenly">
      <div class="content-col-1 flex-Column-Around-Center">
        <!--降雨排行图-->

        <dv-border-box-9 :color="['#00a1ff']" style="width: 100%; height: 60%; position: relative;">
          <div style="color:#fafafa;text-align: center;margin-top: 2vh;">
            <h2>{{ timeTitle }}</h2>
          </div>
          <el-scrollbar>
            <div
              style=";color:#fafafa;width:90%;height:100%;margin-bottom:5vh;margin-left: 1.5vmax;margin-right: 1vmax;line-height:40px;font-family: 楷体;font-size: large;">
              {{ timeIntro }}
            </div>
          </el-scrollbar>

          <!-- <div style="color:#fafafa;margin-left: 1.5vmax;margin-top: 2vh;">
      <echartsTest></echartsTest>
      </div> -->
        </dv-border-box-9>


        <div class="part45 border-box">
          <!--          <div class="flex-row-center">-->
          <!--            <h2 style=" color: #fafafa;position: absolute; margin-top: 70px; z-index: 50">长三角气候</h2>-->
          <!--          </div>-->
          <!--          <div class="content-part-1">-->
          <!--            <img class="img" src="/case/rainForecast/长三角气候.gif" style="height: 90%;width: 90%">-->
          <!--          </div>-->
          <div id="lineChart" style="width: 100%; height: 95%;color: #fafafa;margin-top: 1vh;">
            <!-- <echartsPie></echartsPie> -->
            <iframe src="http://127.0.0.1:5500/public/%E6%9E%97%E5%BD%AA%E3%80%81%E7%B2%9F%E8%A3%95%E4%B8%BA%E4%B8%AD%E5%BF%83%E5%85%B3%E7%B3%BB%E5%8F%AF%E8%A7%86%E5%8C%96_files/index.htm" scrolling="auto" frameborder="no"
              style="width: 100%; height: 100%" />
          </div>
        </div>
      </div>

      <div class="content-col-2 flex-Column-Around-Center">
        <dv-border-box-11 :color="['#00a1ff']" title="人物行进轨迹" style="width: 100%; height: 100%; position: relative">
          <div class="content-part-map">
            <div ref="container" id="map" style="margin-bottom: 15px"></div>
            <div class="dateForestShow" style="z-index: 5">
              <!-- <h1>{{ dateForest }}</h1> -->
            </div>
            <!-- <div class="dateDescShow" style="z-index: 5">
              <h2>红色站点显示降雨大于1mm</h2>
            </div> -->
            <!-- 
            <div class="rainfallforcast-color" style="z-index: 5">
              <div class="color-bar">
                <div class="color">
                  <div
                    class="color-item"
                    style="background-color: #fafafa"
                  ></div>
                  <div
                    class="color-item"
                    style="background-color: #9cf790"
                  ></div>
                  <div
                    class="color-item"
                    style="background-color: #37a600"
                  ></div>
                  <div
                    class="color-item"
                    style="background-color: #67b4f8"
                  ></div>
                  <div
                    class="color-item"
                    style="background-color: #0002fe"
                  ></div>
                  <div
                    class="color-item"
                    style="background-color: #fa03f0"
                  ></div>
                  <div
                    class="color-item"
                    style="background-color: #710100"
                  ></div>
                </div>
                <div class="label">
                  <div class="color-item" style="text-align: right">0</div>
                  <div class="color-item" style="text-align: right">5</div>
                  <div class="color-item" style="text-align: right">10</div>
                  <div class="color-item" style="text-align: right">15</div>
                  <div class="color-item" style="text-align: right">20</div>
                  <div class="color-item" style="text-align: right">25</div>
                  <div class="color-item" style="text-align: right"></div>
                </div>
              </div>
            </div> -->
          </div>
        </dv-border-box-11>

        <dv-border-box-1 :color="['#00a1ff']" style="width: 100%; height: 75%; position: relative">
          <!-- <div class="content-part-2">
            <div
              id="historyRiverLevelChart"
              style="width: 45%; height: 90%; z-index: 50"
            ></div>

            <div id="pieChart" style="width: 45%; height: 90%"></div>
          </div> -->
          <div style="color:#fafafa;margin-left: 1.5vmax;margin-top: 2vh;">
            <echartsTest :index="index" @click-point="changeIntro"></echartsTest>
          </div>
        </dv-border-box-1>
      </div>

      <div class="content-col-3 flex-Column-Around-Center">
        <dv-border-box-9 :color="['#00a1ff']" style="width: 100%; height: 60%; position: relative">
          <div class="flex-row-center">

          </div>
          <div class="content-part-1">
            <img class="img" src="@/assets/Lin_Biao.jpg" style="height: 95%; width: 80%;margin-top:1vh" />
          </div>
        </dv-border-box-9>

        <div class="part35 border-box">
          <!--          <div id="historyRiverLevelChart" style="  width: 100%;  height: 100%;z-index: 50"></div>-->
          <el-scrollbar>
            <div style="width: 100%; height: 100%  ;;right:-100px">
              <div class="flex-row-center">
                <h2 style="
                      color: #ffffff;
                      position: absolute;
                      margin-top: 40px;
                      z-index: 50;
                      color: red;
                    ">
                  {{ introduction }}
                </h2>
              </div>
              <div>
                <div
                  style="color:#fafafa;margin-top: 5vh;width:90%;height:100%;margin-left: 1vmax;margin-right: 1vmax;line-height:40px;font-family: 楷体;font-size: large;">
                  {{ peopleIntro }}
                </div>
              </div>
              <!-- <div class="content-part-1">
              <img
                class="img"
                src="/case/rainForecast/长三角气候.gif"
                style="height: 100%; width: 80%"
              />
            </div> -->
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, onMounted, ref, reactive, watch } from "vue";
import mapboxgl from "mapbox-gl";
import mapBoxGl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import echartsTest from './echartsTest.vue';
import { BorderBox8 as DvBorderBox8,BorderBox12 as DvBorderBox12 } from '@kjgl77/datav-vue3'
import echartsPie from './echartsPie.vue';
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import staticData from '../../static/data'
import * as turf from "@turf/turf";
import {
  Check,
  Delete,
  Edit,
  Message,
  RefreshLeft,
  VideoPlay,
  VideoPause,
  Search,
  Star,
} from '@element-plus/icons-vue'
const textValue=ref('gag')
const index=ref(0)
const Guan = ref('学生运动领袖')
const realColor=ref('yellowgreen')
let newRouteGeoJson:any
const svgXML =
            `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"> 
                <path d="M529.6128 512L239.9232 222.4128 384.7168 77.5168 819.2 512 384.7168 946.4832 239.9232 801.5872z" p-id="9085" fill="#ffffff"></path> 
            </svg>
            `
const svgBase64 = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgXML)));
const router = useRouter()
const heroName = ref('林彪')
const LayerList = ref([])
let map: mapBoxGl.Map;
const container = ref<HTMLElement>();
const zoom = ref(3.6)
//记录事迹的value
const IntroValue = ref(10)
const timeTitle = ref('接受革命思想')
//生平事迹
const timeIntro = ref('1922年3月，在林育南的动员和帮助下，小学未毕业的林育蓉以优异的成绩考入董必武等创办的武昌共进中学，其入学考试作文《论男女同校》受到阅卷老师钱介盘的赞赏。林育蓉经常接触陈潭秋、董必武、恽代英、林育南、林育英等从事革命活动的共产党人，听他们谈论国家大事。当时林明卿办的布厂陷入困境，在无钱供林育蓉上学的情况下去信叫林育蓉回家种田。1923年1月，林育蓉选择休学半年赚够钱再读书，在林育南的帮助下在小学当代课教师。1924年，他成为共进中学学生运动的领袖、中国社会主义青年团团员，被中共共青团武昌地委指定为共进中学团支部书记。1925年秋，五卅运动中林育蓉带头参加游行示威。经林育南介绍，他成为中国共产党党员。夏，当选湖北省学生代表，出席在上海举行的全国学联第七次代表大会。当时林家大塆和回龙山一带中学毕业的人很少，林明卿来信要已经毕业的育蓉回乡办私塾当教师，以便关照家庭生活，他没有回信。')
const introduction = ref('人物介绍')
const center = ref<[number, number]>([121.47172796957051, 31.216739727706383]);
const peopleIntro = ref('八路军115师：师长 林彪1907年生于湖北黄冈。1923年6月加入中国社会主义青年团。1925年考入黄埔军校第四期，同年转入中国共产党。1926年10月毕业后国民革命军叶挺独立团任排长，参加了北伐战争。1927年8月参加南昌起义。起义军在广东潮汕地区失败后，随朱德、陈毅转战闽粤赣湘边界。1928年1月参加湘南起义。同年4月随部队上井冈山，先后任红军第四军二十八团营长、团长，参加了巩固和发展井冈山革命根据地的斗争。1929年1月随军挺进赣南、闽西，3月任红四4军第一纵队司令员。1930年6月任红四军军长。1932年3月任红一军团总指挥(后称军团长)，率部参加了长沙、赣州、漳州、南雄水口、乐安宜黄等重要战役和中央苏区历次反"围剿"，多次指挥所部担任主攻任务。1934年10月率红一军团开始长征，参加突破国民党军四道封锁线和强渡乌江等作战。1935年1月参加了遵义会议，会后指挥所部参加四渡赤水、巧渡金沙江、强渡大渡河、夺占泸定桥等作战。同年9月任陕甘支队副司令员兼第一纵队司令员，到达陕北后率部参加了直罗镇战役和东征战役。1936年6月任中国人民抗日红军大学（后改称抗日军政大学）校长，后兼政治委员。抗战爆发后任八路军第115师师长，率部挺进华北前线，同聂荣臻指挥了平型关战斗。1938年冬赴苏联就医。1942年2月回国。抗战胜利后，先后任东北人民自治军总司令、东北野战军司令员等职，与罗荣桓等指挥了四平、新开岭、三下江南四保临江和辽沈战役等重要战役，解放全东北。1948年底率部入关，与罗荣桓、聂荣臻一起指挥平津战役。1949年3月起任第四野战军司令员等职，先后指挥了湘赣、衡宝、广东、广西等战役。 新中国成立后,先后任中南军政委员会主席、中南军区兼第四野战军司令员、国防委员会副主席、国防部部长、中央军委副主席等职。1955年被授予元帅军衔。"文革"中与陈伯达、黄永胜、吴法宪、叶群、李作鹏、邱会作等结成反革命集团，同江青反革命集团互相勾结，有预谋地诬陷迫害党和国家领导人，阴谋夺取党和国家的最高权力。1971年9月8日，下达反革命武装政变手令，妄图谋害毛泽东。阴谋败露后，于9月13日乘飞机外逃，在蒙古人民共和国温都尔汗地区机毁身亡。1973年8月20日，中共中央决定开除其党籍。1981年1月25日被中华人民共和国最高人民法院特别法庭确认为反革命集团案主犯')
const styles = ref<any>("mapbox://styles/johnnyt/cl9mkdnso000q15rlcoxiaab0");
  var isPlay = false
        var counter = 0
        var steps = 0
        let aLength = 0;
  const startClick=()=> {
            if (!isPlay) {
                isPlay = true
                animate()
            }
        }
const pauseClick=()=> {
            isPlay = false
            animate()
        }

const stopClick=()=> {
            isPlay = false
            counter = 0
            animate()
        }
const changeIntro = (val: any) => {
  //console.log("haha", val)
  IntroValue.value = val as number
  (staticData.LbIntro as any[]).forEach((item: any) => {
    //console.log(item)
    if (item.value == IntroValue.value) {
      timeIntro.value = item.intro
      timeTitle.value = item.title
    }
  });
}
const removeLayer = (id: string) => {
  if (map.getLayer(id) != undefined) {
    map.removeLayer(id);
    map.removeSource(id);
  }
};
const geojsonss = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { id: 0, size: 10, color: "red" },
      geometry: {
        type: "Point",
        coordinates: [114.88005, 30.43472],
      },
    },
    {
      type: "Feature",
      properties: { id: 1, size: 10, color: "red" },
      geometry: {
        type: "Point",
        coordinates: [113.42526, 23.08652],
      },
    },
    {
      type: "Feature",
      properties: { id: 2, size: 10, color: "red" },
      geometry: {
        type: "Point",
        coordinates: [115.94422, 28.54538],
      },
    },
    {
      type: "Feature",
      properties: { id: 3, size: 10, color: "red" },
      geometry: {
        type: "Point",
        coordinates: [114.37509, 30.88131],
      },
    },
    {
      type: "Feature",
      properties: { id: 4, size: 10, color: "red" },
      geometry: {
        type: "Point",
        coordinates: [102.232124, 29.911751],
      },
    },
    {
      type: "Feature",
      properties: { id: 5, size: 10, color: "red" },
      geometry: {
        type: "Point",
        coordinates: [114.2342,39.44243],
      },
    },
    {
      type: "Feature",
      properties: { id: 6, size: 10, color: "red" },
      geometry: {
        type: "Point",
        coordinates: [123.46987, 41.80515],
      },
    },
    {
      type: "Feature",
      properties: { id: 7, size: 10, color: "red" },
      geometry: {
        type: "Point",
        coordinates: [125.28845, 43.83327],
      },
    },
    {
      type: "Feature",
      properties: { id: 8, size: 10, color: "red" },
      geometry: {
        type: "Point",
        coordinates: [117.30983, 39.71755],
      },
    },
    {
      type: "Feature",
      properties: { id: 9, size: 10, color: "red" },
      geometry: {
        type: "Point",
        coordinates: [116.04512, 29.44821],
      },
    },
    {
      type: "Feature",
      properties: { id: 10, size: 10, color: "red" },
      geometry: {
        type: "Point",
        coordinates: [116.04512, 29.44821],
      },
    },
    {
      type: "Feature",
      properties: { id: 11, size: 10, color: "red" },
      geometry: {
        type: "Point",
        coordinates: [116.23128, 40.22077],
      },
    },
  ],
};

// const noReloaded= function () {
//   if (location.href.indexOf("#reloaded") == -1) {
//     location.href = location.href + "#reloaded";
//     window.location.reload();
//   }
// }
const initMap = () => {
  // mapboxgl.accessToken =
  //   "pk.eyJ1IjoiMTY2NTE2OTkzNzYiLCJhIjoiY2ttMDh5amJpMHE2dzJ3cTd5eWZsMGQxZyJ9.XErH3kSOuRC_OWXWCpDLkQ";
  // map = new mapBoxGl.Map({
  //   container: container.value as HTMLElement,
  //   style: styles.value,
  //   center: center.value,
  //   zoom: 0.5,
  mapboxgl.accessToken =
    "pk.eyJ1IjoiMTY2NTE2OTkzNzYiLCJhIjoiY2ttMDh5amJpMHE2dzJ3cTd5eWZsMGQxZyJ9.XErH3kSOuRC_OWXWCpDLkQ";
         map = new mapboxgl.Map({
            container: container.value as HTMLElement, // container id
            style: 'mapbox://styles/mapbox/dark-v9', // style URL
            center: [114.88005,30.43472], // starting position [lng, lat]
            zoom: 8 // starting zoom
        });
    //     map.on('style.load', () => {
    //     map.addSource('mapbox-dem', {
    //         'type': 'raster-dem',
    //         'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
    //         'tileSize': 512,
    //         'maxzoom': 14
    //     });
    //     // add the DEM source as a terrain layer with exaggerated height
    //     map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 3 });
    // });

        //map.setStyle('mapbox://styles/mapbox/dark-v9');
        map.on('load', function() {
            let arrowIcon = new Image(20, 20)
            arrowIcon.src = svgBase64
            // http://localhost:8060/getImage?name=newhopng
            arrowIcon.onload = function() {
                map.addImage('arrowIcon', arrowIcon)
                map.loadImage('../../newhopng.png', function(error, carIcon) {
                    if (carIcon) {
                        map.addImage('carIcon', carIcon);
                        ////console.log("haha")
                        setRouteData()
                    }
                })
            }
            map.addSource("bridgeIntro", {
      type: "geojson",
      data: geojsonss
    });
    map.addLayer({
      id: "bridgeIntro",
      type: "circle",
      paint: {
        'circle-color': 'red',
        'circle-radius': 16

      },
      source: "bridgeIntro",
    });
    setInterval(() => {
      map.setPaintProperty('bridgeIntro', 'circle-blur', 0.6 + tick / 20);
      tick = (tick + 1.0) % 10;
    }, 100);
        })
      }
        const startHuangGang = [114.88005,30.43472];
      const midHuangPu = [113.42526,23.08652];
      const midNanChang = [115.94422,28.54538];
      const midJingGangShan = [114.28953,26.74808]
      const midHuangPi =[114.37509,30.88131]
      const midLuding = [102.232124,29.911751]
      const midPingXingGuan =[114.2342,39.44243]
      const midShenYang =[123.46987,41.80515]
      const midChhangChun = [125.28845,43.83327]
      const midTianJin = [117.30983,39.71755]
      const midBeijing = [116.04512,29.44821]
      const midLushan = [116.04512,29.44821]
      const midBeijing2 = [116.23128,40.22077]
      const sumCoordinates=[startHuangGang, midHuangPu, midNanChang,midJingGangShan,midHuangPi,midLuding,midPingXingGuan,midShenYang,midChhangChun,midTianJin,midBeijing,midLushan,midBeijing2]
        const routeGeoJson = {
            'type': 'FeatureCollection',
            'features': [{
                'type': 'Feature',
                'geometry': {
                    'type': 'LineString',
                    'coordinates': sumCoordinates
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
        function setRouteData() {
            (animatePointGeoJson.features[0].geometry.coordinates as number[])= routeGeoJson.features[0].geometry.coordinates[0]
            aLength = routeGeoJson.features[0].geometry.coordinates.length;
             newRouteGeoJson = resetRoute(routeGeoJson.features[0], 7000, 'kilometers')
            steps = newRouteGeoJson.geometry.coordinates.length

           // addRoutelayer() // 添加轨迹线图层
            addRealRouteSource() // 添加实时轨迹线图层
            addArrowlayer() // 添加箭头图层
            addAnimatePointSource() // 添加动态点图层
        }
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

        const animate=()=> {
          if(counter<200 &&  counter>0 ){
            timeTitle.value=staticData.LbIntro[0].title
            timeIntro.value=staticData.LbIntro[0].intro
            index.value=10
            Guan.value='学生运动领袖'

          }
          else if (counter>200  && counter<648 ){
            timeTitle.value=staticData.LbIntro[1].title
            timeIntro.value=staticData.LbIntro[1].intro
            index.value=14
            Guan.value='73团3营7连连长'
            realColor.value='DarkSalmon'
          }
          else if (counter>648  && counter<1136 ){
            timeTitle.value=staticData.LbIntro[2].title
            timeIntro.value=staticData.LbIntro[2].intro
            index.value=22
            Guan.value='工农革命军1营营长'
            realColor.value='DarkSalmon'
          }
          else if (counter>1136  && counter<1346 ){
            timeTitle.value=staticData.LbIntro[3].title
            timeIntro.value=staticData.LbIntro[3].intro
            index.value=30
            Guan.value='红四军总前委委员'
            realColor.value='LightSalmon'
          }
          else if (counter>1346  && counter<1689 ){
            timeTitle.value=staticData.LbIntro[4].title
            timeIntro.value=staticData.LbIntro[4].intro
            index.value=42
            Guan.value='红四军军长'
            realColor.value='LightSalmon'
          }
          else if (counter>1689  && counter<2584 ){
            timeTitle.value=staticData.LbIntro[5].title
            timeIntro.value=staticData.LbIntro[5].intro
            index.value=45
            Guan.value='红一方面军军长'
            realColor.value='LightSalmon'
          }
          else if (counter>2584  && counter<3755 ){
            timeTitle.value=staticData.LbIntro[6].title
            timeIntro.value=staticData.LbIntro[6].intro
            index.value=55
            Guan.value='八路军第115师师长'
            realColor.value='Salmon'
          }
          else if (counter>3755  && counter<4381 ){
            timeTitle.value=staticData.LbIntro[9].title
            timeIntro.value=staticData.LbIntro[9].intro
            index.value=65
            Guan.value='东北人民自治军总司令'
            realColor.value='Tomato'
          }
          else if (counter>4381  && counter<4584 ){
            timeTitle.value=staticData.LbIntro[11].title
            timeIntro.value=staticData.LbIntro[11].intro
            index.value=75
            Guan.value='东北人民解放军司令兼政委'
            realColor.value='Tomato'
          }
          else if (counter>4584  && counter<5203 ){
            timeTitle.value=staticData.LbIntro[12].title
            timeIntro.value=staticData.LbIntro[12].intro
            index.value=80
            Guan.value='中国人民解放军第四野战军司令'
            realColor.value='OrangeRed'
          }
          else if (counter>5203  && counter<6082 ){
            timeTitle.value=staticData.LbIntro[13].title
            timeIntro.value=staticData.LbIntro[13].intro
            index.value=88
            Guan.value='中共中央政治局常委'
            realColor.value='Red '
          }
          else if (counter>6082  && counter<7000 ){
            timeTitle.value=staticData.LbIntro[15].title
            timeIntro.value=staticData.LbIntro[15].intro
            index.value=92
            Guan.value='中共中央军委第一副主席'
            realColor.value='Red '
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
            (realRouteGeoJson.features[0].geometry.coordinates as any[]).push(animatePointGeoJson.features[0].geometry.coordinates  as any)

            map.getSource('animatePointLayer').setData(animatePointGeoJson);
            map.getSource('realRouteLayer').setData(realRouteGeoJson);
            if (isPlay) {
                requestAnimationFrame(animate);
            }
            counter = counter + 1;
            
        //     map.flyTo({
        //     center: (animatePointGeoJson.features[0].geometry.coordinates as any[]),
        //     zoom: 8,
        //     speed:300,
        // });
        //     //console.log(counter)
        }

        function resetRoute(route:any, nstep:any, units:any) {
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
                    units:units
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

        function lineMore(from:any, to:any, distance:number, splitLength:number, units:any) {
            var step = Number(distance / splitLength)
            var leftLength = distance - step * splitLength
            var rings = []
            var route = turf.lineString([from.geometry.coordinates, to.geometry.coordinates])
            for (let i = 1; i <= step; i++) {
                let nlength = i * splitLength
                let pnt = turf.along(route, nlength, {
                    units:units
                });
                rings.push(pnt.geometry.coordinates)
            }
            if (leftLength > 0) {
                rings.push(to.geometry.coordinates)
            }
            return rings
        }


  // map.on("load", () => {


  //   // add the line which will be modified in the animation

  //   map.addSource("bridgeIntro", {
  //     type: "geojson",
  //     data: geojsonss
  //   });
  //   map.addLayer({
  //     id: "bridgeIntro",
  //     type: "circle",
  //     paint: {
  //       'circle-color': 'yellow',
  //       'circle-radius': 16

  //     },
  //     source: "bridgeIntro",
  //   });
  //   setInterval(() => {
  //     map.setPaintProperty('bridgeIntro', 'circle-blur', 0.6 + tick / 20);
  //     tick = (tick + 1.0) % 10;
  //   }, 100);



  // });

// const routeLine = {
//   type: "Feature",
//   geometry: {
//     type: "LineString",
//     coordinates: [startHuangGang, midHuangPu, midNanChang,midJingGangShan,midHuangPi,midLuding,midPingXingGuan,midShenYang,
//     midChhangChun,midTianJin,midBeijing,midLushan,midBeijing2],
//   },
// };
// const routeDist = turf.lineDistance(routeLine, "meters");
// const steps = 7000;
// let points:any[] = [];
// for (let i = 0; i <= steps; i++) {
//   const dist = (i / steps) * routeDist;
//   const point = turf.along(routeLine, dist, "meters");
//   points.push(point.geometry.coordinates);
// }
//       map.addSource("route", {
//         type: "geojson",
//         data: routeLine,
//       });
//       map.addLayer({
//         id: "route",
//         source: "route",
//         type: "line",
//         'layout': {
// //线连接处的样式
//             'line-join': 'round',
// //线结束处的样式
//             'line-cap': 'round'
// }, 
//         paint: {
//           "line-width": 5,
//           "line-color": "yellow",
//           //"line-dasharray"
//           //"line-dasharray": [3, 4]
//         },
//       });
//map.removeLayer("route")
// const el = document.createElement("div")
//         el.className = "markers";
//         el.style.backgroundImage =
//             "url(http://localhost:8060/getImage?name=horse)";
//         el.style.width = "80px";
//         el.style.height = "80px";
//         el.style.backgroundSize = "100%";
// const marker = new mapboxgl.Marker(el).setLngLat(startHuangGang as any).addTo(map);
// //console.log(map.getStyle().layers)
// //console.log(points)
// let step = 0;
// const animationShow = () => {
//   step += 1;
//   step %= steps;
//   marker.setLngLat(points[step]);
//   requestAnimationFrame(animationShow);
// };
// animationShow();
// window.addEventListener('load', function() {
//     var iframe = document.createElement('iframe');
//     iframe.src = 'http://127.0.0.1:5500/index.htm?random=1234';
//     document.getElementById('lineChart')?.appendChild(iframe);
//   });
// location.reload()
let tick = 1.0
onMounted(() => {
  initMap()
})


</script>
<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;

  overflow: hidden;

}

.rainForecast-back {
  background-image: url("@/assets/rainForecast_back.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100vh;
}

.flex-row-center {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: scroll
}

.flex-row-evenly {
  display: flex;
  justify-content: space-evenly;
}

.flex-Column-Around-Center {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

}

.content-container {
  height: calc(100% - 75px);
  width: 100%;
}

.content-col-1 {
  /*height: calc(100vh - 60px);*/
  height: 100%;
  width: 25%;
}

.content-col-2 {
  /*height: calc(100vh - 60px);*/
  height: 100%;
  width: 50%;
}

.content-col-3 {
  /*height: calc(100vh - 60px);*/
  height: 100%;
  width: 25%;
}

.content-part-1 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-part-2 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.content-part-map {
  width: 100%;
  height: 94%;
  margin-top: 3vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.part25 {
  width: 100%;
  height: 25%;
  padding: 20px;
  position: relative;
  box-shadow: rgb(0 108 255) 0px 0px 25px inset;
}

.part35 {
  width: 100%;
  height: 35%;
  padding: 20px;
  position: relative;
  box-shadow: rgb(0 108 255) 0px 0px 25px inset;
}

.part45 {
  width: 100%;
  height: 45%;
  padding: 20px;
  position: relative;
  box-shadow: rgb(0 108 255) 0px 0px 25px inset;

}

.partBig {
  width: 90%;
  height: 90%;
  padding: 20px;
  position: relative;
  box-shadow: rgb(0 108 255) 0px 0px 25px inset;
}

.mapboxgl-ctrl-logo {
  display: none;
}

div#map {
  width: 96%;
  height: 90%;


}

#map2 {
  width: 100%;
  height: 100%;
}

.rainfallforcast-color {
  width: fit-content;
  height: 40px;
  padding: 5px 15px;
  z-index: 9;
  position: absolute;
  bottom: 20px;
  left: 20px;

  display: flex;
  align-items: center;
  background-color: rgba(124, 120, 120, 0.2);
  border-radius: 5px;
  /* box-shadow: 2px 2px 2px #aaa; */
  opacity: 0.9;
  color: #b9b8ce;
}

.rainfallforcast-color .color-bar {
  display: flex;
  height: fit-content;
  flex-direction: column;
  /* background-color: red; */
}

.rainfallforcast-color .color-bar .color {
  width: fit-content;
  height: fit-content;
  display: flex;
}

.rainfallforcast-color .color-bar .label {
  display: flex;
  height: fit-content;
  width: fit-content;
  font-size: 12px;
}

.rainfallforcast-color .color-bar .color-item {
  width: 36px;
  height: 12px;
}

.dateForestShow {
  color: #ff003b;
  position: absolute;
  top: 15%;
  right: 30px;
}

.dateDescShow {
  color: #ff003b;
  position: absolute;
  bottom: 8%;
  right: 30px;
}

.border-box {
  position: relative;
  background: rgba(1, 19, 67, 0.8);
  border: 2px solid #00a1ff;
  border-radius: 8px;
  width: 100%;
  height: 58vh;

}

.mapBut {
  position: absolute;
  top: 1.5vh;
  right: 1vmax;
  z-index: 999;
  margin-left:1vmax;
  // width: 20vmax;
  // height: 20vh;
  // background-color: #00a1ff;
}

.Guandes {
  position: absolute;
  top: 16vh;
  right: 28vmax;
  z-index: 999;
  margin-left:1vmax;
  padding:1vh;
  width: 15vmax;
  height: auto;
  display: flex;
  
  // background-color: #00a1ff;
}
.toWar {
  position: absolute;
  top: 0.8vh;
  right: 10vmax;
  z-index: 999;
  // margin-left:1vmax;
  // padding:1vh;
  width: 8vmax;
  height: 5vh;
  display: flex;
  color: white;
  cursor: pointer;
  
  
  // background-color: #00a1ff;
}
.colorGuan{
  color: v-bind(realColor);
}

// .border-box::before {
//   position: absolute;
//   top: -2px;
//   bottom: -2px;
//   left: 30px;
//   width: calc(100% - 60px);
//   content: "";
//   border-top: 2px solid #016886;
//   border-bottom: 2px solid #016886;
//   z-index: 0;
// }

// .border-box::after {
//   position: absolute;
//   top: 30px;
//   right: -2px;
//   left: -2px;
//   height: calc(100% - 60px);
//   content: "";
//   border-right: 2px solid #016886;
//   border-left: 2px solid #016886;
//   z-index: 0;
// }

/*.border-box p{*/
/*  line-height:100px;*/
/*  text-align: center;*/
/*  color:#00a1ff;*/
/*}*/
</style>
