<template>
    <audio id="audio2"  ref="audio2"  volume="0.04" loop>
        <source src='/static/bj.mp3' />
    </audio>
    <div class="fly-container" v-if="airplane">
        <div class="fly">
            <el-image src="http://localhost:8060/getImage?name=air9" fit="fill"></el-image>
        </div>
    </div>
    <audio id="audio" ref="audio" class="aud" :key="audioFlag">
        <source :src=audioIndex />
    </audio>
    <div v-if="boomFlag">
    <audio id="audio3" ref="audio3"   volume="0.2" loop>
        <source src='/static/baozhasheng.mp3' />
    </audio>
</div>

    <!-- v-if="ListShowSum" -->
    <!-- <div class="lists" >
        <div :class="{ 'dis': !listShow, 'app': listShow }"> -->

    <div class="lists" v-if="false">

        <el-radio-group v-model="isCollapse" style="margin-bottom: 10px">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group>
        <el-scrollbar height="75vh">
            <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
                @close="handleClose">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon>
                            <Clock />
                        </el-icon>
                        <span>时间</span>
                    </template>
                    <el-menu-item-group>
                        <template #title><span>九月二十四日</span></template>
                        <el-menu-item index="1-1">九月二十四日晨</el-menu-item>
                        <el-menu-item index="1-2">九月二十四日午</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group title="九月二十五日">
                        <el-menu-item index="1-3">九月二十五日晨</el-menu-item>
                        <el-menu-item index="1-4">九月二十五日午</el-menu-item>
                    </el-menu-item-group>
                    <!-- <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu> -->
                </el-sub-menu>
                <el-sub-menu index="2">
                    <template #title>
                        <el-icon>
                            <location />
                        </el-icon>
                        <span>地点</span>
                    </template>
                    <el-menu-item-group>
                        <template #title><span>平型关地区</span></template>
                        <el-menu-item index="2-1">老爷庙区域</el-menu-item>
                        <el-menu-item index="2-2">蔡家峪区域</el-menu-item>
                        <el-menu-item index="2-3">小寨村区域</el-menu-item>
                        <el-menu-item index="2-4">团城口区域</el-menu-item>
                    </el-menu-item-group>
                    <!-- <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">九月二十五日</el-menu-item>
      </el-menu-item-group> -->
                    <!-- <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu> -->
                </el-sub-menu>
                <!-- <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>地点</template>
    </el-menu-item> -->
                <!-- <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <template #title>人物</template>
    </el-menu-item> -->
                <el-sub-menu index="3">
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>人物</span>
                    </template>
                    <el-menu-item-group>
                        <template #title><span>红军115师343旅</span></template>
                        <el-menu-item index="3-1">685团</el-menu-item>
                        <el-menu-item index="3-2">686团</el-menu-item>
                        <el-menu-item index="3-3">687团</el-menu-item>
                    </el-menu-item-group>
                    <el-menu-item-group>
                        <template #title><span>日军第5师21旅</span></template>
                        <el-menu-item index="3-4">日军第5师21旅</el-menu-item>

                    </el-menu-item-group>
                    <!-- <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu> -->
                </el-sub-menu>
                <el-sub-menu index="4">
                    <template #title>
                        <el-icon>
                            <document />
                        </el-icon>
                        <span>事件</span>
                    </template>
                    <el-menu-item-group>
                        <template #title><span>总览事件</span></template>
                        <el-menu-item index="4-1" @click="zhanqianbushu()">战前准备,红军部署</el-menu-item>
                        <el-menu-item index="4-2">日军行进,红军围堵</el-menu-item>
                        <el-menu-item index="4-3">日军求援,红军拦路</el-menu-item>
                        <el-menu-item index="4-4">短兵相见,死伤无数</el-menu-item>
                        <el-menu-item index="4-5">战后清点,缴获丰富</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </el-menu>
        </el-scrollbar>
    </div>
    <!-- 战争伤亡情况 -->
    <!-- <div id="bingli"></div> -->
    <!-- 战争解读视频 -->
    <!-- v-show="videoOn" -->
    <div class='vedio' v-if="videoOn">
        <vue3VideoPlay width="29vmax" height="41vh" title="老爷庙" :src="options.src" :poster="options.poster"
            :autoPlay="options.autoPlay" @play="onPlay" @pause="onPause" @timeupdate="onTimeupdate" @canplay="onCanplay" />
        <div>
            <el-button type="danger" :icon="CloseBold" @click="overVideo" />
        </div>
    </div>
    <!-- v-if="jiaohuo" -->
    <div class="jiaohuo"  v-if="jiaohuo">
        <!-- <dv-border-box1 style="width: 32vw; height: 60vh; position: relative;backdrop-filter: blur(2px)">
            <div class="BingliCon">
                <echartsDie></echartsDie>
            </div>
        </dv-border-box1> -->
        <dv-border-box1 style="width: 40vw; height: 45vh; position: relative;backdrop-filter: blur(2px)">
            <div class="BingliCon">
                <!-- <div class="binglitext">
                    <h1>战争缴获</h1>
                </div> -->
                <echartsDie></echartsDie>
            </div>
        </dv-border-box1>
        
    </div>
    <div class="die"  v-if="jiaohuo">
        <!-- <dv-border-box1 style="width: 32vw; height: 60vh; position: relative;backdrop-filter: blur(2px)">
            <div class="BingliCon">
                <echartsDie></echartsDie>
            </div>
        </dv-border-box1> -->
        <dv-border-box1 style="width: 40vw; height: 45vh; position: relative;backdrop-filter: blur(2px)">
            <div class="BingliCon">
                <!-- <div class="binglitext">
                    <h1>战争缴获</h1>
                </div> -->
                <echartsJH></echartsJH>
            </div>
        </dv-border-box1>
        
    </div>
    <!-- v-if="textIntroFlag>0" -->
    <div class="textIntro"  v-if="textIntroFlag>0">
        <dv-border-box-9 :color="['#00a1ff']" style="position: relative;backdrop-filter: blur(2px);background-color: rgba(48,49,51,0.5);">
          <div style="color:#fafafa;text-align: center;margin-top: 1vh;margin-bottom: 1vh">
            <h1 style="font-family: 楷体">{{ textTitle }}</h1>
          </div>
          <el-scrollbar height="34vh">
            <div v-if="textIntroFlag==1"
              style=";color:#fafafa;width:90%;height:90%;margin-bottom:6vh;margin-left: 2vw;margin-right: 1vmax;line-height:40px;font-family: 楷体;">
              <p class="ex"><span class="ex5">1937年8月</span>，日军以北平(今北京),天津地区为出发地，兵分3路发起进攻。第一路以1个半师团的兵力沿津浦路向南进犯;
	第二路以1个师团的兵力沿平汉路南犯，进窥河南;第三路以3个师团的兵力沿平绥路东段，同蒲路北段向西进犯。
	第三路为日军<span class="ex3">主攻</span>方向，其西进的企图是由晋北打开通路，歼灭国民党第二战区主力，攻占<span class="ex2">太原</span>，以大迂回的动作，
	迫使国民党的军队撤退，达到不战而占领华北五省的目的。
