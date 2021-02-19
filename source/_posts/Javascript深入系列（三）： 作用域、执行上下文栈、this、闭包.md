---
title: Javascript深入系列（三）： 作用域、执行上下文栈、this、闭包
date: 2021-01-04 23:10:34
tags:
---
## 一、作用域
作用域就是一个独立的地盘，让变量不会外泄、暴露出去。也就是说作用域最大的用处就是隔离变量，不同作用域下同名变量不会有冲突。</br>
ES6 之前 JavaScript 没有块级作用域，只有全局作用域和函数作用域。ES6 的到来，为我们提供了**块级作用域**，可通过新增命令 let 和 const 来体现。
<!-- more -->
### 1.1 全局作用域
#### 1.1.1 定义
>直接编写在 script 标签之中的JS代码，或者是一个单独的 JS 文件中的都是全局作用域；</br>
>全局作用域在页面打开时创建，页面关闭时销毁；在全局作用域中有一个全局对象 window（代表的是一个浏览器的窗口，由浏览器创建），可以直接使用。

#### 1.1.2 适用场景
1. **最外层函数**和在**最外层函数外面定义**的**变量**拥有全局作用域：</br>所有创建的变量都会作为 window 对象的属性保存，所有创建的函数都会作为 window 对象的方法保存。</br>
2. 所有**末定义直接赋值**的变量自动声明为拥有全局作用域</br>
```
function outFun2() {
    variable = "未定义直接赋值的变量";
    var inVariable2 = "内层变量2";
}
outFun2(); //要先执行这个函数，否则根本不知道里面是啥
console.log(variable); //未定义直接赋值的变量
console.log(inVariable2); //inVariable2 is not defined
```
3. 所有 window 对象的属性拥有全局作用域（例如 window.name、window.location、window.top 等等）</br>
```
JavaScript默认有一个全局对象window，全局作用域的变量实际上被绑定到window上的一个属性。
this === window
var n = 4
console.log(this.n) //4
console.log(window.n)//4
```

### 1.2 函数/局部作用域
#### 1.2.1 定义
>函数作用域，是指声明在函数内部的变量，和全局作用域相反，局部作用域一般只在固定的代码片段内可访问到，最常见的例如函数内部。</br>
>调用函数时创建函数作用域，函数执行完毕之后，函数作用域销毁。每调用一次函数就会创建一个新的函数作用域，它们之间是相互独立的。</br>
>作用域是分层的，内层作用域可以访问外层作用域的变量，反之则不行。

**值得注意的是：**</br>
块语句（大括号“｛｝”中间的语句），如 if 和 switch 条件语句或 for 和 while 循环语句，不像函数，它们不会创建一个新的作用域。在块语句中定义的变量将保留在它们已经存在的作用域中。
```
if (true) {
    // 'if' 条件语句块不会创建一个新的作用域
    var name = "Hammad"; // name 依然在全局作用域中
}
console.log(name); // logs 'Hammad'
```
### 1.3 块级作用域
#### 1.3.1 定义
>块级作用域可通过新增命令 let 和 const 声明，所声明的变量在指定块的作用域外无法被访问。</br>
>块级作用域在如下情况被创建：1、在一个函数内部；2、在一个代码块（由一对花括号包裹）内部

#### 1.3.1 块级作用域特点
1. 声明变量不会提升到代码块顶部</br>
2. 禁止重复声明（var可以，但会被后定义的变量覆盖掉）
```
思考题1：
在 switch 声明中你可能会遇到这样的错误，因为它只有一个块
解决方法：
嵌套在case子句内的块将创建一个新的块作用域的词法环境
switch(x) {
  case 0: {
   let foo;
   break;
  }
  case 1: {
   let foo;
   break;
  }
}

思考题2：
由于词法作用域，表达式(foo + 2)内的标识符“foo”会解析为if块的foo，而不是覆盖值为 1 的foo。
在这一行中，if块的“foo”已经在词法环境中创建，但尚未达到（并终止）其初始化（这是语句本身的一部分）：它仍处于暂存死
```
### 1.4 全局变量和局部变量的区别
**全局变量：** 在任何一个地方都可以使用，全局变量只有在浏览器关闭的时候才会销毁，比较占用内存资源。</br>
**局部变量：** 只能在函数内部使用，当其所在代码块被执行时，会被初始化；当代码块执行完毕就会销毁，因此更节省节约内存空间。

