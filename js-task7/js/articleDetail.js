angular.module("myApp")
.controller("articleDetailCtrl",function($scope,$http,$filter,$state,$stateParams) {
    $scope.atc = { id: null,title: null,type: null,status: null,img: null,url: null,content: null,industry: null }
    $scope.img = { name: null,file: null,progress: null,size: null }
    $scope.atcType = [ 0,1,2,3 ];
    $scope.atcIndustry = [ 0,1,2,3,4,5,6 ];

    $scope.getDisabled = function() {
        if (!$scope.atc.title||!$scope.atc.img||!$scope.atc.url) { return true; }//禁用
        else if ($scope.atc.type==null) { return true; }//禁用
        else if ($scope.atc.type==3&&$scope.atc.industry==null) { return true; }//禁用
        return false;//可用
    }
    $scope.getOneArticle = function(id) {
        $http({
            method: "get",
            url: "/carrots-admin-ajax/a/article/"+id,
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.atc = response.data.data.article;
            console.log($scope.atc)
        },function errorCallback(response) { console.log(response.data) });
    }
    $scope.state = function() {
        $scope.isEdit = false;
        if ($stateParams.atcId) {
            $scope.atc.id = $stateParams.atcId;
            console.log($scope.atc.id);
            $scope.getOneArticle($scope.atc.id);
            $scope.isEdit = true;
        }
    }
    $scope.state();

    $scope.imgDelete = function() {
        $scope.atc.img = null;
        $scope.img.progress = 0;
        $scope.img.name = null;
        $scope.img.file = null;
    }
    $scope.chooseImg = function() {
        $scope.atc.img = null;
        $scope.img.progress = 0;
        $scope.img.file = $("input")[2].files[0];
        $scope.img.name = $scope.img.file.name;
        if ($scope.img.file.size>=1048576) { $scope.img.size = Math.floor($scope.img.file.size/10485.76)/100+"MB";}
        else { $scope.img.size = Math.floor($scope.img.file.size/10.24)/100+"kb";};
        $scope.$apply();
    }
    $scope.imgUpload = function() {
        var imgReader = new FileReader();
        imgReader.readAsDataURL($scope.img.file);
        imgReader.onload = function(e) {
            $scope.atc.img = this.result;
            console.log($scope.atc.img)
        }
        var fd = new FormData();
        fd.append("file",$scope.img.file);
        console.log(fd);
        $http({
            method: "post",
            data: fd,
            url: "/carrots-admin-ajax/a/u/img/task",
            headers: { "Content-Type":  undefined },
            uploadEventHandlers: {
                progress: function(e) {
                    console.log('UploadProgress -> ' + e);
                    console.log(e);
                    console.log(e.loaded);
                    console.log(e.total);
                    $scope.img.progress = (e.loaded*100/e.total);
                }
            }
        }).then(function successCallback(response){
            console.log(response.data);
            $scope.atc.img = response.data.data.url;
            console.log($scope.atc.img)
        },function errorCallback(response) { console.log(response.data) })
    }

    $scope.uploadAtc = function(x) {
        if (isNaN(x)) { $state.go("management.articleList",{popOpen: false,type: null}); }
        else if ($scope.atc.id) { $scope.putAtc(x); }
        else { $scope.postAtc(x); }
    }
    $scope.postAtc = function(status) {
        $http({
            method: "post",
            params: {
                title: $scope.atc.title,
                type: $scope.atc.type,
                status: status,
                img: $scope.atc.img,
                content: $scope.atc.content,
                url: $scope.atc.url,
                industry: $scope.atc.industry
            },
            url: "/carrots-admin-ajax/a/u/article",
            // headers: {"Content-Type": "application/x-www-form-urlencoded"},
            // transformRequest: function(obj) {
            //     var str = [];  
            //     for (var p in obj) {  
            //         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));  
            //     }  
            //     return str.join("&");  
            // }
        }).then(function successCallback(response){
            console.log(response.data);
            $state.go("management.articleList",{popOpen: true,type: 8});
        },function errorCallback(response) { console.log(response.data) })
    }
    $scope.putAtc = function(status) {
        console.log("id: "+$scope.atc.id);
        $scope.atc.status = status;
        $scope.atc.updateAt = new Date().getTime();
        $http({
            method: "put",
            params: {
                title: $scope.atc.title,
                type: $scope.atc.type,
                status: status,
                img: $scope.atc.img,
                content: $scope.atc.content,
                url: $scope.atc.url,
                industry: $scope.atc.industry,
                createAt: $scope.atc.createAt,
                updateAt: $scope.atc.updateAt
            },
            url: "/carrots-admin-ajax/a/u/article/"+$scope.atc.id
        }).then(function successCallback(response){
            console.log("put article: ",response.data);
            $state.go("management.articleList",{popOpen: true,type: 6});
        },function errorCallback(response) { console.log(response.data); })
    }

    $scope.config = {
        toolbars: [
            [
                'source', //源代码
                '|', 
                'undo', //撤销
                'redo', //重做
                '|', 
                'bold', //加粗
                'italic', //斜体
                'underline', //下划线
                'strikethrough', //删除线
                '|', 
                'superscript', //上标
                'subscript', //下标
                '|', 
                'forecolor', //字体颜色
                'backcolor', //背景色
                '|', 
                'removeformat', //清除格式
                '|', 
                'insertorderedlist', //有序列表
                'insertunorderedlist', //无序列表
                '|', 
                'selectall', //全选
                'cleardoc', //清空文档
                'paragraph', //段落格式
                '|', 
                'fontfamily', //字体
                'fontsize', //字号
                '|', 
                'justifyleft', //居左对齐
                'justifycenter', //居中对齐
                'justifyright', //居右对齐
                '|', 
                'fullscreen', //全屏
                'link', //超链接
                'unlink', //取消链接
                '|', 
                'emotion', //表情
                'simpleupload', //单图上传
                'insertvideo', //视频
                '|', 
                'map', //Baidu地图
                '|', 
                'horizontal', //分隔线
                'print', //打印
                'preview', //预览
                'drafts', // 从草稿箱加载
                // 'fontborder', //字符边框
                // 'formatmatch', //格式刷
                // 'blockquote', //引用
                // 'pasteplain', //纯文本粘贴模式
                // 'time', //时间
                // 'date', //日期
                // 'insertrow', //前插入行
                // 'insertcol', //前插入列
                // 'mergeright', //右合并单元格
                // 'mergedown', //下合并单元格
                // 'deleterow', //删除行
                // 'deletecol', //删除列
                // 'splittorows', //拆分成行
                // 'splittocols', //拆分成列
                // 'splittocells', //完全拆分单元格
                // 'deletecaption', //删除表格标题
                // 'inserttitle', //插入标题
                // 'mergecells', //合并多个单元格
                // 'deletetable', //删除表格
                // 'insertparagraphbeforetable', //"表格前插入行"
                // 'insertcode', //代码语言
                // 'insertimage', //多图上传
                // 'edittable', //表格属性
                // 'edittd', //单元格属性
                // 'spechars', //特殊字符
                // 'searchreplace', //查询替换
                // 'gmap', //Google地图
                // 'help', //帮助
                // 'justifyjustify', //两端对齐
                // 'directionalityltr', //从左向右输入
                // 'directionalityrtl', //从右向左输入
                // 'rowspacingtop', //段前距
                // 'rowspacingbottom', //段后距
                // 'pagebreak', //分页
                // 'insertframe', //插入Iframe
                // 'imagenone', //默认
                // 'imageleft', //左浮动
                // 'imageright', //右浮动
                // 'attachment', //附件
                // 'imagecenter', //居中
                // 'wordimage', //图片转存
                // 'lineheight', //行间距
                // 'edittip ', //编辑提示
                // 'customstyle', //自定义标题
                // 'autotypeset', //自动排版
                // 'webapp', //百度应用
                // 'touppercase', //字母大写
                // 'tolowercase', //字母小写
                // 'background', //背景
                // 'template', //模板
                // 'scrawl', //涂鸦
                // 'music', //音乐
                // 'inserttable', //插入表格
                // 'charts', // 图表
            ]
        ],
        autoHeightEnabled: false, //是否自动长高，默认true
        autoFloatEnabled: false, //是否可以拉伸长高，默认true(当开启时，自动长高失效)
        elementPathEnabled: false, //是否启用元素路径，默认是显示
        wordCount: false //是否开启字数统计
    }
})

// function loadDoc() {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//     myFunction(this);
//     }
//   };
//   var url = "/carrots-admin-ajax/a/u/article";
//   xhttp.open("POST", url, true);
//   xhttp.send();
// }
// function myFunction(xml) {
//   var xmlDoc = xml.responseXML;
//   console.log(xmlDoc);
// }