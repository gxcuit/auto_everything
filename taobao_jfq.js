/*
 * @Author: gxcuit 
 * @Date: 2020-01-03 07:54:10 
 * @Last Modified by: gxcuit
 * @Last Modified time: 2020-01-03 13:10:59
 * @packagename: com.gxcuit.autotb.jfq
 */

function toastError(error) {
    console.error(error);
    toast('error! '+error);
}

 

auto.waitFor();
// console.setGlobalLogConfig({
//     "file": "./auto_tb.txt"
// });
setScreenMetrics(device.width,device.height);

if (!launch('com.taobao.taobao')) {
    toastLog('您安装淘宝了吗？');  
}
sleep(5000);
//console.log(currentPackage());

if (currentPackage()=='com.taobao.taobao') {  
    click(800,1200);
    sleep(5000);
    click(970,1647);
}else{
    toastError('当前包名+'+currentPackage());
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
    toastError("不存在‘去浏览’");
}



while (go_view) {
    console.log('当前浏览的是'+go_view);
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