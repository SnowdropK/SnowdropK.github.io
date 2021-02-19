---
title: Javascript深入系列（五）：EventLoop事件循环
date: 2021-01-15 11:45:26
tags:
---
## 一、单线程的JavaScript
>JavaScript 单线程指的是浏览器中负责解释和执行 JavaScript 代码的只有一个线程，即为**JS引擎线程**
<!-- more -->
JavaScript语言的一大特点就是单线程，也就是说，**同一个时间只能做一件事**。</br>
JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。</br>

### 1.1 单线程代码示例
[例子1](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)
```
function foo() {
    bar()
    console.log('foo')
}
function bar() {
    baz()
    console.log('bar')
}
function baz() {
    console.log('baz')
}

foo()
//baz、bar、foo
```
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5dbc6195940e409a905af4b55e623cb6~tplv-k3u1fbpfcp-watermark.image)

### 1.2 浏览器的渲染进程是提供多个线程

| 线程名 | 作用 |
|------|------------|
| 1. **JS引擎线程**  |也称为JS内核，负责处理JavaScript脚本。（例如V8引擎）</br>①JS引擎线程负责解析JS脚本，运行代码。</br>②JS引擎一直等待着任务队列中的任务的到来，然后加以处理。</br>③一个Tab页（renderer进程）中无论什么时候都只有一个JS线程运行JS程序。|
| 2. **事件触发线程**  |归属于渲染进程而不是JS引擎，用来控制事件循环</br>①当JS引擎执行代码块如`setTimeout`时（也可来自浏览器内核的其他线程，如鼠标点击、Ajax异步请求等），会将对应任务添加到事件线程中。</br>②当对应的事件符合触发条件被触发时，该线程会把事件添加到待处理队列的队尾，等待JS引擎的处理。</br>注意：由于JS的单线程关系，所以这些待处理队列中的事件都是排队等待JS引擎处理，JS引擎空闲时才会执行。|
| 3. **定时触发器线程** |`setInterval`和`setTimeout`所在的线程</br>①浏览器定时计数器并不是由JS引擎计数的。</br>②JS引擎时单线程的，如果处于阻塞线程状态就会影响计时的准确，因此，通过单独的线程来计时并触发定时。</br>③计时完毕后，添加到事件队列中，等待JS引擎空闲后执行。</br>注意：W3C在HTML标准中规定，规定要求`setTimeout`中低于4ms的时间间隔算为4ms。|
| 4. **异步http请求线程** |`XMLHttpRequest`在连接后通过浏览器新开一个线程请求</br>将检测到状态变更时，如果设置有回调函数，异步线程就产生状态变更事件，将这个回调放入事件队列中，再由JS引擎执行。|
| 5. **GUI渲染线程**	 |负责渲染浏览器界面，包括：</br>①解析HTML、CSS，构建DOM树和RenderObject树，布局和绘制等。</br>②重绘（`Repaint`）以及回流（`Reflow`）处理。|

### 1.3 进程和线程
1. 一个进程包含一个或多个线程
2. chrome为例，打开一个Tab（创建一个进程），又会包含多个线程（JS引擎线程、渲染线程）

## 二、任务队列
>“任务队列”是一个事件的队列（也可以理解成消息的队列）

任务可以分成两种，一种是`同步任务（synchronous）`，另一种是`异步任务（asynchronous）`。</br>
**同步任务** 指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；**异步任务** 指的是，不进入主线程、而进入`"任务队列"（task queue）`的任务，只有"任务队列"通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。</br>
“任务队列”是一个**先进先出(FIFO)的数据结构**，排在前面的事件，优先被主线程读取。主线程的读取过程基本上是自动的，只要执行栈一清空，“任务队列”上第一位的事件就自动进入主线程。但是，由于存在后文提到的**定时器**功能，主线程首先要检查一下执行时间，某些事件只有到了规定的时间，才能返回主线程。

### 2.1 运行机制
1. 所有同步任务都在主线程上执行，形成一个`执行栈（execution context stack）`。
2. 主线程之外，还存在一个`"任务队列"（task queue）`。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
3. 一旦`"执行栈"`中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步。

## 三、Event Loop（事件循环）
>主线程从"任务队列"中读取事件，这个过程是循环不断的，所以整个的这种运行机制又称为Event Loop（事件循环）。

