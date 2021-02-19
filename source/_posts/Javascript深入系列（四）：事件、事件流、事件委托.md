---
title: Javascript深入系列（四）：事件、事件流、事件委托
date: 2021-01-12 14:16:12
tags:
---
## 一、事件绑定、解绑
>**DOM级别一共可以分为4个级别：** DOM0级，DOM1级，DOM2级和DOM3级<br>
>**而DOM事件分为3个级别：** DOM0级事件处理，DOM2级事件处理和DOM3级事件处理
![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/79b24666a9f5414aa1e127c993de1544~tplv-k3u1fbpfcp-watermark.image)
### 1.1 DOM0级事件
#### 1.1.1 HTML事件处理程序/内联模型（行内绑定）
>HTML事件处理程序，是写在html里面的，是**全局作用域**
<!-- more -->
DOM0级事件具有极好的跨浏览器优势，会以最快的速度绑定。第一种方式是**内联模型（行内绑定）**，将函数名直接作为html标签中属性的属性值。
```
<div onclick="btnClick()">click</div>
<script>
function btnClick(){
    console.log("hello");
}
</script>
```
JS未加载好的时候，就进行点击会报错，可以进行如下处理：
```
<button onclick="try{doSomething();}catch(err){}"></button>
```

#### 1.1.2 脚本模型（动态绑定）
```
<div id="btn">点击</div>
<script>
var btn=document.getElementById("btn");
btn.onclick=function(){
    console.log("hello");
}
</script>
```
可以看到`button.onclick`这种形式，这里事件处理程序作为了btn对象的方法，是**局部作用域**。可以用如下代码消除指定的事件处理程序：
```
btn.onclick = null;
```

以下代码输出hello again，很明显，第一个事件函数被第二个事件函数给覆盖掉，所以脚本模型的缺点是**同一个节点只能添加一次同类型事件**。也不能控制事件流到底是捕获还是冒泡，DOM0级只支持冒泡阶段。
```
<div id="btn">点击</div>
<script>
  var btn=document.getElementById("btn");
  btn.onclick=function(){
    console.log("hello");
  }
  btn.onclick=function(){
    console.log("hello again");
  }
</script>
```

### 1.2 DOM2级事件（不支持IE）
>DOM2级事件规定的事件流包括三个阶段：（1）事件捕获阶段（2）处于目标阶段（3）事件冒泡阶段
```
div1.addEventListener('click', onHandler, false); //第三个参数 useCapture 默认为false，即冒泡机制；true则是捕获机制
div1.removeEventListener('click', onHandler, false); //移除事件
```

### 1.3 DOM3级事件
```
// 自定义事件
var event = new Event('test')
// 给元素绑定事件
domElement.addEventListener('test', function() {
    console.log('event test')
},)

// 触发事件
setTimeout(function() {
    domElement.dispatchEvent(event)
}, 1000)
```

### 1.4 IE事件处理程序
对于 Internet Explorer 来说，在IE 9之前，必须使用 `attachEvent` 而不是使用标准方法 `addEventListener`。</br>
第一个参数是`事件处理程序名称`，如`onclick`、`onmouseover`。注意：这里不是事件，而是事件处理程序的名称，所以有`on`。</br>
之所以没有和DOM2级事件处理程序中类似的第三个参数，是因为IE8及更早版本只支持`冒泡事件流`。
```
<button id="btn">点击</button>

var btn=document.getElementById("btn");
btn.attachEvent('onclick',hello);//绑定事件
btn.detachEvent('onclick',hello);//移除事件

function hello(){
  alert("hello");
}
```

## 二、事件捕获/冒泡
![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc94b2e0f1a24d25bb6f4afb31216012~tplv-k3u1fbpfcp-watermark.image)</br>
**Documnet->html->body->div**</br>
当一个DOM事件被触发的时候，他并不是只在它的起源对象上触发一次，而是会经历三个不同的阶段。简而言之：事件一开始从文档的根节点流向**目标对象(捕获阶段)**，然后在**目标对向上被触发(目标阶段)**，之后再**回溯到文档的根节点(冒泡阶段)**。

