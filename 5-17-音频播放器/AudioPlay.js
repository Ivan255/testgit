/**
 * Created by Administrator on 2017/5/15.
 */
window.player = window.player || {};
(function(){
    //todo:音频播放的核心代码(注意 封装核心代码 尽量减少入口 添加有必要的(接口)出口 (不需要把所有接口公开) )
    //AudioPlayer:音频播放的核心代码（逻辑部分）
    //urls：音频url的数组 -->需要让播放器核心知道要播放的内容（可以进行下一曲 随机）
     function AudioPlayer(urls){

         this.urls = urls;

         this.init();
     }
   //初始化 音频播放器的函数
   AudioPlayer.prototype.init = function(){
       //当前播放音频的下标 随机播放下一曲 通过currentSongIndex来控制
       this.currentSongIndex = 0;
       //音频播放器的dom元素
       this.audioEle = document.createElement("audio");
       document.body.appendChild(this.audioEle);
       //设置 音播放器的 资源文件路径
       this.audioEle.src = this.urls[this.currentSongIndex];

       this.audioEle.autoplay = true;

       /*
       *   播放类型
       *   0：  是单曲循环
       *   1：  是随机播放
       *   2：  是顺序播放
       * */
       this.PlayType = {
           single:0,
           random:1,
           order:2
       };
       //null  undefind  0   --->  false
       //获得 保存过的状态
       this.currentPlayType = this.PlayType[localStorage.getItem("loopType") ? localStorage.getItem("loopType"):"single"];
       this.listenEnd();
   };
    /*
    * playControl:播放暂停的控制方法
    * 返回值 是播放暂停的状态
    * */
    AudioPlayer.prototype.playControl = function(){
        this.audioEle.paused ? this.audioEle.play():this.audioEle.pause();
        return this.audioEle.paused;
    };

    /*
    *    setPlayType:设置播放的类型
    *    0：  是单曲循环
     *   1：  是随机播放
     *   2：  是顺序播放
    * */
    AudioPlayer.prototype.setPlayType = function(type){
         this.currentPlayType = this.PlayType[type];
        //保存 设置循环状态到本地
        localStorage.setItem("loopType",type);
    };
    //下一曲
    AudioPlayer.prototype.next = function(){
        /*
        * 两种情况
        *  1、单曲 顺序播放  -->  音频列表的下一曲
        *  2、随机播放  -->  下一曲 是随机的
        *
        *
        *  currentSongIndex 是用于 获取或者设置 当前播放音乐的下标
        *  urls 整个音乐播放列表的数组
        *
        *  获取当前的音乐 ：this.urls[this.currentSongIndex]
        * */
        if(this.currentPlayType != 1){
            //单曲 顺序 播放  --> 让currentSongIndex 自加  --> 下一曲
            this.currentSongIndex++;
            this.currentSongIndex = this.currentSongIndex >= this.urls.length ? 0:this.currentSongIndex;
        }else{
            this.currentPlayType = parseInt(Math.random()*this.urls.length);
        }
        /*
        * 获得currentSongIndex  （处理过的 《顺序 、 随机》）
        * 就可以 获得到 下一曲 需要播放的音乐
        * 需要播放的音乐 ：this.urls[this.currentSongIndex]
        * 重新给 播放器 资源文件 this.audioEle.src = this.urls[this.currentSongIndex]
        * */
        this.audioEle.src = this.urls[this.currentSongIndex];
    };
    //上一曲
    AudioPlayer.prototype.last = function(){
        if(this.currentPlayType !=1){
            this.currentSongIndex--;
            this.currentSongIndex = this.currentSongIndex < 0 ? this.urls.length-1:this.currentSongIndex;
        }
        this.audioEle.src = this.urls[this.currentSongIndex];
    };
    //监听播放完成的状态
    AudioPlayer.prototype.listenEnd = function(){
        this.audioEle.addEventListener("ended",function(){
            this.next();
        }.bind(this));
    };

    /*
    * 获取 音频 总时长
    *
    AudioPlayer.prototype.duration = function(callback){
        //获取媒体的基本信息 需要 等加载完 元数据 之后 才能获取得到
        this.audioEle.addEventListener("loadedmetadata",function(event){
            callback(TimeTools.songTimeFromat(event.target.duration));
        });
    };
     */
    AudioPlayer.prototype.duration = function(){
        var self = this;
        function config(resole,reject){
            self.audioEle.addEventListener("loadedmetadata",function(event){
                if(event){
                    resole(TimeTools.songTimeFromat(event.target.duration));
                }else{
                    reject("获取Dom错误");
                }

            });
        }
         return  new Promise(config);

    };

    AudioPlayer.prototype.getCurrentTime = function(callback){
      this.audioEle.addEventListener("timeupdate",function(event){
          callback(TimeTools.songTimeFromat(event.target.currentTime));
      });
    };
    window.player.AudioPlayer = AudioPlayer;
})();