如果执行栈里的任务执行完成，即**执行栈为空的时候（即JS引擎线程空闲）**，**事件触发线程**才会从消息队列取出一个任务（即异步的回调函数）放入执行栈中执行。</br>
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca42a6a85d27406ba4d1c3212a732419~tplv-k3u1fbpfcp-watermark.image)

[例子2]()
```
function foo() {
    bar()
    console.log('foo')
}
function bar() {
    baz()
    console.log('bar')
}
function baz() { 
    setTimeout(() => {
        console.log('setTimeout: 2s')
    }, 2000)
    console.log('baz') 
}

foo()
```
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5726c41eb8d14296ac7fb117326ada45~tplv-k3u1fbpfcp-watermark.image)

### 3.1 执行栈和事件队列
```
function a(){
    b();
    console.log('a');
}

function b(){
    console.log('b');
}
a();

// b、a
```
可以用[Loupe](http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)可视化工具模拟

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7613edd10374c72a49e8ce142a613a1~tplv-k3u1fbpfcp-watermark.image)
```
function a(){
    b();
    console.log('a');
}

function b(){
	console.log('b');
    setTimeout(function(){
    	console.log('c');
    },2000)
}
a();

//b、a、c
```
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ff1c5f0a2c6a4b3aa4fa90edef6585b5~tplv-k3u1fbpfcp-watermark.image)
```
console.log('script start')

setTimeout(() => {
  console.log('timer 1 over')
}, 1000)

setTimeout(() => {
  console.log('timer 2 over')
}, 0)

console.log('script end')

// script start
// script end
// timer 2 over
// timer 1 over
```
timer 2 的延时为 0ms，HTML5标准规定 setTimeout 第二个参数不得小于4（不同浏览器最小值会不一样），**不足会自动增加**，所以 "timer 2 over" 还是会在 “script end” 之后。</br>
就算延时为 0ms，只是 timer 2 的回调函数会立即加入消息队列而已，回调的执行还是得等执行栈为空（JS引擎线程空闲）时执行。
>其实 setTimeout 的第二个参数并不能代表回调执行的准确的延时事件，它只能表示回调执行的最小延时时间，因为回调函数进入消息队列后需要等待执行栈中的同步任务执行完成，执行栈为空时才会被执行。

### 3.2 宏任务Micro-Task与微任务Macro-Task
浏览器端事件循环中的异步队列有两种：**macro（宏任务）队列**和 **micro（微任务）队列**。**宏任务队列**可以有多个，**微任务队列**只有一个。

#### 3.2.1 宏任务 macrotask
| # | 浏览器 | Node |
|------|------------|------------|
| `I/O`  | ✅          | ✅         |
| `setTimeout`  | ✅        | ✅        |
| `setInterval`  | ✅       | ✅       |
| `setImmediate`  | ❌       | ✅       |
| `requestAnimationFrame`  | ✅       | ❌       |
| `UI rendering渲染`  |有些地方会列出来UI Rendering，说这个也是宏任务</br>可是在读了HTML规范文档以后，发现这很显然是和微任务平行的一个操作步骤|
| `run <script>`（同步的代码执行） |           |          |

`requestAnimationFrame`姑且也算是宏任务吧，`requestAnimationFrame`在[MDN的定义](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)为，下次页面重绘前所执行的操作，而重绘也是作为宏任务的一个步骤来存在的，且该步骤晚于微任务的执行

#### 3.2.2 微任务 microtask
| # | 浏览器 | Node |
|------|------------|------------|
| `process.nextTick`  | ❌           | ✅         |
| `MutationObserver`  | ✅        | ❌         |
| `Promise.then catch finally` 回调 | ✅       | ✅       |

`Promise`中注意是回调，而`new Promise`在实例化的过程中所执行的代码都是<em>**同步**</em>进行的

#### 3.2.3 代码1
```diff
绿色部分表示同步执行的代码

+setTimeout(_ => {
-  console.log(4)
+})

+new Promise(resolve => {
+  resolve()
+  console.log(1)
+}).then(_ => {
-  console.log(3)
+})

+console.log(2)

//1、2、3、4
```

#### 3.2.4 代码2
```
setTimeout(_ => console.log(4))

new Promise(resolve => {
    resolve()
    console.log(1)
}).then(_ => {
    console.log(3)
    Promise.resolve().then(_ => {
        console.log('before timeout')
  }).then(_ => {
    Promise.resolve().then(_ => {
        console.log('also before timeout')
    })
  })
})

console.log(2)
//1、 2、3、before timeout、also before timeout、4
```