为了实现这一企图，西进的日军又兵分两路向太原方向推进:一路由关东军察哈尔派遣兵团和2个独立混成旅团，
	沿同蒲铁路南进，经雁门关直太原;一路由<span class="ex1">日军第5师团</span>向浑源、灵丘进攻,企图突破<span class="ex2">平型关</span>与沿同蒲铁路南进之敌会师<span class="ex2">雁门关</span>。
雁门关、平型关是<span class="ex1">国民党军</span>长城防线的两道关口，也是日军进攻太原的<span class="ex2">必经之地</span>。
	日军一旦攻取两关，即可长驱直入，兵临太原城下，太原垂手可得。由于雁门关地势比平型关更为险要，
	又有重兵把守，难以从<span class="ex4">正面</span>夺取，而平型关地处山西和河北交界的地方,是个比较<span class="ex4">薄弱</span>的环节。
	因此，日军将其主力第5师团用于平型关方向，企图由平型关一举突破长城防线，
	取下代县，卡断雁门关后路，从背后攻取雁门关，然后与雁门关正面的日军<span class="ex3">合兵一处，直扑太原</span>。</p>
            </div>
            <div v-if="textIntroFlag==2"
              style=";color:#fafafa;width:90%;height:90%;margin-bottom:5vh;margin-left: 2vw;margin-right: 1vmax;line-height:40px;font-family: 楷体;font-size: large;">
              <p class="ex"><span class="ex5">1937年8月</span>，日军以北平(今北京),天津地区为出发地，兵分3路发起进攻。第三路以3个师团的兵力沿平绥路东段，同蒲路北段向西进犯。
	第三路为日军<span class="ex3">主攻</span>方向，其西进的企图是由晋北打开通路，歼灭国民党第二战区主力，攻占<span class="ex2">太原</span>，以大迂回的动作，
	迫使国民党的军队撤退，达到不战而占领华北五省的目的。
为了实现这一企图，西进的日军又兵分两路向太原方向推进:一路由关东军察哈尔派遣兵团和2个独立混成旅团，
	沿同蒲铁路南进，经雁门关直太原;一路由<span class="ex1">日军第5师团</span>向浑源、灵丘进攻,企图突破<span class="ex2">平型关</span>与沿同蒲铁路南进之敌会师<span class="ex2">雁门关</span>。
雁门关、平型关是<span class="ex1">国民党军</span>长城防线的两道关口，也是日军进攻太原的<span class="ex2">必经之地</span>。
	日军一旦攻取两关，即可长驱直入，兵临太原城下，太原垂手可得。由于雁门关地势比平型关更为险要，
	又有重兵把守，难以从<span class="ex4">正面</span>夺取，而平型关地处山西和河北交界的地方,是个比较<span class="ex4">薄弱</span>的环节。
	因此，日军将其主力第5师团用于平型关方向，企图由平型关一举突破长城防线，
	取下代县，卡断雁门关后路，从背后攻取雁门关，然后与雁门关正面的日军<span class="ex3">合兵一处，直扑太原</span>。
	9月中旬，阎锡山指挥的第2战区战事紧迫。阎锡山在日寇攻势下压力极大,他随即要求<span class="ex1">八路军</span>帮助防守平型关。周恩来、彭德怀表示同意。23日,八路军总部遂电令林彪、聂荣臻率<span class="ex1">115师</span>
	主力侧击正向平型关开进之敌。
