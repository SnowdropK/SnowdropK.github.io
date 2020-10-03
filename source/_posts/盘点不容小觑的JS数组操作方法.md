---
title: 盘点不容小觑的JS数组操作方法
date: 2020-09-13 21:37:48
tags:
---
数组使用方法盘点
<!-- more -->
平时写需求的时候，后台经常让前端二次处理接口数据（小声逼逼：让前端处理复杂数据的后台和需求很累赘的产品一样，都是前端的敌人），增加了额外的工作量。为了提高工作效率，腾出更多时间学习，就盘点一下数组的使用方法。

本文将MDN文档上有的方法，分门别类的罗列了一下。主要作为个人学习的笔记，具体MDN文档上都有，自己罗列一遍，方便记忆。

## 数组简介
>数组是一种类列表对象，它的原型中提供了遍历和修改元素的相关操作。

>只能用整数作为数组元素的索引，而不能用字符串。数组的索引是从0开始，只能用[]引用。
因为在 JavaScript 中，以数字开头的属性不能用点号引用，必须用方括号。

[MDN文档：Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)

## 数组属性
>length 、Symbol 属性 @@unscopable

## 数组操作方法系列一：修改器方法
>定义：修改器方法会改变调用它们的对象自身的值，即对数组进行增、删、改操作

### pop()
>定义：从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度

```
const plants = ['broccoli', 'cauliflower', 'cabbage', 'kale', 'tomato'];
console.log(plants.pop());
// expected output: "tomato"
```

### push()
>定义：将一个或多个元素添加到数组的末尾，并返回该数组的新长度

```
var sports = ["soccer", "baseball"];
var total = sports.push("football", "swimming");
console.log(sports); 
// ["soccer", "baseball", "football", "swimming"]
console.log(total);  
// 4
```
### shift()
>定义：从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度

```
const array1 = [1, 2, 3];
const firstElement = array1.shift();

console.log(array1);
// expected output: Array [2, 3]
console.log(firstElement);
// expected output: 1
```

### unshift()
>定义：将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)

```
const array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// expected output: 5

console.log(array1);
// expected output: Array [4, 5, 1, 2, 3]
```

### reverse()
>定义：将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。

```
const a = [1, 2, 3];
a.reverse(); 
console.log(a); // [3, 2, 1]
```

