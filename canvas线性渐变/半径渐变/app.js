/**
 * Created by Administrator on 2017/5/23.
 */
(function(){
   var context = document.querySelector("canvas").getContext("2d");
    //  x0, y0, r0, x1, y1, r1
    var gradient = context.createRadialGradient(100,100,100,100,100,0);
    gradient.addColorStop(0,"white");
    gradient.addColorStop(1,"yellow");

    context.fillStyle = gradient;
    context.fillRect(0,0,800,800);
    context.fillStyle = "skyblue";
    context.font = "48px serif";
    //text,x,y,maxWidth
    context.fillText("Ivan",100,100,800);
    context.strokeText("Ivan",200,200,500);
    //描边字 只有轮廓的
    context.strokeStyle = "purple";

    //阴影颜色
    context.shadowColor = "gray";
    //正数 向右  负数 向左
    context.shadowOffsetX = 10;
    // 正数 向下 负数 向上
    context.shadowOffsetY = 8;
    context.shadowBlur = 8;

    var image = new Image();
    image.src = "img.jpg";
    //drawImage(imageEle,sx,sy,sw,sh,dx,dy,de,dh)
    context.drawImage(image,0,0,100,100,300,190,100,100);


    //放大缩比例 默认是1,1
    context.scale(2,2);

    context.strokeText("Ivan",200,200,500);
        //drawImage(imageEle,sx,sy,sw,sh,dx,dy,de,dh)
    context.drawImage(image,0,0,100,100,200,200,100,100);

   //旋转
    context.rotate(40*Math.PI/180);
    context.strokeText("Ivan",200,200,500);
    //drawImage(imageEle,sx,sy,sw,sh,dx,dy,de,dh)
    context.drawImage(image,0,0,100,100,200,200,100,100);

    //移动 x,y
    context.translate(-90,-160);
    context.strokeText("Ivan",200,200,500);
    //drawImage(imageEle,sx,sy,sw,sh,dx,dy,de,dh)
    context.drawImage(image,0,0,100,100,200,200,100,100);


})();