### 1.5 静态作用域
因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。</br>
而与词法作用域相对的是动态作用域，函数的作用域是在函数调用的时候才决定的。
```
var value = 1;

function foo() {
    console.log(value);
}

function bar() {
    var value = 2;
    foo();
}

bar(); //1
```
1、**假设JavaScript采用静态作用域，让我们分析下执行过程：**</br>
执行 foo 函数，先从 foo 函数内部查找是否有局部变量 value，如果没有，就根据书写的位置，查找上面一层的代码，也就是 value 等于 1，所以结果会打印 1。</br>

2、**假设JavaScript采用动态作用域，让我们分析下执行过程：**</br>
执行 foo 函数，依然是从 foo 函数内部查找是否有局部变量 value。如果没有，就从调用函数的作用域，也就是 bar 函数内部查找 value 变量，所以结果会打印 2。</br>
前面我们已经说了，JavaScript采用的是静态作用域，所以这个例子的结果是 1。</br>
```
var value = 1;

function bar() {
    var value = 2;
    function foo() {
    	console.log(value);
    }
    foo();
}

bar();//2
```

### 1.6 动态作用域
>bash 就是动态作用域

《JavaScript权威指南》中的例子：
```
代码1：
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();//local scope
```
```
代码2：
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();//local scope
```

## 二、执行上下文栈
为了模拟执行上下文栈的行为，让我们定义执行上下文栈是一个数组：
```
ECStack = [];
```
试想当 JavaScript 开始要解释执行代码的时候，最先遇到的就是全局代码，所以初始化的时候首先就会向执行上下文栈压入一个全局执行上下文，我们用 globalContext 表示它，并且只有当整个应用程序结束的时候，ECStack 才会被清空，所以程序结束之前， ECStack 最底部永远有个 globalContext：
```
ECStack = [
    globalContext
];
```
```
function fun3() {
    console.log('fun3')
}

function fun2() {
    fun3();
}

function fun1() {
    fun2();
}

fun1();
```
当执行一个函数的时候，就会创建一个执行上下文，并且压入执行上下文栈，当函数执行完毕的时候，就会将函数的执行上下文从栈中弹出。
```
// 伪代码

// fun1()
ECStack.push(<fun1> functionContext);

// fun1中竟然调用了fun2，还要创建fun2的执行上下文
ECStack.push(<fun2> functionContext);

// fun2还调用了fun3！
ECStack.push(<fun3> functionContext);

// fun3执行完毕
ECStack.pop();

// fun2执行完毕
ECStack.pop();

// fun1执行完毕
ECStack.pop();

// javascript接着执行下面的代码，但是ECStack底层永远有个globalContext
```
```
模拟代码1执行过程：
ECStack.push(<checkscope> functionContext);
ECStack.push(<f> functionContext);
ECStack.pop();
ECStack.pop();
```
```
模拟代码2执行过程：
ECStack.push(<checkscope> functionContext);
ECStack.pop();
ECStack.push(<f> functionContext);
ECStack.pop();
```

