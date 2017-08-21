/**
 * Created by Administrator on 2017/5/17.
 */
(function(){
    function init(){
        var audioPlayer = document.querySelector("#audioPlayer");
        document.addEventListener("dragenter",function(event){
            event.preventDefault();
        });
        document.addEventListener("dropover",function(event){
            event.preventDefault();
        });
        document.addEventListener("drop",function(event){
            event.preventDefault();
            if(event.dataTransfer.files[0].type == "audio/mp3"){

            console.log(event.dataTransfer.files);
            var fileReader = new FileReader();
            fileReader.readAsDataURL(event.dataTransfer.files[0]);
            fileReader.onload = function(){
                //console.log(this.result);
                //var url = URL.createObjectURL(this.result);

                audioPlayer.src = this.result;
            };
          }
        });
    }
    init();
})();

