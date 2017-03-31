$(function(){
  nomalize();//显示背面，角色号码，确认按钮
  $(".role-check-btn").click(function(){//确认角色
    roleCheck();
  }); 
  $(".hide-and-pass-btn").click(function(){//切换到下一个卡面
    hideAndPass();
  });
  $(".judge-check-btn").click(function(){//没有下一个卡面时出现
    window.localStorage.clock = 0;
    var oUrl = "task2-4.html";
    window.location.href=oUrl;
  });
})

var player,killer,civilian;
var num = 0;
var roleJson = {};
var playerJson = {};

function nomalize() {
  $(".front-side").hide();//只显示背面
  $("p.role").hide();//未显示角色
  $(".hide-and-pass-btn").hide();//角色显示后出现
  $(".judge-check-btn").hide();//所有角色显示后出现
  $(".player-num").text(num+1);//角色号码
  $(".role-check-btn span").text(num+1);//确认按钮上的号码
  getPlayerJson();//执行函数获得角色
}

function getPlayerJson() {
  playerJson = JSON.parse(window.localStorage.playerJson);
  player = playerJson.player;
  killer = playerJson.killer;
  civilian = playerJson.civilian;
  if(!window.localStorage.roleJson)
  {
    roleMatch(player,killer,civilian);//执行角色随机排序函数获取角色排列
  }else
  {
    roleJson = JSON.parse(window.localStorage.roleJson);//从下个页面返回时直接获取json
    console.table(roleJson);
  }
}

function roleMatch(player,killer,civilian) {//角色随机排序
  var playerArr=[];
  for (var i = 0; i < player; i++) {//顺序排序
    if(i < killer)
    {
      playerArr[i] = "杀手";
    }else
    {
      playerArr[i] = "平民";
    }
  }
  console.log(playerArr);
  playerArr.sort(function(){//重新排序
    return Math.random()>0.5?-1:1;
  });
  console.log(playerArr);
  setRoleJson(playerArr);//执行函数角色排序储存到localstore
}

function setRoleJson(playerArr) {//角色排序储存到localstore
  for (var i = 0; i < player; i++) {
    roleJson[i] = {name:playerArr[i],deadDay:null,clock:null};
  };
  console.table(roleJson);
  roleJson = JSON.stringify(roleJson);//json格式转换为字符串
  window.localStorage.roleJson = roleJson;
  roleJson = JSON.parse(window.localStorage.roleJson);//字符串格式转换为json
}

function roleCheck(){//确认按钮下的执行函数，翻牌并切换按钮
  $("p.role").show(0,function(){
    $("p.role").text(roleJson[num].name);
  });
  $(".back-side").hide();
  $(".front-side").show();
  $(".role-check-btn").hide();
  num++;
  if(num<player)
  {
    $(".hide-and-pass-btn").show(0,function(){
      $(".hide-and-pass-btn span").text(num+1);
    });
  }else
  {
    $(".judge-check-btn").show();
  }
}

function hideAndPass(){//切换到下一个卡面
  $(".player-num").text(num+1);
  $(".front-side").hide();
  $("p.role").hide();
  $(".hide-and-pass-btn").hide();
  $(".back-side").show();
  $(".role-check-btn").show(0,function(){
    $(".role-check-btn span").text(num+1);
  });
}