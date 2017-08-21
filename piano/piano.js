/**
 * Created by Administrator on 2017/5/18.
 */
/*
* 通过 键盘 控制 audio 的播放
* 给钢琴的容器 添加 keydown 事件 -->  通过event。key(keyCode)区分 是哪一个音频
* --->  （load）播放
* 创建多个sudio标签
* 给钢琴容器  添加按下事件  触发音频播放方法
* */
(function(){

    function Piano(){
        this.audioKey =[ "audio/c4.ogg","audio/d4.ogg","audio/e4.ogg","audio/f4.ogg","audio/g4.ogg","audio/a4.ogg","audio/b4.ogg","audio/c5.ogg"];
        this.createAudio();
        this.addEventListener();
    }
    Piano.prototype.createAudio = function(){
        for(var i = 1;i<=this.audioKey.length;i++){
            var audio = document.createElement("audio");
            audio.src = this.audioKey[i-1];
            document.body.appendChild(audio);
            audio.id = "key"+i;
        }
    };
    Piano.prototype.addEventListener = function(){
        document.body.addEventListener("keydown",function(event){
          if(/[1-8]/.test(parseInt(event.key))){
              var audio = document.querySelector("#key" + event.key);
              audio.load();
              audio.play();
          }
        });
    };
    window.Piano = Piano;
})();