### 3.3 Event Loop 过程解析
1. 一开始执行栈空,我们可以把执行栈认为是一个**存储函数调用的栈结构，遵循先进后出的原则**。micro 队列空，macro 队列里有且只有一个 script 脚本（整体代码）。
2. 全局上下文（script 标签）被推入执行栈，同步代码执行。在执行的过程中，会判断是同步任务还是异步任务，通过对一些接口的调用，可以产生新的 macro-task 与 micro-task，它们会分别被推入各自的任务队列里。同步代码执行完了，script 脚本会被移出 macro 队列，这个过程本质上是队列的 macro-task 的执行和出队的过程。
3. 上一步我们出队的是一个 macro-task，这一步我们处理的是 micro-task。但需要注意的是：当 macro-task 出队时，任务是一个一个执行的；而 micro-task 出队时，任务是一队一队执行的。因此，我们处理 micro 队列这一步，会逐个执行队列中的任务并把它出队，直到队列被清空。
4. **执行渲染操作，更新界面**
5. 检查是否存在 Web worker 任务，如果有，则对其进行处理
6. 上述过程循环往复，直到两个队列都清空
```
console.log('script start')

setTimeout(function() {
    console.log('timer over')
}, 0)

Promise.resolve().then(function() {
    console.log('promise1')
}).then(function() {
    console.log('promise2')
})

console.log('script end')

// script start
// script end
// promise1
// promise2
// timer over
```

### 3.4 事件循环伪代码
```
const macroTaskList = [
  ['task1'],
  ['task2', 'task3'],
  ['task4'],
]

for (let macroIndex = 0; macroIndex < macroTaskList.length; macroIndex++) {
  const microTaskList = macroTaskList[macroIndex]
  
  for (let microIndex = 0; microIndex < microTaskList.length; microIndex++) {
    const microTask = microTaskList[microIndex]

    // 添加一个微任务
    if (microIndex === 1) microTaskList.push('special micro task')
    
    // 执行任务
    console.log(microTask)
  }

  // 添加一个宏任务
  if (macroIndex === 2) macroTaskList.push(['special macro task'])
}

// > task1
// > task2
// > task3
// > special micro task
// > task4
// > special macro task
```

## 四、事件循环（进阶）与异步
###  4.1 定时器问题：setTimeout/setInterval
```
const s = new Date().getSeconds();

setTimeout(function() {
  // 输出 "2"，表示回调函数并没有在 500 毫秒之后立即执行
  console.log("Ran after " + (new Date().getSeconds() - s) + " seconds");
}, 500);

while(true) {
  if(new Date().getSeconds() - s >= 2) {
    console.log("Good, looped for 2 seconds");
    break;
  }
}
//Good, looped for 2 seconds
//Ran after 2 seconds
```
直到 2 秒后，主线程中的任务才执行完成，这才去执行 macrotask 中的 `setTimeout` 回调任务。
[setTimeout实际延时比设定值更久的原因：最小延迟时间](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/setTimeout#%E5%AE%9E%E9%99%85%E5%BB%B6%E6%97%B6%E6%AF%94%E8%AE%BE%E5%AE%9A%E5%80%BC%E6%9B%B4%E4%B9%85%E7%9A%84%E5%8E%9F%E5%9B%A0%EF%BC%9A%E6%9C%80%E5%B0%8F%E5%BB%B6%E8%BF%9F%E6%97%B6%E9%97%B4)

### 4.2 Promise
```
function foo() {
    console.log('foo')
}

console.log('global start')

new Promise((resolve) => {
    console.log('promise')
    resolve()
}).then(() => {
    console.log('promise then')
})

foo()

console.log('global end')

//global start
//promise
//foo
//global end
//promise then
```
```
function foo() {
    console.log('foo')
}

console.log('global start')

setTimeout(() => {
    console.log('setTimeout: 0s')
}, 0)

new Promise((resolve) => {
    console.log('promise')
    resolve()
}).then(() => {
    console.log('promise then')
})

foo()

console.log('global end')

//global start
//promise
//foo
//global end
//promise then
//setTimeout: 0S
```

### 4.3 async/await 
1. 函数前面`async`关键字的作用就2点：①这个函数总是返回一个`promise`。②允许函数内使用`await`关键字。
2. 关键字`await`使`async`函数一直等待（执行栈当然不可能停下来等待的，`await`将其后面的内容包装成`promise`交给`Web APIs`后，执行栈会跳出async函数继续执行），直到promise执行完并返回结果。await只在async函数函数里面奏效。
3. `async`函数只是一种比`promise`更优雅得获取`promise`结果（`promise`链式调用时）的一种语法而已。
```
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');

/** 
 * async1 start
 * async2
 * promise1
 * script end
 * async1 end
 * promise2
 * */
```
`async/await`其实是 `Promise` 和 `Generator` 的语法糖，如下代码可以转成`Promise`：

```
async function async1() {
    console.log('async1 start');
    Promise.resolve(async2()).then(()=>console.log('async1 end'))
}
async function async2() {
    console.log('async2');
}
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
```

## 五、Node.js的Event Loop
>Node.js也是单线程的Event Loop，但是它的运行机制不同于浏览器环境
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92ff5c0d27ba491c92edb8782d2553f8~tplv-k3u1fbpfcp-watermark.image)

