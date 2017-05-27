angular.module("myApp")
.controller("managementCtrl",function($scope,$http,$state,ipCookie) {
    
    $scope.acountCookie = ipCookie("managementAcount");
    if ($scope.acountCookie) {
        $scope.acount = $scope.acountCookie;
        $http({
            method: "post",
            params: $scope.acount,
            url: "/carrots-admin-ajax/a/login/"
        }).then(function successCallback(response) {
            $scope.login = response.data;
            if($scope.login.message=="success"){
                $scope.manager = $scope.login.data.manager;
                $scope.role = $scope.login.data.role;
            }else { alert($scope.login.message); }
        },function errorCallback(response){ $state.go("login"); });
    }else { $state.go("login"); }

    $scope.logOut = function() {
        console.log("logout");
        $http({
            method: "post",
            url: "/carrots-admin-ajax/a/logout/"
        }).then(function successCallback(response) {
            $scope.logout = response.data;
            if ($scope.logout.message=="success"){ $state.go("login"); }
        },function errorCallback(response){ console.log(response.data)})
    }

    $scope.isShow = false; 
    
    $scope.atcListToggle = function() { $scope.isShow = !$scope.isShow; }
    $scope.toAtcList = function() {
        $(".mng-a-atclist").addClass("mng-a-on");
        $state.go("management.articleList");
    }
});