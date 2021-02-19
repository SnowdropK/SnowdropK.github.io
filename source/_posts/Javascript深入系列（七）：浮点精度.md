---
title: Javascript深入系列（七）：浮点精度
date: 2021-01-20 13:22:05
tags:
---
## 一、浮点数的存储
### 1.1 概念
<!-- more -->
```
// 加法 =====================
0.1 + 0.2 = 0.30000000000000004
0.7 + 0.1 = 0.7999999999999999
0.2 + 0.4 = 0.6000000000000001

// 减法 =====================
1-0.9=0.09999999999999998
1.5 - 1.2 = 0.30000000000000004
0.3 - 0.2 = 0.09999999999999998
 
// 乘法 =====================
19.9 * 100 = 1989.9999999999998
0.8 * 3 = 2.4000000000000004
35.41 * 100 = 3540.9999999999995

// 除法 =====================
0.3 / 0.1 = 2.9999999999999996
0.69 / 10 = 0.06899999999999999
```

JavaScript 中所有数字包括整数和小数都只有一种类型 — Number。它的实现遵循 IEEE 754 标准，使用 64 位固定长度来表示，也就是标准的 double 双精度浮点数（相关的还有float 32位单精度）。</br>
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4a15ae4823b400b95499886b7fe60b4~tplv-k3u1fbpfcp-watermark.image)
**64位比特又可分为三个部分：**
1. 符号位S【第0位】：第 1 位是正负数`符号位（sign）`，0代表正数，1代表负数
2. 指数位E【第1位】：中间的 11 位存储`指数（exponent）`，用来表示次方数
3. 尾数位M【第12位】：最后的 52 位是`尾数（mantissa 有效数字）`，超出的部分自动进一舍零

**为什么 0.1+0.2=0.30000000000000004？**
```
// 0.1 和 0.2 都转化成二进制后再进行运算
0.00011001100110011001100110011001100110011001100110011010 +
0.0011001100110011001100110011001100110011001100110011010 =
0.0100110011001100110011001100110011001100110011001100111

// 转成十进制正好是 0.30000000000000004
```
### 1.2 精度丢失
十进制是给人看的，但在进行运算之前，必须先转换为计算机能处理的二进制。最后，当运算完毕后，再将结果转换回十进制，继续给人看。精度就丢失于这两次转换的过程中。

## 二、浮点数运算
### 2.1 [toFixed() 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)
>使用定点表示法来格式化一个数值（返回的值是字符串）

```
var numObj = 12345.6789;

numObj.toFixed();         // 返回 "12346"：进行四舍六入五看情况，不包括小数部分
numObj.toFixed(1);        // 返回 "12345.7"：进行四舍六入五看情况

numObj.toFixed(6);        // 返回 "12345.678900"：用0填充
```

```
parseFloat((数学表达式).toFixed(digits))； // toFixed() 精度参数须在 0 与20 之间
// 运行
parseFloat((1.0 - 0.9).toFixed(10)) // 结果为 0.1   
parseFloat((0.3 / 0.1).toFixed(10)) // 结果为 3  
parseFloat((9.7 * 100).toFixed(10)) // 结果为 970 
parseFloat((2.22 + 0.1).toFixed(10)) // 结果为 2.32
```

**chrome下有问题情况：**
```
1.35.toFixed(1) // 1.4 正确
1.335.toFixed(2) // 1.33  错误
1.3335.toFixed(3) // 1.333 错误
1.33335.toFixed(4) // 1.3334 正确
1.333335.toFixed(5)  // 1.33333 错误
1.3333335.toFixed(6) // 1.333333 错误
```

### 2.2 [toPrecision() 方法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toPrecision)
>以指定的精度返回该数值对象的字符串表示。

`toPrecision`和`toFixed`在数据处理时很容易混淆，共同点是把`数字转成字符串`供展示使用。注意在计算的中间过程不要使用，只用于`最终结果`。</br>
**区别：**
+ `toPrecision()`：是处理精度，精度是从左至右第一个不为0的数开始数起。
+ `toFixed()`：是小数点后指定位数取整，从小数点开始数起。
```
var numObj = 5.123456;
numObj.toPrecision(1) //输出 5
numObj.toPrecision(2) //输出 5.1
numObj.toPrecision(5) //输出 5.1235
numObj.toPrecision() //输出 5.123456
```

## 三、工具函数：解决精度丢失
### 3.1 数据展示类
```
function strip(num, precision = 12) {
  return +parseFloat(num.toPrecision(precision));
}
```

