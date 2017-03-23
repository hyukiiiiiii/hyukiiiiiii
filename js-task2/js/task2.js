/*
    var oBody = document.getElementsByTagName('body')[0];
    var oBtn = document.getElementsByClassName('homepage-menu')[0];
    var oNav = document.getElementsByTagName('nav')[0];
    var oMain = document.getElementsByTagName('main')[0];
    var oMask = document.getElementsByClassName('g-mask')[0];
      
    oBtn.onclick = function () {
      oBody.style.overflow="hidden";
      oNav.style.transform="translateX(0)";
      oMain.style.transform="translateX(240px)";
      oMask.style.display="block";
      oMask.style.transform="translateX(240px)";
    }

    oMask.onclick = function () {
      oBody.style.overflow="visible";
      oNav.style.transform="translateX(-240px)";
      oMain.style.transform="translateX(0)";
      oMask.style.transform="translateX(0)";
      oMask.style.display="none";
    }

*/
$(function(){
  $(".page2").hide();
  $(".left-page,.right-page").click(function(){
    $(".page1").toggle();
    $(".page2").toggle();
  })
  $("#newgame").click(function(){
    location.href='./task2-2.html';
  });
  $(".bg-mask").hide();
  $(".pop-up").hide();
  $("input.num").focus(function(){
    $("main").css("background-color","#ddd");
  })
  $("input.num").bind('input propertychange',function()
  {
  	if(re.test($("input.num").val()))
    {
      $(".killer-num span").text(roleMatch($("input.num").val()));
      $(".civilian-num span").text($("input.num").val()-roleMatch($("input.num").val()));
    }else
    {
      $(".killer-num span").text("");
      $(".civilian-num span").text("");
    }
  })
  /*$("input.num").blur(function(){
    $("main").css("background-color","#fff");
    if(re.test($("input.num").val()))
    {
      $(".killer-num span").text(roleMatch($("input.num").val()));
      $(".civilian-num span").text($("input.num").val()-roleMatch($("input.num").val()));
    }else
    {
      $(".killer-num span").text("");
      $(".civilian-num span").text("");
    }
  })*/
  $(".role-match-btn").click(function(){
    if(!re.test($("input.num").val()))
    {
      $(".bg-mask").show();
      $(".pop-up").show();
      $(".cancel-btn").click(function(){
        $(".bg-mask").hide();
        $(".pop-up").hide();
      });
      $(".confirm-btn").click(function(){
        $(".bg-mask").hide();
        $(".pop-up").hide();
      })
    }else
    {
      location.href='./task2-3.html';
    }
  })
});

var a = null;
var b = null;
var re = /^[4-8]$|^1[0-8]$/;

function roleMatch(a) {
  if(a==4)
  {
  	b=1;
  }else if(a>=5&&a<=7)
  {
    b = 2;
  }else if(a>=8&&a<=10)
  {
    b = 3;
  }else if(a>=11&&a<=13)
  {
    b = 4;
  }else if(a>=14&&a<=18)
  {
    b = 5;
  }
  return b;
}
function checkNum(a) {
  if(!re.test(a))
  {
    alert("请输入正确的玩家数量");
  }
}