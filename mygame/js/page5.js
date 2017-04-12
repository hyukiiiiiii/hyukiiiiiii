
var roleJson = JSON.parse(window.localStorage.roleJson);
var playerJson = JSON.parse(window.localStorage.playerJson);
var day = parseInt(window.localStorage.day);

$(function(){
	console.log("day:"+window.localStorage.day);
	active();
	addDay();
	addEvent();
	btnDisable();
})

function active() {
	$(".pop-wrap").hide();//隐藏弹出警告
	$("button").click(function(){
		$(".pop-wrap").hide();
	});//警告框取消按钮
	$(".finish-btn").click(function(){
		window.location = "page6.html";
	});
	$(".judge-record").click(function(){
		window.location = "page6.html";
	});	
}

function addDay() {
	var dayArr = ["一","二","三","四","五","六","七","八","九","十"];
	for (var i = 0; i < day; i++) {
		var txt = '<div class="day">第'+dayArr[i]+'天</div>';
		$(".day-list").append(txt);
	}
}

function addEvent() {
	var txt1 = '<div class="kill event"><i></i>杀手杀人</div>';
	var txt2 = '<div class="lastword event"><i></i>亡灵发表遗言</div>';
	var txt3 = '<div class="talk event"><i></i>玩家依次发言</div>';
	var txt4 = '<div class="vote event"><i></i>全民投票</div>';
	$(".event-list").append(txt1,txt2,txt3,txt4);
}

function btnDisable() {	
	var clock = parseInt(window.localStorage.clock);
	console.log(clock);
	switch (clock)
	{
	case 0:
		isFinish();
		$(".kill").click(function(){
			window.localStorage.clock = 1;
			window.location = "page4.html";
		});
		break;
	case 2:
		isFinish();
		$(".kill").addClass("disable-event");
		getLastDead();
		$(".lastword").click(function(){
			$(".pop-wrap").show();
			$(".confirm-btn").click(function(){
				window.localStorage.clock = 3;
				btnDisable();
			});
		});
		break;
	case 3:
		$(".kill").addClass("disable-event");
		$(".lastword").addClass("disable-event");
		$(".lastword").unbind("click");
		$(".talk").click(function(){
			$(".pop-wrap").show(0,function(){
				$(".pop-up p").text("玩家依次发言讨论");
			});
			$(".confirm-btn").click(function(){
				window.localStorage.clock = 4;
				btnDisable();
			});
		});
		break;
	case 4:
		$(".kill").addClass("disable-event");
		$(".lastword").addClass("disable-event");
		$(".talk").addClass("disable-event");
		$(".talk").unbind("click");
		$(".vote").click(function(){
			window.location = "page4.html";
		});
		break;
	}
}

function getLastDead() {//杀人情况描述
	for (var i = 0; i < playerJson.player; i++) {
		if (roleJson[i].deadDay == day) {
			$(".kill").after('<p>'+(i+1)+'号被杀手杀死，真实身份是'+roleJson[i].name+'</p>');
		}
	}
}

function isFinish() {//判断游戏是否结束
	var killer = playerJson.killer;
	var civilian = playerJson.civilian;

	if (killer==0||killer>=civilian) {
		$(".pop-wrap").show(0,function(){
				$(".pop-up p").text("本轮游戏是否已经结束？");
			});
		$("button").click(function(){
			window.location = "page6.html";
		});
	}
}
