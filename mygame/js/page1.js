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

*///隐藏菜单
$(function(){
  $(".page2").hide();
  $(".left-page,.right-page").click(function(){
    $(".page1").toggle();
    $(".page2").toggle();
  });
  $("#newgame").click(function(){
    window.location = "page2.html";
  });
})
