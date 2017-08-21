/**
 * Created by Administrator on 2017/5/23.
 */
(function(){

     /*
     * type
     * addWidth
     * moveX
     * */
    function Progress(type,context){
        type = this.type || "addWidth";
        this.width =  this.type == "moveX"?200:0;
        this.height = 30;
        this.x =  type == "moveX"? -this.width:0;
        this.y = 0;

        this.type = type;
        //this.GradientWidth = 800; //定义宽度
    }

    Progress.prototype.draw = function(context){
        var color = context.createLinearGradient(0,0,800,0);
        color.addColorStop(0,"green");
        color.addColorStop(0.5,"yellow");
        color.addColorStop(1,"red");
        context.fillStyle = color;
        context.save();    //保存画布之前的状态

        context.beginPath();
        context.fillRect(this.x,this.y,this.width,this.height);
        context.closePath();
        context.restore();
    };

    Progress.prototype.setProgress = function(value,context){
     return new Promise(function(success){
         //0-100
         var canvasWidth = 800;
         var avg = 100/canvasWidth;
         if(this.type == "moveX"){
             this.x += avg;
             if(this.x>=800){
                 success("加载完成");
             }
         }else{
             this.width += avg;
             if(this.width>=800){
                 success("加载完成");
             }
         }
         this.draw(context);
     }.bind(this));

    };


    window.Progress = Progress;
})();