## 三、语句声明
### 3.1 var
>JavaScript的函数定义有个特点，它会先扫描整个函数体的语句，把所有申明的变量“提升”到函数顶部。</br>
>JavaScript引擎能自动提升变量的声明，但不会提升变量的赋值。
**变量提升：**
```
代码1：
'use strict';

function foo() {
    var x = 'Hello, ' + y;
    console.log(x);
    var y = 'Bob';
}

foo(); //Hello, undefined

相当于：
function foo() {
    var y; // 提升变量y的申明，此时y为undefined
    var x = 'Hello, ' + y;
    console.log(x);
    y = 'Bob';
}
```
```
代码2：
var x = 0;

function f(){
  var x = y = 1; // x在函数内部声明，y不是！
}
f();

console.log(x, y); // 0, 1
// x 是全局变量。
// y 是隐式声明的全局变量。 
```
```
代码3：
var x = 0;  // x是全局变量，并且赋值为0。

console.log(typeof z); // undefined，因为z还不存在。

function a() { // 当a被调用时，
  var y = 2;   // y被声明成函数a作用域的变量，然后赋值成2。

  console.log(x, y);   // 0 2

  function b() {       // 当b被调用时，
    x = 3;  // 全局变量x被赋值为3，不生成全局变量。
    y = 4;  // 已存在的外部函数的y变量被赋值为4，不生成新的全局变量。
    z = 5;  // 创建新的全局变量z，并且给z赋值为5。
  }         // (在严格模式下（strict mode）抛出ReferenceError)

  b();     // 调用b时创建了全局变量z。
  console.log(x, y, z);  // 3 4 5
}

a();                   // 调用a时同时调用了b。
console.log(x, z);     // 3 5
console.log(typeof y); // undefined，因为y是a函数的本地（local）变量。
```

### 3.2 let
>let声明的变量只在其声明的块或子块中可用，这一点，与var相似。二者之间最主要的区别在于var声明的变量的作用域是整个封闭函数。
```
function varTest() {
  var x = 1;
  {
    var x = 2;  // 同样的变量!
    console.log(x);  // 2
  }
  console.log(x);  // 2
}

function letTest() {
  let x = 1;
  {
    let x = 2;  // 不同的变量
    console.log(x);  // 2
  }
  console.log(x);  // 1
}
```
<span style="color:red">**位于函数或代码顶部的var声明会给全局对象新增属性, 而let不会!!!!**</span>
```
var x = 'global';
let y = 'global';
console.log(this.x); // "global"
console.log(this.y); // undefined
```

### 3.3 const
>常量是块级范围的，非常类似用 let 语句定义的变量。但常量的值是无法（通过重新赋值）改变的，也不能被重新声明。

用const定义的对象，可修改其值，因为const定义的变量存储的是对象的地址。
```
const MY_OBJECT = {'key': 'value'};
// 下面这个声明会成功执行
MY_OBJECT.key = 'otherValue';
// 也可以用来定义数组
const MY_ARRAY = [];
// 可以向数组填充数据
MY_ARRAY.push('A'); // ["A"]
```
## 四、this
### 4.1 定义
>this总是指向调用该函数的对象。在全局函数中，this等于window，this指的是函数运行时所在的环境。
### 4.2 代码示例
```
var name = 'Rose'
function Person(){
	this.name = 'Jack'
	this.sayName = function(){
		console.log('1', this)
		console.log('2', this.name)
	}
	setTimeout(this.sayName(), 0)
}

var person = new Person()
//new 的过程发生了什么！！！
//1 Person {}
//2 Jack
console.log(person) //{name: "Jack",sayName: ƒ ()}

person.sayName() //1 Jack, 2 Jack

var RoseSay = person.sayName
RoseSay() //1 window对象 2 Rose

Person() //1 window对象 2 Jack
this.name // Jack
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cab657bc94dd47f3a247666cc9e4ef9a~tplv-k3u1fbpfcp-watermark.image)

不像基类的构造函数，派生类的构造函数没有初始的 this 绑定。在构造函数中调用 super() 会生成一个 this 绑定。
```
1、
var obj = {
 a: 1,
 b: {
  a: 2,
  func: function() {
   console.log(this.a); // 输出结果为2
   console.log(this); // 输出结果是b对象
  }
 }
}

// 调用
obj.b.func();

2、
var obj = {
 a: 1,
 b: {
  a: 2,
  func: function() {
   console.log(this.a); // undefined 若在对象obj外定义a,则输出的就是其在外定义的值
   console.log(this); // window
  }
 }
}

var j = obj.b.func; 
// 只是将b对象下的方法赋值给j，并没有调用
j(); 
// 调用，绑定的对象是window，并非b对象直接调用
```
```
var a = 1;

function printA() {
 console.log(this.a);
}

var obj = {
 a: 2,
 foo: printA,
 bar: function() {
  printA();
 }
}