JS的运行环境主要有两个：浏览器、Node。</br>
在两个环境下的Event Loop实现是不一样的，在浏览器中基于<em>**规范**</em>来实现，不同浏览器可能有小小区别。在Node中基于<em>**libuv**</em>这个库来实现。

### 5.1 Node.js的运行机制
1. V8引擎解析JavaScript脚本
2. 解析后的代码，调用Node API
3. libuv库负责Node API的执行。它将不同的任务分配给不同的线程，形成一个Event Loop（事件循环），以异步的方式将任务的执行结果返回给V8引擎
4. V8引擎再将结果返回给用户

### 5.2 Node.js event loop 和 JS 浏览器环境下的事件循环的区别
浏览器环境下，microtask的任务队列是每个macrotask执行完之后执行。而在Node.js中，microtask会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行microtask队列的任务。</br>

**浏览器和Node 环境下，microtask 任务队列的执行时机不同：**
1. Node端，microtask 在事件循环的各个阶段之间执行
2. 浏览器端，microtask 在事件循环的 macrotask 执行完之后执行

## 六、题目
#### 案例 6.1.1
```
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
//script start、async1 start、async2、promise1、script end、async1 end、promise2、setTimeout
```
先执行**宏任务**（当前代码块也算是**宏任务**），然后执行当前**宏任务**产生的**微任务**，然后接着执行**宏任务**</br>
1. 从上往下执行代码，先执行同步代码，输出 <mark>script start</mark>
2. 遇到`setTimeout`，现把 setTimeout 的代码放到**宏任务**队列中
3. 执行 `async1()`，输出 <mark>async1 start</mark>, 然后执行 `async2()`, 输出 <mark>async2</mark>，把 `async2()` 后面的代码 console.log('async1 end')放到**微任务**队列中
4. 接着往下执行，输出 <mark>promise1</mark>，把 `.then()`放到**微任务**队列中。（注意`Promise`本身是同步的立即执行函数，`.then`是异步执行函数！）
5. 接着往下执行， 输出 <mark>script end</mark>。同步代码（同时也是**宏任务**）执行完成，接下来开始执行刚才放到**微任务**中的代码
6. 依次执行**微任务**中的代码，依次输出 <mark>async1 end、 promise2</mark>, **微任务**中的代码执行完成后，开始执行**宏任务**中的代码，输出 <mark>setTimeout</mark>

#### 案例 6.1.2
```
console.log('start');
setTimeout(() => {
    console.log('children2');
    Promise.resolve().then(() => {
        console.log('children3');
    })
}, 0);

new Promise(function(resolve, reject) {
    console.log('children4');
    setTimeout(function() {
        console.log('children5');
        resolve('children6')
    }, 0)
}).then((res) => {
    console.log('children7');
    setTimeout(() => {
        console.log(res);
    }, 0)
})
//start、children4、children2、children3、children5、children7、children6
```
这道题跟上面题目不同之处在于，执行代码会产生很多个**宏任务**，每个**宏任务**中又会产生**微任务**

