---
title: Javascript深入系列（二）：原型、原型链、继承
date: 2020-12-23 15:43:11
tags:
---
## 一、instanceof
### 1.1 基本用法
<!-- more -->
```
//特例：
console.log(Object instanceof Object);//true 
console.log(Function instanceof Function);//true 

//特例：
console.log(Function instanceof Object);//true 
console.log(Object instanceof Function);//true 

console.log(Number instanceof Number);//false 
console.log(String instanceof String);//false 

console.log(Foo instanceof Function);//true 
console.log(Foo instanceof Foo);//false
```

### 1.2 底层实现
**1、instanceof的原理，并用代码实现** </br>
知识点：如果A沿着原型链能找到B.prototype，那么`A instanceof B`为true</br>
解法：遍历A的原型链，如果找到B.proptype，返回true，否则false
```
//方法一：
const instanceof = (A,B) => {
  let p = A;
  while(p){
    if(p.__proto__ === B.prototype){
      return true;
    }
    p = p.__proto__;
  }
  return false;
};

//方法二：
function instanceof2(obj, func){
	let p = obj.__proto__;	
	while(p){
		if(p === func.prototype){
			return true;
		}
		p = p.__proto__;
	}
	return false;
}
```

**知识点：** 如果在A对象上没有找到x属性，那么会沿着原型链找x属性</br>
**解法：** 明确foo和F变量的原型链，沿着原型链找a属性和b属性

```
let foo = {}
let F = function() {};
Object.prototype.a = 'value a'
Function.prototype.b = 'value b'

console.log(foo.a) //value a
console.log(foo.b) //undefined

console.log(F.a) //value a
console.log(F.b) //value b
```

## 二、ES5继承
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/37f972d957334d8ea36f0d166a77a51a~tplv-k3u1fbpfcp-watermark.image)

### 2.1 示例代码
#### 2.1.1 基本概念
为了区分普通函数和构造函数，按照约定，构造函数首字母应当大写，而普通函数首字母应当小写，这样，一些语法检查工具如jslint将可以帮你检测到漏写的`new`。</br>
1、当对象没有某个属性的时候，便会顺着原型链去找。
```
function Person(name, age){
  this.name = name;
  this.age = age;
}
let Jack = new Person('Jack', 12)

Jack.__proto__ === Person.prototype //true
Person.prototype.constructor === Person //true
Jack.__proto__.constructor === Person.prototype.constructor //true
Jack.constructor === Person.prototype.constructor //true

Person.constructor //Person.constructor 指向Function构造函数
Person.prototype.constructor //Person.prototype.constructor 是person本身
Person.constructor === Person.__proto__.constructor //true
```

2、Student()方法举例</br>
如果不写`new`，这就是一个普通函数，它返回`undefined`。</br>
但是，如果写了`new`，它就变成了一个构造函数，它绑定的`this`指向新创建的对象，并默认返回`this`，也就是说，不需要在最后写`return this`。
```
function Student(name) {
    this.name = name;
    this.hello = function () {
        alert('Hello, ' + this.name + '!');
    }
    //return this; 实际操作过程省略了这一步
}

var xiaoming = new Student('小明');
xiaoming.name; // '小明'
xiaoming.hello(); // Hello, 小明!
```

```
函数实现Student的方法：
function Student(name) {
    this.name = name;
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}
```
```
class关键字来编写Student：
class Student {
    constructor(name) {
        this.name = name;
    }

    hello() {
        alert('Hello, ' + this.name + '!');
    }
}

class继承：
class PrimaryStudent extends Student {
    constructor(name, grade) {
        super(name); // 记得用super调用父类的构造方法!
        this.grade = grade;
    }

    myGrade() {
        alert('I am at grade ' + this.grade);
    }
}
```
#### 2.1.2 属性遮蔽
```
// 让我们从一个函数里创建一个对象o，它自身拥有属性a和b的：
let f = function () {
   this.a = 1;
   this.b = 2;
}

let o = new f(); // {a: 1, b: 2}

// 在f函数的原型上定义属性
f.prototype.b = 3;
f.prototype.c = 4;

// 综上，整个原型链如下: 
// {a:1, b:2} ---> {b:3, c:4} ---> Object.prototype---> null

console.log(o.b); // 2
// b是o的自身属性吗？是的，该属性的值为 2
// 原型上也有一个'b'属性，但是它不会被访问到。
// 这种情况被称为"属性遮蔽 (property shadowing)"
```
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/571a06321adb41f68a8d9f10f412c14f~tplv-k3u1fbpfcp-watermark.image)

### 2.2 prototype
>给其它对象提供共享属性的对象

