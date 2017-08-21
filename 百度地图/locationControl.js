/**
 * Created by Administrator on 2017/5/24.
 */
(function() {

    /*
    * 自定义控件
    *  1、自定义控件的时候 需要 继承 Control这个基类
    *  2、defaultAnchor 、 defaultOffset
    * */

    function LocationControl() {

        if (arguments.length>0){

            var options = arguments[0];

            this.defaultAnchor = options.anchor?options.anchor:BMAP_ANCHOR_BOTTOM_RIGHT;

            this.defaultOffset = options.offset?options.offset:new BMap.Size(0,0);

            this.icon = options.icon?options.icon:"u.jpg";

        }else {

            //2.设置控件的默认位置

            this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;

            this.defaultOffset = new BMap.Size(0,0);

        }


    }


    // 1、继承control
    LocationControl.prototype = new BMap.Control();

    // 3、重写init
    LocationControl.prototype.initialize = function (map) {

        var container = document.createElement("div");

        container.innerHTML = "定位";

        map.getContainer().appendChild(container);

        container.addEventListener("click",function () {

            this.getCurrentLocation().then(function (point) {

                map.setCenter(point);

                map.panTo(point);

                map.setZoom(15);

            }).catch(function (error) {

                console.log(error);

            });

        }.bind(this));

        return container;

    };




    LocationControl.prototype.getCurrentLocation = function (){
        //navigator.geolocation.getCurrentPosition(function(position){
        //    console.log(position);
        //},function(error){
        //    console.log(error);
        //});

        return new Promise(function(success,error){
            var geo = new BMap.Geolocation();
            geo.getCurrentPosition(function(result){
                if(result && result.point){
                    success(result.point);
                }else{
                    error("定位错误");
                }
            });
        })
    };


    window.BMap.LocationControl = LocationControl;


    //var LocationControlOption = {
    //    anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
    //    offset: new BMap.Size(0, 0),
    //    icon: "u.jpg"
    //};

    /*
    * LocationControlOption 定位控件的可选参数
    * anchor 控件的位置
    * offset 控件的偏移量
    * icon 控件图标的路径
    * */
    var LocationControlOptions = {};

    window.BMap.LocationControlOptions = LocationControlOptions;
})();