var map = [];
var box = { x:null, y:null, total:null, count:null,w: null, h: null };
var a = null;
var b = null;
var xdot = [];
var ydot = [];
var txt = "";
var imgArray = [];
$(document).ready(function(){
    getDiv(8,6,100);
})
    function mathrandom(a,b) { return Math.random()>.5?-1:1; }
    function getDiv(x,y) {
        box.x = x;
        box.y = y;
        box.total = x*y;
        box.count = box.total;
        box.w = Math.min($(document).width()-20,800);
        txt ="<div class='img-box-bg' style='width:"+(box.w+20)+"px;height:"+(box.w*y/x+20)+"px'><div class='img-box-wrap'></div><div class='line-box'></div></div>";
        $("body").append(txt);//body添加元素
        txt = "";
        var numArray = [];
        for (var i = 0; i < box.total; i++) { numArray.push(i+1); }//获取0~box.total的整数列
        var numArray2 = numArray.sort(mathrandom);//随机打乱数列
        for (var i = 0; i < box.total; i++) { imgArray[i] = "img/img"+Math.ceil(numArray2[i]/4)+".jpg"; }//把数列添加到图片名称中
        // console.table(imgArray);
        for (var i = 0; i < box.y+2; i++) {
            map[i]=[];
            for (var j = 0; j < box.x+2; j++) {
                map[i][j] = null;
            }//获取比实际图片大一圈的map,解决不相邻元素靠边时需要考虑连线伸出map的问题
        }
        for (var i = 0; i < box.y; i++) {
            for (var j = 0; j < box.x; j++) {
                map[i+1][j+1] = {top:i,left:j,img:imgArray[i*x+j]};
                var txt1 = "<div class='img-box top"+i+" left"+j+"' style='top:"+box.w/8*i+"px;left:"+box.w/8*j+"px;width:"+box.w/8+"px;height:"+box.w/8+"px'><button type='button' style='background-image: url("+imgArray[i*x+j]+")' onclick='clickImg("+i+","+j+")'></button></div>"
                txt += txt1;
            }//添加元素
        }
        console.table(map);
        $(".img-box-wrap").append(txt);
    }
    function clickImg(y,x) {//点击图片
        if (a==0||a==null) {//移动端a=null解析为0，判断a点是否存在
            a = {top:y+1,left:x+1};
            $(".top"+y+":eq("+x+") button").addClass("click-on");
            return;
        }else {//a存在是xy存入b中
            b = {top:y+1,left:x+1};
            $(".top"+y+":eq("+x+") button").addClass("click-on");
        };
        if (map[a.top][a.left].img!==map[b.top][b.left].img) {//判断是否为同一张图片
            $(".top"+(a.top-1)+":eq("+(a.left-1)+") button").removeClass("click-on");
            a = {top:y+1,left:x+1};
            b = null;
            return;
        }
        if (a.top==b.top&&a.left==b.left) {//判断是否为同一个点
            $(".top"+(a.top-1)+":eq("+(a.left-1)+") button").removeClass("click-on");
            a = null;
            b = null;
            return;
        }
        path();//以上判断均成立时，尝试连接ab
    }
    function passLine(ax,ay,bx,by) {//只判断两点间的连线，不考虑两个点本身是否为空=>考虑ab点用一条直线连接的情况
        console.log("ax ",ax,"ay ",ay,"bx ",bx,"by ",by);
        if (ax==bx) {
            if (Math.abs(ay-by)==1) {//相邻
                return true;
            }
            var i = Math.min(ay,by)+1;
            var j = Math.max(ay,by)-1;
            while(!map[i][ax]) {//当该点为空时继续执行
                if (i==j) {//当该点已达到终点时结束
                    return true;
                }
                i++;
            }
        }else if (ay==by) {
            if (Math.abs(ax-bx)==1) {//相邻
                return true;
            }
            var i = Math.min(ax,bx)+1;
            var j = Math.max(ax,bx)-1;
            while(!map[ay][i]) {
                if (i==j) {
                    return true;
                }
                i++;
            }
        }
    }
    function crossDot(ax,ay) {//考虑最短路径,越接近a的点 dot array 中越前面，先上下后左右
        var i = ay;//以a点为原点，从y轴上向上判断
        while(i>0&&!map[i-1][ax]) {
            ydot.push({top:i-1,left:ax});
            i--;
        }
        var j = ay;//以a点为原点，从y轴下向上判断
        while(j<(box.y+1)&&!map[j+1][ax]) {
            ydot.push({top:j+1,left:ax});
            j++;
        }
        var m = ax;//以a点为原点，从x轴上向前判断
        while(m>0&&!map[ay][m-1]) {
            xdot.push({top:ay,left:m-1});
            m--;
        }
        var n = ax;//以a点为原点，从x轴上向后判断
        while(n<(box.x+1)&&!map[ay][n+1]) {
            xdot.push({top:ay,left:n+1});
            n++;
        }
    }
    function path() {
        if (passLine(a.left,a.top,b.left,b.top)) {//判断ab是否可以用直线连接
            lineMap(a.left,a.top,b.left,b.top);//画线
            setTimeout("smach()",100);return//消灭图片
        }
        console.log("dot=1");
        if (!map[a.top][b.left]&&passLine(a.left,a.top,b.left,a.top)&&passLine(b.left,b.top,b.left,a.top)) {
            lineMap(a.left,a.top,b.left,a.top);//a到交叉点
            lineMap(b.left,b.top,b.left,a.top);//b到交叉点
            setTimeout("smach()",100);return
        }//判断ab是否可以用两条直线连接
        if (!map[b.top][a.left]&&passLine(a.left,a.top,a.left,b.top)&&passLine(b.left,b.top,a.left,b.top)) {
            lineMap(a.left,a.top,a.left,b.top);
            lineMap(b.left,b.top,a.left,b.top);
            setTimeout("smach()",100);return
        }//判断ab是否可以用两条直线连接
        console.log("dot=2");
        crossDot(a.left,a.top);
        for (var i = 0; i < ydot.length; i++) {
            if (top,b.left!==ydot[i].left&&passLine(ydot[i].left,ydot[i].top,b.left,ydot[i].top)) {
                if (!map[ydot[i].top][b.left]&&passLine(b.left,ydot[i].top,b.left,b.top)) {
                    lineMap(a.left,a.top,ydot[i].left,ydot[i].top);
                    lineMap(ydot[i].left,ydot[i].top,b.left,ydot[i].top);
                    lineMap(b.left,ydot[i].top,b.left,b.top);
                    setTimeout("smach()",100);return
                }//判断ab是否可以用3条直线连接
            }
        }
        for (var i = 0; i < xdot.length; i++) {
            if (b.top!==xdot[i].top&&passLine(xdot[i].left,xdot[i].top,xdot[i].left,b.top)) {
                if (!map[b.top][xdot[i].left]&&passLine(xdot[i].left,b.top,b.left,b.top)) {
                    lineMap(a.left,a.top,xdot[i].left,xdot[i].top);
                    lineMap(xdot[i].left,xdot[i].top,xdot[i].left,b.top);
                    lineMap(xdot[i].left,b.top,b.left,b.top);
                    setTimeout("smach()",100);return
                }//判断ab是否可以用3条直线连接
            }
        }
        $(".top"+(a.top-1)+":eq("+(a.left-1)+") button").removeClass("click-on");
        $(".top"+(b.top-1)+":eq("+(b.left-1)+") button").removeClass("click-on");
        xdot = [];//消灭失败,清空参数
        ydot = [];
        a = null;
        b = null;
    }
    function smach() {
        $(".top"+(a.top-1)+":eq("+(a.left-1)+") button").hide();//消灭成功,清空参数
        $(".top"+(b.top-1)+":eq("+(b.left-1)+") button").hide();
        map[a.top][a.left] = null;
        map[b.top][b.left] = null;
        xdot = [];
        ydot = [];
        a = null;
        b = null;
        box.count -= 2;//计数
        setTimeout(function(){$(".line").remove();},50);
        if (box.count==0) { alert("通关成功"); }
    }
    function lineMap(aLeft,aTop,bLeft,bTop) {
        txt="";
        var w = box.w/8;
        if (aTop==bTop) {//画横线
            txt = "<div class='line' style='top:"+(aTop*w-w/2)+"px;left:"+(Math.min(aLeft,bLeft)*w-w/2)+"px;width:"+Math.abs(aLeft-bLeft)*w+"px;height:10px'></div>"
        }
        else {//画竖线
            txt = "<div class='line' style='top:"+(Math.min(aTop,bTop)*w-w/2)+"px;left:"+(aLeft*w-w/2)+"px;width:10px;height:"+Math.abs(aTop-bTop)*w+"px'></div>"
        }
        $(".img-box-wrap").append(txt);
    }
