/**
 * Created by Administrator on 2017/5/16.
 */
window.player = window.player || {};
(function(){
    //所有音频播放的界面、逻辑 统一放到Player中关联
    function Player(){
        var urls = ["res/songs/董小姐.mp3","res/songs/一次就好.mp3","res/songs/丑八怪.mp3","res/songs/味道.mp3","res/songs/梦一场.mp3","res/somgs/荒木毬菜 - 流れ星.mp3","res/somgs/徐佳莹-身骑白马.mp3"];
        this.audioPlayer = new player.AudioPlayer(urls);
        this.playTypes = ["single","random","order"];
        this.curTypeIndex = this.playTypes.indexOf(localStorage.getItem("loopType")?localStorage.getItem("loopType"):"single");
        this.curTypeIndex = 0;

        this.getUI();
        this.addListener();



    }
    Player.prototype.getUI= function() {
        this.lrcBx = document.querySelector(".lrcBox");

        this.playTypeControl = document.querySelector(".playerControlBox :first-child");
        var type = this.playTypes[this.curTypeIndex];
        this.playTypeControl.src = "res/img/" + type + ".png";
        //：nth-child(3)        css3里获取某个子元素
        this.lastButton = document.querySelector(".playerControlBox :nth-child(2)");        //获取到上一曲按钮
        this.playButton = document.querySelector(".playerControlBox :nth-child(3)");     //获取到播放按钮
        this.nextButton = document.querySelector(".playerControlBox :nth-child(4)");      //获取到下一曲按钮


        this.endTimeLabel = document.querySelector(".playerTimeControlBox :nth-child(3)");
            //this.audioPlayer.duration(function(time){
            //    this.endTimeLabel.textContent = time;
            //}.bind(this));


        this.audioPlayer.duration().then(function (time) {
            this.endTimeLabel.textContent = time;
        }.bind(this));


        this.firstTimeLabel = document.querySelector(".playerTimeControlBox :first-child");
        this.timeRange = document.querySelector(".playerTimeControlBox :nth-child(2)");


        var lrc = new player.LRCRedader();
        var lastLrc = "";
        this.audioPlayer.getCurrentTime(function (time) {
            this.firstTimeLabel.textContent = time;
            //以秒为单位的当前时间 ：this.audioEle.currentTime
            //总时间 ：this.audioEle.duration
            //百分比 ： 当前时间/总时间
            this.timeRange.value = this.audioPlayer.audioEle.currentTime / this.audioPlayer.audioEle.duration * 100;
            lrc.parseLRC("res/lrc/董小姐.lrc").then(function(lrcObj){
                var lrcString = lrcObj[parseInt(this.audioPlayer.audioEle.currentTime)];

               if(lrcString){
                   lastLrc = lrcString;
               }
                this.lrcBx.innerHTML = lastLrc;
            }.bind(this));

        }.bind(this));



        this.volumeRange = document.querySelector(".volumeRange");
        this.volumeRange.addEventListener("change", function (event) {
            this.audioPlayer.audioEle.volume = event.target.value / 100;
        }.bind(this));
};
        Player.prototype.addListener = function () {
            var self = this;
            this.playButton.onclick = function () {
                this.src = self.audioPlayer.playControl() ? "res/img/play.png" : "res/img/pause.png";
            };
            //下一曲按钮
            this.nextButton.onclick = function () {

                self.audioPlayer.next();
            };
            //上一曲按钮
            this.lastButton.onclick = function () {
                self.audioPlayer.last();
            };
            this.playTypeControl.onclick = function () {
                self.curTypeIndex++;
                if (self.curTypeIndex > 2) {
                    self.curTypeIndex = 0;
                }
                self.audioPlayer.setPlayType(self.playTypes[self.curTypeIndex]);

                var type = self.playTypes[self.curTypeIndex];
                self.audioPlayer.setPlayType(type);
                this.src = "res/img/" + type + ".png";
            };
        };


        window.player.Player = Player;
    })();