### 2.3 __ proto __
>1、__proto__和constructor是对象独有的。2、prototype属性是函数独有的；
ECMAScript 规范描述 `prototype` 是一个隐式引用，但之前的一些浏览器，已经私自实现了 `__proto__` 这个属性，使得可以通过 `obj.__proto__` 这个显式的属性访问，访问到被定义为隐式属性的 `prototype`。</br>
ECMAScript 规范说 prototype 应当是一个隐式引用:
1. 通过 `Object.getPrototypeOf(obj)` 间接访问指定对象的 `prototype` 对象。
2. 通过 `Object.setPrototypeOf(obj, anotherObj)` 间接设置指定对象的 prototype 对象。
3. 部分浏览器提前开了 `__proto__` 的口子，使得可以通过 `obj.__proto__` 直接访问原型，通过 `obj.__proto__ = anotherObj` 直接设置原型。
4. ECMAScript 2015 规范只好向事实低头，将 `__proto__` 属性纳入了规范的一部分。

### 2.4 constructor
>constructor属性也是对象所独有的，它是一个对象指向一个函数，这个函数就是该对象的构造函数

必须有`constructor()`方法，如果没有显式定义，一个空的`constructor()`方法会被默认添加。

## 三、ES6继承
### 3.1 Class
```
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```

由于类的方法都定义在`prototype`对象上面，所以类的新方法可以添加在`prototype`对象上面。`Object.assign()`方法可以很方便地一次向类添加多个方法。
```
class Point {
  constructor(){
    // ...
  }
}

Object.assign(Point.prototype, {
  toString(){},
  toValue(){}
});
```

### 3.2 toString()方法
```
类的内部所有定义的方法，都是不可枚举的（non-enumerable）
toString()方法是Point类内部定义的方法，它是不可枚举的。这一点与 ES5 的行为不一致
class Point {
  constructor(x, y) {
    // ...
  }

  toString() {
    // ...
  }
}

Object.keys(Point.prototype)
// []
Object.getOwnPropertyNames(Point.prototype)
// ["constructor","toString"]
```
```
ES5 的写法，toString()方法就是可枚举的。
var Point = function (x, y) {
  // ...
};

Point.prototype.toString = function () {
  // ...
};

Object.keys(Point.prototype)
// ["toString"]
Object.getOwnPropertyNames(Point.prototype)
// ["constructor", "toString"]
```

### 3.3 constructor()方法
```
constructor()方法默认返回实例对象（即this），完全可以指定返回另外一个对象
class Foo {
  constructor() {
    return Object.create(null);
  }
}

new Foo() instanceof Foo
// false
```
静态方法包含this关键字，这个this指的是类，而不是实例。
```
class Foo {
  static bar() {
    this.baz();
  }
  static baz() {
    console.log('hello');
  }
  baz() {
    console.log('world');
  }
}

Foo.bar() // hello
```

### 3.4 super 关键字
`super`这个关键字，既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同。</br>
1. 第一种情况，`super`作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次`super`函数。</br>
2. 第二种情况，`super`作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。</br>
```
class A {}

class B extends A {
  constructor() {
    super();
  }
}
```
`super`虽然代表了父类A的构造函数，但是返回的是子类B的实例，即`super`内部的this指的是B的实例。</br>
因此`super()`相当于：`A.prototype.constructor.call(this)`。</br>

`super`指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过`super`调用的。
```
ES6 规定，在子类普通方法中通过super调用父类的方法时，方法内部的this指向当前的子类实例。
class A {
  constructor() {
    this.x = 1;
  }
  print() {
    console.log(this.x);
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
  }
  m() {
    super.print();
  }
}

let b = new B();
b.m() // 2
```

由于this指向子类实例，所以如果通过`super`对某个属性赋值，这时`super`就是this，赋值的属性会变成子类实例的属性。
```
class A {
  constructor() {
    this.x = 1;
  }
}

class B extends A {
  constructor() {
    super();
    this.x = 2;
    super.x = 3;
    console.log(super.x); // undefined
    console.log(this.x); // 3
  }
}

let b = new B();
```

### 3.5 Class继承
`Class` 作为构造函数的语法糖，同时有`prototype`属性和`__proto__`属性，因此同时存在两条继承链。</br>
1. 子类的`__proto__`属性，表示构造函数的继承，总是指向父类。
2. 子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。
```
class A {}

class B extends A {}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

```
//继承
class A extends Object {
}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true

