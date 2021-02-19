---
title: Javascript深入系列（六）：JS数据类型
date: 2021-01-15 17:33:12
tags:
---
## 一、数据类型 "7+1"
### 1.1 概念
1. **7 种原始类型（不可变）：** Boolean、Undefined、Number、String、Null、Symbol(ES6)、BigInt(ES6)
2. **1 种对象类型Object：** 包含了Function、Array、特殊对象（RegExp、Date）
<!-- more -->
**Symbol：** 表示独一无二的值，如对象的key，常量</br>
**BigInt：** 可以表示超出Number限制的整数（253 -1）

### 1.2 应用场景
#### 1.2.1 null的场景
1. 作为原型链的终点
2. 作为函数的参数，表示该函数的参数不是对象

#### 1.2.2 undefined的场景
1. 声明了一个变量但并未为该变量赋值，此变量的值默认为`undefined`
2. 函数没有明确写`return`，默认返回`undefined`
3. 调用函数时，没有传参数，默认参数值为`undefined`
4. 对象的某个属性没有赋值，默认值为`undefined`

## 二、类型的判断
### 2.1 typeof
>typeof 操作符返回一个字符串，表示未经计算的操作数的类型。

```
// 1、数值
typeof 3.14 //'number'
typeof NaN //'number'
typeof Number(1) //'number'

typeof 42n //'bigint'

// 2、字符串
typeof 'bla' //'string'
typeof (typeof 1) //'string'
typeof String(1) // 'string'

// 3、布尔值
typeof true //'boolean'
typeof Boolean(1) //'boolean'

// 4、Symbols
typeof Symbol('foo') //'symbol';
typeof Symbol.iterator //'symbol';

// 5、Undefined
typeof undefined //'undefined';
typeof undeclaredVariable //'undefined';

// 6、对象
typeof {a: 1} === 'object';
typeof [1, 2, 4] === 'object';
typeof new Date() === 'object';

// 7、函数
typeof function() {} //'function';
typeof new Function //"function"
typeof class C {} //'function'
typeof Math.sin //'function';

// 下面的例子令人迷惑，非常危险，没有用处。避免使用它们。
typeof new Boolean(true) === 'object';
typeof new Number(1) === 'object';
typeof new String('abc') === 'object';

// JavaScript 诞生以来便如此
typeof null === 'object';
```

### 2.2 constructer、instanceof
自定义类型的判断
```
//constructor
(123).constructor === Number //true
([1,2,3]).constructor === Array //true
(new Function).constructor === Function //true
(/hh/).constructor === RegExp //true
(undefined).constructor === undefined //Uncaught TypeError: Cannot read property 'constructor' of undefined

//instanceof
123 instanceof Number //false
'123' instanceof String //false
true instanceof Boolean //false
new Error instanceof Error //true

//自定义类型
function Person(){}
var Tom = new Person()
Tom.constructor === Person  //true
Tom instanceof Person  //true
```

### 2.3 Object.prototype.toString.call()
**可以检测所有类型**</br>
`toString`是`Object`原型对象上的一个方法，该方法默认返回其调用者的具体类型，更严格的讲，是 `toString`运行时this指向的对象类型, 返回的类型格式为`[object,xxx],xxx`是具体的数据类型，其中包括：</br>
String,Number,Boolean,Undefined,Null,Function,Date,Array,RegExp,Error,HTMLDocument，... 基本上所有对象的类型都可以通过这个方法获取到。
```
Object.prototype.toString.call(null)  //"[object Null]"
Object.prototype.toString.call(undefined)  //"[object Undefined]"
Object.prototype.toString.call([])  //"[object Array]"
Object.prototype.toString.call(NaN)  //"[object Number]"
```
**类型判断工具函数：**
```
function type(data) {
    return Object.prototype.toString.call(data)
        .slice(8,-1) // 或者.replace(/\[object\s(.+)\]/, "$1")
        .toLowerCase()
}
```

### 2.4 特殊判断
### 2.4.1 例子
```
var str1 = '1';
var str2 = new String('1');

str1 == str2; str1 === str2; // true false

null == null; null === null; // true true

undefined == undefined; undefined === undefined; // true true

NaN == NaN; NaN === NaN; // false false

/a/ == /a/; /a/ === /a/; // false false

{} == {}; {} === {}; // false false
```

### 2.4.2 空对象判断
```
空对象判断
function isEmptyObject(obj) {
    // 第一种
    return !!obj ? (Object.getOwnPropertyNames(obj).length === 0) : true;
    // 第二种
    return JSON.stringify(obj) === '{}'
}
```