**事件的触发有三个阶段**</br>
1. `捕获阶段（Capture Phase）：`document 往事件触发地点，捕获前进，遇到相同注册事件立即触发执行
2. `目标阶段（Target Phase）：`到达事件位置，触发事件（如果该处既注册了冒泡事件，也注册了捕获事件，按照注册顺序执行）
3. `冒泡阶段（Bubbling Phase）：`事件触发地点往 document 方向，冒泡前进，遇到相同注册事件立即触发

### 2.1事件流
>指从页面中接收事件的顺序,也可理解为事件在页面中传播的顺序

### 2.2 事件捕获
>网景提出另一种事件流名为事件捕获与事件冒泡相反，事件会从最外层开始发生，直到最具体的元素。

**事件捕获顺序应该是：** document -> html -> body -> div -> p

### 2.3 事件冒泡
>微软提出了名为事件冒泡的事件流。事件冒泡可以形象地比喻为把一颗石头投入水中，泡泡会一直从水底冒出水面。也就是说，事件会从最内层的元素开始发生，一直向上传播，直到document对象。

**事件的传递应该是：** p -> div -> body -> html -> document。

### 2.4 示例代码

#### 2.4.1 例子1
```
<div id="btn3">
    btn3
    <div id="btn2">
        btn2
        <div id="btn1">
            btn1
        </div>
    </div>
</div>
<script>
    let btn1 = document.getElementById('btn1');
    let btn2 = document.getElementById('btn2');
    let btn3 = document.getElementById('btn3');
    
    btn1.addEventListener('click',function(){
        console.log('btn1冒泡')
    }, false)
    btn1.addEventListener('click',function(){
        console.log('btn1捕获')
    }, true)

    btn2.addEventListener('click',function(){
        console.log('btn2冒泡')
    }, false)
    btn2.addEventListener('click',function(){
        console.log('btn2捕获')
    }, true)

    btn3.addEventListener('click',function(){
        console.log('btn3冒泡')
    }, false)
    btn3.addEventListener('click',function(){
        console.log('btn3捕获')
    }, true)
    
    //点击btn1
    //btn3捕获
    //btn2捕获
    //btn1冒泡
    //btn1捕获
    //btn2冒泡
    //btn3冒泡
</script>
```

**结论：**</br>
当容器元素及嵌套元素，即在`捕获阶段`又在`冒泡阶段`调用事件处理程序时：`事件按DOM事件流的顺序执行事件处理程序。`</br>
且当事件处于目标阶段时，事件调用顺序决定于`绑定事件的书写顺序`，按上面的例子为，先调用冒泡阶段的事件处理程序，再调用捕获阶段的事件处理程序。依次alert出“btn1冒泡”，“btn1捕获”。

#### 2.4.2 例子2
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/884d61821685424c884cb8def0bb1c0a~tplv-k3u1fbpfcp-watermark.image)
```
let a = document.getElementById('a');
let b = document.getElementById('b');
let c = document.getElementById('c');

c.addEventListener("click", function (event) {
    console.log("c1"); //c1冒泡
}); 
c.addEventListener("click", function (event) {
    console.log("c2"); //c2捕获
}, true);
b.addEventListener("click", function (event) {
    console.log("b"); //b捕获
}, true);
a.addEventListener("click", function (event) {
    console.log("a1"); //a1捕获
}, true);
a.addEventListener("click", function (event) {
    console.log("a2"); //a2冒泡
});
a.addEventListener("click", function (event) {
    console.log("a3"); //a3捕获
    event.stopImmediatePropagation();
}, true);
a.addEventListener("click", function (event) {
    console.log("a4"); //a4捕获
}, true);
```
**捕获：** c2、b、a1、a3、a4</br>
**冒泡：** c1、a2
1. 点击c或b，输出：a1，a3
```
解释：完整的顺序是a1，a3，a4，b，c1，c2，a2，也就是执行捕获-目标-冒泡（a-b-c-b-a），但当执行到a3的时候，stopImmediatePropagation还会阻止后续绑定的事件，因此阻止冒泡了，所以后边的都不会执行了。）
```
2. 点击a，输出：a1，a2，a3
```
解释：因为此时a是目标对象，所以按照绑定的顺序执行）
```
3. 注释`stopImmediatePropagation`
```
点击c：a1，a3，a4，b，c1，c2，a2
点击b：a1，a3，a4，b，a2 【此时目标是b，执行a-b-a，不会到达c，所以c的事件不执行】
```
4. `stopImmediatePropagation`改为`stopPropagation`
点击c或b，输出：a1，a3，a4
```
解释：stopPropagation与stopImmediatePropagation不同，不会阻止后续绑定的事件
```
5. <em>**将任意一个div的position属性改为绝对定位脱离了文档流，点击后依旧不影响输出结果！！**</em>

