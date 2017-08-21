/**
 * Created by Administrator on 2017/5/22.
 */
(function(){
    var context = document.querySelector("canvas").getContext("2d");

    //function move(centerPoint){
    //    //动画实现原理 -->不断清屏 重新绘制
    //    context.clearRect(0,0,800,600);
    //    context.beginPath();
    //
    //    var center = {};
    //    center.x=0;
    //    center.y=0;
    //    centerPoint = centerPoint || center;
    //    context.fillStyle = "red";
    //    //x,y,radius,startAngle,endAngle,anticlockwise
    //    context.arc(centerPoint.x,centerPoint.y,100,100,0,Math.PI*2,true);
    //    context.fill();
    //}
    //
    //
    //
    function init(){
    //
    //    document.addEventListener("mousemove",function(event){
    //        move({
    //            x:event.pageX,
    //            y:event.pageY
    //        });
    //    });
        var table = new Table("canvas");

        //var linerGradient = context.createLinearGradient(0,800,0,0);
        //linerGradient.addColorStop(0.3,"green");
        ////linerGradient.addColorStop(0.3,"cyan");
        //linerGradient.addColorStop(0.6,"yellow");
        //linerGradient.addColorStop(1,"red");
        //
        //context.fillStyle = linerGradient;
        //context.fillRect(20,20,20,500);
        //context.fillRect(20,20,20,500);
        //context.fillRect(20,20,20,100);
        //context.fillRect(20,20,20,800);
        //context.fillRect(20,20,20,800);
        //context.fillRect(20,20,20,800);
    }
    init();
})();