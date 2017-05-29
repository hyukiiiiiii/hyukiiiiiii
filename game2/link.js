
var box = { x: null, y: null, total: null , count: null ,local: [], match1: null , match2: null };
var txt = "";
var imgArray = [];

$(document).ready(function(){
    getDiv(6,8);
})
    function getDiv(x,y) {
        box.x = x;
        box.y = y;
        box.total = x*y;
        box.count = box.total;
		var numArray = [];
        for (var i = 0; i < box.total; i++) { numArray.push(i+1); }
        var numArray2 = numArray.sort(mathrandom);
        for (var i = 0; i < box.total; i++) {
            imgArray[i] = {link: "img/img"+Math.ceil(numArray2[i]/2)+".jpg",index: (numArray2[i]%2)}
        }
        console.table(imgArray);
        for (var i = 0; i < box.x; i++) {
            for (var j = 0; j < box.y; j++) {
                box.local.push({a:i,b:j});
            }
        }
        for (var i = box.total; i > 0; i--) {
        	var txt0 = "<button type='button' class='img-box num"+(i-1)+" a"+box.local[i-1].a+" b"+box.local[i-1].b+"' style='background-image: url("+imgArray[i-1].link+")' onclick='clickImg("+box.local[i-1].a+","+box.local[i-1].b+")'></button>"
            txt += txt0;
        }
        console.log(txt);
        $(".img-box-wrap").append(txt);
    }
    function clickImg(x,y) {
        var num = x*8+y;
        console.log(num);
        if (box.match1!==null) {
            box.match2 = num;
            $(".num"+box.match2).addClass("click-on");
            if (imgArray[box.match1].link==imgArray[box.match2].link) {
                if (imgArray[box.match1].index!==imgArray[box.match2].index) {
                    $(".num"+box.match1).hide();
                    $(".num"+box.match2).hide();
                    box.count -= 2;
                }
                box.match2 = null;
                box.match1 = null;
            }else {
                $(".num"+box.match1).removeClass("click-on");
                box.match1 = num;
                box.match2 = null;
            }
        }else {
            box.match1 = num;
            $(".num"+box.match1).addClass("click-on");
        };
        console.log("img1: ",box.match1);
        console.log("img2: ",box.match2);
        if (box.count==0) {
            alert("游戏结束");
        }
    }
    function mathrandom(a,b) {
        return Math.random()>.5?-1:1;
    }