#### 2.4.3 例子3
`触发的目标元素上不区分冒泡还是捕获，按绑定的顺序来执行！！！`
```
// 点击c，打印c2，c1
c.addEventListener("click", function (event) {
    console.log("c2");
}, true);
c.addEventListener("click", function (event) {
    console.log("c1");
});
```

```
// 点击c，打印c1，c2
c.addEventListener("click", function (event) {
    console.log("c1");
});
c.addEventListener("click", function (event) {
    console.log("c2");
}, true);
```

## 三、事件委托
### 3.1 定义
>事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。

如果有多个DOM节点需要监听事件的情况下，给每个DOM绑定监听函数，会极大的影响页面的性能，因为我们通过事件委托来进行优化，事件委托利用的就是冒泡的原理。</br>

### 3.2 事件委托的优点

1. **提高性能：** 每一个函数都会占用内存空间，只需添加一个事件处理程序代理所有事件，所占用的内存空间更少。
2. **动态监听：** 使用事件委托可以自动绑定动态添加的元素，即新增的节点不需要主动添加也可以一样具有和其他元素一样的事件

## 四、事件对象event
### 4.1 属性
1. `currentTarget`：事件处理程序当前正在处理事件的那个元素（始终等于this），指向添加监听事件的对象
2. `target`：事件的目标，指向触发事件监听的对象
3. `relateTarget`:
4. `preventDefault`：取消事件默认行为,比如链接的跳转
5. `stopPropagation`：取消事件冒泡
6. `stopImmediatePropagation`：不仅阻止事件的传播，还阻止该元素上绑定的其他函数的执行

### 4.2 currentTarget、target
```
  <ul>
    <li>hello 1</li>
    <li>hello 2</li>
    <li>hello 3</li>
    <li>hello 4</li>
  </ul>
  
  <script>
    let ul = document.querySelectorAll('ul')[0]
    let aLi = document.querySelectorAll('li')
    ul.addEventListener('click',function(e){
       let oLi1 = e.target  
       let oLi2 = e.currentTarget
        console.log(oLi1)   //  被点击的li
        console.log(oLi2)   // ul
        console.og(oLi1===oLi2)  // false
    })
  </script>
```
`e.target`可以用来实现事件委托，该原理是通过**事件冒泡（或者事件捕获）** 给父元素添加**事件监听**，`e.target`指向引发触发事件的元素，如上述的例子中，`e.target`指向用户点击的li，由于事件冒泡，li的点击事件冒泡到了ul上，通过给ul添加监听事件而达到了给每一个li添加监听事件的效果，而`e.currentTarget`指向的是给绑定事件监听的那个对象，即ul。</br>
从这里可以发现，`e.currentTarget===this`返回true，而`e.target===this`返回false。</br>
`e.currenttarget`和`e.target`是不相等的。
```
<div id="A">
  <div id="B"></div>
</div>

var a = document.getElementById('A'),
    b = document.getElementById('B');    
function handler (e) {
    console.log(e.target);
    console.log(e.currentTarget);
}
a.addEventListener('click', handler, false);

当点击A时：输出：
1 <div id="A">...<div>
2 <div id="A">...<div>

当点击B时：输出：
1 <div id="B"></div>
2 <div id="A">...</div>
```