obj.foo(); // 2
obj.bar(); // 1
var foo = obj.foo;
foo(); // 1
```
```
function foo() {
 console.log(this);
}
// window全局对象
> undefined

// obj对象
var obj = {
 foo: foo
}
obj.foo();
> {foo:f}
```
```
var a = 2

var obj = {
    a: 4,
    foo:() => {
        console.log(this.a)
    
        function func() {
            this.a = 7
            console.log(this.a)
        }
    
        func.prototype.a = 5
        return func
    }
}

var bar = obj.foo()        
// 浏览器中输出: 2
bar()                      
// 浏览器中输出: 7
new bar()                  
// 浏览器中输出: 7 func {a: 7}
```
```
var a = 1;

function printA() {
 console.log(this.a);
}

var obj = {
 a: 2,
 foo: printA,
 bar: function() {
  printA();
 }
}

obj.foo(); // 2
obj.bar(); // 1
var foo = obj.foo;
foo(); // 1
```
```
前端笔试：
    function a(xx) {
        this.x = xx;
        return this;
    }

    var x = a(5);
    var y = a(6);

    console.log(x.x);    //undefined
    console.log(y.x);    //6
```
### 4.3 this在不同场景中的指向
1. 匿名函数中的this指向全局对象</br>
2. setInterval和setTimeout定时器中的this指向全局对象</br>
3. eval中的this指向调用上下文中的this</br>
4. apply 和 call中的this指向参数中的对象

### 4.4 this绑定的优先级
>箭头函数>new绑定 > 显示绑定 > 隐式绑定 > 默认绑定

#### 4.4.1 new绑定
函数使用new调用时，this绑定的是新创建的构造函数的实例
```
function func() {
 console.log(this)
}

var bar = new func() 
// func实例，this就是bar
```

#### 4.4.2 显示绑定
call，apply，bind可以用来修改函数绑定的this
```
function fn (name, price){
 this.name = name
 this.price = price
}

function Food(category, name, price) {
 fn.call(this, name, price) // call方式调用
 // fn.apply(this, [name,price]) // apply方式调用
 this.category = category
}

new Food('水果','苹果','6');
```

#### 4.4.3 隐式绑定
函数是否在某个上下文对象中调用，如果是，this绑定的是那个上下文对象。
```
var a = 'hello555'
var obj = {
    a: 'world555',
    b:{
        a:'Ch',
        foo: function() {
            console.log(this.a)
        }
    }
}
obj.b.foo()     
// 浏览器中输出: "Ch"
```

#### 4.4.4 默认绑定
```
var a = 'hello'
function foo() {
    var a = 'world'
    console.log(this.a)
    console.log(this)
}
foo()             
// 相当于执行 window.foo()
// 浏览器中输出: "hello"
// 浏览器中输出: Window 对象
```
```
var a = 'hello'
var obj = {
    a: 'world55',
    foo: function() {
        console.log(this.a)
    }
}
var bar = obj.foo
bar()              
// 浏览器中输出: "hello"
```
```
var a = 'hello'
var obj = {
    a: 'world55',
    foo: function() {
        console.log(this.a)
    }
}
function func(fn) {
    fn()
}
func(obj.foo)              
// 浏览器中输出: "hello"
```

```
// 匿名函数中的this指向全局对象
var a = 2;

var func = {
 a: 4,
 fn: (function() {
  console.log(this); // window
  console.log(this.a); // 2
 })()
}

// setInterval和setTimeout定时器中的this指向全局对象
var a = 2;

var oTimer = setInterval(function(){
 var a = 3;
 console.log(this.a); // 2
 clearInterval(oTimer);
},100);

// eval中的this指向调用上下文中的this
(function() {
 eval("console.log(this)"); // window
})();

function Foo() {
 this.bar = function(){
  eval("console.log(this)"); // Foo
 }
}

var foo = new Foo();
foo.bar();

// apply 和 call中的this指向参数中的对象
var a = 2;

var foo = {
 a: 20,
 fu: function(){
  console.log(this.a);
 }
};

var bar = {
 a: 200
}

