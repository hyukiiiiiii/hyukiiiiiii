angular.module("myApp")
.controller("formCtrl",function($scope,$http,$state,ipCookie) {
    $scope.user = ipCookie("managementAcount");//从cookies获取账号和密码
    $scope.login = function() {
        $scope.acount = angular.copy($scope.user);//获取账号和密码
        console.log("acount: ",$scope.acount);
        $http({
            method: "post",
            params: $scope.acount,
            url: "/carrots-admin-ajax/a/login/"
        }).then(function successCallback(response) {
            $scope.data = response.data;//登录结果
            console.log("login => http.post => response.data => ",response.data);
            if($scope.data.message=="success"){
                ipCookie("managementAcount",$scope.acount,{expires: 10});//账号和密码存为cookies
                $scope.cookies = ipCookie("managementAcount");
                $state.go("management");
            }else {
                alert($scope.data.message);
                console.log($scope.data.message);
            }
        },function errorCallback(response){
            console.log(response);
        });
    }
});