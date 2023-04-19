<template>
    <div id="map" ref="container"></div>

    <div class="menuBar">
        <input type="button" value="开始" @click="startClick()" />
        <input type="button" value="暂停" @click="pauseClick()" />
        <input type="button" value="停止" @click="stopClick()" />
        {{ currentMouseValue[0] }},{{ currentMouseValue[1] }}

    </div>
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

import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
} from '@element-plus/icons-vue'
import axios from "axios";
import { defineComponent, onMounted, ref, reactive, watch } from "vue";
import { url } from "inspector";
import { flashLayer } from '../utils/mapUtils'
let map: mapBoxGl.Map;
const ifPause = ref(true)

const container = ref<HTMLElement>();
const currentMouseValue = ref<any[]>([]);
let playSpeed: 1000;// 播放速度
let play: false; // 自动播放
let lockFlag: false;
let markFlag: false;
let lockDate: []; // 锁定的日期（滑动结束时自动跳到指定的日期）
let markDate: []; // 做标记的日期
let mask: true;
let date: '2022-06-01';
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
const pauseClick = () => {
    isPlay = false
    animate()
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
                coordinates: [113.9758628, 39.32994996],
            },
        },
    ],
};

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
        zoom: 14,
        center: [113.9758628, 39.32994996],
        //pitch: 80,
        //bearing: 41,
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
        map.easeTo({
            center: [113.9758628, 39.32994996],
            duration: 2500, // 缓动动画的时间
            easing: function (t: any) { // 缓动函数
                return t;
            }
        });
    })
    const popup = new mapboxgl.Popup({ offset: 25, closeOnClick: false })
        .setLngLat([113.9558628, 39.35994996])
        .setHTML('<h1 style=";color:red;">Hello World!</h1>')
        .addTo(map);
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


    map.on('load', function () {

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
                pitch:55.5,
                bearing:10.26619,
                duration: 1000, // 缓动动画的时间
                easing: function (t: any) { // 缓动函数
                    return t;
                }
            });

           const timeout= setTimeout(() => {
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
                console.log(data.geometry.coordinates.length)
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
                console.log(staticData.tuan6871xian.geometry.coordinates.length)
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
        const tasks = [
            () => {
                //dyDraw2();
                dyDraw('shizhuli115','shizhuli115',staticData.shizhuli115, 2,'line',
                    {
                        paint: {
                            'line-color': '#ff0000',
                            'line-width': 8
                        }, layout: {}, filter: []
                    })
                 setTimeout(()=>{
                    dyDraw('shizhuli6851','shizhuli6851',staticData.shizhuli6851, 2,'line',
                    {
                        paint: {
                            'line-color': '#ff0000',
                            'line-width': 8
                        }, layout: {}, filter: []
                    })
                 },3000)   
                //dyDraw1()
            },
            () => {
                //dyDraw1();
                //sleep()
                addLayer('tuan6871', 'tuan6871', staticData.tuan6871, 'fill',
                    {
                        paint: {
                            'fill-color': '#ff0000',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    })

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
            () => {
                addLayer('tuan6872', 'tuan6872', staticData.tuan6872, 'fill',
                    {
                        paint: {
                            'fill-color': '#ff0000',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    })
            },
            //686团进攻
            () => {
                addLayer('tuan686summian', 'tuan686summian', staticData.tuan686summian, 'fill',
                    {
                        paint: {
                            'fill-color': '#ff0000',
                            'fill-opacity': 0,
                        }, layout: {}, filter: []
                    })
                flashLayer('tuan686summian', map)
            },


        ];

        function runTasks(index: any) {
            if (index < tasks.length) {
                const task = tasks[index];
                task();
                setTimeout(() => {
                    runTasks(index + 1);
                }, 2000); // 每个任务之间间隔2秒
            }
        }
        runTasks(0);
        //dyDraw1()
        //await dyDraw2()
        // await  dyDraw1()

        addLayer('my-source', 'my-layer', staticData.tuan6851, 'fill',
            {
                paint: {
                    'fill-color': '#00f',
                    'fill-opacity': 0,
                }, layout: {}, filter: []
            })
        flashLayer('my-layer', map)
        //加入重要地名
        addLayer('places', 'places-labels', staticData.pointsImp, 'symbol',
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
        map.addSource("bridgeIntro", {
            type: "geojson",
            data: geojsonss,
        });
        map.addLayer({
            id: "bridgeIntro",
            type: "circle",
            paint: {
                'circle-color': 'red',
                'circle-radius': 16,
            },
            source: "bridgeIntro",
        });
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
        map.addSource('route', {
            'type': 'geojson',
            'data': staticData.rijun21lvxian
        });
        map.addLayer({
            'id': 'route',
            'type': 'line',
            'source': 'route',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': 'red',
                'line-width': 10
            }
        });

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


        for (const marker of geojsonss.features) {
            const el = document.createElement("div");
            el.className = "marker";
            el.style.backgroundImage =
                "url(http://localhost:8060/getImage?name=pingxing)"
            el.style.width = "100px";
            el.style.height = "100px";
            el.style.backgroundSize = "100%";
            // Add markers to the map.
            new mapboxgl.Marker(el)
                .setLngLat(marker.geometry.coordinates as any)
                .addTo(map);
        }
        let tick = 1.0
        setInterval(() => {
            map.setPaintProperty('bridgeIntro', 'circle-blur', 0.6 + tick / 20);
            tick = (tick + 1.0) % 10;
        }, 100);

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


var isPlay = false
var counter = 0
var steps = 0
let aLength = 0;
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





onMounted(() => {
    // const routeGeoJsons = await axios
    //             .get(`http://localhost:8060/getJson?name=jsons`)
    //             .then((res) => {
    //               return res;
    //             });
    initMap()
})
</script>

<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
}

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
}
</style>