foo.fu.apply(); // 2（若参数为空，默认指向全局对象)
foo.fu.apply(foo); // 20
foo.fu.apply(bar); // 200
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/edfb7395e83c41529f92a76098c00e18~tplv-k3u1fbpfcp-watermark.image)

### 4.5 call、apply、bind
通过call，apply，bind可以改变this的指向，this指向一般指向它的调用者，默认挂载在window对象下。es6中的箭头函数中，this指向创建者，并非调用者。
```
var name = '宇智波佐助', age=17;
var obj={
	name:'漩涡鸣人',
	objAge:this.age,
	myFun：function(){
	  console.log(this.name + "年龄"+this.age);
	}
}
obj.objAge;  // 17
obj.myFun()  // 旋涡鸣人年龄 undefined

var db = {name:'卡卡西',age:99}
obj.myFun.call(db)；　　　　// 卡卡西年龄 99
obj.myFun.apply(db);　　　 // 卡卡西年龄 99
obj.myFun.bind(db)();　　　// 卡卡西年龄 99
```
```
function add(c, d) {
  return this.a + this.b + c + d;
}

var o = {a: 1, b: 3};

// 第一个参数是用作“this”的对象
// 其余参数用作函数的参数
add.call(o, 5, 7); // 16

// 第一个参数是用作“this”的对象
// 第二个参数是一个数组，数组中的两个成员用作函数参数
add.apply(o, [10, 20]); // 34
```

### 4.5.1 call
>call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
```
var name = '宇智波佐助', age=17;
var obj={
	name:'漩涡鸣人',
	objAge:this.age,
	myFun：function(fm,t){
	  console.log(this.name + "年龄"+this.age, "来自"+this.fm + "前往" + this.t);
	}
}
var db = {name:'卡卡西',age:99}
obj.myFun.call(db,'成都','上海')；　　　　 // 卡卡西 年龄 99  来自 成都去往上海
```

### 4.5.2 apply
>apply() 方法调用一个具有给定this值的函数，以及以一个数组（或类数组对象）的形式提供的参数
```
obj.myFun.apply(db,['成都','上海']);      // 卡卡西 年龄 99  来自 成都去往上海  
```

### 4.5.3 bind
>bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
```
obj.myFun.bind(db,'成都','上海')();       // 卡卡西 年龄 99  来自 成都去往上海
obj.myFun.bind(db,['成都','上海'])();　　 // 卡卡西 年龄 99  来自 成都, 上海去往 undefined
```
### 4.6 箭头函数
#### 4.6.1 定义
>一个箭头函数表达式的语法比一个函数表达式更短，并且不绑定自己的 this，arguments，super或 new.target。箭头函数会捕获其所在上下文的 this 值，作为自己的 this 值。

>谁调用箭头函数的外层function，箭头函数的this就是指向该对象，如果箭头函数没有外层函数，则指向window。

1、默认指向定义它时，所处上下文的对象的this指向，偶尔没有上下文对象，this就指向window</br>
2、即使是call，apply，bind等方法也不能改变箭头函数this的指向

#### 4.6.2 注意点
由于 箭头函数没有自己的this指针，通过 call() 或 apply() 方法调用一个函数时，只能传递参数（不能绑定this---译者注），他们的第一个参数会被忽略。（这种现象对于bind方法同样成立---译者注）</br>
箭头函数中的this是根据其声明的地方来决定this的，它是ES6中出现的知识点，箭头函数中的this，是无法通过call，apply，bind被修改的，且因箭头函数没有构造函数constructor，导致也不能用new调用，就不能作为构造函数了，否则会出现错误。</br>
>1.箭头函数不能用作构造器，和 new一起用会抛出错误。</br>
>2.箭头函数没有prototype属性。</br>

