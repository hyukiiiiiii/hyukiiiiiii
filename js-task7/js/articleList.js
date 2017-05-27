angular.module("myApp")
.controller("articleListCtrl",function($scope,$http,$animate,$state,$stateParams) {

/*********************搜索框,pop初始化******************************/
    var that = this;//日期选择器
    this.picker1 = {
        datepickerOptions: {
            maxDate: null,
            showWeeks: false,
            startingDay: 1,
            // dateDisabled: function(data) {return (data.mode==='day'&&(new Date().toDateString()==data.date.toDateString()));}
        }
    };
    this.picker2 = {
        datepickerOptions: {
            minDate: null,
            showWeeks: false,
            startingDay: 1,
            // dateDisabled: function(data) {return (data.mode==='day'&&(new Date().toDateString()==data.date.toDateString()));}
        }
    };
    this.openCalendar = function(e,picker) { that[picker].open = true; };
    var unwatchMinMaxValues = $scope.$watch(function() {
        return [that.picker1, that.picker2];// watch min and max dates to calculate difference
    }, function() {// min max dates
        that.picker1.datepickerOptions.maxDate = that.picker2.date;
        that.picker2.datepickerOptions.minDate = that.picker1.date;
        // if (that.picker1.date && that.picker2.date) {
        //     var diff = that.picker1.date.getTime() - that.picker2.date.getTime();
        //     that.dayRange = Math.round(Math.abs(diff/(1000*60*60*24)))
        // } else { that.dayRange = 'n/a';}
    }, true);
    $scope.$on('$destroy', function() { unwatchMinMaxValues(); });// destroy watcher
    $scope.atcType = [ 0, 1, 2, 3 ];
    $scope.atcStatus = [ 1, 2 ];
    $scope.popModel = [
        { open: false, act: null, tip: null, actiontip: null, dangertip: null },//不显示pop
        { open: true, act: "switch",tip: null, actiontip: "上线后该图片将在轮播banner中展示。", dangertip: "是否执行上线操作？" },//是否上线
        { open: true, act: "switch",tip: null, actiontip: "下线后该图片将不展示在轮播banner中。", dangertip: "是否执行下线操作？" },//是否下线
        { open: true, act: "delete",tip: "是否确认删除", actiontip: null, dangertip: null },//是否删除
        { open: true, act: null, tip: "上线成功", actiontip:null, dangertip: null },//确认上线
        { open: true, act: null, tip: "下线成功", actiontip:null, dangertip: null },//确认下线
        { open: true, act: null, tip: "编辑成功", actiontip:null, dangertip: null },//确认编辑
        { open: true, act: null, tip: "删除成功", actiontip:null, dangertip: null },//确认删除
        { open: true, act: null, tip: "新增成功", actiontip:null, dangertip: null }//确认新增
    ];

/******************************获取article数据**搜索**清除**页码**翻页*****************************/
    $scope.getInit = function() {
        that.picker1.date="";
        that.picker2.date="";
        $scope.pop = $scope.popModel[0];
        $scope.local = { type: null, status: null, startAt: null, endAt: null, size: 10, page: 1, search: "", url: null }
        $scope.data =  { page: null, size: null, total: null, list: null }
        $scope.page =  { to: null, length: null, array: [] }
    }//初始化,清除功能
    $scope.getArticle = function() {
        $http({
            method: "get",
            url: "/carrots-admin-ajax/a/article/search?"+$scope.local.search+"size="+$scope.local.size+"&&page="+$scope.local.page
        }).then(function successCallback(response) {
            $scope.data = response.data.data;
            console.info("get article data => $scope.data => ",$scope.data);
            $scope.getPage();
        },function errorCallback(response) { console.log(response); })
    }//请求article数据
    $scope.getInit();
    $scope.getArticle();
    $scope.getData = function(x) {
        console.log(x);
        if (!isNaN(x)) {
            if (x>$scope.page.length) { x = $scope.page.length; }
            $scope.local.page = x;
        }//翻页
        else if (x=="search") { $scope.searchMsg(); $scope.local.page = 1; }//搜索
        else if (x=="init") { $scope.getInit(); }//初始化
        $scope.getArticle();
    }//获取数据
    $scope.searchMsg = function() {
        $scope.local.search = "";
        if (that.picker1.date) { $scope.local.search += "startAt="+that.picker1.date.getTime()+"&&"; };
        if (that.picker2.date) { $scope.local.search += "endAt="+(that.picker2.date.getTime()+86400000)+"&&"; };
        if ($scope.local.type!==null) { $scope.local.search += "type="+$scope.local.type+"&&"; };
        if ($scope.local.status) { $scope.local.search += "status="+$scope.local.status+"&&"; };
        console.log("local.search => "+$scope.local.search);
    }//获取用于请求article数据的url
    $scope.getPage = function() {
        $scope.page.length = Math.ceil($scope.data.total/$scope.data.size);
        var pageArray = [];
        for (var i = 0; i < $scope.page.length; i++) { pageArray.push(i+1); }
        $scope.page.array = angular.copy(pageArray);
    }//获取页码

/*****************新增***编辑***删除***上下线***pop功能***页面跳转*********************/
    $scope.popState = function() {
        $scope.pop = $scope.popModel[0];
        console.log("popState => ",$stateParams);
        if ($stateParams.popOpen) { $scope.pop = $scope.popModel[$stateParams.type]; }
    }
    $scope.popState();

    $scope.setAtc = function(act,id,status) {
        switch(act) {
            case "new"    : $state.go("management.newArticle",{"atcId": null}); break;
            case "edit"   : $state.go("management.editArticle",{"atcId": id}); break;
            case "status" : $scope.switchAtc(id,status); break;
            case "delete" : $scope.deleteAtc(id); break;
        }
    }
    $scope.switchAtc = function(id,status) {
        $scope.atc = { id: id, status: null };
        switch(status) {
            case 1: $scope.atc.status = 2; $scope.pop = $scope.popModel[1]; break;
            case 2: $scope.atc.status = 1; $scope.pop = $scope.popModel[2]; break;
        };
    }
    $scope.deleteAtc = function(id) {
        $scope.atc = { id: id };
        $scope.pop = $scope.popModel[3];
    }

    $scope.popConfirm = function(x) {
        switch(x) {
            case "delete" : $scope.deleteConfirm(); break;
            case "switch" : $scope.switchConfirm(); break;
            case "cancel" : $scope.popCancel(); break;
            case "sure"   : $scope.popCancel(); break;
        };
    }//pop"确定"按钮功能
    $scope.popCancel = function() {
        $scope.atc = null;
        $scope.pop = $scope.popModel[0];
    }//pop"取消","确定"按钮功能
    $scope.switchConfirm = function() {
        $http({
            method: "put",
            params: $scope.atc,
            url: "/carrots-admin-ajax/a/u/article/status"
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.getArticle();
            switch($scope.atc.status) {
                case 1: $scope.pop = $scope.popModel[5]; break;
                case 2: $scope.pop = $scope.popModel[4]; break;
            };
        },function errorCallback(response) { console.log(response); })
    }
    $scope.deleteConfirm = function() {
        $http({
            method: "delete",
            url: "/carrots-admin-ajax/a/u/article/"+$scope.atc.id
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.getArticle();
            $scope.pop = $scope.popModel[7];
        }).then(function errorCallback(response) { console.log(response); })
    }
});