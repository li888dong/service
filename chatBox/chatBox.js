/**
 * Created by Administrator on 2016/9/23.
 */
$(function(){
    var sessionId=getUrlParam('sessionId');
    var msg;
    getAssetInfo();
    chatStart(sessionId);
    $('.chatOver').click(function(){
        chatOver();
    });


    //填写页面资产信息
     function rendAssetInfo(data) {
        var _account=data.account,
            _commissionRate=_account.commissionRate,
            _CRMScale=_account.CRMScale,
            _SubcontractManager=_account.SubcontractManager,

            _property=data.property,
            _totalAssets=_property.totalAssets,
            _debtAssets=_property.debtAssets,
            _idleAssets=_property.idleAssets,
            _netAssets=_property.netAssets,

            _goldAsset=data.goldAssets,
            _productName1=_goldAsset[0].productName,
            _productTypeName1=_goldAsset[0].productTypeName,
            _productClassifyName1=_goldAsset[0].productClassifyName,
            _productTime1=_goldAsset[0].productTime,
            _productName2=_goldAsset[1].productName,
            _productTypeName2=_goldAsset[1].productTypeName,
            _productClassifyName2=_goldAsset[1].productClassifyName,
            _productTime2=_goldAsset[1].productTime,

            _serviceAsserts=data.serviceAsserts,
            _serviceName=_serviceAsserts.serviceName,
            _collectionManner=_serviceAsserts.collectionManner,
            _name=_serviceAsserts.name,
            _startTime=_serviceAsserts.startTime,
            _endTime=_serviceAsserts.endTime;

            $('.assetInfo').append(''+
                '<div>小方13716356666,31319212|13716356666（北京）   |   客户号：31319212</div> <div>北京市海淀区龙翔路8号楼</div>' +
                ' <div>【账户】 交易佣金率：'+_commissionRate+'   |   CRM等级： '+_CRMScale+'  |   分包理财经理：'+_SubcontractManager+'</div>' +
                ' <div>【资产】 普通总资产：'+_totalAssets+'   |   股基权债资产：'+_debtAssets+'   |   空闲资金：'+_idleAssets+'   |   两融净资产：'+_netAssets+'</div>' +
                ' <div>【金产】 '+_productName1+' ( 权益类公募 ,  风险1 ,  20160321 )</div>' +
                ' <div>【服产】 '+_serviceName+'</div>'
            );
    }
    //填写聊天框内容信息
    function rendMessageReceived(data) {
        $('.chatboxReceived').empty();
        for (var i=0;i<data.length;i++){
            var _type=data[i].type,
                _content=data[i].content,
                _time=data[i].time;

            $('.chatboxReceived').append('' +
                '<div class="chatHistoryContainer">' +
                '<span class="chatHistory">'+_type+'</span> ' +'<br>'+
                '<span class="chatHistory">'+_content+'</span>' +'<br>'+
                '<p> '+_time+'</p>' +
                '</div> '
            )
        }


    }
    //开始会话
    function chatStart (arg){
        // 正式URL
        //var _url='http://localhost:8080/ifc-kefu-mock-webapp/allUser/getMessage?sessionId='+arg;
        // 测试URL
        var _url = '../testdata/package.json';
        $.ajax({
            url: _url,
            type: "GET",
            dataType: "JSON",
            timeout:1000,
            success: function (d) {
                // 开始填充页面元素
                rendMessageReceived(d);
            },
            error: function () {
                // console.log("error");
                alert("网络错误，请刷新重试！");
            },
            complete : function(){
                //一秒刷新一次聊天内容
                setTimeout(function(){chatStart(sessionId);}, 1000);
            }
        });

    }
    //发送信息
    function sendMessage(msg) {
        $.ajax({
            type: 'get',
            url: 'http://localhost:8080/ifc-kefu-mock-webapp/allUser/saveMessage?sessionId='+sessionId+'&Message='+msg
        });
    }
    //结束会话
    function chatOver (){
        // 正式URL
        //var _url='http://10.150.33.168:8080/ifc-kefu-mock-webapp/allUser/change?sessionId=10001';
        // 测试URL
         var _url = '../testdata/tsconfig.json';
        $.ajax({
            url: _url,
            type: "GET",
            dataType: "JSON",
            success: function (d) {
                // 开始填充页面元素
                alert(d[0].sessionId)
            },
            error: function () {
                // console.log("error");
                alert("网络错误，请刷新重试！");
            }
        });
    }
    //获取资产信息
    function getAssetInfo(){
        // 正式URL
        //var _url='http://10.150.33.168:8080/ifc-kefu-mock-webapp/allUser/getJson';
        // 测试URL
        var _url = '../testdata/test.json';
        $.ajax({
            url: _url,
            type: "GET",
            dataType: "JSON",
            success: function (d) {
                data= d;
                // 开始填充页面元素
                rendAssetInfo(data);
            },
            error: function () {
                // console.log("error");
                alert("网络错误，请刷新重试！");
            }
        });
    }
    // 获取url相关参数
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return unescape(r[2]);
        return null; //返回参数值
    }
    //scroll美化
    $('.chatboxReceived').niceScroll({
        cursorcolor: "#ccc",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0", // 	游标边框css定义
        cursorborderradius: "5px",//以像素为光标边界半径
        autohidemode: false //是否隐藏滚动条
    });
    //enter键发送消息
    $('.sendMsg').on('keyup',function(event){
        if (event.keyCode == "13") {//keyCode=13是回车键
            sendMessage(msg);
            $('.sendMsg').val("");
        }else{
            msg =$('.sendMsg').val();
        }
        event.stopPropagation();
    });
});