`currentTarget始终是监听事件者，而target是事件的真正发出者。`
```
<body>
   <ul id="box">
       <Li id="apple">苹果</Li>
       <li>香蕉</li>
       <li>桃子</li>
   </ul>
</body>
<script type="text/javascript">
   var box = document.getElementById('box');
   var apple = document.getElementById('apple');

   //直接绑定在目标元素apple上
   apple.onclick = function (e){  
       console.log(e.target);          //<li id="apple">苹果</li>
       console.log(e.currentTarget);    //<li id="apple">苹果</li>
       console.log(this);               //<li id="apple">苹果</li>
       console.log(e.target === e.currentTarget);      //true
       console.log(e.target === this);           //true
   } 

  //绑定在父元素box上（如果点击apple这个li时）
   box.onclick = function (e){
       console.log(e.target);           // <li id="apple">苹果</li>
       console.log(e.currentTarget);       //<ul id="box">...</ul>
       console.log(this);                  //<ul id="box">...</ul>
       console.log(e.currentTarget===this);      //true
       console.log(e.target === e.currentTarget);        //false
       console.log(e.target === this);           //false
   }

</script>
```

### 4.3 对象this、currentTarget和target
在事件处理程序内部，对象`this`始终等于`currentTarget`的值，而`target`则只包含事件的实际目标。如果直接将事件处理程序指定给了目标元素，则`this`、`currentTarget`和`target`包含相同的值
```
var btn = document.getElementById("myBtn");
btn.onclick = function (event) {
  alert(event.currentTarget === this); //ture
  alert(event.target === this); //ture
};
```

## 五、阻止冒泡/捕获、默认
### 5.1 阻止冒泡/捕获
有时候我们需要点击事件不再继续向上冒泡，我们在btn2上加上`stopPropagation`函数，阻止程序冒泡。
```
// 阻止冒泡
event.stopPropagation();
event.stopImmediatePropagation(); // 还会阻止后续绑定的事件
event.cancelBubble = true;
return false;
```

#### 5.1.1 event.stopPropagation
>阻止事件的冒泡，还阻止事件的继续捕获，即阻止事件的进一步传播。

w3c的方法是`e.stopPropagation()`，IE则是使用`window.event.cancelBubble = true`
```
window.event? window.event.cancelBubble = true : e.stopPropagation();
```

```
btn1.addEventListener('click',function(){
    console.log('btn1冒泡')
}, false)
btn1.addEventListener('click',function(){
    console.log('btn1捕获')
}, true)

btn2.addEventListener('click',function(){
    console.log('btn2冒泡')
}, false)
btn2.addEventListener('click',function(ev){
    ev.stopPropagation();
    console.log('btn2捕获')
}, true)

btn3.addEventListener('click',function(){
    console.log('btn3冒泡')
}, false)
btn3.addEventListener('click',function(e){
    console.log('btn3捕获')
}, true)

//btn3捕获
//btn2捕获
btn2捕获阶段执行后不再继续往下执行
```

`stopPropagation` 可以阻止事件的进一步传播，但是他阻止不了该元素上绑定的其他函数的执行，比如我们在 obj 上绑定了 func1 和 func2，如果我们在 func1 中使用了 `stopPropagation` ，那 func2 依然还是会执行出来。
```
<div id="s1">
  s1
  <div id="s2">s2</div>
</div>

<script type="text/javascript">
  s1.addEventListener("click", function (evt) {
    evt.stopPropagation();
    console.log('s1 bind1');
  }, true);

  s1.addEventListener("click", function (evt) {
    console.log('s1 bind2');
  }, true);

  s2.addEventListener("click", function (evt) {
    console.log('s2');
  }, true);
</script>

// s1 bind1
// s1 bind2
```

