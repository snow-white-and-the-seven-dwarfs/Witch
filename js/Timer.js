//  定时器
// 思路：
// 分装一个自调用函数
// 函数里面有个定时器
// 这个函数用来实现数组同步渐变的过程
// 函数调用两个形参，分别是 temp → 目标值数组    count → 在固定时间所分的份儿数
// temp用来每次更新目标值  temp = temp + 
// 新变量 = temp / count  即：每份儿走多少数字
// 然后把更新好的新变量给 h3标签的 text


// 数据
var arr = [515, 1618, 245, 280];
function changedTime(temp, count) {
    var temp1 = parseInt(arr[0] / count);
    var temp2 = parseInt(arr[1] / count);
    var temp3 = parseInt(arr[2] / count);
    var temp4 = parseInt(arr[3] / count);
    var num1 = 0, num2 = 0, num3 = 0, num4 = 0;
    var timer = setInterval(function () {
        num1 += temp1;
        if (num1 > arr[0]) {
            num1 = arr[0];
        };
        $('.blackTitle .Design1 h3').text(num1);
        num2 += temp2;
        if (num2 > arr[1]) {
            num2 = arr[1];
        };
        $('.blackTitle .Design2 h3').text(num2);
        num3 += temp3;
        if (num3 > arr[2]) {
            num3 = arr[2];
        };
        $('.blackTitle .Design3 h3').text(num3);
        num4 += temp4;
        if (num4 > arr[3]) {
            num4 = arr[3];
        };
        $('.blackTitle .Design4 h3').text(num4);
        if (num1 == arr[0] && num2 == arr[1] && num3 == arr[2] && num4 == arr[3]) {
            clearInterval(timer);
            return;
        }
    }, 45);
}

changedTime(arr, 30);
