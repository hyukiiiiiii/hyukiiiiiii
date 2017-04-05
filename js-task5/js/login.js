

$(document).ready(function() {
	$("#login").on("click",function(){
        $(".caution").text("");
        jsLogin();
    });
});


function jqLogin() {
    var lname = $("#loginname").val();
    var lpwd = $("#loginpwd").val();
    console.log(lname);
    console.log(lpwd);
    $.ajax({
        //提交数据的类型 POST GET
        type:"POST",
        //提交的网址
        url:"/carrots-admin-ajax/a/login/",
        //提交的数据
        data:{name:lname,pwd:lpwd},
        //返回数据的格式
        datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
        //在请求之前调用的函数
        //beforeSend:function(){$("#msg").html("logining");},
        //成功返回之后调用的函数
        success:function(data){
        //$("#msg").html(decodeURI(data));
            var loginjson = JSON.parse(data);
            if (loginjson.message=="success") {
                window.location = "task6.html";
            }else {
        $(".caution").text("无此用户")
            }
        },
        //调用执行后调用的函数
        complete: function(XMLHttpRequest, textStatus){
            console.log(XMLHttpRequest.responseText);
            console.log(textStatus);
            //HideLoading();
        },
        //调用出错执行的函数
        error : function (XMLHttpRequest,textStatus,thrownError) {
            console.error(textStatus);
            console.info(XMLHttpRequest);
            console.error(thrownError);
            return false;
            // thrownError 只有当异常发生时才会被传递;
        }
    })
}

function jsLogin() {
    var loginName = document.getElementById('loginname').value;
    var loginPwd = document.getElementById('loginpwd').value;
    console.log(loginName);
    console.log(loginPwd);
    var loginhttp;
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        loginhttp = new XMLHttpRequest();
    }else {
        // IE6, IE5 浏览器执行代码
        loginhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    loginhttp.onreadystatechange=function()
    {
        if (loginhttp.readyState==4 && loginhttp.status==200)
        {   
            console.log(loginhttp.responseText);
            var login = JSON.parse(loginhttp.responseText);
            if (login.message=="success") {
               window.location = "task6.html";
            }
            else {
                oCaution.innerHTML = "无此用户";
            }
        }
    }
    loginhttp.open("POST","/carrots-admin-ajax/a/login/",true);
    loginhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=utf-8");
    loginhttp.send("name="+loginName+"&pwd="+loginPwd);
}