### sort()
>定义：用[原地算法](https://en.wikipedia.org/wiki/In-place_algorithm)对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的UTF-16代码单元值序列时构建的

>注意：sort()很重要，应用场景很广，对象数组的多条件优先级也可以使用sort()

```
arr.sort([compareFunction])

compareFunction 可选
用来指定按某种顺序进行排列的函数。如果省略，元素按照转换为的字符串的各个字符的Unicode位点进行排序。
firstEl
第一个用于比较的元素
secondEl
第二个用于比较的元素
```
compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
等于 0 ， a 和 b 的相对位置不变;
compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前
```
function compare(a, b) {
  if (a < b ) {           // 按某种排序标准进行比较, a 小于 b
    return -1;
  }
  if (a > b ) {
    return 1;
  }
  // a must be equal to b
  return 0;
}

//精简，升序排列
function compareNumbers(a, b) {
  return a - b;
}

// 按照多个值排序数组
mapped.sort(function(a, b) {
  return +(a.value > b.value) || +(a.value === b.value) - 1;
});
```

### splice()
>定义：通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

```
array.splice(start, deleteCount, [item1, item2, item3])

start：指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容
deleteCount：整数，表示要移除的数组元素的个数。0通常与添加元素一起组合使用。
item1, item2…：要添加进数组的元素,从start 位置开始
```

```
var myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
var removed = myFish.splice(3, 1);

// 运算后的 myFish: ["angel", "clown", "drum", "sturgeon"]
// 被删除的元素: ["mandarin"]
```

### copyWithin()（实验性API）
>定义：浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度。

>即：将数组中的一部分数据用另一部分数据替换

```
arr.copyWithin(target, start, end)
```
三个参数：

target：开始复制元素的下标，如果是负数，则从末尾开始计算。

start： 开始复制元素的起始位置，如果是负数，则从末尾开始计算。

end：复制元素的结束位置，copyWithin 将会拷贝到该位置，但不包括 end 这个位置的元素。如果是负数，则从末尾开始计算。
```
MDN官方例子：
[1, 2, 3, 4, 5].copyWithin(-2)
// [1, 2, 3, 1, 2]

[1, 2, 3, 4, 5].copyWithin(0, 3)
// [4, 5, 3, 4, 5]

[].copyWithin.call({length: 5, 3: 1}, 0, 3);
// {0: 1, 3: 1, length: 5}
```

### fill()（实验性API）
>定义：用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

```
arr.fill(value（填充数组元素的值）, start（起始索引）, end（终止索引，不包含）)
```

```
MDN官方例子:
[1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
[1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
[1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
Array(3).fill(4);                // [4, 4, 4]
[].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}
```

## 数组操作方法系列二：访问方法
>定义：访问方法绝对不会改变调用它们的对象的值，只会返回一个新的数组或者返回一个其它的期望值。


### slice()
>定义：返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝（包括 begin，不包括end）。原始数组不会被改变

```
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]
```

### concat()
>定义：用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

>注意：concat方法不会改变this或任何作为参数提供的数组，而是返回一个浅拷贝。当一个合并的数组中有对象，只要修改一个数组中对象的值，新旧数组中对象值都会改变。

```
MDN官方例子：
var alpha = ['a', 'b', 'c'];
var alphaNumeric = alpha.concat(1, [2, 3]);

console.log(alphaNumeric); 
// results in ['a', 'b', 'c', 1, 2, 3]
```

### join()
>定义：将一个数组（或一个类数组对象）的所有元素连接成一个字符串并返回这个字符串。如果数组只有一个项目，那么将返回该项目而不使用分隔符。

```
var a = ['Wind', 'Rain', 'Fire'];
var myVar1 = a.join();      // myVar1的值变为"Wind,Rain,Fire"
var myVar2 = a.join(', ');  // myVar2的值变为"Wind, Rain, Fire"
```

### includes()（实验性API）
>定义：用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false

```
arr.includes(valueToFind, fromIndex)
```
```
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// expected output: true
[1, 2, 3].includes(3, -1); // true
```

### indexOf()
>定义：返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1

>补充：和findIndex()很像，但条件还是有差别的，findIndex()要满足提供的测试函数

```
var array = [2, 5, 9];
array.indexOf(2);     // 0
array.indexOf(7);     // -1
array.indexOf(9, 2);  // 2
```

### lastIndexOf()
>定义：返回指定元素（也即有效的 JavaScript 值或变量）在数组中的最后一个的索引，如果不存在则返回 -1。从数组的后面向前查找，从 fromIndex 处开始。

```
var array = [2, 5, 9, 2];
var index = array.lastIndexOf(2);
// index is 3
index = array.lastIndexOf(7);
// index is -1
index = array.lastIndexOf(2, 3);
// index is 3
index = array.lastIndexOf(2, -2);
// index is 0
```

### toLocaleString()
>定义：返回一个字符串表示数组中的元素。数组中的元素将使用各自的 toLocaleString 方法转成字符串，这些字符串将使用一个特定语言环境的字符串（例如一个逗号 ","）隔开

待补充~

### toSource() （非标准，尽量不用于生产环境）
>返回一个字符串,代表该数组的源代码

### toString()
>定义：返回一个字符串，表示指定的数组及其元素

```
const array1 = [1, 2, 'a', '1a'];

console.log(array1.toString());
// expected output: "1,2,a,1a"
```

## 数组操作方法系列三：迭代方法
>定义：即遍历方法

### forEach()
>定义：对数组的每个元素执行一次给定的函数

>即：类似for循环

### filter()
>定义：方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素

>即：对原数组进行过滤，返回的新数组中都是原数组中符合条件的元素

```
var newArray = arr.filter(callback(element, index, array),thisArg)

element：元素的值
index：元素的索引
array：被遍历的数组本身
thisArg：执行 callback 时，用于 this 的值
```

```
let filterArray = [1, 2, 3].filter(value => value > 2) // [3]
```

### map()
>定义：创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值

```
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
// roots的值为[1, 2, 3], numbers的值仍为[1, 4, 9]
```

### reduce()
>对数组中的每个元素执行一个reducer函数(升序执行)，将其结果汇总为单个返回值

```
reducer 函数接收4个参数:
Accumulator (acc) (累计器)
Current Value (cur) (当前值)
Current Index (idx) (当前索引)
Source Array (src) (源数组)
```

```
var initialValue = 0;
var sum = [{x: 1}, {x:2}, {x:3}].reduce(
    (accumulator, currentValue) => accumulator + currentValue.x
    ,initialValue
);

console.log(sum) // logs 6
```

### reduceRight()
>定义：接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值

待补充~

### entries()（实验性API）
>定义：返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对

有点没搞懂，先放着~

```
MDN：官方例子
const array1 = ['a', 'b', 'c'];
const iterator1 = array1.entries();

console.log(iterator1.next().value);
// expected output: Array [0, "a"]
console.log(iterator1.next().value);
// expected output: Array [1, "b"]
```
### every()
>定义：测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

```
arr.every(callback(element（元素值）, index（元素的索引）, array（原数组)
```

```
MDN官方例子：
[12, 5, 8, 130, 44].every(x => x >= 10); // false
```

### some()
>定义：测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值

>注意：和includes()有区别，includes()直接找对应的值，find()是满足callback 函数

```
[2, 5, 8, 1, 4].some(x => x > 10);  // false
[12, 5, 8, 1, 4].some(x => x > 10); // true
```

### find()（实验性API）
>定义：返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

```
arr.find(callback, thisArg)
```
```
MDN：官方例子
const array1 = [5, 12, 8, 130, 44];
const found = array1.find(element => element > 10);
```

### findIndex()（实验性API）
>定义：返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回-1。

>补充：这个方法和find()有异曲同工之妙，只不过find()返回的是元素的值，findIndex()返回的是元素的下标，从方法名就可以看出来了。

```
arr.findIndex(callback, thisArg)
```

### keys()（实验性API）
>定义：返回一个包含数组中每个索引键的Array Iterator对象

```
var arr = ["a", , "c"];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '2']
console.log(denseKeys);  // [0, 1, 2]
```

### values() （实验性API）
>定义：返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值

### Array.prototype[@@iterator]()（实验性API）
>定义：@@iterator 属性和 Array.prototype.values() 属性的初始值是同一个函数对象

待补充~

## 数组操作方法系列四：其他方法
### Array.isArray()
>定义：用于确定传递的值是否是一个 Array

>即：判断是不是数组，是的话返回布尔值true

```
MDN官方例子：
// true
Array.isArray([1, 2, 3]);  
Array.isArray(new Array('a', 'b', 'c', 'd'))
Array.isArray(Array.prototype) //鲜为人知的事实：其实 Array.prototype 也是一个数组。

// false
Array.isArray({foo: 123}); 
Array.isArray(new Uint8Array(32))
Array.isArray({ __proto__: Array.prototype });
```

### Array.from()
>定义：从一个类似数组或可迭代对象创建一个新的，浅拷贝的数组实例

>即：就是在不改变原数据值的情况下，将对象、字符串等变成数组后，返回新的数组

Array.from()有三个参数：

obj（必填）：要转化成数组的对象或者字符串

mapFn（可填）：新数组中的每个元素会执行该回调函数，和map类似，返回经过这个方法处理后的数组

thisArg（可填）：执行回调函数 mapFn 时的this 对象
```
Array.from(obj, mapFn, thisArg) = Array.from(obj).map(mapFn, thisArg)

MDN官方例子：
console.log(Array.from('foo'));
// expected output: Array ["f", "o", "o"]

console.log(Array.from([1, 2, 3], x => x + x));
// expected output: Array [2, 4, 6]
```
### Array.of()
>定义：创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型

>即：在of()中添加的所有数据，都返回成一个数组，没有参数类型和参数数量的限制


```
MDN官方例子：
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]
```

### flat()
>定义：会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

注意！！：flat()内部实现原理挺复杂的，MDN上有很多几个方案，得花时间多看看
```
var newArray = arr.flat([depth])
depth 可选：指定要提取嵌套数组的结构深度，默认值为 1。
```

```
MDN官方例子：
//扁平化嵌套数组
[0, 1, 2, [3, 4]].flat() //[0, 1, 2, 3, 4]
[0, 1, 2, [[[3, 4]]]].flat(2) //[0, 1, 2, [3, 4]]
//扁平化与数组空项
[1, 2, , 4, 5].flat() //[1, 2, 4, 5]
```
### flatMap()
>定义：首先使用映射函数映射每个元素，然后将结果压缩成一个新数组

>即：和flat()的用法一样，只是多了二次处理数据的方法，所以名字上也加了个Map

```
arr1.map(x => [x * 2]); 
// [[2], [4], [6], [8]]

arr1.flatMap(x => [x * 2]);
// [2, 4, 6, 8]
```

### Array[@@species] 
>定义：访问器属性返回 Array 的构造函数

待补充

## 总结

其实老实讲，之前碰到一些需要查的语法，经常看的是别人的文章。不过经过这一次数组的梳理，个人觉得还是能先看MDN文档就先MDN文档。

因为MDN文档中的语法是比较官方全面的，一般的文章中多少带了些主观的理解，有可能会存在偏差，包括我自己写的这篇。

但作为个人理解学习，写文章还是很有必要的。

不过在写文章的过程中，我写到一半其实不想写下去了，因为越看越觉得写的MDN上都有，没必要再整理一遍。但半途而废也不好，就干脆整理完。回顾一下，最有用的是文章目录和不同方法之间的总结比较。以后再写类似的盘点文章，可以着重这两方面。

总结归纳一下，学习输入以看文档为主，总结记忆靠写文章帮助。