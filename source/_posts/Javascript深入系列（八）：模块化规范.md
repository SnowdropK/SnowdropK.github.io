---
title: Javascript深入系列（八）：模块化规范
date: 2021-01-20 13:22:15
tags:
---
## 一、模块
### 1.1 什么是模块
1. 将一个复杂的程序依据一定的规则(规范)封装成几个块(文件)，并进行组合在一起
2. 块的内部数据与实现是`私有`的，只是向外部暴露一些接口(方法)与外部其它模块通信
<!-- more -->
### 1.2 为什么需要模块化
1. 会造成命名冲突和全局污染。
2. 在同一个页面请求过多的js文件时会造成页面阻塞和http请求过多。

前期的`模块化`通过`闭包`来达到`变量私有化`和`模块化`。
```
moduleA = function（） {
   var a,b;
   return {
      add: function (c){
         return a + b + c;
      };
   }
}()
```

## 二、CommonJS
### 2.1 基本概念
`CommonJS`规范规定，每个模块内部，`module变量`代表当前模块`（一个js文件就是一个模块）`。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的`module.exports`属性。</br>

每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。在服务器端，模块的加载是运行时同步加载的；在浏览器端，模块需要提前编译打包处理。</br>
`CommonJS`规范加载模块是`同步`的，也就是说，只有加载完成，才能执行后面的操作。</br>

**基本语法：**
+ 暴露模块：`module.exports = value` 或 `exports.xxx = value`
+ 引入模块：`require(xxx)`，如果是**第三方模块**，xxx为**模块名**；如果是**自定义模块**，xxx为**模块文件路径**
```
var a = 1;
var b = function (){}

module.exports.a = a;
module.exports.b = b;

//require方法引入
var main = require('./main')
main.a
main.b
```
webpack配置的时候经常用到，webpack是运行在node环境中的，他使用的是CommonJS规范。

### 2.2 特点
+ 所有模块都是运行在模块作用域，不会污染全局
+ 模块多次运行，只执行一次，然后缓存起来，要让模块重新执行只能清缓存
+ 他是按照引入的顺序执行的，也是就是同步执行

浏览器端的模块，不能采用`同步加载（synchronous）`，只能采用`异步加载（asynchronous）`，这就是AMD规范诞生的背景。

## 三、AMD
### 3.1 基本概念
>非同步加载模块，允许指定回调函数，浏览器端一般采用AMD规范

**require.js**</br>
`AMD规范`中规定所有模块和依赖项`异步加载`，这样子js文件就不是`一次性引入`了。
```
    //定义没有依赖的模块
    define(function(){
       return 模块
    })

    //定义有依赖的模块
    define(['module1', 'module2'], function(m1, m2){
       return 模块
    })
    
    //引入使用模块
    require(['module1', 'module2'], function(m1, m2){
       //使用m1/m2
    })
```

### 3.2 特点
1. `按需加载`，也就是说你引入模块才加载，不会在页面上一次性加载
2. `异步加载`，所有加载都是异步，不会阻塞页面

## 三、CMD
>专门用于浏览器端，模块的加载是异步的，模块使用时才会加载执行
**Sea.js**
```
    //定义没有依赖的模块
    define(function(require, exports, module){
      exports.xxx = value
      module.exports = value
    })
    
    //定义有依赖的模块
    define(function(require, exports, module){
      //引入依赖模块(同步)
      var module2 = require('./module2')
        //引入依赖模块(异步)
        require.async('./module3', function (m3) {
        })
      //暴露模块
      exports.xxx = value
    })
    
    //引入使用模块
    define(function (require) {
      var m1 = require('./module1')
      var m4 = require('./module4')
      m1.show()
      m4.show()
    })
```

## 四、AMD与CMD区别
|  | |||
|------|------------|------------|------------|
|AMD（如require.js）  |推崇**依赖前置，提前执行**，在最前边声明依赖，</br>在所有依赖都**加载`执行`完毕**后，才会执行主逻辑|速度快、浪费资源|require分：全局require和局部require|
|CMD（如sea.js） |推崇**依赖就近**，需要解析有哪些依赖，</br>在所有依赖**加载完毕**后，遇到require语句才执行依赖|节省资源、性能较差|`没有全局require`|

`AMD`和`CMD`最大的区别是对`依赖模块的执行时机处理不同`，而不是加载的时机或者方式不同，二者皆为`异步加载模块`。</br>
`AMD依赖前置`，js可以方便知道依赖模块是谁，立即加载。</br>
`CMD就近依赖`，需要使用把模块变为字符串解析一遍才知道依赖了那些模块，这也是很多人诟病CMD的一点，牺牲性能来带来开发的便利性，实际上解析模块用的时间短到可以忽略。</br>
**一句话总结：** 两者都是异步加载，只是执行时机不一样。AMD是依赖前置，提前执行，CMD是依赖就近，延迟执行。

