/*
 * @Author: gxcuit 
 * @Date: 2020-01-03 07:54:10 
 * @Last Modified by: gxcuit
 * @Last Modified time: 2020-01-06 14:07:40
 * @packagename: com.gxcuit.autotb.jfq
 */


function toastError(error) {
    console.error(error);
    toast('error! ' + '[' + currentPackage + ']' + error);
}

function jrnc() {
    var fl = id('com.taobao.taobao:id/dx_root').findOnce(3);
    var ivs = fl.find(clickable());
    if (ivs) {
        if (!ivs.empty()) {
            ivs.get(ivs.size() - 1).click();
        }else{
            toastError('进入农场失败');
        }
    }
    

}

auto.waitFor();
// console.setGlobalLogConfig({
//     "file": "./auto_tb.txt"
// });
setScreenMetrics(device.width, device.height);

// if (!launch('com.taobao.taobao')) {
//     toastLog('您安装淘宝了吗？');
// }
// toast('进入淘宝，请等待');
// sleep(5000);

// //console.log(currentPackage());

if (currentPackage() == 'com.taobao.taobao') {
   
} else {
    toastError('当前包名+' + currentPackage());
    exit();
}

// 1. 先签到
var qd = text('去签到').findOnce();
if (qd) {
    qd.parent().click();
    toastLog('完成签到！');
    sleep(2000);
}

//2. 浏览
var go_view = textContains('去浏览').findOnce();
if (!go_view) {
    sleep(1000);
    var count = textContains('已完成').find().size();
    if (count > 3) {
        toastError('没找到去浏览，存在' + count + "个’已完成‘");
    }

}



while (go_view) {

    go_view.click();
    sleep(5000);
    toastLog('当前浏览的是' + go_view.text());
    //scrollDown();
    swipe(device.width / 2, device.height / 1.5, device.width / 2, device.height / 4, 2000);
    sleep(1000 * 20);
    toast("--已完成 " + go_view.text());
    back();
    sleep(1500);
    //为了刷新任务信息，点击关闭×按钮
    var close = className('android.widget.Button').clickable().find();
    if (close) {
        close.click();
        sleep(3000);
    }
    //点集福气
    click(970, 1647);
    sleep(1500);
    go_view = textContains('去浏览').findOnce();
}

toastLog('已结束！');