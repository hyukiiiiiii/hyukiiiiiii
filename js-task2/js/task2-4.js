
var day = parseInt(window.localStorage.day);
var clock = parseInt(window.localStorage.clock);
var roleJson = JSON.parse(window.localStorage.roleJson);
var playerJson = JSON.parse(window.localStorage.playerJson);

$(function(){
	console.log("day:"+window.localStorage.day);
	console.log("clock:"+clock);
	console.table(roleJson);
	activeCheck();//判断clock
	addRoleBox();
	target();
	kill();
});

function activeCheck() {
	$(".pop-wrap").hide();//隐藏弹出警告
	$("button").click(function(){
		$(".pop-wrap").hide();
	});
	if(clock==0)//首次进入页面时无法杀人
	{
		$(".bubble-instruct").hide();
		$(".instruct").text("");
		$(".kill-btn").hide();
		$(".game-start-btn").click(function(){
			window.localStorage.day = 1;
			window.location = "task2-5.html";
		})
	}else
	{
		$(".kill-btn").show();
		$(".game-start-btn").hide();
		if(clock==4)
		{
			$(".bubble-instruct").text("发言讨论结束，大家请投票");
			$(".instruct").text("点击得票数最多人的头像");
		}
	}
}

function addRoleBox() {//添加角色卡牌
	var txt1,txt2,txt3,txt;
	for (var i = 0; i < playerJson.player; i++) {
		txt1 = '<p class="role">'+roleJson[i].name+'</p><p class="num">'+(i+1)+'号</p>';
		txt2 = '<div class="role-box live"><div class="box">'+txt1+'</div><i class="target"></i></div>';//活的
		txt3 = '<div class="role-box"><div class="box">'+txt1+'</div><i class="target"></i></div>';//死的
		if (roleJson[i].deadDay == null) {
			txt = txt2;
		}else{
			txt = txt3;
		}
		$(".role-box-wrap").append(txt);
	}
}

function target() {//选中角色，卡牌下方出现小刀
	if (clock!==0) {
		$(".role-box").each(function(){
			$(".live").eq($(this).index()).click(function(){
				$(".target").removeClass("opacity");
				console.log("tartget on: No."+($(this).index()+1));
				window.localStorage.num=$(this).index();
				$(".target").eq($(this).index()).addClass("opacity");
				$(".kill-btn").removeAttr("disabled");
			});
		});
	}
}

function kill() {
	$(".kill-btn").click(function(){
		var num = parseInt(window.localStorage.num);
		if(clock == 1&&roleJson[num].name=="杀手"&&playerJson.killer == 1)//当只有唯一一个杀手时，杀手不能自杀
		{
			$(".pop-wrap").show(0,function(){
				$(".target").removeClass("opacity");
				$(".kill-btn").attr("disabled",true);
			})
		}else
		{
			if (clock == 1)//杀手杀人
			{
				roleJson[num].deadDay = day;
				roleJson[num].clock = 1;
				window.localStorage.clock = 2;
			}else if (clock == 4)//投票杀人
			{
				roleJson[num].deadDay = day;
				roleJson[num].clock = 4;
				window.localStorage.clock = 0;
				window.localStorage.day = (day + 1);
			}
			window.localStorage.roleJson = JSON.stringify(roleJson);
			recountPlayer(num);
			window.location = "task2-5.html";
		}
	})
}

function recountPlayer(num) {//存活角色计数
	if(roleJson[num].name=="杀手")
	{
		playerJson.killer = playerJson.killer - 1;
	}else if(roleJson[num].name=="平民")
	{
		playerJson.civilian = playerJson.civilian - 1;
	}
	playerJson = JSON.stringify(playerJson);
	window.localStorage.playerJson = playerJson;
}