9月25日晨，在平型关一个不引人注目的无名山头上，林彪、聂荣臻设下了指挥部。
</p>
            </div>
            <div v-if="textIntroFlag==3"
              style=";color:#fafafa;width:90%;height:90%;margin-bottom:5vh;margin-left: 2vw;margin-right: 1vmax;line-height:40px;font-family: 楷体;font-size: large;">
              <p class="ex">
	<span class="ex1">林彪、聂荣臻</span>的“口袋”在平型关口已稳稳布好；343旅之685团由杨得志率领,
	686团由杨勇率领埋伏于10里长沟,685团伏于白崖台以西准备消灭并沟至老爷庙的日寇,686团伏于右侧，准备歼灭老爷庙至蔡家峪的敌人;徐海东的344旅之687团，
	正奉命虎踞于东河南以北的高地，准备断敌后路;688团作为预备队尚未开进阵地;
	杨成武率独立团、刘云彪率骑兵营也<span class="ex3">悄然进军</span>平型关的东北面及东面，准备配合主力作战。
	一条<span class="ex2">峡谷山路</span>，长达七公里，东通河北，西接雁门，地势极为险要，历来为兵家所<span class="ex4">必争</span>。平型关口至灵丘县东河南镇长约13公里的地段，
	崖高数丈，陡峭如削，崖顶平缓，杂草丛生，两侧高地便于隐蔽部署兵力，便于发扬火力与展开突击，是伏击歼敌的好战场
	<span class="ex5">1937年9月25日晨</span>，<span class="ex1">日军第5师第21旅一部和大批辎重车辆</span>，沿灵丘至平型关公路西进。7时许，全部进入第115师设伏地域。
	由于道路<span class="ex4">狭窄</span>，雨后路面泥泞，其车辆人马<span class="ex4">拥挤堵塞，行动缓慢</span>。第115师立即抓住有利战机，突然以步枪、机关枪、手榴弹的猛烈火力，给日军以大量杀伤；
	并乘其惊慌混乱之际发起<span class="ex3">冲击</span>。<span class="ex1">第685团</span>迎头截击，歼日军一部。
	<span class="ex1">第686团第1、第3营</span>勇猛地冲向<span class="ex2">峡谷山路</span>，同日军展开白刃格斗。日军<span class="ex4">死伤惨重</span>，但仍利用车辆辎重作掩护进行顽抗。
	其中一部企图抢占公路西侧<span class="ex2">老爷庙</span>及其附近高地，掩护突围。
	第686团第3营迅速冲过公路，先敌占领了老爷庙及其以北高地，与公路东侧部队对日军构成<span class="ex3">两面夹击之势</span>，并将日军压迫于老爷庙至小寨村的<span class="ex2">峡谷</span>之中。
</p>
            </div>
            <div v-if="textIntroFlag==4"
              style=";color:#fafafa;width:90%;height:90%;margin-bottom:5vh;margin-left: 2vw;margin-right: 1vmax;line-height:40px;font-family: 楷体;font-size: large;">
              <p class="ex">
	<span class="ex2">老爷庙</span>制高点位于乔沟西北侧，老爷庙座西北朝东南，是当地老百姓依山而建的一座小庙，<span class="ex4">前低后高</span>，是沟堑的制高点。庙前一片平缓的坡地向东南伸去。
	第115师立即抓住有利战机，突然以步枪、机关枪、手榴弹的猛烈火力，给日军以大量杀伤；并乘其惊慌混乱之际发起冲击。
	第686团第1、第3营勇猛地冲向公路，同日军展开<span class="ex3">白刃格斗</span>。日军<span class="ex4">死伤惨重</span>，但仍利用车辆辎重作掩护进行顽抗。
	其中一部企图抢占公路西侧<span class="ex2">老爷庙及其附近高地</span>，掩护突围。第686团第3营<span class="ex4">迅速</span>冲过公路，先敌占领了老爷庙及其以北高地，与公路东侧部队对日军构成<span class="ex3">两面夹击之势</span>，并将日军压迫于老爷庙至小寨村的峡谷之中。
	被围日军连续向老爷庙<span class="ex3">疯狂反扑，企图突围</span>，均被扼守该地的<span class="ex1">第3营</span>击退。为解救被围日军，先期进占<span class="ex2">东跑池</span>的日军一部回援，
	被第685团阻击。被围于老爷庙至小寨村的日军，<span class="ex1">6架飞机</span>在掩护下，再次猛攻老爷庙及附近地区，仍未得逞。接着，第686团集中全力，在第685团和第687团各一部协同下，将被围的日军全歼。<span class="ex5">1937年9月25日13时许</span>战斗结束。
	随后，第343旅向东跑池一带日军展开攻击。由于国民党军<span class="ex3">未按预定作战计划出击</span>，致使东跑池的日军于黄昏由<span class="ex2">团城口</span>突围。
	</p>
            </div>
            <div v-if="textIntroFlag==5"
              style=";color:#fafafa;width:90%;height:90%;margin-bottom:5vh;margin-left: 2vw;margin-right: 1vmax;line-height:40px;font-family: 楷体;font-size: large;">
              <p class="ex">
