/**
 * Created by Administrator on 2017/5/27.
 */

    //var mySwiper = new Swiper('.swiper-container',{
    //    direction:'vertical',   //上下滑动
    //    loop:true
    //});

    var mySwiper = new Swiper('.swiper-container',{
        direction:'horizontal',
       //effect:"fade"
    //effect:"flip",

    onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
        swiperAnimateCache(swiper); //隐藏动画元素
        swiperAnimate(swiper); //初始化完成开始动画
    },
    onSlideChangeEnd: function(swiper){
        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
    }


    });
    //var mySwiper = new Swiper('.swiper-container',{
    //    parallax:true  //具有视觉效果的拉伸
    //});
