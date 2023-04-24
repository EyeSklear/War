// import mapboxgl from "mapbox-gl";
// import mapBoxGl from "mapbox-gl";//闪烁函数
// let map: mapBoxGl.Map;
export function  flashLayer (layerid: any,map:mapBoxGl.Map)  {
    // Set the initial opacity to 0
    map?.setPaintProperty(layerid, 'fill-opacity', 0);
    
    let delta = -0.05
    let opacity = 1;
    // Define the duration of the flashing effect
    const duration = 2000; // in milliseconds

    // Set up the interval to alternate the layer's opacity
    let start = Date.now();
    let interval = setInterval(() => {
        let timePassed = Date.now() - start;
        opacity += delta
        //不能设置为0 否则会报错
        if (opacity < 0.06 || opacity > 0.94) {
            delta = -delta; // 到达最小或最大值时，逆转透明度的变化方向
        }
        //let opacity = Math.sin((timePassed / duration) * Math.PI);
        map?.setPaintProperty(layerid, 'fill-opacity', opacity);
        if (timePassed > duration) {
            clearInterval(interval);
            map?.setPaintProperty(layerid, 'fill-opacity', 0.4);
        }
    }, 200);
}

