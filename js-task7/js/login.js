angular.module("myApp")
.controller("formCtrl",function($scope,$http,$state) {
    $scope.user = {name:"admin",pwd:"123456"};
    $scope.submit = function() {
        //$scope.formCheck = false;
        //$scope.nameCheck = false;
        //$scope.pwdCheck = false;
        $scope.acount = angular.copy($scope.user);
        console.log($scope.acount);
        $http({
            method: "post",
            url: "/carrots-admin-ajax/a/login/?name="+$scope.acount.name+"&pwd="+$scope.acount.pwd
        }).then(function successCallback(response) {
            $scope.usermsg = response.data.message;
            console.log(response.data);
            if($scope.usermsg=="success"){
                console.log($scope.usermsg);
                $state.go("management.dashboard");
            }else {
                alert($scope.usermsg);
                console.log($scope.usermsg);
                //$scope.formCheck = true;
                //$scope.nameCheck = true;
            }
        },function errorCallback(response){
            console.log(response);
        });
    }
});