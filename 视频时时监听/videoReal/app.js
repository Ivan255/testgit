/**
 * Created by Administrator on 2017/5/27.
 */
(function(){
    var videoPlayer = document.querySelector("#videoPlayer");
    videoPlayer.autoplay = true; //自动播放

    var audioPlayer = document.querySelector("#audioPlayer");

    //创建audio上下文
    var audioContext = new AudioContext();

    var analyser = null;

    var context = document.querySelector("canvas").getContext("2d");
    context.fillStyle = "red";

    navigator.mediaDevices.getUserMedia({video:true,audio:true}).then(function(stream){

        videoPlayer.src = URL.createObjectURL(stream); //转换成URL


        //音频输入口
        var streamSource = audioContext.createStreamSource(stream);

        // 创建频谱分析仪的节点
        analyser = audioContext.createAnalyser();

        streamSource.connect(analyser);
        analyser.connect(audioContext.destination); //频谱分析仪连接音频上下文的终点

        console.log(streamSource);

        //audioPlayer.src = URL.createObjectURL(stream);

        streamSource.start();


            draw();

    });

    //获得每一时间段的 频谱的数据 -->数组
    function analyserArry(){

        analyser.fftSize = 1024;
        var bufferLength = analyser.fftSize;
        var dataArray = new Uint8Array(bufferLength);
        analyser.getByteTimeDomain(dataArray);

        return dataArray;
    }

    //不断绘制每一时间段的频谱数据
    function draw(){

        context.clearRect(0,0,800,800);

        var bytes = analyserArry();

        var itemWidth = 10;  //绘制矩形的宽度为10

        var itemSpace = 5;  //绘制矩形的间距为5

        //画布总共可以绘制多少个小方块
        var canDrawNum = (800-itemSpace)/(itemWidth+itemSpace);
        //隔多少步 去选 数组中的一个元素 --> 显示整个频谱的 大致波形
        var step = parseInt(bytes.length/canDrawNum);

        for(var i = 0;i < canDrawNum;i++){
            //每个元素的高度
            var itemHeight = bytes[i * step];
            context.beginPath();
            context.fillRect(itemSpace + (itemSpace + itemWidth) * i,800 - itemHeight,itemWidth,itemHeight);
        }

        var timer = setInterval(function(){
            //不断的重复自己调用自己（递归调用）
            draw();
        },500);

    }

})();