## 五、UMD
>UMD是AMD和CommonJS的结合

`AMD模块`以`浏览器第一`的原则发展，`异步`加载模块。</br>
`CommonJS模块`以`服务器第一`原则发展，选择`同步`加载，它的模块无需包装(unwrapped modules)。</br>

UMD先判断是否支持`Node.js`的模块`（exports）`是否存在，存在则使用`Node.js`模块模式。</br>
在判断是否支持`AMD（define是否存在）`，存在则使用`AMD`方式加载模块。
```
    (function (window, factory) {
        if (typeof exports === 'object') {
         
            module.exports = factory();
        } else if (typeof define === 'function' && define.amd) {
         
            define(factory);
        } else {
         
            window.eventUtil = factory();
        }
    })(this, function () {
        //module ...
    });
```

## 六、ES6模块化
ES6 模块的设计思想是尽量的静态化，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。</br>
ES6 Module默认目前还没有被浏览器支持，需要使用babel，在日常写demo的时候经常会抛出错误。

ES6模块使用`import`关键字导入模块，`export`关键字导出模块：
```
    /** 导出模块的方式 **/
    
    var a = 0;
    export { a }; //第一种
       
    export const b = 1; //第二种 
      
    let c = 2;
    export default { c }//第三种 
    
    let d = 2;
    export default { d as e }//第四种，别名
    
    /** 导入模块的方式 **/
    
    import { a } from './a.js' //针对export导出方式，.js后缀可省略
    
    import main from './c' //针对export default导出方式,使用时用 main.c
    
    import 'lodash' //仅仅执行lodash模块，但是不输入任何值
```

## 七、ES6 模块与 CommonJS 模块的差异
1.  **CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用**
一旦输出一个值，模块内部的变化就影响不到这个值。而且，`CommonJS` 模块无论加载多少次，都只会在第一次加载时运行一次，以后再加载，返回的都是第一次运行结果的缓存，除非手动清除系统缓存。</br>
JS 引擎对脚本静态分析的时候，遇到模块加载命令`import`，就会生成一个`只读引用`，等到脚本真正执行时，再根据这个只读引用，到被加载的那个模块里面去取值。换句话说，ES6 的`import`有点像 Unix 系统的`“符号连接”`，原始值变了，import加载的值也会跟着变。因此，ES6 模块是`动态引用`，并且不会缓存值，模块里面的变量绑定其所在的模块。</br>

2. **CommonJS 模块是运行时加载，ES6 模块是编译时输出接口**
`CommonJ` 加载的是一个`对象（即module.exports属性）`，该对象只有在脚本运行完才会生成。即在输入时是先加载整个模块，生成一个对象，然后再从这个对象上面读取方法，这种加载称为`运行时加载`。
```
    // CommonJS模块
    let { stat, exists, readFile } = require('fs');
    
    // 等同于
    let _fs = require('fs');
    let stat = _fs.stat;
    let exists = _fs.exists;
    let readfile = _fs.readfile;
```
ES6 模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成。通过`export`命令显式指定输出的代码，`import`时采用静态命令的形式。即在`import`时可以指定加载某个输出值，而不是加载整个模块，这种加载称为`编译时加载`或者`静态加载`。
```
    // ES6模块
    import { stat, exists, readFile } from 'fs';
```

## 八、总结
1. `CommonJS`规范主要用于`服务端编程`，加载模块是`同步`的，这并不适合在浏览器环境，因为同步意味着阻塞加载，浏览器资源是异步加载的，因此有了AMD、CMD解决方案。
2. `AMD`规范在`浏览器环境`中`异步加载模块`，而且可以并行`加载多个模块`。不过，AMD规范开发成本高，代码的阅读和书写比较困难，模块定义方式的语义不顺畅。
3. `CMD`规范与AMD规范很相似，都用于`浏览器编程`，`依赖就近，延迟执行`，可以很容易在`Node.js`中运行。不过，依赖SPM打包，模块的加载逻辑偏重。
4. `ES6`在语言标准的层面上，实现了模块功能，而且实现得相当简单，完全可以取代 CommonJS 和 AMD 规范，成为浏览器和服务器通用的模块解决方案。

## 参考文章
1. [前端模块化详解(完整版)](https://juejin.cn/post/6844903744518389768)
2. [【JS基础】一文看懂前端模块化规范](https://juejin.cn/post/6844903837824712718)
3. [【深度全面】前端JavaScript模块化规范进化论【很不错，值得反复回看】](https://segmentfault.com/a/1190000023711059)
4. [前端科普系列-CommonJS：不是前端却革命了前端--详细，待看！！！](https://zhuanlan.zhihu.com/p/113009496)