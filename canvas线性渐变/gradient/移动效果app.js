/**
 * Created by Administrator on 2017/5/22.
 */
(function(){
    var context = document.querySelector("canvas").getContext("2d");

    function move(centerPoint){
        //动画实现原理 -->不断清屏 重新绘制
        context.clearRect(0,0,800,600);
        context.beginPath();

        var center = {};
        center.x=0;
        center.y=0;
        centerPoint = centerPoint || center;
        context.fillStyle = "red";
        //x,y,radius,startAngle,endAngle,anticlockwise
        context.arc(centerPoint.x,centerPoint.y,100,100,0,Math.PI*2,true);
        context.fill();
    }



    function init(){

            document.addEventListener("mousemove",function(event){
                move({
                    x:event.pageX,
                    y:event.pageY
                });
            });
    }
    init();
})();