/*
 * @Author: gxcuit 
 * @Date: 2020-01-03 07:54:10 
 * @Last Modified by: gxcuit
 * @Last Modified time: 2020-01-03 10:27:36
 */


auto.waitFor();
setScreenMetrics(device.width,device.height);

if (!launch('com.taobao.taobao')) {
    toastLog('您安装淘宝了吗？');  
}
sleep(5000);
console.log(currentPackage());

if (currentPackage()=='com.taobao.taobao') {
    
    
    click(800,1200);
    sleep(5000);
    click(970,1647);
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
console.log(go_view);

// var close = className('android.widget.Button').clickable().find();



while (go_view) {
    console.log(go_view);
    go_view.click(); 
    sleep(2000);
    scrollDown();
    sleep(1000*20);
    back();
    sleep(1500);
    //为了刷新任务信息，点击关闭×按钮
    var close = className('android.widget.Button').clickable().find();
    if (close) {
        close.click();
    }
    //点集福气
    click(970,1647);
    sleep(1500);
    go_view = textContains('去浏览').findOnce();
}

toastLog('已结束！');