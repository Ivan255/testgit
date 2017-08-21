/**
 * Created by Administrator on 2017/5/15.
 */

//function get(url){
//    return new Promise(function(resole,reject){
//        var request = new XMLHttpRequest();
//        request.open("GET",url);
//        request.onload = function () {
//            callback(request.response);
//        };
//        request.send();
//    });
//
//}
//get("app.js").then(function(result){
//    console.log(result);
//});

var lrc = new player.LRCRedader();
lrc.parseLRC("res/lrc/董小姐.lrc").then(function(obj){
    console.log(obj);
});


    (function(){
          function init(){
              new player.Player();
              //console.log(TimeTools.songTimeFromat(96));
              //var date = new Date(1494691200000);
              //console.log(date.getDay());
          }

        init();
    })();
