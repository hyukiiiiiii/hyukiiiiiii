var app = angular.module("myApp",["ui.router","oc.lazyLoad","ui.bootstrap","ui.bootstrap.datetimepicker"]);
app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/login");
    $stateProvider.state("login",{
        url: "/login",
        views: {
            "": {
                templateUrl: "html/login.html"
            },
            controller: "formCtrl"
        },
        resolve: {
            loadMyCtrl: ["$ocLazyLoad",function($ocLazyLoad) {
                return $ocLazyLoad.load(["css/login.css","js/login.js"]);
            }]
        }
    })

    .state("management",{
        url: "/management",
        views: {
            "": {
                templateUrl: "html/management.html"
            }
        },
        resolve: {
            loadMyCtrl: ["$ocLazyLoad",function($ocLazyLoad) {
                return $ocLazyLoad.load(["css/management.css"]);
            }]
        }
    })

    .state("management.dashboard",{
        url: "/dashboard",
        views: {
            "content@management": {
                template: "welcome!"
            }
        }
    })

    .state("management.articleList",{
        url: "/articleList",
        views: {
            "content@management": {
                templateUrl: "html/articleList.html"
            },
            controller: "articleListCtrl"
        },
        resolve: {
            loadMyCtrl: ["$ocLazyLoad",function($ocLazyLoad) {
                return $ocLazyLoad.load(["js/articleList.js","js/filter.js"]);
            }]
        }
    })

    .state("management.articleDetail",{
        url: "/articleDetail",
        views: {
            "content@management": {
                templateUrl: "html/articleDetail.html"
            },
            controller: "articleDetailCtrl"
        },
        resolve: {
            loadMyCtrl: ["$ocLazyLoad",function($ocLazyLoad) {
                return $ocLazyLoad.load(["js/articleDetail.js"]);
            }]
        }
    })
})
