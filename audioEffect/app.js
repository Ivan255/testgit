/**
 * Created by Administrator on 2017/5/19.
 */
(function(){
     function init(){
         var player = new AudioPlayer();

         var rangeView = addEventListener("#volumeRange","change",function(event){
             player.setVolume(event.target.value);
         });
         addEventListener(".playButton","click",function(){
             player.play("一次就好.mp3",function(){
                 console.log(player.gainNode.gain.value);
                 rangeView.value = player.gainNode.gain.value;
             });

         });
         addEventListener(".stopButton","click",function(){
             player.stop();
         });

     }

    function addEventListener(selector,eventName,listener){
        var element = document.querySelector(selector);
        element.addEventListener(eventName,listener);
        return element;
    }
    init();
})();