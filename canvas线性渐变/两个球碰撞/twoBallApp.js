/**
 * Created by Administrator on 2017/5/23.
 */
(function(){
    var context = document.querySelector("canvas").getContext("2d");

    function init(){
        var round1 = new Round();
        round1.draw(context);


        var round2 = new Round();
        round2.color = "skyblue";
        round2.center = {
            x:400,
            y:400
        };
        round2.draw(context);

        var showView = document.querySelector("div");
        document.addEventListener("mousemove",function(event){
            context.clearRect(0,0,800,800);
            round1.center = {x:event.pageX,y:event.pageY};
            round1.draw(context);
            round2.draw(context);

            if(CheckAction.check(round1,round2)){

                if(round1.radius >=round2.radius){
                    round2.center.y = 1000;
                }else{
                    round1.center.y = 1000;
                }
                showView.innerHTML = "挨到了";
            }else{
                showView.innerHTML = "没挨到";
            }
        });

    }
    init();
})();