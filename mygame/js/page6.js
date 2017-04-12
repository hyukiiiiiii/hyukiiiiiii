
var day = parseInt(window.localStorage.day);
var clock = parseInt(window.localStorage.clock);
var roleJson = JSON.parse(window.localStorage.roleJson);
var playerJson = JSON.parse(window.localStorage.playerJson);

$(function(){
	console.log("day:"+window.localStorage.day);
	console.log("clock:"+window.localStorage.clock);
	console.table(roleJson);
	console.log(playerJson);
	$(".killer span").text(playerJson.killer);
	$(".civilian span").text(playerJson.civilian);
	getResultDetails();
});

function getResultDetails() {
	var txt1,txt2,txt3,txt4,txt;
	for (var i = 1; i < day; i++) {
		txt1 = '<h5>第'+i+'天</h5>';
		for (var j = 0; j < playerJson.player; j++) {
			if (roleJson[j].deadDay == i&&roleJson[j].clock == 1)
			{
				txt2 = '<p>黑夜：'+(j+1)+'号被杀死了，真实身份是'+roleJson[j].name+'</p>';
			}
			if (roleJson[j].deadDay == i&&roleJson[j].clock == 4)
			{
				txt3 = '<p>白天：'+(j+1)+'号被投死了，真实身份是'+roleJson[j].name+'</p>';
			}
		}
		txt = '<li class="day">'+txt1+txt2+txt3+'</li>';
		$(".result-details").append(txt);
	}
	if (clock == 2) {
		txt1 = '<h5>第'+day+'天</h5>';
		for (var j = 0; j < playerJson.player; j++) {
			if (roleJson[j].deadDay == day)
			{
				txt2 = '<p>黑夜：'+(j+1)+'号被杀死了，真实身份是'+roleJson[j].name+'</p>';
			}
		}
		txt = '<li class="day">'+txt1+txt2+'</li>';
		$(".result-details").append(txt);
	}
}