#### 4.6.3 示例
1. Hello是全局函数，没有直接调用它的对象，也没有使用严格模式，this指向window
```
function hello() { 
   console.log(this);  // window 
}  
hello();
```
2. hello是全局函数，没有直接调用它的对象，但指定了严格模式（'use strict'），this指向undefined
```
function hello() { 
   'use strict';
   console.log(this);  // undefined
}  
hello();
```
3. hello直接调用者是obj，第一个this指向obj，setTimeout里匿名函数没有直接调用者，this指向window
```
const obj = {
    num: 10,
   hello: function () {
    console.log(this);    // obj
    setTimeout(function () {
      console.log(this);    // window
    });
   }    
}
obj.hello();
```
4. hello直接调用者是obj，第一个this指向obj，setTimeout箭头函数，this指向最近的函数的this指向，即也是obj
```
const obj = {
    num: 10,
   hello: function () {
    console.log(this);    // obj
    setTimeout(() => {
      console.log(this);    // obj
    });
   }    
}
obj.hello();
```
5. diameter是普通函数，里面的this指向直接调用它的对象obj。perimeter是箭头函数，this应该指向上下文函数this的指向，这里上下文没有函数对象，就默认为window，而window里面没有radius这个属性，就返回为NaN。
```
const obj = {
  radius: 10,  
  diameter() {    
      return this.radius * 2
  },  
  perimeter: () => 2 * Math.PI * this.radius
}
console.log(obj.diameter())    // 20
console.log(obj.perimeter())    // NaN
```
### 4.7 代码参考
```
/**
 * Question 1
 */

var name = 'window'

var person1 = {
  name: 'person1',
  show1: function () {
    console.log(this.name)
  },
  show2: () => console.log(this.name),
  show3: function () {
    return function () {
      console.log(this.name)
    }
  },
  show4: function () {
    return () => console.log(this.name)
  }
}
var person2 = { name: 'person2' }

person1.show1() // person1
person1.show1.call(person2) // person2

person1.show2() // window
person1.show2.call(person2) // window

person1.show3()() // window
person1.show3().call(person2) // person2
person1.show3.call(person2)() // window

person1.show4()() // person1
person1.show4().call(person2) // person1
person1.show4.call(person2)() // person2
```

```
/**
 * Question 2
 */
var name = 'window'

function Person (name) {
  this.name = name;
  this.show1 = function () {
    console.log(this.name)
  }
  this.show2 = () => console.log(this.name)
  this.show3 = function () {
    return function () {
      console.log(this.name)
    }
  }
  this.show4 = function () {
    return () => console.log(this.name)
  }
}

var personA = new Person('personA')
var personB = new Person('personB')

personA.show1() // personA
personA.show1.call(personB) // personB

personA.show2() // personA
personA.show2.call(personB) // personA

personA.show3()() // window
personA.show3().call(personB) // personB
personA.show3.call(personB)() // window

personA.show4()() // personA
personA.show4().call(personB) // personA
personA.show4.call(personB)() // personB
```
代码片段参考：[从这两套题，重新认识JS的this、作用域、闭包、对象](https://juejin.cn/post/6844903493845647367)

## 五、闭包
>闭包特性一：调用函数内部的变量，利用作用域链原理，能获取函数fn1的父级函数的局部变量进行计算。</br>
>闭包特性二：让这些变量的值始终保持在内存中,不会再fn1调用后被自动清除，再次执行fn1的时候还能继续上一次的计算。
```
function makeAdder(x) {
  return function(y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2));  // 7
console.log(add10(2)); // 12
```
```
function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;
```
```
var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }
})();

console.log(Counter.value()); /* logs 0 */
Counter.increment();
Counter.increment();
console.log(Counter.value()); /* logs 2 */
Counter.decrement();
console.log(Counter.value()); /* logs 1 */
```

## 参考文章
1. [从这两套题，重新认识JS的this、作用域、闭包、对象](https://juejin.cn/post/6844903493845647367)</br>
2. [【THE LAST TIME】this：call、apply、bind](https://juejin.cn/post/6844903968443891720)</br>
3. [你知道多少this，new，bind，call，apply？那我告诉你](https://zhuanlan.zhihu.com/p/91708497)</br>
4. [JS 全局作用域和局部作用域](https://www.cnblogs.com/nyw1983/p/11992930.html)</br>
5. [JS夯实之执行上下文与词法环境](https://juejin.cn/post/6844904145372053511#heading-6)</br>