1. 从上往下执行代码，先执行同步代码，输出 <mark>start</mark>
2. 遇到`setTimeout`，先把 `setTimeout` 的代码放到**宏任务**队列中
3. 接着往下执行，输出 <mark>children4</mark>, 遇到`setTimeout`，先把 `setTimeout` 的代码放到**宏任务**队列②中，此时`.then`并不会被放到**微任务**队列中，因为 `resolve`是放到 `setTimeout`中执行的
4. 代码执行完成之后，会查找**微任务**队列中的事件，发现并没有，于是开始执行**宏任务**①，即第一个 `setTimeout`， 输出 <mark>children2</mark>，此时，会把 `Promise.resolve().then`放到**微任务**队列中。
5. **宏任务**①中的代码执行完成后，会查找**微任务**队列，于是输出 <mark>children3</mark>；然后开始执行**宏任务**②，即第二个 `setTimeout`，输出 <mark>children5</mark>，此时将`.then`放到**微任务**队列中。
6. **宏任务**②中的代码执行完成后，会查找**微任务**队列，于是输出 <mark>children7</mark>，遇到 `setTimeout`，放到**宏任务**队列中。此时**微任务**执行完成，开始执行**宏任务**，输出 <mark>children6</mark>

#### 案例 6.1.3
```
const p = function() {
    return new Promise((resolve, reject) => {
        const p1 = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(1)
            }, 0)
            resolve(2)
        })
        p1.then((res) => {
            console.log(res);
        })
        console.log(3);
        resolve(4);
    })
}


p().then((res) => {
    console.log(res);
})
console.log('end');
//3、end、2、4
```
1. 执行代码，`Promise`本身是同步的立即执行函数，`.then`是异步执行函数。遇到`setTimeout`，先把其放入**宏任务**队列中，遇到`p1.then`会先放到微任务队列中，接着往下执行，输出 <mark>3</mark>
2. 遇到 `p().then` 会先放到**微任务**队列中，接着往下执行，输出 <mark>end</mark>
3. 同步代码块执行完成后，开始执行**微任务**队列中的任务，首先执行 `p1.then`，输出 <mark>2</mark>, 接着执行`p().then`, 输出 <mark>4</mark>
4. **微任务**执行完成后，开始执行**宏任务**，`setTimeout, resolve(1)，`但是此时 `p1.then`已经执行完成，此时1不会输出。
将上述代码中的 resolve(2)注释掉, 此时 1才会输出，输出结果为 3 end 4 1。

#### 案例 6.1.4
```
Promise.resolve().then(()=>{
  console.log('Promise1')  
  setTimeout(()=>{
    console.log('setTimeout2')
  },0)
})
setTimeout(()=>{
  console.log('setTimeout1')
  Promise.resolve().then(()=>{
    console.log('Promise2')    
  })
},0)
//Promise1，setTimeout1，Promise2，setTimeout2
```
1. 一开始执行栈的**同步任务（这属于宏任务）** 执行完毕，会去查看是否有**微任务**队列，上题中存在(有且只有一个)，然后执行**微任务队**列中的所有任务输出<mark>Promise1</mark>，同时会生成一个**宏任务** `setTimeout2`
2. 然后去查看**宏任务**队列，**宏任务** `setTimeout1` 在 `setTimeout2` 之前，先执行**宏任务** `setTimeout1`，输出 <mark>setTimeout1</mark>
3. 在执行**宏任务**`setTimeout1`时会生成**微任务**`Promise2` ，放入**微任务**队列中，接着先去清空**微任务**队列中的所有任务，输出 <mark>Promise2</mark>
4. 清空完**微任务**队列中的所有任务后，就又会去**宏任务**队列取一个，这回执行的是`setTimeout2`

#### 案例 6.1.5
```
console.log('1');

setTimeout(function() {
    console.log('2');
    process.nextTick(function() {
        console.log('3');
    })
    new Promise(function(resolve) {
        console.log('4');
        resolve();
    }).then(function() {
        console.log('5')
    })
})
process.nextTick(function() {
    console.log('6');
})
new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8')
})

setTimeout(function() {
    console.log('9');
    process.nextTick(function() {
        console.log('10');
    })
    new Promise(function(resolve) {
        console.log('11');
        resolve();
    }).then(function() {
        console.log('12')
    })
})
//1，7，6，8，2，4，3，5，9，11，10，12
```

