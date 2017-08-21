/**
 * Created by Administrator on 2017/5/17.
 */
(function(){
     function init(){


         document.querySelector(".videoPlayer");
         var config = {video:true};
         navigator.mediaDevices.getUserMedia(config).then(function(stream){
             //stream : Blob
            videoPlayer.src = URL.createObjectURL(stream);
             videoPlayer.autoPlay = true;
         }).catch(function(error){
             console.log(error);
         });
     }
    init();
})();