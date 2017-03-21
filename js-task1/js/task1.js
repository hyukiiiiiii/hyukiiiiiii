
    var oWrap = document.getElementsByClassName('wrap')[0];
    var aDiv = oWrap.getElementsByTagName('div');
    var startBtn = document.getElementById('startbtn');
    var endBtn = document.getElementById('endbtn');
    var selectArr = [];
    var selcolor = null;
    var timer = null;

    function selectDiv() {
        a = Math.floor(Math.random()*9);
        do {b = Math.floor(Math.random()*9);}
        while (b==a);
        do {c = Math.floor(Math.random()*9);}
        while (c==a||c==b);
        selectArr[0]=a;
        selectArr[1]=b;
        selectArr[2]=c;
        return;
    }

    function selectColor() {
        colorR = Math.floor(Math.random()*256);
        colorG = Math.floor(Math.random()*256);
        colorB = Math.floor(Math.random()*256);
        selcolor ="rgb(" + colorR + "," + colorG + "," + colorB + ")";
        return;
    }

    function returnOrange() {
        for (var i = 0; i < aDiv.length; i++) {
            aDiv[i].style.backgroundColor = "orange";
        }
    }

    function changeColor() {
        returnOrange();
        selectDiv();
        for (var i = 0; i < 3; i++) {
            selectColor();
            aDiv[selectArr[i]].style.backgroundColor = selcolor;
        }
    }

    function startTimer() {
        clearInterval(timer);
        changeColor();
        timer = setInterval(changeColor,1000);
    }

    function endTimer() {
        clearInterval(timer);
        returnOrange();
    }

