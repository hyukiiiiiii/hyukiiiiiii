$(function(){
  $(".front-side").hide();
  $("p.role").hide();
  $(".hide-and-pass-btn").hide();
  $(".judge-check-btn").hide();
  getPlayernum();
  roleMatch(player,killer,civilian);

  $(".player-num").text(num+1);
  $(".role-check-btn span").text(num+1);
  $(".role-check-btn").click(function(){
    $("p.role").show(0,function(){
      $("p.role").text(playerArr[num]);
    });
    $(".back-side").hide();
    $(".front-side").show();
    $(".role-check-btn").hide();
    num++;
    if(num<playerArr.length)
    {
      $(".hide-and-pass-btn").show(0,function(){
        $(".hide-and-pass-btn span").text(num+1);
      });
    }else
    {
      $(".judge-check-btn").show();
    }
  }); 

  $(".hide-and-pass-btn").click(function(){
    $(".player-num").text(num+1);
    $(".front-side").hide();
    $("p.role").hide();
    $(".hide-and-pass-btn").hide();
    $(".back-side").show();
    $(".role-check-btn").show(0,function(){
      $(".role-check-btn span").text(num+1);
    });
  });
  $(".judge-check-btn").click(function(){
    window.location="task2-4.html";
  });
})

var player = null;
var killer = null;
var civilian = null;
var num = 0;
var playerArr=[];

function getPlayernum() {
  var url = location.href;
  var tmp1 = url.split("?")[1];
  var tmp2 = tmp1.split(",");
  player = tmp2[0].split("=")[1];
  killer = tmp2[1].split("=")[1];
  civilian = tmp2[2].split("=")[1];
}

function roleMatch(player,killer,civilian) {
  for (var i = 0; i < Number(player); i++) {
    if(i < killer)
    {
      playerArr[i] = "杀手";
    }else
    {
      playerArr[i] = "平民";
    }
  }
  console.log(playerArr);
  playerArr.sort(function(){
    return Math.random()>0.5?-1:1;
  });
  console.log(playerArr);
}