angular.module("myApp")
.filter("numToType",function() {
    articleType = ["首页banner","找职位banner","找精英banner","行业大图"];
    return function(text) {
        return articleType[parseInt(text)];
    }
})
.filter("numToStatus",function() {
    articleStatus = ["全部","草稿","上线"];
    return function(text) {
        return articleStatus[parseInt(text)];
    }
})
.filter("numToIndustry",function() {
    articleIndustry = ["移动互联网","电子商务","企业服务","O2O","教育","金融","游戏"];
    return function(text) {
        return articleIndustry[parseInt(text)];
    }
})
.filter("stringToDate",function() {
    var date, year, month, day, hours, min, sec;
    return function(string) {
        function num2(num) {
            if ((num+"").length>1) {
                return num;
            }return num = "0"+num;
        };
        date = new Date(string);
        year = date.getFullYear();
        month = num2(date.getMonth()+1);
        day = num2(date.getDate());
        hours = num2(date.getHours());
        min = num2(date.getMinutes());
        sec = num2(date.getSeconds());
        date = year+"-"+month+"-"+day+"\n"+hours+":"+min+":"+sec;
        return string = date;
    }
})
.filter("statusToAct",function() {
    switchArr = ["","上线","下线"];
    return function(text) {
        return switchArr[parseInt(text)];
    }
})
