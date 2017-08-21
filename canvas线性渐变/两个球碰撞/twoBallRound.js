/**
 * Created by Administrator on 2017/5/23.
 */
(function(){
     function Round(){
         this.center = {
             x:0,
             y:0
         };
         this.radius = 50;

         this.color = "yellow";

     }
    Round.prototype.draw = function(context){
        context.save();

        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.center.x,this.center.y,this.radius,0,Math.PI*2,true);
        context.closePath();
        context.fill();


    };
    window.Round = Round;
})();