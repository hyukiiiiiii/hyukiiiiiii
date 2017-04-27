angular.module("myApp")
.controller("articleListCtrl",function($scope,$http,$state) {
    //日期选择器
    var that = this;
    this.picker1 = {
        datepickerOptions: {
            maxDate: null,
            showWeeks: false,
            startingDay: 1,
            // dateDisabled: function(data) {
            //     return (data.mode === 'day' && (new Date().toDateString() == data.date.toDateString()));
            // }
        }
    };
    this.picker2 = {
        datepickerOptions: {
            minDate: null,
            showWeeks: false,
            startingDay: 1,
            // dateDisabled: function(data) {
            //     return (data.mode === 'day' && (new Date().toDateString() == data.date.toDateString()));
            // }
        }
    };
    this.openCalendar = function(e,picker) {
        that[picker].open = true;
    };
    // watch min and max dates to calculate difference
    var unwatchMinMaxValues = $scope.$watch(function() {
        return [that.picker1, that.picker2];
    }, function() {
        // min max dates
        that.picker1.datepickerOptions.maxDate = that.picker2.date;
        that.picker2.datepickerOptions.minDate = that.picker1.date;

        // if (that.picker1.date && that.picker2.date) {
        //     var diff = that.picker1.date.getTime() - that.picker2.date.getTime();
        //     that.dayRange = Math.round(Math.abs(diff/(1000*60*60*24)))
        // } else {
        //     that.dayRange = 'n/a';
        // }
    }, true);

    // destroy watcher
    $scope.$on('$destroy', function() {
        unwatchMinMaxValues();
    });

    //ajax协议
    $scope.getArticleData = function() {
        $scope.url = "/carrots-admin-ajax/a/article/search?"+$scope.urlData+"size="+$scope.oSize+"&&page="+$scope.oPage;
        console.log($scope.url);
        $http({
            method: "get",
            url: $scope.url
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.totalNum = response.data.data.total;
            $scope.pageNum = Math.ceil($scope.totalNum/$scope.oSize);
            $scope.getPageArr();
            $scope.articleArr = response.data.data.articleList;
            console.log($scope.articleArr)
        },function errorCallback(response) {
            console.log(response);
        })
    }

    //获取页码
    $scope.getPageArr = function() {
        var pageArr = new Array;
        console.log($scope.pageNum);
        for (var i = 0; i < $scope.pageNum; i++) {
            pageArr.push(i+1);
        }
        $scope.pageArr = angular.copy(pageArr);
    }

    //初始化页码和清除功能\
    $scope.getInit = function() {
        $scope.oType = {
            type0: {num: 0,name: "首页banner"},
            type1: {num: 1,name: "找职位banner"},
            type2: {num: 2,name: "找精英banner"},
            type3: {num: 3,name: "行业大图"}
        }

        $scope.oStatus = {
            status1: {num: 1,name: "草稿"},
            status2: {num: 2,name: "上线"}
        }

        that.picker1.date="";
        that.picker2.date="";
        $scope.aType = angular.copy($scope.oType);
        $scope.sType = null;
        $scope.aStatus = angular.copy($scope.oStatus);
        $scope.sStatus = null; 
        $scope.oPage = 1;
        $scope.aPage = "";
        $scope.oSize = 10;
        $scope.totalNum = 0;
        $scope.urlData = "";
        $scope.getArticleData();
    }
    $scope.getInit();


    $scope.getArticle = function() {
        console.log($scope.sType);
        $scope.urlData = "";
        $scope.oPage = 1; 
        $scope.getUrlData();
        $scope.getArticleData();
    }

    $scope.pageUp = function() {
        if ($scope.oPage>1) {
            $scope.oPage--;
        };
        $scope.getArticleData();
    }

    $scope.pageDown = function() {
        if ($scope.oPage<$scope.pageNum) {
            $scope.oPage++;
        };
        $scope.getArticleData();
    }

    $scope.firstPage = function() {
        $scope.oPage = 1; 
        $scope.getArticleData();
    }

    $scope.lastPage = function() {
        $scope.oPage = $scope.pageNum; 
        $scope.getArticleData();
    }
    $scope.toPage = function(e,x) {
        console.log(x);
        $scope.oPage = x; 
        $scope.getArticleData();
    }

    $scope.turnTo = function() {
        $scope.oPage = angular.copy($scope.aPage);
        $scope.getArticleData();
    }

    $scope.getUrlData = function() {
        if (that.picker1.date) {
            console.log(that.picker1.date.getTime());
            $scope.urlData += "startAt="+that.picker1.date.getTime()+"&&";
        };
        if (that.picker2.date) {
            $scope.urlData += "endAt="+(that.picker2.date.getTime()+86400000)+"&&";
        };
        if ($scope.sType) {
            $scope.urlData += "type="+$scope.sType.num+"&&";
        };
        if ($scope.sStatus) {
            $scope.urlData += "status="+$scope.sStatus.num+"&&";
        };
        console.log($scope.urlData);
    }

    $scope.newArticle = function() {
        $state.go("management.articleDetail");
    }
})