var map = [];
var box = { x:null, y:null, total:null, count:null,w: null, h: null };
var a = null;
var b = null;
var xdotArray = [];
var ydotArray = [];
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
        $("body").append(txt);
        txt = "";
        var numArray = [];
        for (var i = 0; i < box.total; i++) { numArray.push(i+1); }
        var numArray2 = numArray.sort(mathrandom);
        for (var i = 0; i < box.total; i++) { imgArray[i] = "img/img"+Math.ceil(numArray2[i]/4)+".jpg"; }
        // console.table(imgArray);
        for (var i = 0; i < box.y+2; i++) {
            map[i]=[];
            for (var j = 0; j < box.x+2; j++) {
                map[i][j] = null;
            }
        }
        for (var i = 0; i < box.y; i++) {
            for (var j = 0; j < box.x; j++) {
                map[i+1][j+1] = {top:i,left:j,img:imgArray[i*x+j]};
                var txt1 = "<div class='img-box top"+i+" left"+j+"' style='top:"+box.w/8*i+"px;left:"+box.w/8*j+"px;width:"+box.w/8+"px;height:"+box.w/8+"px'><button type='button' style='background-image: url("+imgArray[i*x+j]+")' onclick='clickImg("+i+","+j+")'></button></div>"
                txt += txt1;
            }
        }
        console.table(map);
        $(".img-box-wrap").append(txt);
    }
    function clickImg(y,x) {
        if (a==null) {
            a = {top:y+1,left:x+1};
            $(".top"+y+":eq("+x+") button").addClass("click-on");
            return;
        }else {
            b = {top:y+1,left:x+1};
            $(".top"+y+":eq("+x+") button").addClass("click-on");
        };
        console.log(map[a.top][a.left].img,map[b.top][b.left].img);
        if (map[a.top][a.left].img!==map[b.top][b.left].img) {
            $(".top"+(a.top-1)+":eq("+(a.left-1)+") button").removeClass("click-on");
            a = {top:y+1,left:x+1};
            b = null;
            return;
        }
        if (a.top==b.top&&a.left==b.left) {
            $(".top"+(a.top-1)+":eq("+(a.left-1)+") button").removeClass("click-on");
            a = null;
            b = null;
            return;
        }
        path();
    }
    function passLine(ax,ay,bx,by) {
        console.log("ax ",ax,"ay ",ay,"bx ",bx,"by ",by);
        if (ax==bx) {
            if (Math.abs(ay-by)==1) {
                return true;
            }
            var i = Math.min(ay,by)+1;
            var j = Math.max(ay,by)-1;
            while(!map[i][ax]) {
                if (i==j) {
                    return true;
                }
                i++;
            }
        }else if (ay==by) {
            if (Math.abs(ax-bx)==1) {
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
    function crossDot(ax,ay) {
        var i = ay;
        while(i>0&&!map[i-1][ax]) {
            ydotArray.push({top:i-1,left:ax});
            i--;
        }
        var j = ay;
        while(j<(box.y+1)&&!map[j+1][ax]) {
            ydotArray.push({top:j+1,left:ax});
            j++;
        }
        var m = ax;
        while(m>0&&!map[ay][m-1]) {
            xdotArray.push({top:ay,left:m-1});
            m--;
        }
        var n = ax;
        while(n<(box.x+1)&&!map[ay][n+1]) {
            xdotArray.push({top:ay,left:n+1});
            n++;
        }
    }
    function path() {
        if (passLine(a.left,a.top,b.left,b.top)) {
            lineMap(a.left,a.top,b.left,b.top);
            setTimeout("smach()",100);return
        }
        console.log("dot=1");
        if (!map[a.top][b.left]&&passLine(a.left,a.top,b.left,a.top)&&passLine(b.left,b.top,b.left,a.top)) {
            lineMap(a.left,a.top,b.left,a.top);
            lineMap(b.left,b.top,b.left,a.top);
            setTimeout("smach()",100);return
        }
        if (!map[b.top][a.left]&&passLine(a.left,a.top,a.left,b.top)&&passLine(b.left,b.top,a.left,b.top)) {
            lineMap(a.left,a.top,a.left,b.top);
            lineMap(b.left,b.top,a.left,b.top);
            setTimeout("smach()",100);return
        }
        console.log("dot=2");
        crossDot(a.left,a.top);
        for (var i = 0; i < ydotArray.length; i++) {
            if (top,b.left!==ydotArray[i].left&&passLine(ydotArray[i].left,ydotArray[i].top,b.left,ydotArray[i].top)) {
                if (!map[ydotArray[i].top][b.left]&&passLine(b.left,ydotArray[i].top,b.left,b.top)) {
                    lineMap(a.left,a.top,ydotArray[i].left,ydotArray[i].top);
                    lineMap(ydotArray[i].left,ydotArray[i].top,b.left,ydotArray[i].top);
                    lineMap(b.left,ydotArray[i].top,b.left,b.top);
                    setTimeout("smach()",100);return
                }
            }
        }
        for (var i = 0; i < xdotArray.length; i++) {
            if (b.top!==xdotArray[i].top&&passLine(xdotArray[i].left,xdotArray[i].top,xdotArray[i].left,b.top)) {
                if (!map[b.top][xdotArray[i].left]&&passLine(xdotArray[i].left,b.top,b.left,b.top)) {
                    lineMap(a.left,a.top,xdotArray[i].left,xdotArray[i].top);
                    lineMap(xdotArray[i].left,xdotArray[i].top,xdotArray[i].left,b.top);
                    lineMap(xdotArray[i].left,b.top,b.left,b.top);
                    setTimeout("smach()",100);return
                }
            }
        }
        if ((a.top==1&&b.top==1)||(a.top==box.y&&b.top==box.y)||(a.left==1&&b.left==1)||(a.left==box.x&&b.left==box.x)) {
            setTimeout("smach()",100);return
        }//靠边
        $(".top"+(a.top-1)+":eq("+(a.left-1)+") button").removeClass("click-on");
        $(".top"+(b.top-1)+":eq("+(b.left-1)+") button").removeClass("click-on");
        xdotArray = [];
        ydotArray = [];
        a = null;
        b = null;
    }
    function smach() {
        $(".top"+(a.top-1)+":eq("+(a.left-1)+") button").hide();
        $(".top"+(b.top-1)+":eq("+(b.left-1)+") button").hide();
        map[a.top][a.left] = null;
        map[b.top][b.left] = null;
        xdotArray = [];
        ydotArray = [];
        a = null;
        b = null;
        box.count -= 2;
        setTimeout(function(){$(".line").remove();},50);
        if (box.count==0) { alert("游戏结束"); }
    }
    function lineMap(aLeft,aTop,bLeft,bTop) {
        txt="";
        var w = box.w/8;
        if (aTop==bTop) {
            txt = "<div class='line' style='top:"+(aTop*w-w/2)+"px;left:"+(Math.min(aLeft,bLeft)*w-w/2)+"px;width:"+Math.abs(aLeft-bLeft)*w+"px;height:10px'></div>"
        }
        else {
            txt = "<div class='line' style='top:"+(Math.min(aTop,bTop)*w-w/2)+"px;left:"+(aLeft*w-w/2)+"px;width:10px;height:"+Math.abs(aTop-bTop)*w+"px'></div>"
        }
        $(".img-box-wrap").append(txt);
    }
