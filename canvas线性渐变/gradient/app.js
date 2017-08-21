/**
 * Created by Administrator on 2017/5/22.
 */
(function(){
    var context = document.querySelector("canvas").getContext("2d");
    function init(){
        var linerGradient = context.createLinearGradient(0,800,0,0);
        linerGradient.addColorStop(0.3,"green");
        //linerGradient.addColorStop(0.3,"cyan");
        linerGradient.addColorStop(0.6,"yellow");
        linerGradient.addColorStop(1,"red");

        context.fillStyle = linerGradient;
        context.fillRect(20,20,20,500);
        context.fillRect(20,20,20,500);
        context.fillRect(20,20,20,100);
        context.fillRect(20,20,20,800);
        context.fillRect(20,20,20,800);
        context.fillRect(20,20,20,800);
    }
    init();
})();