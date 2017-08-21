/**
 * Created by Administrator on 2017/5/18.
 */
(function(){
    function AudioPlayer(){

    }
    /*
    //作业思路
    //navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
    //    var audioContext = new AudioContext();
    //    var sourceNode = audioContext.createMediaStreamSource();
    //    MediaRecoder(stream);
    //});
    */

    AudioPlayer.prototype.loadAudioSourceNode = function(url){
        //1、创建 演出的舞台（AudioContext）
        var audioContext = new AudioContext();
        //3、创建缓冲区资源对象（输入口）
        //资源节点 通过资源节点 进行播放
        var sourceNode = audioContext.createBufferSource();
        this.loadAudioFile(url).then(function(arrayBuffer){
            //4、音频数据解码
            audioContext.decodeAudioData(arrayBuffer,function(audioBuffer){

                //4、音频数据解码  设置缓冲区资源对象的数据
                //设置输入源的数据
                sourceNode.buffer = audioBuffer;

                //5、开始连接音频节点
                //设置输出源的端口
                sourceNode.connect(audioContext.destination);

                //6、开始播放start
                sourceNode.start();
            });
        });
    };
      //2、获取音频文件数据
    AudioPlayer.prototype.loadAudioFile = function(url){

        return new Promise(function(res){
            var request = new XMLHttpRequest();
            //audioContext 在创建资源库的时候 需要一个 AudioBuffer 类型的数据
            //AudioBuffer  -->可以通过 decodeAudioData 获得
            //decodeAudioData 需要ArrayBuffer类型的数据
            //在加载音频数据的时候 就需要 指定 返回的格式 是bufferArray类型
            request.responseType = "arraybuffer";
            request.open("GET",url);
            request.onload = function(){
                res(request.response);
            };
            request.send();
        })

    };

    window.AudioPlayer = AudioPlayer;
})();