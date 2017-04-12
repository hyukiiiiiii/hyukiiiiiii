
$(function(){
  window.localStorage.clear();//清除浏览器储存
  $(".pop-wrap").hide();//隐藏弹出警告
  $("input.num").val(player);//输入框获取默认值

  $("input.num").focus(function(){//输入框focus事件使背景变色
    $("body").css("background-color","#ddd");
  });
  $("input.num").blur(function(){//输入框失焦事件使背景变回原色
    $("body").css("background-color","#fff");
  });

  $("input.num").bind('input propertychange',function(){//输入框实时获取输入值变化
  	if(re.test($("input.num").val()))//输入值符合正则表达式
    {
      player = $("input.num").val();//执行函数获取玩家、角色人数
      killerCal(player);
      $(".killer-num span").text(killer);
      $(".civilian-num span").text(civilian);
    }else//输入值不符合正则表达式
    {
      $(".killer-num span").text("");//角色人数为空
      $(".civilian-num span").text("");
    }
  });
  
  $(".role-match-btn").click(function(){//确认按钮点击事件
    if(!re.test($("input.num").val()))//输入值不正确，弹出警告框
    {
      $(".pop-wrap").show();
      $("button").click(function(){
        $(".pop-wrap").hide();
      });
    }else//输入值正确，写入本地储存
    {
      setPlayerJson(player,killer,civilian);
      window.location.href = "page3.html";
    }
  });
})

var player = 12,killer = 3,civilian = 9;
var playerJson = {};
var re = /^[4-8]$|^1[0-8]$/;

function killerCal(player) {
  killer = Math.floor(player/3.5);
  civilian = player - killer;
  return killer , civilian;
}

function setPlayerJson(player,killer,civilian) {
  playerJson = {player:player,killer:killer,civilian:civilian};
  playerJson = JSON.stringify(playerJson);
  window.localStorage.playerJson = playerJson;
}
