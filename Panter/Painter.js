/**
 * Created by Administrator on 2017/5/19.
 */
(function(){
    function Painter(_context){
        this.context = _context;

        this.drawLine();
    }
    /*
     * 画板的核心功能描述
     * 监听 鼠标按下的事件 moveTo（鼠标按下的点）
     * 监听 鼠标按下 并且移动的事件 lineTo（鼠标移动的点）
     * 监听 鼠标抬起的事件 移除鼠标移动的事件
     * */

    Painter.prototype.drawLine = function(){

        var self = this;
        function move(event){
            self.context.lineTo(event.pageX,event.pageY);
            self.context.stroke();
        }
        document.addEventListener("mousedown",function(event){
            self.context.moveTo(event.pageX,event.pageY);
            this.addEventListener("mousemove",move)
        });
        document.addEventListener("mouseup",function(){
            this.removeEventListener("mousemove",move);
        });
    };

    //清除 矩形范围内的所有内容
    Painter.prototype.clearAll = function(){
        this.context.clearRect(0,0,800,800)  ;
    };


    window.Painter = Painter;
})();