/**
 * Created by Administrator on 2016/9/23.
 */
$(function(){
    var data;

    var sessionId=getUrlParam('sessionId');
    getAssetInfo();
    chatStart(sessionId);
    $('.chatOver').click(function(){
        chatOver();
    });
    //填写页面资产信息
    var rendAssetInfo = function (data) {
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
    };
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
            success: function (d) {
                data= d;
                // 开始填充页面元素
                alert(data[0].content)
            },
            error: function () {
                // console.log("error");
                alert("网络错误，请刷新重试！");
            }
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
                data= d;
                // 开始填充页面元素
                alert(data[0].sessionId)
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
});