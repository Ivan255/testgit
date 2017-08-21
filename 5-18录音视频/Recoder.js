/**
 * Created by Administrator on 2017/5/18.
 */
(function(){
    function Recoder(){
        //缓存数据
        this.buffers = [];
        this.getMediaStream();
    }

    Recoder.prototype.getMediaStream = function(){

        var config = {audio:true,video:true};

        var self = this;

        navigator.mediaDevices.getUserMedia(config).then(function(stream){
            self.mediaRecoder = new MediaRecorder(stream);
            self.mediaRecoder.ondataavailable = function(event) {
                self.buffers.push(event,data);
                console.log(event);
            };
            self.addEventListener();

        }).catch(function(error){
            console.log(error);
        });

   };

        Recoder.prototype.addEventListener = function(){
            var self = this;
            this.mediaRecoder.onstop = function(){

                var blob = new Blob(self.buffers,{mimeType:"video/webm"});
                var url = URL.createObjectURL(blob);
                var audio = document.createElement("video");
                audio.src = url;
                document.body.appendChild(audio);
                audio.autoplay = true;
                audio.onended = function(){
                    document.body.removeChild(this);
                };

                var downloadButton = document.createElement("a");
                downloadButton.textContent = "保存到本地";
                downloadButton.href = url;
                downloadButton.download =url;
                document.body.appendChild(downloadButton);
            };
        };

        Recoder.prototype.start = function(){
            if(this.mediaRecoder.state == "recording"){
                return;
            }
            this.mediaRecoder.start();
        };

        Recoder.prototype.recoder = function(){

            if(this.mediaRecoder.state=="paused"){
                this.mediaRecoder.resume();
            }else{
               this.start();
            }
        };

        Recoder.prototype.pause = function(){
            this.mediaRecoder.pause();
        };

        Recoder.prototype.stop = function(){
            this.mediaRecoder.stop();

    };
    window.Recoder = Recoder;
})();

