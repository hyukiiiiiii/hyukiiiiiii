
var table = [];
var box = {
        x:null, y:null, total:null, count:null,
        a:null, b:null, temp:null, temp2: null,
        numT1:0, numB1:0, numT2:0, numB2:0, numT:0, numB:0,
        numL1:0, numL2:0, numR1:0, numR2:0, numR:0, numL:0
    };
var txt = "";
var imgArray = [];

$(document).ready(function(){
    getDiv(6,8);
})
    function mathrandom(a,b) { return Math.random()>.5?-1:1; }
    function getDiv(x,y) {
        box.x = x;
        box.y = y;
        box.total = x*y;
        box.count = box.total;
        var numArray = [];
        for (var i = 0; i < box.total; i++) { numArray.push(i+1); }
        var numArray2 = numArray.sort(mathrandom);
        for (var i = 0; i < box.total; i++) { imgArray[i] = "img/img"+Math.ceil(numArray2[i]/4)+".jpg"; }
        // console.table(imgArray);
        for (var i = 0; i < box.x; i++) {
            table[i] = [];
            for (var j = 0; j < box.y; j++) {
                table[i].push({a:i,b:j,img:imgArray[i*y+j]});
                var txt1 = "<button type='button' class='img-box a"+i+" b"+j+"' style='background-image: url("+imgArray[i*y+j]+")' onclick='clickImg("+i+","+j+")'></button>"
                txt += txt1;
            }
        }
        // console.log(table);
        $(".img-box-wrap").append(txt);
    }
    function clickImg(x,y) {
        if (box.a==null) {
            box.a ={a:x,b:y};
            $(".a"+x+":eq("+y+")").addClass("click-on");
            return;
        }else {
            box.b = {a:x,b:y};
            $(".a"+x+":eq("+y+")").addClass("click-on");
        };
        if (table[box.a.a][box.a.b].img!==table[box.b.a][box.b.b].img) {
            $(".a"+box.a.a+":eq("+box.a.b+")").removeClass("click-on");
            box.a = {a:x,b:y};
            box.b = null;
            return;
        }
        if (box.a.a==box.b.a&&box.a.b==box.b.b) {
            $(".a"+box.a.a+":eq("+box.a.b+")").removeClass("click-on");
            box.a = null;
            box.b = null;
            return;
        }
        console.log("53");
        if ((box.a.a==0&&box.b.a==0)||(box.a.a==5&&box.b.a==5)) { smach();return }//靠边
        if ((box.a.b==0&&box.b.b==0)||(box.a.b==7&&box.b.b==7)) { smach();return }
        if (box.a.a==box.b.a&&Math.abs(box.a.b-box.b.b)==1) { smach();return }//相邻
        if (box.a.b==box.b.b&&Math.abs(box.a.a-box.b.a)==1) { smach();return }
        if (box.b.b<box.a.b) {
            box.temp = box.a;
            box.a = box.b;
            box.b = box.temp;
        }
        console.log("75");
        box.numT1 = box.a.a;
        for (var i = box.a.a; i > 0 ; i--) {
            if (table[i-1][box.a.b]!=="") { break }
            box.numT1--;
        }
        box.numT2 = box.b.a;
        for (var i = box.b.a; i > 0 ; i--) {
            if (table[i-1][box.b.b]!=="") { break }
            box.numT2--;
        }
        box.numB1 = box.a.a;
        for (var i = box.a.a; i < 5 ; i++) {
            if (table[i+1][box.a.b]!=="") { break }
            box.numB1++;
        }
        box.numB2 = box.b.a;
        for (var i = box.b.a; i < 5 ; i++) {
            if (table[i+1][box.b.b]!==""){ break }
            box.numB2++;
        }
        console.log("T1 ",box.numT1,"B1 ",box.numB1,"T2 ",box.numT2,"B2 ",box.numB2);
        console.log("108");
        if (box.numT1==0&&box.numT2==0) { smach();return }
        if (box.numB1==5&&box.numB2==5) { smach();return }
        if (box.numB1==box.numT2) {
            if ((box.b.b-box.a.b)==1) { smach();return }
            var i = box.a.b+1;
            while(table[box.numB1][i]=="") {
                if (i==(box.b.b-1)) { smach();return }
                i++;
            }
        }
        if (box.numT1==box.numB2) {
            if ((box.b.b-box.a.b)==1) { smach();return }
            var i = box.a.b+1;
            while(table[box.numT1][i]=="") {
                if (i==(box.b.b-1)) { smach();return }
                i++;
            }
        }
        console.log("131");
        if ((box.numB1>box.numT2)&&(box.numT1<box.numB2)) {
            box.numT=box.numT1>box.numT2?box.numT1:box.numT2;
            box.numB=box.numB1>box.numB2?box.numB2:box.numB1;
            if ((box.b.b-box.a.b)==1) { smach();return }
            for (var i = box.numT; i < box.numB+1; i++) {
                var j = box.a.b+1;
                while(table[i][j]=="") {
                    if (j==(box.b.b-1)) { smach();return }
                    j++;
                }
            }
        }
        console.log("145");
        box.numL1 = box.a.b;
        for (var i = box.a.b; i > 0 ; i--) {
            if (table[box.a.a][i-1]!=="") { break }
            box.numL1--;
        }
        box.numL2 = box.b.b;
        for (var i = box.b.b; i > 0 ; i--) {
            if (table[box.b.a][i-1]!=="") { break }
            box.numL2--;
        }
        box.numR1 = box.a.b;
        for (var i = box.a.b; i < 7 ; i++) {
            if (table[box.a.a][i+1]!=="") { break }
            box.numR1++;
        }
        box.numR2 = box.b.b;
        for (var i = box.b.b; i < 7 ; i++) {
            if (table[box.b.a][i+1]!=="") { break }
            box.numR2++;
        }
        console.log("L1 ",box.numL1,"R1 ",box.numR1,"L2 ",box.numL2,"R2 ",box.numR2)
        if (box.numL1==0&&box.numL2==0) { smach();return }
        if (box.numR1==7&&box.numR2==7) { smach();return }
        if (box.numR1==box.numL2) {
            if (Math.abs(box.a.a-box.b.a)==1) { smach();return }
            box.temp = box.a.a>box.b.a?box.b.a:box.a.a;
            var i = box.temp+1;
            box.temp = box.a.a>box.b.a?box.a.a:box.b.a
            while(table[i][box.numR1]=="") {
                if (i==(box.temp-1)) { smach();return }
                i++;
            }
        }
        if (box.numL1==box.numR2) {
            if (Math.abs(box.a.a-box.b.a)==1) { smach();return }
            box.temp = box.a.a>box.b.a?box.b.a:box.a.a;
            var i = box.temp+1;
            box.temp = box.a.a>box.b.a?box.a.a:box.b.a
            while(table[i][box.numL1]=="") {
                if (i==(box.temp-1)) { smach();return }
                i++;
            }
        }
        if (box.numR1>box.numL2&&box.numL1<box.numR2) {
            box.numR = box.numR2<box.numR1?box.numR2:box.numR1;
            box.numL = box.numL2>box.numR1?box.numL2:box.numL1;
            if (Math.abs(box.a.a-box.b.a)==1) { smach();return }
            box.temp = box.a.a>box.b.a?box.b.a:box.a.a;
            box.temp2 = box.a.a>box.b.a?box.a.a:box.b.a;
            for (var i = box.numL; i < box.numR+1; i++) {
                var j = box.temp+1;
                while(table[j][i]=="") {
                    if (j==(box.temp2-1)) { smach();return }
                    j++;
                }
            }
        }
        $(".a"+box.a.a+":eq("+box.a.b+")").removeClass("click-on");
        $(".a"+box.b.a+":eq("+box.b.b+")").removeClass("click-on");
        box.a = null;
        box.b = null;
    }
    function smach() {
        $(".a"+box.a.a+":eq("+box.a.b+")").hide();
        $(".a"+box.b.a+":eq("+box.b.b+")").hide();
        table[box.a.a][box.a.b] = "";
        table[box.b.a][box.b.b] = "";
        box.a = null;
        box.b = null;
        box.count -= 2;
        if (box.count==0) { alert("游戏结束"); }
    }