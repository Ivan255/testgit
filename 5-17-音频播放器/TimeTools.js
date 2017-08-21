/**
 * Created by Administrator on 2017/5/16.
 */
(function(){
    /*
    * 类  抽象的事物
    *  属性 --> 特点
    *        对象属性  --->  使用《实例化》出来的 对象 去调用 里面的属性
    *        类属性 （静态属性） ---> 使用类名直接调用 不需要实例化对象 --> 属性是共有的
    *  方法 --> 行为
    *        对象方法    使用《实例化》出来的 对象 去调用 里面方法
    *        类方法（静态方法）  使用类名调用
    * */


    /**
     * 设计模式  -->  单例模式
     * 只创建一个对象
     *
     */

    function TimeTools(){}

    /*
    *   songTimeFromat ：歌曲的时间格式
    *   time ：需要转换的时间  --> 秒
    *   返回值 是 00:00
    * */
    TimeTools.songTimeFromat = function(time){
        var m = parseInt(time/60);  //分
        var s = parseInt(time%60);  //秒
        return (m < 10 ? "0" + m:m) + ":" + (s < 10 ? "0" + s:s);
    };
    TimeTools.yymmdd = function(timestamp){
        var date = new Date(timestamp);
        var y = date.getFullYear();
        var m = date.getMonth()+1;
        var d = date.getDate();

        return y+ (m <10 ? "0" + m:m) + (d < 10 ? "0" + d : d)
};
    //利用时间戳转换成星期几
    TimeTools.week = function(timestamp){
        var date = new Date(timestamp);
        var weeks = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
        return weeks[date.getDate()];
    };
    /**
     * 上午  下午
     *  08:30
     *  上午 08:30
     *  2017年02月20日
     *
     */

    window.TimeTools = TimeTools;
})();