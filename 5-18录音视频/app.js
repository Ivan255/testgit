/**
 * Created by Administrator on 2017/5/18.
 */
(function(){
    function init(){
        var recoder = new Recoder();
        document.querySelector(".recoderButton").onclick = function(){
            recoder.recoder();
        };
        document.querySelector(".stopRecoderButton").onclick = function(){
            recoder.stop();
        };

    }
    init();
})();