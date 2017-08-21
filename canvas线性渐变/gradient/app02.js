/**
 * Created by Administrator on 2017/5/23.
 */
(function(){
    var context = document.querySelector("canvas").getContext("2d");
     var progress = new Progress();
    var timer = setInterval(function(){
        progress.setProgress(0,context).then(function(message){
            if(message){
                clearInterval(timer);
                alert(message)
            }

        });
    },5);

})();