日军被八路军缴获装备及物资如下：
<span class="ex2">武器装备</span>：92步兵炮1门、步枪1000余支、短枪13支、轻重机枪20余挺；
<span class="ex2">弹药</span>：炮弹2840发、步枪子弹3595发、机枪子弹67OO发；
<span class="ex2">交通运输工具</span>：汽车79辆、摩托车3辆、马车200辆、骡3匹；
<span class="ex2">其他</span>：军马50余匹、防毒器具100余套、工兵器具18个；
		此战，第115师以<span class="ex4">劣势</span>装备一举歼灭日军精锐第5师第21旅一部<span class="ex1">1000余人</span>，
	击毁汽车百余辆、马车200辆，缴获步兵炮1门、轻重机枪20余挺、步枪1000余支、军马50余匹及其他大批军用物资，牵制了日军第5师的进攻，
	平型关的胜利对于<span class="ex2">敌后根据地</span>的建立，起到了非常直接的支持作用。时任686团组织处股长的欧阳文（1955年授中将衔）说：
	“平型关一战我们八路军、115师一下就打出名气了，战后我们到晋南<span class="ex3">招兵</span>。我们团的招兵处和国民党的紧挨着，他们那边根本没人去，我们用了一个星期就招了<span class="ex1">3,000</span>多人
	同时支援了平汉铁路和同蒲铁路线上的<span class="ex1">国民党军</span>作战。
	这是全面抗战开始以来中国军队取得的<span class="ex3">第一次大胜利</span>。
	它<span class="ex3">打击</span>了侵华日军的气焰，<span class="ex3">振奋</span>了全国的民心士气，<span class="ex3">提高</span>了中国共产党和八路军的声威。
	
	</p>
            </div>
          </el-scrollbar>

          <!-- <div style="color:#fafafa;margin-left: 1.5vmax;margin-top: 2vh;">
      <echartsTest></echartsTest>
      </div> -->
        </dv-border-box-9>
    </div>
    <div class="zuo_person"  v-if="personVs == true">
        
        <div class="at-item">
            <dv-border-box-9 :color="['#00a1ff']" style="width: 20vw; height: 42vh; position: relative;backdrop-filter: blur(2px)">

                <div class="flex-row-center">
                    <h1> 八路军第115师师长林彪</h1>
                </div>
                <div class="content-part-1">
                    <img class="img" src="@/assets/Lin_Biao.jpg" style="width: 80%;height: 88%;" />
                </div>
            </dv-border-box-9>
        </div>
    </div>
    <div class="you_person"  v-if="personVs == true">
        
        <div :class="{ 'at-item': !banyuanDie, 'at-item2': banyuanDie }">
            <dv-border-box-9 :color="['#00a1ff']" style="width: 20vw; height: 42vh; position: relative;backdrop-filter: blur(2px)">
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
        </div>
    </div>
    <div class="progress-line2" v-show="ifPause == true">
        <div class="progress-bar2">

            <div style="width:26.09%">战前准备,红军部署</div>
            <div style="width:25.54%">日军行进,红军围堵</div>
            <div style="width:18.48%">日军求援,红军拦路</div>
            <div style="width:15.94%">短兵相见,死伤无数</div>
            <div style="width:13.95%">战后清点,缴获丰富</div>
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
    <div class="explain2"  v-if="drawIndex > 6 && warShow == true">
        <!-- v-if="drawIndex > 6 && warShow == true" -->
        <div class="at-item">
            <dv-border-box9 style=";width:30vw;height: 43vh;backdrop-filter: blur(2px);position: relative">
                <el-image style="width: 28vw; height:41vh;margin-top: 1vh;margin-left: 1vw;; opacity: 0.8;position: relative;"  :src="thumImage" fit="fill" />

            </dv-border-box9>
        </div>
    </div>
    <!-- v-show="drawIndex <= 3 && ifPause == true" -->
    <div class="explain3" v-if=" zonglan == true ">
        <div :class="{ 'at-item': imageShow, 'at-item2': !imageShow }">
            <el-image style="width: 20vw; height:47vh;top:1vh;opacity: 0.8 " 
                src="http://localhost:8060/getImage?name=wars" fit="fill" />
        </div>
    </div>
    <!-- v-if="gifFlag" -->
    <div class="explain4" v-if="gifFlag">
        
        
            <!-- <el-image style="width: 30vw; height:45vh;top:1vh; opacity: 0.8" preview-src-list :src="thumImage"
                fit="fill" /> -->
                <img :src=textGif alt="your_gif" style="width: 8vw; height:12vh;margin-left: 1vw;margin-top:1vh">
                <img :src=textGif alt="your_gif" style="width: 8vw; height:12vh;margin-left: 1vw;margin-top:2vh">
                <img :src=textGif alt="your_gif" style="display:block;width: 8vw; height:12vh;margin-left: 4vw;margin-top:1vh">
</div>
    <div>
    </div>
</template>
<script setup lang="ts">
import mapboxgl from "mapbox-gl";
import mapBoxGl from "mapbox-gl";
import * as turf from "@turf/turf";
import staticData from '../../static/data'
import { drawSet } from  '../../static/task'
import * as echarts from 'echarts';
import * as echatsCore from 'echarts/core'
import echartsJH from './echartsJH.vue';
import echartsDie from './echartsDie.vue';

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
import { flashLayer,sleep,addLayer,cameraAlong,asyncAddLayer } from '../utils/mapUtils'
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
const listShow = ref(false)
const ListShowSum = ref(false)
const textTitle =ref('战前背景')
const ex1=ref('black')
const ex2=ref('rgb(0,0,255)')
const ex3=ref('red')
const ex4=ref('green')
const ex5=ref('yellow')
//切换文字
const textIntroFlag=ref(0)
const gifFlag=ref(false)
const boomFlag=ref(false)
type EChartsOption = echarts.EChartsOption;
let lockDate: []; // 锁定的日期（滑动结束时自动跳到指定的日期）
let markDate: []; // 做标记的日期
let mask: true;
const textLen = ref(0)
//用于判断是否已经开始重映
const rePlayFlag = ref('false')
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
const hasReSet = ref(false)
const dyDrawTest = async () => {
    return new Promise(resolve => {
        //hasReSet用于判断是否已经重置drawIndex
        if (rePlayFlag.value == 'zhanqian' && hasReSet.value == true) {
            drawIndex.value = 2
            hasReSet.value = false
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
            type: drawSet[drawIndex.value].type,
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
const textGif = ref('/static/boom.gif')
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
        }, 25000)
    })
}
const typewriter = async () => {
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
const textMessage = ref('随着山西省大同市的失守，日军已经逼近了山西的内防线，华北地区情况不容乐观')
const textValue = ref('gag')
const svgXML =
    `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"> 
                <path d="M529.6128 512L239.9232 222.4128 384.7168 77.5168 819.2 512 384.7168 946.4832 239.9232 801.5872z" p-id="9085" fill="#ffffff"></path> 
            </svg>
            `
const svgBase64 = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(svgXML)));
const startClick = () => {

    //     //console.log(counter)
}
const airplane = ref(false)