#### 案例 6.1.6
```
console.log(1)
setTimeout(function() {
  //settimeout1
  console.log(2)
}, 0);
const intervalId = setInterval(function() {
  //setinterval1
  console.log(3)
}, 0)
setTimeout(function() {
  //settimeout2
  console.log(10)
  new Promise(function(resolve) {
    //promise1
    console.log(11)
    resolve()
  })
  .then(function() {
    console.log(12)
  })
  .then(function() {
    console.log(13)
    clearInterval(intervalId)
  })
}, 0);

//promise2
Promise.resolve()
  .then(function() {
    console.log(7)
  })
  .then(function() {
    console.log(8)
  })
console.log(9)

//1、9、7、8、2、3、10、11、12、13
//注释clearInterval(intervalId)，则最后不会不断输出3
```

**注意：**</br>
由于在执行microtask任务的时候，只有当microtask队列为空的时候，它才会进入下一个事件循环，因此，如果它源源不断地产生新的microtask任务，就会导致主线程一直在执行microtask任务，而没有办法执行macrotask任务，这样我们就无法进行UI渲染/IO操作/ajax请求了，因此，我们应该避免这种情况发生。在nodejs里的process.nexttick里，就可以设置最大的调用次数，以此来防止阻塞主线程。

#### 案例 6.2.1
```
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
	console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});

console.log('script end');

//script start
//async1 start
//async2
//promise1
//script end
//async1 end
//promise2
//setTimeout
```

#### 案例 6.2.2
```
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    //async2做出如下更改：
    new Promise(function(resolve) {
	    console.log('promise1');
	    resolve();
	}).then(function() {
	    console.log('promise2');
    });
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise3');
    resolve();
}).then(function() {
    console.log('promise4');
});

console.log('script end');

//script start
//async1 start
//promise1
//promise3
//script end
//promise2
//async1 end
//promise4
//setTimeout
```

#### 案例 6.2.3
```
async function async1() {
    console.log('async1 start');
    await async2();
    //更改如下：
    setTimeout(function() {
        console.log('setTimeout1')
    },0)
}
async function async2() {
    //更改如下：
	setTimeout(function() {
		console.log('setTimeout2')
	},0)
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout3');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});

console.log('script end');

//script start
//async1 start
//promise1
//script end
//promise2
//setTimeout3
//setTimeout2
//setTimeout1
```

#### 案例 6.2.4
```
async function a1 () {
    console.log('a1 start')
    await a2()
    console.log('a1 end')
}
async function a2 () {
    console.log('a2')
}

console.log('script start')

setTimeout(() => {
    console.log('setTimeout')
}, 0)

Promise.resolve().then(() => {
    console.log('promise1')
})

a1()

let promise2 = new Promise((resolve) => {
    resolve('promise2.then')
    console.log('promise2')
})

promise2.then((res) => {
    console.log(res)
    Promise.resolve().then(() => {
        console.log('promise3')
    })
})
console.log('script end')

//script start
//a1 start
//a2
//promise2
//script end
//promise1
//a1 end
//promise2.then
//promise3
//setTimeout
```

## 参考文章
1. [JavaScript 运行机制详解：再谈Event Loop](https://www.ruanyifeng.com/blog/2014/10/event-loop.html)
2. [浏览器工作原理与实践](https://blog.poetries.top/browser-working-principle/guide/part1/lesson01.html#%E8%BF%9B%E7%A8%8B%E5%92%8C%E7%BA%BF%E7%A8%8B)
3. [微任务、宏任务与Event-Loop](https://juejin.cn/post/6844903657264136200)
4. [图解搞懂JavaScript引擎Event Loop](https://juejin.cn/post/6844903553031634952)
5. [浏览器与Node的事件循环(Event Loop)有何区别?](https://juejin.cn/post/6844903761949753352)
6. [《一文看懂浏览器事件循环》是个大佬](https://lucifer.ren/blog/2019/12/11/event-loop/)
7. [这一次，彻底弄懂 JavaScript 执行机制](https://juejin.cn/post/6844903512845860872#heading-3)
8. [前端开发都应该懂的事件循环（event loop）以及异步执行顺序（setTimeout、promise和async/await）](https://chen-cong.blog.csdn.net/article/details/97107219)

## 视频讲解
1. [菲利普·罗伯茨：到底什么是Event Loop呢？](https://www.youtube.com/watch?v=8aGhZQkoFbQ)
2. [Jake Archibald: In The Loop - JSConf.Asia](https://www.youtube.com/watch?v=cCOL7MC4Pl0&t=1592s)
3. [《Help, I’m stuck in an event-loop》(bilibili版)](https://www.bilibili.com/video/BV1mA411x7U1?from=search&seid=9756975470992221399)