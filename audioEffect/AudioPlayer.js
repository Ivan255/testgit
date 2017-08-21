/**
 * Created by Administrator on 2017/5/19.
 */
(function(){
    function AudioPlayer(){
        //初始化音频上下文（相当于 舞台）
        this.audioContext = new AudioContext();
    }

    /*
    * 设置音频上下文
    * */
    AudioPlayer.prototype.settingContext = function(url,callback){

        //   通过createBufferSource() --> AudioBufferSourceNode的对象 -->也
        // 是一个音频节点-->只要是音频节点就可以进行串联
        //创建入口节点(相当于 主角)需要数据（AudioBuffer）
        this.sourceNode = this.audioContext.createBufferSource();


        //this.loadAudioFileData(url) ===Promise的对象
        var promise = this.loadAudioFileData(url);

        //  result === request.response  是获得到的音频数据
        promise.then(function(result){
            //解码音频数据
            this.audioContext.decodeAudioData(result,function(decodeBuffer){
                //decodeBuffer  -->使用decodeAudioData这个解码工具解码之后的数据

                //  设置入口节点的数据
                this.sourceNode.buffer = decodeBuffer;

                // 串联各个节点  注意：入口节点 必须是  音频流资源节点 或者 音频缓存资源节点
                 //输出节点 只能是 destination() -->目标节点
                this.sourceNode.connect(this.addDelayNode());
                this.delay.connect(this.addPanNode());
                this.panNode.connect(this.addGainNode());
                this.gainNode.connect(this.audioContext.destination);

                this.sourceNode.start();
                callback();

            }.bind(this));
        }.bind(this));

    };
    /*
    * 开始播放
    * */
   AudioPlayer.prototype.play = function(url,callback){
       if(!this.sourceNode){
           this.settingContext(url,callback);
       }
   };

    /*
    * 停止播放的时候 需要断开各个节点
    * */
    AudioPlayer.prototype.stop = function(){
        if(!this.sourceNode){
            return;
        }
        this.sourceNode.stop();
        this.sourceNode.disconnect(this.delay);
        this.delay.disconnect(this.panNode);
        this.panNode.disconnect(this.audioContext.destination);
        this.sourceNode = null;

    };

    /*
    * 加载音频数据
    * return Promise
    * */
    AudioPlayer.prototype.loadAudioFileData = function(url){

        //success 是一个形参（函数）-->当结束promise的时候可以调用
        // 这个函数（Promise中封装回调函数的参数） -->当调用success的时候 -->会
        // 执行then-->then里面回调函数的参数就是 通过success传过去的实参
        return new Promise(function(success){
            var request = new XMLHttpRequest();

            //在音频解码的时候 需要rraybuffer类型的数据
            request.responseType = "arraybuffer";
            request.open("GET",url);
            request.onload = function(){
                //request.response == then里面回调函数的参数
                success(request.response);
            };
            request.send();
        })

    };


    //效果器 --->AudioNode
    /*
    * 增益：扩大波形 提高音量
    * */
    AudioPlayer.prototype.addGainNode = function(){
        this.gainNode = this.audioContext.createGain();
        //this.gainNode.gain.value = 0;
        return this.gainNode;
    };
    //设置音量
    AudioPlayer.prototype.setVolume = function(volume){
        if(this.gainNode){
            this.gainNode.gain.value = volume;
        }
    };
     /*
     * 延迟节点
     * */
    AudioPlayer.prototype.addDelayNode = function(){
        //  createDelay()用于创建 延迟节点的方法  参数单位是秒
        //   createDelay（最大延迟时间）
        this.delay = this.audioContext.createDelay(10.0);
         this.delay.delayTime.value = 5.0;
        return this.delay;
    };
    /*
    * 立体声 生相（声道）节点
    * pan.value -1左  1右
    * */

    AudioPlayer.prototype.addPanNode = function(){
        this.panNode = this.audioContext.createStereoPanner();
        this.panNode.pan.value = -1;
        return this.panNode;
    };

    AudioPlayer.prototype.setPanValue = function(panValue){
        var value = panValue >= 50 ? 50/(panValue-50):(panValue-50)/50;
        this.panNode.pan.value = value;
    };

    window.AudioPlayer = AudioPlayer;
})();