## 三、类型转换
### 3.1 显示强制类型转换
**valueOf() 与 toString要点：**
1. `toString()`和`valueOf()`都是对象的方法
2. `toString()`返回的是字符串，而`valueOf()`返回的是原对象
3. `undefined`和`null`没有`toString()`和`valueOf()`方法
4. 包装对象的`valueOf()`方法返回该包装对象对应的原始值
5. 使用`toString()`方法可以区分内置函数和自定义函数

#### 3.1.1 ToString：将值转为字符串
| 参数 | 结果 |
|------|------------|
| 1. undefined  |'undefined'|
| 2. null  |'null'|
| 3. 布尔值  |转换为'true' 或 'false'|
| 4. 数字  |数字转换字符串，比如：1.765转为'1.765'|
| 5. 字符串  | 无须转换 |
| 6. 对象(obj)  |先进行 ToPrimitive(obj, String)转换得到原始值，在进行ToString转换为字符串|

```
[1,2,3].toString() // '1,2,3'
[]->""，[1,2]->"1,2"，{}->"[object Object]"，function->"function"
其他都是x->"x"
```
1. `Number、Boolean、String、Array、Date、RegExp、Function`这几种构造函数生成的对象，通过`toString`转换后会变成相应的字符串的形式，因为这些构造函数上封装了自己的`toString`方法
```
Number.prototype.hasOwnProperty('toString'); // true
Boolean.prototype.hasOwnProperty('toString'); // true
String.prototype.hasOwnProperty('toString'); // true
Array.prototype.hasOwnProperty('toString'); // true
Date.prototype.hasOwnProperty('toString'); // true
RegExp.prototype.hasOwnProperty('toString'); // true
Function.prototype.hasOwnProperty('toString'); // true

var num = new Number('123sd');
num.toString(); // 'NaN'

var str = new String('12df');
str.toString(); // '12df'

var bool = new Boolean('fd');
bool.toString(); // 'true'

var arr = new Array(1,2);
arr.toString(); // '1,2'

var d = new Date();
d.toString(); // "Wed Oct 11 2017 08:00:00 GMT+0800 (中国标准时间)"

var func = function () {}
func.toString(); // "function () {}"
```

2. 继承的`Object.prototype.toString`方法
```
var obj = new Object({});
obj.toString(); // "[object Object]"

Math.toString(); // "[object Math]"
```

#### 3.1.2 ToNumber：将值转为数字
| 参数 | 结果 |
|------|------------|
| 1. undefined  |NaN|
| 2. null  |+0|
| 3. 布尔值  |true转换1，false转换为+0|
| 4. 数字  |无须转换|
| 5. 字符串  |	有字符串解析为数字，例如：‘324’转换为324，‘qwer’转换为NaN|
| 6. 对象(obj)  |先进行 ToPrimitive(obj, Number)转换得到原始值，在进行ToNumber转换为数字|

```
Number('42') //42

true->1
null/""/[]/false->0
'42'->42
其他->NaN
```

#### 3.1.3 ToBoolean
```
Boolean([]) //true
undefined/null/false/+0/-0/NaN/""->false
其他都为true
```

#### 3.1.4 ToPrimitive：将值转换为原始值

#### 3.1.5 TvalueOf()方法
1. `Number、Boolean、String`这三种构造函数生成的基础值的对象形式，通过`valueOf`转换后会变成相应的原始值
```
var num = new Number('123');
num.valueOf(); // 123

var str = new String('12df');
str.valueOf(); // '12df'

var bool = new Boolean('fd');
bool.valueOf(); // true
```
2. `Date`这种特殊的对象，其原型`Date.prototype`上内置的`valueOf`函数将日期转换为日期的毫秒的形式的数值。
```
var a = new Date();
a.valueOf(); // 1515143895500
```
3. 除此之外返回的都为`this`，即对象本身
```
var a = new Array();
a.valueOf() === a; // true

var b = new Object({});
b.valueOf() === b; // true
```

### 3.2 隐式强制类型转换
>热门题目：怎么定义a，可以使a==1&&a==2&&a==3？
```
const a = {
  i: 1,
  toString: function () {
    return a.i++;
  }
}
if (a == 1 && a == 2 && a == 3) {
  console.log('hello world!');
}

// hello world!
```

#### 3.2.1 `if`判断中
```
    if(XXX){
        ...
    }
```
这里就发生了隐式转换，`if`的判断条件是`Boolean`类型，代码在执行到`if`判断时，js将XXX转换成了`Boolean`类型。

#### 3.2.2 比较操作符 `"=="`
```
  [] == []  // false
  {} == {}  // false
  [] != []  // true
```

