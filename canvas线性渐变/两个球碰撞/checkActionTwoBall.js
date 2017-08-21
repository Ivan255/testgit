/**
 * Created by Administrator on 2017/5/23.
 */
(function(){
     function CheckAction(){}
         CheckAction.check = function(target,destination){
             if(target && destination){
                 var centerDistanceX = target.center.x - destination.center.x;
                 var centerDistanceY = target.center.y - destination.center.y;
                 if(Math.sqrt(centerDistanceX*centerDistanceX+centerDistanceY*centerDistanceY)<=(target.radius+destination.radius)){
                     return true;
                 }else{
                     return false;
                 }
             }else{
                 console.log("请输入要检测的目标");
                 return false;
             }
         };
     window.CheckAction = CheckAction;
})();
//Math.aqrt(x*x+y*y)<=两个圆半径相加的值;