#### 5.1.2 event.stopImmediatePropagation()
>不仅阻止事件的传播，还阻止该元素上绑定的其他函数的执行。

```
<div id="s1">
  s1
  <div id="s2">s2</div>
</div>

<script type="text/javascript">
  s1.addEventListener("click", function (evt) {
    evt.stopImmediatePropagation();
    console.log('s1 bind1');
  }, true);

  s1.addEventListener("click", function (evt) {
    console.log('s1 bind2');
  }, true);

  s2.addEventListener("click", function (evt) {
    console.log('s2');
  }, true);
</script>

// s1 bind1
```

### 5.2 取消默认事件

#### 5.2.1 preventDefault
>preventDefault它是事件对象(Event)的一个方法，作用是取消一个目标元素的默认行为。

w3c的方法是`e.preventDefault()`，IE则是使用`e.returnValue = false`;

```
// 阻止默认事件
event.preventDefault();
event.returnValue = false;
return false;
```
链接`<a>`，提交按钮`<input type=”submit”>`等拥有默认行为
```
<a href="http://caibaojian.com/" id="testA" >caibaojian.com</a>
var a = document.getElementById("testA");
a.onclick =function(e){
  if(e.preventDefault){
    e.preventDefault();
  }else{
    window.event.returnValue == false;
  }
}
```

## 六、兼容IE浏览器写法
### 6.1 兼容IE的绑定、移除事件
```
var EventUtil = {
    addHandler: function (el, type, handler) {
        if (el.addEventListener) {
            el.addEventListener(type, handler, false);
        } else {
            el.attachEvent('on' + type, handler);
        }
    },
    removeHandler: function (el, type, handler) {
        if (el.removeEventListener) {
            el.removeEventListerner(type, handler, false);
        } else {
            el.detachEvent('on' + type, handler);
        }
    }
};

EventUtil.addHandler('btn','click',handler);
```

### 6.2 兼容IE的事件对象
```
  funciton getEvent(event){
    event = event || window.event;
  }
```
```
var EventUtil = {
    getEvent: function (e) {
        return e ? e : window.event;
    }
};
```

### 6.3 兼容IE的【阻止冒泡、捕获、默认】
当需要停止冒泡行为时，可以使用
```
function stopBubble(e) { 
//如果提供了事件对象，则这是一个非IE浏览器 
if ( e && e.stopPropagation ) 
    //因此它支持W3C的stopPropagation()方法 
    e.stopPropagation(); 
else 
    //否则，我们需要使用IE的方式来取消事件冒泡 
    window.event.cancelBubble = true; 
}
```

当需要阻止默认行为时，可以使用
```
//阻止浏览器的默认行为 
function stopDefault( e ) { 
    //阻止默认浏览器动作(W3C) 
    if ( e && e.preventDefault ) 
        e.preventDefault(); 
    //IE中阻止函数器默认动作的方式 
    else 
        window.event.returnValue = false; 
    return false; 
}
```
封装工具函数
```
var EventUtil = {
    getEvent: function (e) {
        return e ? e : window.event;
    },
    //IE浏览器中event事件对象没有target属性
    getTarget: function (e) {
        return e.target ? e.target : e.srcElement;
    },
    //IE浏览器中event事件对象没有preventDefault属性
    preventDefault: function (e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }
    },
    //IE浏览器中event事件对象没有preventDefault属性
    stopPropagation: function (e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }
    }
};
```

## 参考文章
1. [javascript 事件流](https://juejin.cn/post/6844903450493321223)
2. [对JS事件流的深入理解](https://zhuanlan.zhihu.com/p/114276880)
3. [捕获冒泡demo](https://jsbin.com/exezex/4/edit?css,js,output)
4. [深入理解e.target与e.currentTarget](https://juejin.cn/post/6844903506399199246)