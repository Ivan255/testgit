/**
 * Created by Administrator on 2017/5/22.
 */
(function(){
    function Table(selector,tableInfo){
        var canvas = document.querySelector(selector);
        this.context = document.querySelector(selector).getContext("2d");
        tableInfo = tableInfo || {row:10,data:[190,190,44,190,276,44,190,440,300,463,22,180]};
        this.tableInfo = tableInfo;
        this.width = canvas.width - 2;
        this.height = canvas.height - 2;

        this.drawTable();


    }
    Table.prototype.drawLine = function(beginPoint,endPoint){
        this.context.beginPath();
        this.context.strokeStyle = "balck";
        this.context.moveTo(beginPoint.x,beginPoint.y);
        this.context.lineTo(endPoint.x,endPoint.y);

        this.context.stroke();
    };

    Table.prototype.drawBackgroundTable = function(){


        //绘制左右两条竖线（边界线）
        for(var i = 0;i<2;i++){
            this.drawLine({x:i * this.width + 1,y:0},{x:i * this.width + 1,y:this.height});
        }

        this.rowHeight = this.height / this.tableInfo.row;

        //绘制上下两条竖线（边界线）
        for(var i = 0;i <= this.tableInfo.row;i++){
            this.drawLine({x:0,y:i * this.rowHeight + 1},{x:i * this.width,y:i * this.rowHeight + 1});
        }
    };

    Table.prototype.drawRect = function(origin,size){
        var rectColor = this.context.createLinearGradient(0,0,0,600);
        rectColor.addColorStop(0,"red");
        rectColor.addColorStop(0.5,"yellow");
        rectColor.addColorStop(1,"green");

        this.context.fillStyle = rectColor;
        this.context.fillRect(origin.x,origin.y,size.width,size.height);
    };

    Table.prototype.drawTable = function(){

        this.drawBackgroundTable();
        //var scale = this.rowHeight/this.height;

        //小方块的宽度 和间隔
        var space = this.width/10;
        var rectWidth = (this.width-space*this.tableInfo.data.length)/this.tableInfo.data.length;
        for(var i = 0;i < this.tableInfo.data.length;i++){
            var rectHeight = this.tableInfo.data[i];
            var y = this.height-rectHeight;

            this.drawRect({x:space*i+space/2,y:y},{width:rectWidth,height:rectHeight});
        }
    };

    window.Table = Table;
})();