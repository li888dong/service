/**
 * Created by Administrator on 2016/9/21.
 */
$(function(){
    var _response;
    window.onload=function(){
        loadUndoUserData(_response);
        if ($('.issueNumber').html()==""){
            $('.issueNumber').hide()
        }
    };

    //待处理、全部任务的按钮点击
    $('.total').on('click',function(){
        $('.undoList').empty().hide();
        $('.totalList').empty().show();
        $('.undoPageContainer').hide();
        $('.totalPageContainer').show();
        loadTotalTask();
    });
    $('.undo').on('click',function(){
        $('.undoList').empty().show();
        $('.totalList').empty().hide();
        $('.undoPageContainer').show();
        $('.totalPageContainer').hide();
        loadUndoUserData(_response)
    });
    $('.undo,.total').on('click',function(){
        $('.chatboxSend').toggle();
    });
    //对话任务待处理和全部的切换
    $('.btn_group button').click(function(){
        $(this).addClass('btn_selected').siblings().removeClass('btn_selected')
    });
    //左侧导航栏按钮颜色切换
    $('.menu li').click(function(){
        $(this).addClass('li_selected').siblings().removeClass('li_selected')
    });
    //对话任务列表选定样式切换
    $('.totalList,.undoList').on('click','.list_Item',function(){
        $(this).addClass('Item_selected').siblings().removeClass('Item_selected');
        $('.chatIframe').attr('src','chatBox/chatBox.html?sessionId=10003')
    });
    //高级搜索显示与隐藏
    $('.searchSettingOpen').click(function(e){
        $(".searchSetting").css({"visibility":"visible"});
        $(document).one("click", function(){
            $(".searchSetting").css({"visibility":"hidden"});
        });
        e.stopPropagation();
    });
    $(".searchSetting").on("click", function(e){
        e.stopPropagation();
    });
    //待处理分页
    $(".undoPageCode").createPage({
        pageCount:100,
        current:1,
        backFn:function(p){
           loadPageUndoUserData(p)
        }
    });
    //全部任务分页
    $(".totalPageCode").createPage({
        pageCount:100,
        current:1,
        backFn:function(p){
            loadTotalTask(p)
        }
    });

    //搜索功能样式
    $('.searchBegin').click(function(){
        if ($('.listSearch').val()!=""){

        }
        var S="phone="+"13028316633";
        $('.totalList').empty();
        _response="";
        Search(S);
    });
    //抢单功能
    $('.totalList').on('click','.qiangdan',function(e){
        $(this).hide().siblings('._status').html("已领取");
        //抢单的sessionId和kfnumber
        qd=[$(this).closest('.list_Item').find('#sessionId').html(),$(this).closest('.list_Item').find('#kfNumber').html()];
        //点击抢单更新数据
        loadqiangdan(qd);
        //更新待处理数据，将新单加入个户列表
        loadUndoUserData();
        //更新全部列表数据
        rendFormDataUndo();
        e.stopPropagation()
    });
    // 填充全部任务列表动态数据
     function  rendFormDataTotal(_response) {
        for(var i=0;i<_response.length;i++){
                var _sessionId= _response[i].sessionId,
                    _phone= _response[i].phone,
                    _startTime= _response[i].startTime,
                    _endTime= _response[i].endTime,
                    _status= _response[i].status,
                    qiangdan;
                    _kfNumber= _response[i].kfNumber,
                    _chatLog= _response[i].chatLog,
                    _type= _chatLog.type,
                    _content=_chatLog.content,
                    _time=_chatLog.time;
                    qiangdan=getStatus(_status);

            $('.totalList').append(
                '<li class="list_Item"> ' +
                ' <div class="fl"> ' +
                '<div class="fl" id="sessionId">'+_sessionId+' </div>' +
                '<span>(app咨询)</span> ' +
                '<div><span  class="status" id="endTime">'+_endTime+' 18:50</span></div>' +
                ' <div>来源:app</div> <div id="kfNumber">'+_kfNumber+' </div>' +
                ' </div> <div class="fr">' +
                ' <div>09-08</div>' +
                ' <span class="_status">'+qiangdan+'</span>' +
                '<buttton class="qiangdan">抢单</buttton> </div>' +
                '</li>'
            );

            if (qiangdan=="待领取"){
                $('._status').css({"color":"blue"});
                $('.qiangdan').show()
            }

        }
    };
    //填充待处理任务列表动态数据
     function rendFormDataUndo(_response,newTask) {
        $('.undoList').prepend(newTask);
        for (var i = 0; i < _response.length; i++) {
            var _sessionId = _response[i].sessionId,
                _phone = _response[i].phone,
                _startTime = _response[i].startTime,
                _endTime = _response[i].endTime,
                _status = _response[i].status,
            _kfNumber = _response[i].kfNumber,
                _chatLog = _response[i].chatLog,
                _type = _chatLog.type,
                _content = _chatLog.content,
                _time = _chatLog.time;

            $('.undoList').append(
                '<li class="list_Item"> ' +
                '<input type="checkbox" class="editList">' +
                ' <div class="fl"> ' +
                '<div class="fl" id="sessionId">' + _sessionId + ' </div>' +
                '<span>(app咨询)</span> ' +
                '<div><span  class="status" id="endTime">' + _endTime + ' 18:50</span></div>' +
                ' <div>来源:app</div> <div id="kfNumber">' + _kfNumber + ' </div>' +
                ' </div> <div class="fr">' +
                ' <div>09-08</div>' +
                '</li>'
            );
        }

        $('.issueNumber').html($('.undoList').find('.list_Item').length)

    };

    //加载待处理列表
    function loadUndoUserData(){
        $('.undoList').empty();
        //var _url="http://localhost:8080/ifc-kefu-mock-webapp/allUser/kfIndex?kfNumber=95571";
        // 测试URL
        var _url = './testdata/tsconfig.json';
        $.ajax({
            url: _url,
            type: "GET",
            dataType: "JSON",
            success: function (d) {
                _response= d;
                // 开始填充页面元素
                rendFormDataUndo(_response);
            },
            error: function () {
                // console.log("error");
                alert("网络错误，请刷新重试！");
            }
        });
    };
    //加载待处理任务分页
    function loadPageUndoUserData(index){
        $('.undoList').empty();
        //var _url='localhost:8080/ifc-kefu-mock-webapp/allUser/kfIndex?pageIndex='+index;
        var _url='./testdata/tsconfig.json';

        $.ajax({
            url: _url,
            type: "GET",
            dataType: "JSON",
            success: function (d) {
                _response= d;
                // 开始填充页面元素
                rendFormDataUndo(_response);
            },
            error: function () {
                // console.log("error");
                alert("网络错误，请刷新重试！");
            }
        });

    };
    //加载全部任务、分页及条件查询
    function loadTotalTask(index){
        $('.totalList').empty();
        //var _url='localhost:8080/ifc-kefu-mock-webapp/allUser/index'+index;
        var _url='./testdata/tsconfig.json';
        $.ajax({
            url: _url,
            type: "GET",
            dataType: "JSON",
            success: function (d) {
                _response= d;
                // 开始填充页面元素
                rendFormDataTotal(_response);
            },
            error: function () {
                // console.log("error");
                alert("网络错误，请刷新重试！");
            }
        });
    };
    //改变抢单状态
    function loadqiangdan(qd){
        // 正式URL
        var _url='localhost:8080/ifc-kefu-mock-webapp/allUser/changeStatus?sessionId='+qd[0]+'&kfNumber='+qd[1];
        alert(_url)
        $.ajax({
            url: _url,
            type: "GET",
            dataType: "JSON",
            success: function (d) {
                _response= d;
                alert("成功")
            },
            error: function () {
                alert("网络错误，请刷新重试！");
            }
        });

    };
    //加载搜索

    //加载搜索
    //
    //var Search=function(search){
    //    // 正式URL
    //    var _url='localhost:8080/ifc-kefu-mock-webapp/allUser/index?'+search;
    //    // 测试URL
    //    //var _url = './testdata/tsconfig.json';
    //    $.ajax({
    //        url: _url,
    //        type: "GET",
    //        dataType: "JSON",
    //        success: function (d) {
    //            _response= d;
    //            // 开始填充页面元素
    //            rendFormDataTotal(_response);
    //        },
    //        error: function () {
    //            // console.log("error");
    //            alert("网络错误，请刷新重试！");
    //        }
    //    });
    //};
    function getStatus(_status){
        var qiangdan;
        if(_status==0){
            qiangdan="待领取";
        }
        if (_status==1){
            qiangdan="已领取";
        }
        if(_status==2){
            qiangdan="已关闭";
        }
        return qiangdan;
    }
    });



