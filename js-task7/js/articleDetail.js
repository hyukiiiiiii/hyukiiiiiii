angular.module("myApp")
.controller("articleDetailCtrl",function($scope,$http,$state) {
	$scope.msgSubmit = function() {
		var fd = new FormData();
		// fd.append("title",$scope.newTitle);
		// fd.append("type",$scope.newType);
		// fd.append("status",1);
		fd.append("file",$("input")[3].files[0]);
		console.log(fd);
		// fd.append("url",$scope.newLink);
		$http({
			method: "post",
			data: fd,
			url: "/carrots-admin-ajax/a/u/img/task"
		}).then(function successCallback(response){
			console.log(response.data)
		},function errorCallback(response) {
            console.log(response.data);
        })
	}
})