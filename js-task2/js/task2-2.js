
$(function(){
  $(".bg-mask").hide();
  $(".pop-up").hide();
  $("input.num").val(player);
  $("input.num").focus(function(){
    $("body").css("background-color","#ddd");
  });
  $("input.num").bind('input propertychange',function(){
  	if(re.test($("input.num").val()))
    {
      player = $("input.num").val();
      killerCal(player);
      $(".killer-num span").text(killer);
      $(".civilian-num span").text(civilian);
    }else
    {
      $(".killer-num span").text("");
      $(".civilian-num span").text("");
    }
  });
  $("input.num").blur(function(){
    $("body").css("background-color","#fff");
  });
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
      var myurl = "task2-3.html"+"?"+"player="+player+",killer="+killer+",civilian="+civilian;
      window.location.assign(myurl);
    }
  });
})
  //玩家配比页
var player = 12;
var killer = 4;
var civilian = 8;
var re = /^[4-8]$|^1[0-8]$/;

function killerCal(player) {
  if(player==4)
  {
    killer=1;
  }else if(player>=5&&player<=7)
  {
    killer = 2;
  }else if(player>=8&&player<=10)
  {
    killer = 3;
  }else if(player>=11&&player<=13)
  {
    killer = 4;
  }else if(player>=14&&player<=18)
  {
    killer = 5;
  }
  civilian = player - killer;
  return killer , civilian;
}

