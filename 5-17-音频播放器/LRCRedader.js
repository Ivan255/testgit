/**
 * Created by Administrator on 2017/5/16.
 */
window.player = window.player || {};
(function(){
  function LRCRedader(){

  }
    /*
    * 歌词读取文件
    * */
    LRCRedader.prototype.readLRCFile = function(url){
        return new Promise(function(resole){
           var request = new XMLHttpRequest();
            request.open("GET",url);
            request.onload = function(){
                resole(request.response);
            };
            request.send();
        });
    };

    /*
    * 解析歌词
    * */
    LRCRedader.prototype.parseLRC = function(url){
      return new Promise (function(res){

          this.readLRCFile(url).then(function(lrcString){
              var lrcObj = {};
             var regEXP = /\[(\d{2}):(\d{2})\.(\d{2})\](.*)/g;
              while(1){
                  var result = regEXP.exec(lrcString);
                 if(result){
                     var m = parseInt(result[1])*60;
                     var s = parseInt(result[2]);
                     lrcObj[m+s] = result[4];

                 }else{
                     break;
                 }
              }
              res(lrcObj);
          });
      }.bind(this));
    };
    window.player.LRCRedader = LRCRedader;
})();

/*
* [00:03.64] 宋冬野 - 董小姐
 [00:04.81] 词曲：宋冬野
 [00:37.20] 董小姐你从没忘记你的微笑
 [00:43.04] 就算你和我一样 渴望着衰老
 [00:52.29] 董小姐你嘴角向下的时候很美
 [00:58.33] 就像安和桥下 清澈的水
 [01:07.63] 董小姐我也是个复杂的动物
 [01:13.67] 嘴上一句带过心里却一直重复
 [01:22.97] 董小姐鼓楼的夜晚时间匆匆
 [01:28.87] 陌生的人请给我一支兰州
 [01:37.52] 所以那些可能都不是真的董小姐
 [01:44.53] 你才不是一个没有故事的女同学
 [01:52.16] 爱上一匹野马可我的家里没有草原
 [01:59.12] 这让我感到绝望 董小姐
 [02:40.54] 董小姐你熄灭了烟说起从前
 [02:46.99] 你说前半生就这样吧 还有明天
 [02:56.61] 董小姐你可知道我说够了再见
 [03:03.36] 在五月的早晨终于丢失了睡眠
 [03:12.21] 所以那些可能都不是真的董小姐
 [03:19.69] 你才不是一个没有故事的女同学
 [03:27.87] 爱上一匹野马可我的家里没有草原
 [03:35.29] 这让我感到绝望 董小姐
 [03:44.49] 所以那些可能都会是真的董小姐
 [03:51.60] 谁会不厌其烦的安慰那无知的少年
 [04:00.76] 我想和你一样 不顾那些所以
 [04:07.88] 跟我走吧 董小姐
 [04:16.07] 躁起来吧 董小姐
*
* */