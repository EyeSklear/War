import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from "element-plus/lib/locale/lang/zh-cn";//国际化
import DataVVue3 from '@kjgl77/datav-vue3'
import * as turf from "@turf/turf";
import "vue3-video-play/dist/style.css";
import {videoPlay} from "vue3-video-play";
const app = createApp(App);
app.use(DataVVue3)
app.use(turf)
app.use(videoPlay)
app.use(ElementPlus, { locale: zhCn })
app.use(router).mount('#app')

