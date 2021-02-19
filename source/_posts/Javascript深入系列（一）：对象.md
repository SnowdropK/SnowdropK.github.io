---
title: Javascript深入系列（一）：对象
date: 2020-11-29 14:33:15
tags:
---
[Object MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)
### 1.1 构造函数的属性

#### 1.1.1 Object.prototype.constructor
所有对象都会从它的原型上继承一个 constructor 属性
<!-- more -->
```
var o = {};
o.constructor === Object; // true

var o = new Object;
o.constructor === Object; // true

var a = [];
a.constructor === Array; // true

var a = new Array;
a.constructor === Array // true

var n = new Number(3);
n.constructor === Number; // true
```

### 1.2 Object 构造函数的方法
1. `Object.assign()：` 通过复制一个或多个对象来创建一个新的对象。（浅拷贝）</br>
1. `Object.create()：` 使用指定的原型对象和属性创建一个新对象。</br>
```
function Person(name){
  this.name = name;
}
let Jack = new Person('Jack')
let Marry = Object.create(Jack)
//Marry对象的原型是Jack，即__proto__指向Jack。Jack的原型是Person.prototype。

let Grace = Object.create(Person.prototype)
//Grace对象的__proto__指向Person.prototype
```
```
var o;
o = {};
// 以字面量方式创建的空对象就相当于:
o = Object.create(Object.prototype);
```
1. `Object.entries()：` 返回给定对象自身可枚举属性的 `[key, value]` 数组（与`for-in` 循环的区别，`for-in`会枚举原型链中的属性）。</br>
1. `Object.fromEntries()：` 把键值对列表转换为一个对象。</br>
1. `Object.getOwnPropertyDescriptor()：` 返回对象指定的属性配置。</br>
1. `Object.is()：` 比较两个值是否相同。所有 NaN 值都相等（这与==和===不同）。</br>
```
Object.is('foo', 'foo');     // true
Object.is(window, window);   // true

Object.is('foo', 'bar');     // false
Object.is([], []);           // false

var foo = { a: 1 };
var bar = { a: 1 };
Object.is(foo, foo);         // true
Object.is(foo, bar);         // false

Object.is(null, null);       // true
```
1. `Object.keys()：` 返回一个包含所有给定对象自身可枚举属性名称的数组<span style="color:red">（不读取原型链）</span>。</br>
1. `Object.values()：` 返回给定对象自身可枚举值的数组。</br>
1. `Object.defineProperty()：` 给对象添加一个属性并指定该属性的配置。</br>
1. `Object.defineProperties()：` 给对象添加多个属性并分别指定它们的配置。</br>
1. `Object.getOwnPropertyNames()：` 返回一个数组，它包含了指定对象所有的可枚举或不可枚举的属性名<span style="color:red">（包括可枚举和不可枚举，不读取原型链）</span>。</br>
1. `Object.setPrototypeOf()：` 设置对象的原型（即内部 `[[Prototype]]` 属性）。</br>
1. `Object.getPrototypeOf()：` 返回指定对象的原型对象。</br>
```
var proto = {};
var obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // true

Object.getPrototypeOf( Object ) === Function.prototype; 
```

### 1.3 Object 实例和 Object 原型对象
1. `Object.prototype.hasOwnProperty()：` 返回一个布尔值 ，表示某个对象是否含有指定的属性，而且此属性非原型链继承的。</br>
1. `Object.prototype.isPrototypeOf()：` 返回一个布尔值，表示指定的对象是否在本对象的原型链中。</br>
1. `Object.prototype.toSource()：` 返回字符串表示此对象的源代码形式，可以使用此字符串生成一个新的相同的对象。</br>
1. `Object.prototype.toLocaleString()：` 直接调用 toString()方法。</br>
1. `Object.prototype.toString()：` 返回对象的字符串表示。</br>
1. `Object.prototype.valueOf()：` 返回指定对象的原始值。</br>
1. `Object.prototype.watch()：` 给对象的某个属性增加监听。</br>

每个实例对象都有一个`hasOwnProperty()`方法，用来判断某一个属性到底是本地属性，还是继承自`prototype`对象的属性。
```
function Cat(props={}){
	this.name = props.name
}
Cat.prototype.type = "猫科动物"
const jiafei = new Cat({name: 'jiafei'})
for(let key in jiafei){
	console.log(key) //name、type，原型链上的属性也会遍历出来
}
Object.keys(jiafei) //["name"]
jiafei.hasOwnProperty("name"); // true
jiafei.hasOwnProperty("type"); // false
```

### 1.4 常用方法
1. `for...in：` 任意顺序访问对象及其原型链上的所有可枚举的属性</br>
1. `Object.keys：` 返回一个数组，值为当前对象本身里的可枚举的属性（不读取原型链）</br>
1. `Object.getOwnPropertyNames：` 返回一个数组，值为当前对象本身里的所有属性（包括可枚举和不可枚举，不读取原型链）</br>
```
var obj = {'0':'a','1':'b','2':'c'};
Object.defineProperty(obj, "4", {value:"d", enumerable:false}); //增加不可枚举的属性
Object.prototype['5'] = "e" // 增加原型链属性

// 第一种 for..in
// 遍历：自身可枚举属性+原型链
// 输出：a、b、c、e
for(let key in obj) {
  console.log(key, obj[key]);
}

// 等价于object.keys
// 输出：a、b、c
for(let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key, obj[key]);
  }
}

// 第二种：object.keys
// 遍历：自身可枚举属性
// 输出：a、b、c
Object.keys(obj).forEach(function(key){
    console.log(key, obj[key]);
});

// 第三种：object.getOwnProperty
// 遍历：自身所有属性
// 输出：a、b、c、d
Object.getOwnPropertyNames(obj).forEach(function(key){
    console.log(key, obj[key]);
});
```
`Object.setPropertyOf`和`Object.create`的差别在于：</br>
1. `Object.setPropertyOf`，给我两个对象，我把其中一个设置为另一个的原型。</br>
2. `Object.create`，给我一个对象，它将作为我创建的新对象的原型。</br>
当我们已经拥有两个对象时，要构建原型关联，可以通过`Object.setPrototypeOf`来处理。</br>
当我们只有一个对象，想以它为原型，创建新对象，则通过`Object.create`来处理。</br>

## 参考文章
[for(..in..) Object.keys和Object.getOwnPropertyNames的使用](https://zhuanlan.zhihu.com/p/38962363)
