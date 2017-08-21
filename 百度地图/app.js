/** * Created by Administrator on 2017/5/24. */
(function(){
    function init(){
        var map = new BMap.Map("map",{
            mapType:BMAP_HYBRID_MAP
            //mapType:BMAP_NORMAL_MAP
        });

        //禁止双击点击放大
        map.disableDoubleClickZoom();
        //map.centerAndZoom("广州",10);
        var point = new BMap.Point(113.259151,23.135773);
        map.centerAndZoom(point,5);
        var p = map.pixelToPoint(new BMap.Pixel(100,100));
        console.log(p.lng,p.lat);

        //setTimeout(function(){
        //    map.setZoom(18);
        //},3000);

        //设置地图类型
        setTimeout(function(){
            map.setMapType(BMAP_NORMAL_MAP);
        },5*1000);

        //鼠标双击事件
        //map.addEventListener("dbclick",function(event){
        //    console.log(event.point.lng,event.point.lat);
        //});
        //
        ////鼠标拖拽事件
        //map.addEventListener("dragstart",function(event){
        //    alert(event.point.lng,"+",event.point.lat);
        //});

        //导航控件
        //offset
        // x正数 向右 负数 向左
        // y正数 向下 负数 向上
        var navigationConfig = {
            type:BMAP_NAVIGATION_CONTROL_LARGE,
            offset:new BMap.Size(0,300)
        };
        var navigationControl = new BMap.NavigationControl(navigationConfig);
        map.addControl(navigationControl);

        //拖拽时控件隐藏
        map.addEventListener("dragstart",function(){
            navigationControl.hide();
        });
        //拖拽结束显示控件
        map.addEventListener("dragend",function(){
            navigationControl.show();
        });

        setTimeout(function(){
            navigationControl.setType(BMAP_NAVIGATION_CONTROL_PAN);
        },5000);

        var geo = new BMap.GeolocationControl({
            anchor:BMAP_ANCHOR_BOTTOM_LEFT,
            //offset:new BMap.Size(100,0),
            locationIcon:new BMap.Icon("u.jpg")
        });
        map.addControl(geo);

        //切换地图的类型
        var mapTypeControl = new BMap.MapTypeControl();
        map.addControl(mapTypeControl);

        var loc = new BMap.LocationControl();
        map.addControl(loc);


    }



    init();
})();