//非继承
class A {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
A.prototype.__proto__ === Function.prototype // false
```

```
class Animal {
    constructor(name) {
        this.name = name;
    }
}

class Cat extends Animal {
  constructor(name){
    super(name)
  }
  say(){
    return `Hello, ${this.name}!`
  }
}

// 测试:（用例不错，帮助学习理解原型）
var kitty = new Cat('Kitty');
var doraemon = new Cat('哆啦A梦');
if ((new Cat('x') instanceof Animal)
    && kitty 
    && kitty.name === 'Kitty'
    && kitty.say
    && typeof kitty.say === 'function'
    && kitty.say() === 'Hello, Kitty!'
    && kitty.say === doraemon.say)
{
    console.log('测试通过!');
} else {
    console.log('测试失败!');
}
```
## 四、继承方式
### 4.1 原型链继承
缺点：属性被共用；无法传参
```
function Child(){}
                  
Child.prototype = new Parent();  // 关键
var child = new Child();
```

### 4.2 构造函数继承
缺点：方法会重新创建
```
function Child(name){
  Parent.call(this, name)
}
var child = new Child('Jack');
```

### 4.3 组合继承
结合上述两种，较为常用
```
function Child(){
  Parent.call(this)   // 第二次调用
}
Child.prototype = new Parent();   // 第一次调用
Child.prototype.constructor = Child;

var child = new Child('Jack');
```

### 4.4 寄生式继承
缺点：方法会重新创建
```
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
```

### 4.5 寄生组合式继承
缺点：调用两次父构造函数
```
function Child(name){
  Parent.call(this, name)
}
Child.prototype = new Parent();

var child = new Child('Jack');
```

## 五、ES5继承与ES6继承的区别
1. ES5：先创建子类的实例对象this，再将父类的属性/方法添加上去 `Parent.call(this)`
2. ES6：先创建父类实例this，再用子类的构造函数修改this

ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（`Parent.apply(this)`）。</br>
ES6 的继承机制完全不同，实质是先将父类实例对象的属性和方法，加到this上面（所以必须先调用`super`方法），然后再用子类的构造函数修改this。</br>
`class` 的职责是充当创建 object 的模板， 通常来说，data 数据是由 `instance` 承载，而  methods 行为/方法则在 `class` 里。</br>
也就是说，基于 class 的继承，继承的是行为和结构，但没有继承数据。</br>
而基于 `prototype` 的继承，可以继承数据、结构和行为三者。
```
如果子类没有定义constructor方法，这个方法会被默认添加，
class ColorPoint extends Point {
}

// 等同于
class ColorPoint extends Point {
  constructor(...args) {
    super(...args);
  }
}
```

## 六、new
### 6.1 构造函数创建对象
红宝书:</br>
使用 `new` 操作符调用构造函数，实际上会经历一下4个步骤：
1. 创建一个新对象
2. 将构造函数的作用域赋给新对象（因此this就指向了这个新对象）
3. 执行构造函数中的代码（为这个新对象添加属性）
4. 返回新对象

### 6.2 实现new方法
1. 创建一个空对象
2. 从参数中删除第一个元素并返回，第一个参数(就是构造函数)，剩下就是参数
3. 链接到原型
4. 调用构造函数，把this绑定到新对象上
5. 返回构造函数调用的结果，或者新对象
**new 手写版本一**
```
createNew(Person, {name: 'Tom', age:20})

function createNew() {
    let obj = {}
    let constructor = [].shift.call(arguments)
    // let [constructor,...args] = [...arguments]  

    obj.__proto__ = constructor.prototype
    let result = constructor.apply(obj, arguments)

    return typeof result === 'object' ? result : obj
}
```
**new 手写版本二**
```
const createInstance = (Constructor, ...args) => {
	let instance = Object.create(Constructor.prototype);
	Constructor.call(instance, ...args);
	return instance;
}
function User(firstname, lastname){
	this.firstname = firstname;
	this.lastname = lastname;
}
const Naruto = createInstance(User, '鸣人', '旋涡')
```

### 6.3 箭头函数的this指向</br>
1. 箭头函数不绑定this，箭头函数中的this相当于普通变量。</br>
2. 箭头函数的this寻值行为与普通变量相同，在作用域中逐级寻找。</br>
3. 箭头函数的this无法通过`bind，call，apply`来直接修改。</br>
4. 改变作用域中this的指向可以改变箭头函数的this</br>
5. eg. `function closure(){()=>{//code }}`，在此例中，我们通过改变封包环境`closure.bind(another)()`，来改变箭头函数this的指向。

## 七、题目
1. `Proxy`和`Object.defineproperty`的区别
2. 写出结果：[代码来源](https://juejin.cn/post/6844903984335945736#heading-25)
```
function Foo() {
  getName = function() {
    alert(1);
  };
  return this;
}
Foo.getName = function() {
  alert(2);
};
Foo.prototype.getName = function() {
  alert(3);
};
var getName = function() {
  alert(4);
};
function getName() {
  alert(5);
}

//请写出以下输出结果：
Foo.getName();// 2
getName();// 4
Foo().getName();// 1
getName();//1
new Foo.getName();// 2
new Foo().getName();// 3
new new Foo().getName();// 3
```

## 参考文章
1. [原型](https://blog.csdn.net/wsmrzx/article/details/103997592)</br>
2. [深入理解 JavaScript 原型（很详细透彻）](https://mp.weixin.qq.com/s/1UDILezroK5wrcK-Z5bHOg)</br>
3. [【THE LAST TIME】一文吃透所有JS原型相关知识点（很全面）](https://juejin.cn/post/6844903984335945736)</br>
4. [深入理解javascript原型和闭包（完结）](https://www.cnblogs.com/wangfupeng1988/p/3977924.html)</br>
5. [【JavaScript】关于原型的知识点你都吃透了吗？（超详细！）](https://www.mdeditor.tw/pl/poxz)