#### 3.2.3 加号`"+"` 与 减号 `"-"`
```
var add = 1 + 2 + '3'
console.log(add);  //'33'

var minus = 3 - true
console.log(minus); //2
```

```
"a" + "b"  // "ab"
"a" + 1    // "a1"
"a" + {}   // "a[object object]"
"a" + []   // "a"
"a" + true  // "atrue"
"a" + null  // "anull"
"a" + undefined // "aundefined"
 
 1 + 2     // 3
 1 + true  // 2
 1 + null  // 1
 true + true   // 2
 true + false  // 1
 true + null   // 1
 false + null  // 0
 
 var c = {
     valueOf(){
         return 1;
     }
 }

 1 + undefined   // NaN
 true + undefined  // NaN
 true + c   // 2
 1 + c   // 2
 
 NaN + 1  // NaN
 NaN + null  // NaN
 
 [] + {}  // "[object object]"
 {} + []  // 0
```

#### 3.2.4 `.`点号操作符
```
var a = 2;
console.log(a.toString()); // '2';

var b = 'zhang';
console.log(b.valueOf()); //'zhang';
```
#### 3.2.5 关系运算符比较时
```
 3 > 4  // false
"2" > 10  // false
"2" > "10"  // true
```
如果比较运算符两边都是**数字类型**，则直接比较大小。如果是**非数值**进行比较时，则会将其转换为**数字**然后在比较，如果**符号两侧的值都是字符串**时，不会将其转换为数字进行比较，而是分别比较字符串中**字符的Unicode编码**。

#### 3.2.6 `==`运算符隐式转换

##### 原始类型之间相比较
1. 字符串类型与数字类型相比较
+ 当字符串类型与数字类型相比较时，`字符串类型`会被转换为`数字类型`
+ 当字符串是由纯数字组成的字符串时，转换成对应的数字，字符串为空时转换为`0`，其余的都转换为`NaN`。
```
  "1" == 1  //true
  "" == 0  //true
  "1.1e+21" == 1.1e+21  //true
  "Infinity" == Infinity  //true
  NaN == NaN  //false  因为NaN与任何值都不相等，包括自己  
```

2. 布尔类型与其他类型相比较
+ 只要`布尔类型`参与比较，该`布尔类型`就会率先被转成`数字类型`
+ 布尔类型`true`转为`1`，`false`转为`0`
```
true == 1  // true
false == 0  // true
true == 2  // false
"" == false // true
"1" == true // true
```

3. `null`类型和`undefined`类型与其他类型相比较
```
null == null   //true
undefined == undefined  //true
null == undefined  //true
null == 0  //false
null == false  //false
undefined == 0  //false
undefined == false  //false
null == []  //false
null == {}  //false
unfefined == []  //false
undefined == {}  //false
```

##### 对象与原始类型的相比较
>对象与原始类型相比较时，会把对象按照对象转换规则转换成原始类型，再比较。
```
 {} == 0  // false
 {} == '[object object]'  // true
 [] == false  // true
 [1,2,3] == '1,2,3' // true
```
1. `{}`的原始值为`"[object object]"`，比较变成`"[object object]" == 0`，接着根据字符串与数字类型相比较规则，先将字符串转换成数字类型，可知`[object object]`转为数字为`NaN`，比较变成`NaN == 0`，因为`NaN`与任何值都不想等，故结果为`false`。
2. `[]`的原始值为空字符串""，比较变成`"" == 0`，接着根据字符串与数字类型相比较规则，先将字符串转换成数字类型，可知`""`转为数字为`0`，比较变成`0 == 0`，故结果为`true`。

##### 对象与对象相比较
>如果两个对象指向同一个对象，相等操作符返回 true，否则为false。

```
[] == ![]  // true
{} == !{}  // false
```

## 四、示例
```
[] == ![] // true

// 1. 转原始值
  左边 = ""
    [].valueOf([]) //[]
    [].toString() //""
  右边 = false

// 2."" == false，都转为number
  0 == 0 // true
```

```
undefined == !undefined //false

// 已经为原始值，都转成number。左边undefined->NaN，右边false->0
// NaN == 0? 有一个为NaN，则返回false
```

```
[] + [] // ""

// 转为原始值，[]->""
// "" + "" -> ""
```

```
[] + {} // "[object Object]"

{} + [] // 0
// js任务第一个{}为空代码块，就变成了 +[]
```

```
{} + {} //"[object Object][object Object]"
2 * {} //NaN
```

## 参考文章
1. [带你撸一遍JS隐式转换细则](https://juejin.cn/post/6844903934876745735)</br>
2. [你所忽略的js隐式转换](https://juejin.cn/post/6844903557968166926)