const audio = ref(null);
const audio2 = ref(null);
const audioIndex = ref('/static/大同失守2.mp3')
const audioFlag = ref(0)
const playAudio = () => {
    console.log(audioFlag.value)
    let dom = audio.value
    //console.dir(dom);
    if(dom!=null){
        (dom as any).play()
    }
    

    // data.musicSrc = ''
}
const playAudio2 = () => {
  
    let dom2 = audio2.value
    //console.dir(dom);
    if(dom2!=null){
        (dom2 as any).play()
       
    }
    

    // data.musicSrc = ''
}
const audio3=ref(null)
const playAudio3 = () => {
 
    let dom3 = audio3.value
    //console.dir(dom);
    if(dom3!=null){
        (dom3 as any).play()
       
    }
    

    // data.musicSrc = ''
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
const zhanqianFlag = ref(false)
const zhanqianbushu = async () => {
    if (zhanqianFlag.value == false) {
        zhanqianFlag.value = true
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
    await sleep(1000)

    removeLayer('chufadian', 'chufadian')
    removeLayer('shizhuli115', 'shizhuli115')
    removeLayer('shizhuli6851', 'shizhuli6851')
    removeLayer('shizhuli6852', 'shizhuli6852')
    removeLayer('shizhuli6861', 'shizhuli6861')
    removeLayer('shizhuli6863', 'shizhuli6863')
    await sleep(2000)
    asyncAddLayer('chufadian', 'chufadian', staticData.chufadian, 'line', 1000,
    {
        paint: {
            'line-color': '#ff0000',
            'line-width': 8
        }, layout: {}, filter: []

    },map)

    for (let i = 2; i < 7; i++) {
        await dyDrawTest()
    }
    await asyncAddLayer('linesDes', 'linesDes', staticData.line3des, 'symbol',1000,
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
        },map)
    zhanqianFlag.value = false


}

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
        //style: 'http://localhost:3000/taiwan_source/taiwan_jian_liberty_reverse.json'
        style: 'mapbox://styles/mapbox/satellite-v9', // style URL
        //style:'mapbox://styles/mapbox/outdoors-v12'
        //style: 'http://172.21.212.168:8899/mapProject/getPublishedMap/646331f7c1a2a11336ca3806'
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
        // map.addSource('basemap', {
        //     type: "raster",
        //     //tiles: [`${prefix}visual/ObliqueImage/{x}/{y}/{z}`],
        //     tiles: [`http://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}`],
        //   });
        //   map.addLayer({
        //     id: 'basemap',
        //     type: "raster",
        //     source: 'basemap',
        //   });
        task.value = [
            //红军部署
            async () => {
                ex1.value=''
                ex2.value=''
                ex3.value=''
                ex4.value=''
                ex5.value=''
                playAudio2()
                //await sleep(1000)
                playAudio()
                map.easeTo({
                    center: [113.18883047209192, 38.46825060280423],
                    pitch: 28.343045841856856,
                    bearing: -73.6000000000003,
                    zoom: 8.509009513393568,
                    duration: 2000, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                });
                textMessage.value = '随着山西省大同市的失守，日军已经逼近了山西的内防线，华北地区情况不容乐观'
               
                typewriter()
                await sleep(500)
                ex1.value='black'
                textIntroFlag.value=1

                await asyncAddLayer('warpre', 'warpre', staticData.warpre, 'symbol',100,
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
                    },map)


                //playAudio()
                await sleep(2000)
                ex2.value='rgb(0,0,255)'
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
                ex3.value='red'
                // await asyncAddLayer('datong2lingqiu', 'datong2lingqiu', staticData.datong2lingqiu, 'fill',1000,
                //     {
                //         paint: {
                //             'fill-color': '#191970',
                //             'fill-opacity': 1,
                //         }, layout: {}, filter: []
                //     },map)
                textMessage.value = '只要突破了平行关，日军即可沿着平坦宽阔的的河谷地带，直插整个山西的要害——太原'
                typewriter()
                await sleep(200)
                audioIndex.value = '/static/只要突破2.mp3'
                audioFlag.value = 1
                await sleep(1000)
                playAudio()
              
                
                await sleep(1000)
                
                //平型到太原
                await asyncAddLayer('warpre2', 'warpre2', staticData.warpre2, 'symbol',1000,
                    {
                        layout: {
                            'text-field': ['get', 'description'],
                            'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                            'text-size': 45,
                            'text-offset': [0, 1],
                            'text-anchor': 'top'
                        },
                        paint: {
                            'text-color': '#FF8000',
                            'text-halo-color': '#000000',
                            'text-halo-width': 2,
                            'text-opacity': 0.8
                        }
                    },map)
                await dyDrawTest()
                await asyncAddLayer('ping2taiyuan', 'ping2taiyuan', staticData.ping2taiyuan, 'fill',1000,
                    {
                        paint: {
                            'fill-color': '#191970',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    },map)
                textMessage.value = '1937年9月23日，阎锡山策划25日以3个师的兵力，出长城合围平型关下的日军，歼灭日军于关外'
                typewriter()
                ex4.value='green'
                audioIndex.value = '/static/19372.mp3'
                audioFlag.value = 2
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                await sleep(1000)
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
                await asyncAddLayer('pingxingfanwei', 'pingxingfanwei', staticData.pingxingfanwei, 'line',1000,

                    {
                        paint: {
                            'line-color': 'red',
                            'line-width': 12,
                        }, layout: {}, filter: []
                    },map)
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
                await sleep(3000)
                zonglan.value = true
                await sleep(5000)
                zonglan.value = false
                imageShow.value = false
                ex5.value='yellow'


                await asyncAddLayer('places', 'places-labels', staticData.pointsImp, 'symbol',1000,
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
                    },map)
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
                addLayer(map,'chufadian', 'chufadian', staticData.chufadian, 'line', {
                    paint: {
                        'line-color': '#ff0000',
                        'line-width': 8
                    }, layout: {}, filter: []

                })
                thumImage.value = 'http://localhost:8060/getImage?name=all-check-hong'
                await sleep(500)
                map?.setPaintProperty('chufadian', 'line-opacity', 0.4);
                audioIndex.value = '/static/大战开始2.mp3'
                audioFlag.value = 3
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                await sleep(1000)
                textMessage.value = '大战开始，115师兵分三路，343旅之685团由杨得志率领,686团由杨勇率领埋伏于10里长沟。'
                typewriter()

                await sleep(200)
                for (let i = 2; i < 7; i++) {
                    await dyDrawTest()
                }
                await asyncAddLayer('linesDes', 'linesDes', staticData.line3des, 'symbol',1000,
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
                    },map)

                await sleep(1000)
            },
            async () => {
                textIntroFlag.value=2
                ex1.value=''
                ex2.value=''
                ex3.value=''
                ex4.value=''
                ex5.value=''
                textTitle.value='包围'
                textMessage.value = '1937年9月25日晨，日军第5师第21旅一部和大批辎重车辆，沿灵丘至平型关公路西进。7时许，全部进入第115师设伏地域。'

                await typewriter()
                //textGif.value = './static/222slow.gif'
                audioIndex.value = '/static/日军行进2.mp3'
                audioFlag.value = 4
                //让浏览器缓一缓
                await sleep(200)
                ex1.value='black'
                playAudio()
                //await dyDrawTest()
                await sleep(2000)
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
                await sleep(500)
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
                addLayer(map,'rijun21lvxian', 'rijun21lvxian', staticData.rijun21lvxian, 'line', { paint: { 'line-color': '#191970', 'line-width': 13 }, layout: {}, filter: [] })
                await sleep(1000)
                ex2.value='rgb(0,0,255)'
                await asyncAddLayer('rijun21lv', 'rijun21lv', staticData.rijun21lv, 'fill',200,
                    {
                        paint: {
                            'fill-color': '#191970',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    },map)
                //await dyDrawTest()
                await cameraAlong(staticData.rijun21lvxian.geometry.coordinates,map)

             

                map?.setPaintProperty('rijun21lv', 'fill-opacity', 0.4);

                let popup4 = new mapboxgl.Popup({ offset: 25, })
                    .setLngLat([113.96673, 39.36022])
                    .setHTML('<h1 style=";color:#191970;">日军第5师21旅</h1>')
                    .addTo(map);
                //
                //await typewriter() 
                map.easeTo({
                    center: [113.97496812712012, 39.34280192790092],
                    pitch: 35.260330578511265,
                    bearing: -17.65420514898358,
                    zoom: 13.771419543884582,
                    duration: 1000, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                });
                ex3.value='red'
               
                thumImage.value = 'http://localhost:8060/getImage?name=all-check-weigong'
                map.easeTo({
                    center: [113.95007145232819, 39.340621294206585],
                    pitch: 36.087685950382685,
                    bearing: 14.948428631981187,
                    zoom: 14.10504267767176,
                    duration: 1000, // 缓动动画的时间
                    easing: function (t: any) { // 缓动函数
                        return t;
                    }
                });
                await sleep(2000)
                textMessage.value = '由于道路狭窄，雨后路面泥泞，其车辆人马拥挤堵塞，行动缓慢,第115师立即抓住有利战机，发起冲击。'
                typewriter()
                audioIndex.value = '/static/道路狭窄2.mp3'
                audioFlag.value = 5
             
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                await sleep(3000)
                await asyncAddLayer('tuan6851', 'tuan6851', staticData.tuan6851, 'fill',1500,
                    {
                        paint: {
                            'fill-color': '#ff0000',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    },map)
                flashLayer('tuan6851', map)
                map?.setPaintProperty('tuan6851', 'fill-opacity', 0.4);


                await asyncAddLayer('tuan6852', 'tuan6852', staticData.tuan6852, 'fill',1500,
                    {
                        paint: {
                            'fill-color': '#ff0000',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    },map)
                flashLayer('tuan6852', map)
                ex4.value='green'
                map?.setPaintProperty('tuan6852', 'fill-opacity', 0.4);
                await asyncAddLayer('tuan6853', 'tuan6853', staticData.tuan6853, 'fill',1500,
                    {
                        paint: {
                            'fill-color': '#ff0000',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    },map)
                flashLayer('tuan6853', map)
                await sleep(1000)
                textMessage.value = '第685团迎头截击，歼日军一部。'
                typewriter()
                audioIndex.value = '/static/迎头痛击2.mp3'
                audioFlag.value = 6
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                await sleep(1000)
                ex5.value='yellow'
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
            async () => {
            },
            //686团进攻
            async () => {
                await asyncAddLayer('tuan686summian', 'tuan686summian', staticData.tuan686summian, 'fill',1000,
                    {
                        paint: {
                            'fill-color': '#ff0000',
                            'fill-opacity': 0,
                        }, layout: {}, filter: []
                    },map)

                flashLayer('tuan686summian', map)
                map?.setPaintProperty('tuan686summian', 'fill-opacity', 0.4);
                let popup2 = new mapboxgl.Popup({ offset: 25, })
                    .setLngLat([113.97414, 39.34887])
                    .setHTML('<h1 style=";color:red;">八路军115师686团</h1>')
                    .addTo(map);
                await sleep(2000)
                textMessage.value = '日军其中一部企图抢占老爷庙高地，掩护突围。第686团迅速冲过公路，先敌占领老爷庙，以此对日军构成两面夹击之势。'

                typewriter()
                audioIndex.value = '/static/先敌占领2.mp3'
                audioFlag.value = 7
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                await sleep(1000)
                //tuan6865
                await dyDrawTest()
                //tuan6866
                await dyDrawTest()
                await asyncAddLayer('tuan6864', 'tuan6864', staticData.tuan6864, 'fill',1000,
                    {
                        paint: {
                            'fill-color': '#ff0000',
                            'fill-opacity': 0,
                        }, layout: {}, filter: []
                    },map)
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
                gifFlag.value=true
                boomFlag.value=true
                await sleep(500)
                playAudio3()
                //红军
                await dyDrawTest()
                airplane.value = false
                gifFlag.value=false
                boomFlag.value=false
                await sleep(1000)
                
            },
            //蔡家峪进攻
            async () => {
                ex1.value=''
                ex2.value=''
                ex3.value=''
                ex4.value=''
                ex5.value=''
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
                ex1.value='black'
                textIntroFlag.value=3
                textTitle.value='阻击'
                textMessage.value = '日军第5师师长板垣征四郎急令其在蔚县、涞源的部队速向平型关增援，又被第115师阻击于灵丘以北和以东地区'
                typewriter()
                //textGif.value = './static/333slow.gif'
                audioIndex.value = '/static/日军求援2.mp3'
                audioFlag.value = 8
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                await sleep(1000)
                //ricaijia1
                await dyDrawTest()
                let popup5 = new mapboxgl.Popup({ offset: 25, })
                    .setLngLat([114.01397, 39.37603])
                    .setHTML('<h1 style=";color:#191970;">灵丘日军增援部队</h1>')
                    .addTo(map);
                //tuan6871xian
                await dyDrawTest()
                ex2.value='rgb(0,0,255)'
                //tuan6875xian
                await dyDrawTest()
                //tuan6874xian
                await dyDrawTest()
                //tuan6873xian
                await dyDrawTest()
                //tuan6873xian2
                await dyDrawTest()
                ex3.value='red'
                //tuan6873
                await asyncAddLayer('tuan6873', 'tuan6873', staticData.tuan6873, 'fill',1000,
                    {
                        paint: {
                            'fill-color': 'red',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    },map)
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
                await asyncAddLayer('tuan6872', 'tuan6872', staticData.tuan6872, 'fill',1000,
                    {
                        paint: {
                            'fill-color': 'red',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    },map)
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
                textMessage.value = '687团与独立团阻击日军增援部队于韩家湾地区，并爆发了小规模战争，直至28日，日军再度进入乔沟'
                typewriter()
                ex4.value='green'
                audioIndex.value = '/static/独立阻击2.mp3'
                audioFlag.value = 9
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                await sleep(1000)
                //caijia687zuo
                await asyncAddLayer('caijia687zuo', 'caijia687zuo', staticData.caijia687zuo, 'fill',1000,
                    {
                        paint: {
                            'fill-color': 'red',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    },map)
                flashLayer('caijia687zuo', map)
                map?.setPaintProperty('caijia687zuo', 'fill-opacity', 0.4);
                //caijia687you
                await asyncAddLayer('caijia687you', 'caijia687you', staticData.caijia687you, 'fill',1000,
                    {
                        paint: {
                            'fill-color': 'red',
                            'fill-opacity': 1,
                        }, layout: {}, filter: []
                    },map)
                flashLayer('caijia687you', map)
                ex5.value='yellow'
                map?.setPaintProperty('caijia687you', 'fill-opacity', 0.4);


                //caijiayuquan
                await dyDrawTest()
                thumImage.value = 'http://localhost:8060/getImage?name=all-check-run'



                //videoOn.value = true
                await asyncAddLayer('bridgeIntro', 'bridgeIntro', geojsonss, 'circle', 500 ,
                    {
                        paint: {
                            'circle-color': 'red',
                            'circle-radius': 30,
                        },
                        layout: {}, filter: []
                    },map)
                
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
                ex1.value=''
                ex2.value=''
                ex3.value=''
                ex4.value=''
                ex5.value=''
                textIntroFlag.value=4
                textTitle.value='反扑'
                textMessage.value = '在老爷庙地区，日军与八路军发生了了空前惨烈的白刃战，日军死伤惨重'
                typewriter()
                //textGif.value = './static/444slow.gif'
                audioIndex.value = '/static/老爷庙2.mp3'
                audioFlag.value = 10
                //让浏览器缓一缓
                await sleep(200)
                ex1.value='black'
                playAudio()
                await sleep(1000)
                map.addSource('images', {
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
                    id: 'imageWar',
                    type: "raster",
                    source: 'images',

                    //   'raster-resampling': 'nearest',
                    //   'raster-translate': [0, 0, 3000], 
                    //   'raster-translate-anchor': 'map'
                    paint: {
                        'raster-opacity': 0.5,

                    }
                });
                let tick = 1.0
                setInterval(() => {
                    map.setPaintProperty('bridgeIntro', 'circle-blur', 0.6 + tick / 5);
                    tick = (tick + 1.0) % 10;
                }, 20);
                ex2.value='rgb(0,0,255)'
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
                ex3.value='red'
                await sleep(1000)
                videoOn.value = true
                await rotateCamera(0)
                videoOn.value = false
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
                ex4.value='green'

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
                removeLayer('imageWar','images')

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
                await sleep(1000)
                ex5.value='yellow'
                textMessage.value = '由于国军未按原定计划作战，最终日军由东跑池方向从团城口突围'
                typewriter()
                ex1.value=''
                ex2.value=''
                ex3.value=''
                ex4.value=''
                ex5.value=''
                audioIndex.value = '/static/逃跑2.mp3'
                audioFlag.value = 11
                await sleep(200)
                //让浏览器缓一缓
                playAudio()
                await sleep(2000)
                
                textIntroFlag.value=0
                
                await sleep(6000)
                warShow.value = false
                personVs.value = true
                
                textTitle.value='总结'
                textMessage.value = '这是林彪与板垣征四郎的第一次正面交锋，最终以八路军获胜作为结果'
                typewriter()
                //textGif.value = './static/555slow.gif'
                audioIndex.value = '/static/交锋获胜2.mp3'
                audioFlag.value = 12
                //让浏览器缓一缓
                await sleep(200)
                playAudio()
                ex1.value='black'
                await sleep(5000)
                ex2.value='rgb(0,0,255)'
                banyuanDie.value = true
                await sleep(2000)
                ex3.value='red'
                personVs.value = false
                jiaohuo.value = true
                await sleep(6000)
                jiaohuo.value = false
                await sleep(1000)
                listShow.value = true
                ListShowSum.value = true
                textIntroFlag.value=5
                ex4.value='green'
                textTitle.value='总结'
                ex5.value='yellow'
            },
        ];
        // add a line layer without line-dasharray defined to fill the gaps in the dashed line

        // add a line layer with line-dasharray set to the first value in dashArraySequence


        // technique based on https://jsfiddle.net/2mws8y3q/
        // an array of valid line-dasharray values, specifying the lengths of the alternating dashes and gaps that form the dash pattern



        // start the animation
      

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

    await asyncAddLayer('rijuntuanchengmian', 'rijuntuanchengmian', staticData.rijuntuanchengmian, 'fill',2000,
        {
            paint: {
                'fill-color': '#191970',
                'fill-opacity': 1,
            }, layout: {}, filter: []
        },map)
}
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

p.ex {color:white;font-size:28px;line-height:50px}
	span.ex1 {background-color:v-bind(ex1);color:white;font-style: italic;font-weight: bold;}
    span.ex2 {background-color:v-bind(ex2);color:white;font-style: italic;font-weight: bold;}
    span.ex3 {background-color:v-bind(ex3);color:white;font-style: italic;font-weight: bold;}
	span.ex4 {background-color:v-bind(ex4);color:white;font-style: italic;font-weight: bold;}
	span.ex5 {background-color:v-bind(ex5);color:red;font-style: italic;font-weight: bold;} //动词
.lists {
    position: absolute;
    width: 10vw;
    height: 80vh;
    left: 88vw;
    top: 8vh;
    //background-color: #0040a1;
    z-index: 2000;

    .dis {
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
            transform: translateZ(0) translateX(0);
            opacity: 1;
        }

        100% {
            transform: translateZ(20px) translateX(20px);
            opacity: 0;

        }
    }

    .app {
        animation-name: slide-in-bck-right;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-delay: 0s;
        animation-iteration-count: 1;
        animation-direction: normal;
        animation-fill-mode: none;

        @keyframes slide-in-bck-right {

            0% {
                transform: translateZ(700px) translateX(400px);
                opacity: 0;
            }

            100% {
                transform: translateZ(0) translateX(0);
                opacity: 1;

            }
        }
    }

    .layer {
        width: 100%;
        height: 5vh;
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

.textIntro{
    position: absolute;
    display: flex;
    justify-content: center;
    font-size:22px;
    left: 0vw;
    top: 0vh;
    width: 30vw;
    height: 42vh;
    z-index: 1000;
    align-items: center;
    color: black;
}
.jiaohuo {
    position: absolute;
    display: flex;
    justify-content: center;
    left: 1vw;
    //top: 1vh;
    align-items: center;

    // width: 30vw;
    // height: 50vh;
    width:40vw;
    height:43vh;
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
        //padding-top: 30px;
        align-items: center;
        justify-content: center;
        z-index: 1000;

    }

    .binglitext {
        margin-bottom: 5px;
        font-size: 20px;
        color: azure;
    }
}
.die {
    position: absolute;
    display: flex;
    justify-content: center;
    left: 1vw;
    top: 43vh;
    align-items: center;

    // width: 30vw;
    // height: 50vh;
    width:40vw;
    height:42vh;
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
        //padding-top: 30px;
        align-items: center;
        justify-content: center;
        z-index: 1000;

    }

    .binglitext {
        margin-bottom: 5px;
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
    top: 42vh;
margin-left: 10px;;
margin-bottom: 5vh;;
    z-index: 999;
    width: 100%;
    height: 90%;
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

.explain4 {
    position: absolute;
    top: 30vh;
    left: 41vw;
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
        animation: progress 184s linear forwards;

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