### 3.2 数据运算类
小数转成整数来运算，之后再转回小数
```
/**
 * 精确加法
 */
function add(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (num1 * baseNum + num2 * baseNum) / baseNum;
}
```
以上方法能适用于大部分场景。遇到科学计数法如 2.3e+1（当数字精度大于21时，数字会强制转为科学计数法形式显示）时还需要特别处理一下。
```
'use strict'

var accAdd = function(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var dec1, dec2, times;
    try { dec1 = countDecimals(num1)+1; } catch (e) { dec1 = 0; }
    try { dec2 = countDecimals(num2)+1; } catch (e) { dec2 = 0; }
    times = Math.pow(10, Math.max(dec1, dec2));
    // var result = (num1 * times + num2 * times) / times;
    var result = (accMul(num1, times) + accMul(num2, times)) / times;
    return getCorrectResult("add", num1, num2, result);
    // return result;
};

var accSub = function(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var dec1, dec2, times;
    try { dec1 = countDecimals(num1)+1; } catch (e) { dec1 = 0; }
    try { dec2 = countDecimals(num2)+1; } catch (e) { dec2 = 0; }
    times = Math.pow(10, Math.max(dec1, dec2));
    // var result = Number(((num1 * times - num2 * times) / times);
    var result = Number((accMul(num1, times) - accMul(num2, times)) / times);
    return getCorrectResult("sub", num1, num2, result);
    // return result;
};

var accDiv = function(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var t1 = 0, t2 = 0, dec1, dec2;
    try { t1 = countDecimals(num1); } catch (e) { }
    try { t2 = countDecimals(num2); } catch (e) { }
    dec1 = convertToInt(num1);
    dec2 = convertToInt(num2);
    var result = accMul((dec1 / dec2), Math.pow(10, t2 - t1));
    return getCorrectResult("div", num1, num2, result);
    // return result;
};

var accMul = function(num1, num2) {
    num1 = Number(num1);
    num2 = Number(num2);
    var times = 0, s1 = num1.toString(), s2 = num2.toString();
    try { times += countDecimals(s1); } catch (e) { }
    try { times += countDecimals(s2); } catch (e) { }
    var result = convertToInt(s1) * convertToInt(s2) / Math.pow(10, times);
    return getCorrectResult("mul", num1, num2, result);
    // return result;
};

var countDecimals = function(num) {
    var len = 0;
    try {
        num = Number(num);
        var str = num.toString().toUpperCase();
        if (str.split('E').length === 2) { // scientific notation
            var isDecimal = false;
            if (str.split('.').length === 2) {
                str = str.split('.')[1];
                if (parseInt(str.split('E')[0]) !== 0) {
                    isDecimal = true;
                }
            }
            let x = str.split('E');
            if (isDecimal) {
                len = x[0].length;
            }
            len -= parseInt(x[1]);
        } else if (str.split('.').length === 2) { // decimal
            if (parseInt(str.split('.')[1]) !== 0) {
                len = str.split('.')[1].length;
            }
        }
    } catch(e) {
        throw e;
    } finally {
        if (isNaN(len) || len < 0) {
            len = 0;
        }
        return len;
    }
};

var convertToInt = function(num) {
    num = Number(num);
    var newNum = num;
    var times = countDecimals(num);
    var temp_num = num.toString().toUpperCase();
    if (temp_num.split('E').length === 2) {
        newNum = Math.round(num * Math.pow(10, times));
    } else {
        newNum = Number(temp_num.replace(".", ""));
    }
    return newNum;
};

var getCorrectResult = function(type, num1, num2, result) {
    var temp_result = 0;
    switch (type) {
        case "add":
            temp_result = num1 + num2;
            break;
        case "sub":
            temp_result = num1 - num2;
            break;
        case "div":
            temp_result = num1 / num2;
            break;
        case "mul":
            temp_result = num1 * num2;
            break;
    }
    if (Math.abs(result - temp_result) > 1) {
        return temp_result;
    }
    return result;
};
```

## 四、类库
### 4.1 Math.js
Math.js 是专门为 JavaScript 和 Node.js 提供的一个广泛的数学库。它具有灵活的表达式解析器，支持符号计算，配有大量内置函数和常量，并提供集成解决方案来处理不同的数据类型</br>
像数字，大数字(超出安全数的数字)，复数，分数，单位和矩阵。 功能强大，易于使用。</br>
[官网](http://mathjs.org/)</br>
[GitHub](https://github.com/josdejong/mathjs)

### 4.2 decimal.js
为 JavaScript 提供十进制类型的任意精度数值。</br>
[官网](http://mikemcl.github.io/decimal.js/)</br>
[GitHub](https://github.com/MikeMcl/decimal.js)

### 4.3 big.js
[官网](http://mikemcl.github.io/big.js)</br>
[GitHub](https://github.com/MikeMcl/big.js/)

## 参考文章
1. [JavaScript 浮点数陷阱及解法](https://github.com/camsong/blog/issues/9)
2. [JavaScript 浮点数运算的精度问题](https://www.html.cn/archives/7340)
3. [JS中浮点数精度问题](https://juejin.cn/post/6844903572979597319)