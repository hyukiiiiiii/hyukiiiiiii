var app = angular.module("myApp",["ui.router","oc.lazyLoad","ipCookie","ng.ueditor","ui.bootstrap","ui.bootstrap.datetimepicker"]);
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
            },
            "content@management": {
                template: "<h1 style='padding: 40px 0 0 40px'>Welcome!</h1>"
            },
            controller: "managementCtrl"
        },
        params: {data: null},
        resolve: {
            loadMyCtrl: ["$ocLazyLoad",function($ocLazyLoad) {
                return $ocLazyLoad.load(["css/management.css","js/management.js"]);
            }]
        }
    })

    // .state("management.dashboard",{
    //     url: "/dashboard",
    //     views: {
    //         "content@management": {
    //             template: "welcome!"
    //         }
    //     }
    // })

    .state("management.articleList",{
        url: "/articleList/",
        views: {
            "content@management": {
                templateUrl: "html/articleList.html"
            },
            controller: "articleListCtrl"
        },
        params: {popOpen: null,type: null},
        resolve: {
            loadMyCtrl: ["$ocLazyLoad",function($ocLazyLoad) {
                return $ocLazyLoad.load(["js/articleList.js","js/filter.js","css/articleList.css"]);
            }]
        }
    })

    .state("management.newArticle",{
        url: "/articleDetail",
        views: {
            "content@management": {
                templateUrl: "html/articleDetail.html"
            },
            controller: "articleDetailCtrl"
        },
        resolve: {
            loadMyCtrl: ["$ocLazyLoad",function($ocLazyLoad) {
                return $ocLazyLoad.load([
                    "js/articleDetail.js",
                    "js/filter.js",
                    "css/articleDetail.css",
                    // "ueditor/ueditor.config.js",
                    // "ueditor/editor_api.js",
                    // "ueditor/lang/zh-cn/zh-cn.js"
                ]);
            }]
        }
    })

    .state("management.editArticle",{
        url: "/articleDetail/:atcId",
        views: {
            "content@management": {
                templateUrl: "html/articleDetail.html"
            },
            controller: "articleDetailCtrl"
        },
        resolve: {
            loadMyCtrl: ["$ocLazyLoad",function($ocLazyLoad) {
                return $ocLazyLoad.load([
                    "js/articleDetail.js",
                    "js/filter.js",
                    "css/articleDetail.css",
                    // "ueditor/ueditor.config.js",
                    // "ueditor/editor_api.js",
                    //"ueditor/lang/zh-cn/zh-cn.js"
                ]);
            }]
        }
    })
})
