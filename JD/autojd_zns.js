/*
    全民炸年兽
 * @Author: gxcuit 
 * @Date: 2020-01-06 14:46:07 
 * @Last Modified by: gxcuit
 * @Last Modified time: 2020-01-06 15:10:57
 */

function toastError(error) {
    console.error(error);
    toast('error! ' + '[' + currentPackage + ']' + error);
}




auto.waitFor();
var sTime = 3000;
// var bz = text('做任务拿爆竹').clickable().findOnce();
// console.log(bz);
// if (bz) {
//     bz.click();
//     sleep(sTime);
// } else {
//     toastError("未发现字符串'做任务拿爆竹'");
// }
if (!confirm("您目前是在‘领爆竹界面吗？’")) {
    alert('请先进入领爆竹任务列表界面！');
    exit();   
}
    toast('开始---');
    sleep(500);

var lv_child = classNameContains('ListView').findOnce().children();
// console.log(lv);
if (!lv_child) {
    toastError("未发现‘领爆竹’界面");
    exit();
}

lv_child.forEach((element, index) => {

    if (index == 0) {
        return;
    }

    var times = element.child(1).text().match(/\d+/g);
    // 计算每项任务还有多少次没完成
    var clickTime = times[1] - times[0];
    toastLog("正在执行" + clickTime + "次 " + element.child(2).text() + '任务');
    //console.log(clickTime);
    for (let index = 0; index < clickTime; index++) {
        var rw = element.child(3);
        if (rw) {
            rw.click();
            sleep(1000);
            back();
            sleep(sTime);
        }else{
            toastError("任务执行失败，'element':"+element);
        }
    }
});