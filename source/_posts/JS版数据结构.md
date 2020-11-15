---
title: JS版数据结构
date: 2020-11-15 16:40:05
tags:
---
#### 一、时间复杂度
>算法的时间复杂度是一个函数，它定性描述该算法的运行时间。
```
O（1）：
let i = 0;
i += 1
只执行一次，所以O(1)
```
<!-- more -->
```
O(n)
for(let i = 0; i < n; i +=1 ){}

上面两个加在一起：O（1）+ O(n) = O(n)
n足够大，则可以忽略1
```
```
O(n2)
for(let i = 0; i < n; i +=1 ){
  for(let j = 0; j < n; j +=1 ){
    console.log()
  }
}

O(n) x O(n) = O(n2)
相乘和相加不一样
```

```
O(logN)
let i = 1;
whie(i < n) {
 i *= 2; 
}
```

#### 二、空间复杂度
>算法在运行过程中临时占用存储空间大小的量度

```
O（1）：
只声明单个变量
let i = 0;
i += 1
```

```
O(n)：
数组加了n个值，相当于添加n个内存单元
const list = [];
for(let i = 0;i < n; i+= 1){
  list.push(i)
}

O(n2)：
const matrix = [];
for(let i = 0; i < n; i +=1){
  matrix.push([])
  for(let j = 0; j < n; j +=1){
    matrix[i].push(j)
  }
}
```

#### 三、数据结构：栈
>一个后进先出的数据结构

push：入栈
pop：出栈

应用场景：十进制转二进制、判断字符串的括号是否有效、函数调用堆栈
```
场景一
const stack = [];
stack.push(1);
stack.push(2);
const item1 = stack.pop();
const item2 = stack.pop();

场景二：js中的函数调用堆栈
const func1 = () => {
    func2();
};
const func2 = () => {
    func3();
};
const func3 = () => {};

func1();
```

[leetcode题号20：有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)
```
解法1
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if(s.length % 2 !== 0 || typeof s !== 'string') return false;
    let stack = [];
    let validCharacterMap = {
        '(': true,
        '{': true,
        '[': true
    };
    let closeCharacterMap = {
        '()': true,
        '{}': true,
        '[]': true
    };
    for(let i = 0; i < s.length; i++){
        let current = s[i];
        if (validCharacterMap[current]){
            stack.push(current);
        } else {
            let key = stack[stack.length - 1] + current;
            if(closeCharacterMap[key]){
                stack.pop();
            } else {
                return false;
            }
        }
    }
    return stack.length === 0;
};
```
```
解法2
/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if(s.length % 2 !== 0 || typeof s !== 'string') return false;
    let stack = [];
    let chMap = {
        ')': '(',
        '}': '{',
        ']': '['
    };
    for(let i = 0; i < s.length; i++){
        if (!chMap[s[i]]){
            stack.push(s[i]);
        } else {
            if(stack[stack.length - 1] === chMap[s[i]]){
                stack.pop();
            } else {
                return false;
            }
        }
    }
    return stack.length === 0;
};
```
##### 总结
>此题的解题思路是入栈和出栈。<br/>左括号代表入栈，对应的右括号代表出栈，对于stack数组进行push()和pop()操作。最后数组长度为0的话，则满足题目要求，return true。<br/>第一次写好后，虽然题目中的测试用例通过了，但是提交之后没有通过如下测试用例。<br/>输入："([}}])"<br/>主要是因为在判断右括号不是同类型后，没有直接return false，代码还在执行下去，倒数两个字符‘])’刚好和正数两个字符是同类型闭合，就执行pop()最后变成空数组。<br/>还有一个需要注意的是，审题不够仔细，“字符串可被认为是有效字符串”题目有提到了，但看了一眼没注意，写的时候自然也没考虑到这点。但测试用例是通过的，所以没什么问题。<br/>之后审题要认真一些，一些边界情况要多考虑。<br/>还有一点，执行之后执行用时虽然挺快的，但内存消耗偏大，大概是因为定义了两个对象存储括号吧。<br/>看官方解题法，用的是哈希映射（HashMap）存储，此外他的思路是：哈希映射的键为右括号，值为相同类型的左括号。<br/>这个比我的设计要好。

#### 四、数据结构：队列
>一个先进先出的数据结构

1、应用场景：食堂排队打饭、JS异步中的任务队列、计算最近请求次数

2、JS异步中的任务队列：JS是单线程，无法同时处理异步中的并发任务

>输入：inputs = [[],[1],[100],[3001],[3002]] <br/>输出：[null,1,2,3,3]
```
const queue = [];
queue.push(1);
queue.push(2);
const item1 = queue.shift();
const item2 = queue.shift();
```

3、[leetcode题号933：最近请求的次数](https://leetcode-cn.com/problems/number-of-recent-calls/)
```
代码：本质队列问题

var RecentCounter = function() {
    this.q = []
};

/** 
 * @param {number} t
 * @return {number}
 */
RecentCounter.prototype.ping = function(t) {
    this.q.push(t)
    while(this.q[0] < t-3000){
        this.q.shift()
    }
    return this.q.length;
};

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
```
##### 总结
>队列问题，虽然写出来了，但是因为之前看过题解。</br>有几个点掌握的不好：</br>1、构造函数this.q的用法</br>2、怎么快速分析问题，转化为代码逻辑，这需要锻炼

#### 五、数据结构：链表
>多个元素组成的列表；元素存储不连续，用next指针连在一起

1、优点：增删非首尾元素，不需要移动元素，只需要更改next的指向即可

2、代码
```
场景一：
const a = { val: 'a' };
const b = { val: 'b' };
const c = { val: 'c' };
const d = { val: 'd' };
a.next = b;
b.next = c;
c.next = d;

// 遍历链表
let p = a;
while (p) {
    console.log(p.val);
    p = p.next;
}

// 插入
const e = { val: 'e' };
c.next = e;
e.next = d;

// 删除
c.next = d;

场景二：
const json = {
    a: { b: { c: 1 } },
    d: { e: 2 },
};

const path = ['a', 'b', 'c'];

let p = json;
path.forEach((k) => {
    p=p[k];
});
```

3、原型链知识点：</br>
如果A沿着原型链能找到B.prototype，那么A instanceof B为true
```
let a = () => {}
typeof a === 'function' true
a instanceof Function true
a instanceof Object true
```
如果在A对象上没有找到x属性，那么会沿着原型链找x属性
```
const obj = {}
Object.prototype.x = 'x'
const func = () => {}
Function.prototype.y = 'y'
```

4、使用链表指针获取JSON的节点值
```
const json = {
  a: {b: {c: 1}},
  d: {e: 2}
};

const path = ['a', 'b', 'c'];

let p = json
path.foreach(key => {
  p = p[key]
})
```

5、leetcode：237、206、2、83、141、


##### 面试题
1、instanceof的原理，并用代码实现
知识点：如果A沿着原型链能找到B.prototype，那么A instanceof B为true

解法：遍历A的原型链，如果找到B.proptype，返回true，否则false

```
const instanceof = (A,B) => {
  let p = A;
  while(p){
    if(p._proto_ === B.prototype){
      return true;
    }
    p = p._proto_;
  }
  return false;
};
```
2、
知识点：如果在A对象上没有找到x属性，那么会沿着原型链找x属性

解法：明确foo和F变量的原型链，沿着原型链找a属性和b属性
```
let foo = {}
let F = function() {};
Object.prototype.a = 'value a'
Function.prototype.b = 'value b'

console.log(foo.a)
console.log(foo.b)

console.log(F.a)
console.log(F.b)
```

##### 总结
1、链表里的元素存储是不连续的，通过next()连接</br>
2、Javascript中没有链表，但可以用Object模拟链表</br>
3、链表常用操作：修改next()、遍历链表</br>
4、js中的原型链也是一个链表，</br>
5、使用链表指针可以获取JSON的节点值

#### 六、数据结构：集合
>一种无序且唯一的数据结构</br>Es6中有集合，名为Set；集合的常用操作：去重、判断某元素是否在集合中、求交集

1、代码
```
// 去重
const arr = [1, 1, 2, 2];
const arr2 = [...new Set(arr)];

// 判断元素是否在集合中
const set = new Set(arr);
const has = set.has(3);

// 求交集
const set2 = new Set([2, 3]);
const set3 = new Set([...set].filter(item => set2.has(item)));
```

2、set操作
</br>使用Set对象：new、add、delete、has、size
</br>迭代Set：多种迭代方法、Set与Array互传、求交集/差集

```
let mySet = new Set();

mySet.add(1);
mySet.add(5);
mySet.add(5);
mySet.add('some text');
let o = { a: 1, b: 2 };
mySet.add(o);
mySet.add({ a: 1, b: 2 });

const has = mySet.has(o);

mySet.delete(5);

for(let [key, value] of mySet.entries()) console.log(key, value);

const myArr = Array.from(mySet);

const mySet2 = new Set([1,2,3,4]);

const intersection = new Set([...mySet].filter(x => mySet2.has(x)));
const difference = new Set([...mySet].filter(x => !mySet2.has(x)));
```

3、leetcode：349

#### 七、数据结构：字典
>与集合类似，字典也是一种存储唯一值的数据结构，但它是以<b>键值对</b>的形式存储

>Es6中有字典，名为Map

```
const m = new Map();

// 增
m.set('a', 'aa');
m.set('b', 'bb');

// 删
m.delete('b');
// m.clear();

// 改
m.set('a', 'aaa');
```

2、leetcode：349、20、1、3、76

#### 八、数据结构：树
>树：一种分层数据的抽象模型。（前端工作中常见的树：Dom树、级联选择、树形控件……）</br>JS中没有树，但是可以用Object和Array构建树。</br>树的常用操作：深度/广度优先遍历、先中后序遍历

##### 1、树的深度/广度优先遍历
>深度优先遍历：尽可能深的探索树的分支</br>遍历方法（递归）：</br>1、访问根节点；2、对根节点的children挨个进行深度优先遍历
```
dfs：
const dfs = (root) => {
    console.log(root.val);
    root.children.forEach(dfs);
};

dfs(tree);
```

>广度优先遍历：先访问离根节点最近的节点</br>遍历方法：</br>1、新建一个队列，把根节点入队；2、把队头出队并访问；3、把队头的children挨个入队；4、重复第二、三步，直到队列为空
```
bfs:
const bfs = (root) => {
    const q = [root];
    while (q.length > 0) {
        const n = q.shift();
        console.log(n.val);
        n.children.forEach(child => {
            q.push(child);
        });
    }
};

bfs(tree);
```
```
Json：
const tree = {
    val: 'a',
    children: [
        {
            val: 'b',
            children: [
                {
                    val: 'd',
                    children: [],
                },
                {
                    val: 'e',
                    children: [],
                }
            ],
        },
        {
            val: 'c',
            children: [
                {
                    val: 'f',
                    children: [],
                },
                {
                    val: 'g',
                    children: [],
                }
            ],
        }
    ],
};
```
##### 2、二叉树的先中后序遍历
>二叉树：</br>树中每个节点最多只能有两个节点</br>在JS中通常用Object模拟二叉树
```
const binaryTree = {
    val: 1,
    left:{
    	val: 2,
        left: null,
        right: null
    },
    right:{
      val: 3,
      left: null,
      right: null
    }
}
```
>先序遍历：</br>1、访问根节点；2、对根节点的左子树进行先序遍历；3、对根节点的右子树进行先序遍历；
```
preorder：
const preorder = (root) => {
    if (!root) { return; }
    console.log(root.val);
    preorder(root.left);
    preorder(root.right);
};

（非递归版）
// const preorder = (root) => {
//     if (!root) { return; }
//     const stack = [root];
//     while (stack.length) {
//         const n = stack.pop();
//         console.log(n.val);
//         if (n.right) stack.push(n.right);
//         if (n.left) stack.push(n.left);
//     }
// };

preorder(bt);
```

>中序遍历：1、对根节点的左子树进行中序遍历；2、访问根节点；3、对根节点的右子树进行中序遍历；
```
inorder：
const inorder = (root) => {
    if (!root) { return; }
    inorder(root.left);
    console.log(root.val);
    inorder(root.right);
};

（非递归版）
// const inorder = (root) => {
//     if (!root) { return; }
//     const stack = [];
//     let p = root;
//     while (stack.length || p) {
//         while (p) {
//             stack.push(p);
//             p = p.left;
//         }
//         const n = stack.pop();
//         console.log(n.val);
//         p = n.right;
//     }
// };

inorder(bt);
```

>后序遍历：</br>1、对根节点的左子树进行后序遍历；2、对根节点的右子树进行后序遍历；3、访问根节点；
```
postorder：

const postorder = (root) => {
    if (!root) { return; }
    postorder(root.left);
    postorder(root.right);
    console.log(root.val);
};

（非递归版）
// const postorder = (root) => {
//     if (!root) { return; }
//     const outputStack = [];
//     const stack = [root];
//     while (stack.length) {
//         const n = stack.pop();
//         outputStack.push(n);
//         if (n.left) stack.push(n.left);
//         if (n.right) stack.push(n.right);
//     }
//     while(outputStack.length){
//         const n = outputStack.pop();
//         console.log(n.val);
//     }
// };

postorder(bt);
```

```
JSON:
const bt = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 4,
            left: null,
            right: null,
        },
        right: {
            val: 5,
            left: null,
            right: null,
        },
    },
    right: {
        val: 3,
        left: {
            val: 6,
            left: null,
            right: null,
        },
        right: {
            val: 7,
            left: null,
            right: null,
        },
    },
};
```
##### 3、leecode
104、111、102、94、112
算法题待补充

##### 遍历JSON的所有节点值
```
const json = {
    a: { b: { c: 1 } },
    d: [1, 2],
};

const dfs = (n, path) => {
    console.log(n, path);
    Object.keys(n).forEach(k => {
        dfs(n[k], path.concat(k));
    });
};

dfs(json, []);
```

##### 渲染Antd树组件

#### 九、数据结构：图
>图是网络结构的抽象模型，是一组由边连接的节点。</br>图可以表示任何二元关系，比如道路、航班……
>JS中没有图，但是可以用Object和Array构建图

##### 1、图的表示法：邻接矩阵、邻接表、关联矩阵……
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0baf0918c7e45838805dc5bb5f7731c~tplv-k3u1fbpfcp-watermark.image)
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8402564435f44f63a3a355d6566e45eb~tplv-k3u1fbpfcp-watermark.image)

##### 2、图的常用操作：深度优先遍历、广度优先遍历
>深度优先遍历：</br>1、访问根节点；</br>2、对根节点的<b>没访问过的相邻节点</b>挨个进行深度优先遍历
```
dfs：
const visited = new Set();
const dfs = (n) => {
    console.log(n);
    visited.add(n);
    graph[n].forEach(c => {
        if(!visited.has(c)){
            dfs(c);
        }
    });
};

dfs(2);
```

```
Json：
const graph = {
    0: [1, 2],
    1: [2],
    2: [0, 3],
    3: [3]
};
```
>广度优先遍历：</br>1、新建一个队列，把根节点入队；2、把队头出队并访问；3、把队头的<b>没访问过的相邻节点</b>入队；4、重复二三步，直到队列为空

```
bfs：
const visited = new Set();
const q = [2];
while (q.length) {
    const n = q.shift();
    console.log(n);
    visited.add(n);
    graph[n].forEach(c => {
        if (!visited.has(c)) {
            q.push(c);
        }
    });
}
```

#### leetcode
65、417、133

#### 十、数据结构：堆
>一种特殊的完全二叉树</br>
>结构特性：二叉堆，树的每一层都有左侧和右侧子节点（除了最后一层的叶节点），并且最后一层的叶节点尽可能都是左侧子节点。</br>
>堆特性：所有的节点都大于等于（最大堆）或小于等于（最小堆）每个它的子节点。

>JS中通常用数组表示堆：</br>
>左侧子节点的位置是2*index+1</br>
>右侧子节点的位置是2*index+2</br>
>父节点的位置是（index-1）/2的商</br>
>堆能高效找出最大值和最小值，O（1），找出第K个最大（小）元素


#### 实现最小堆
>将值插入堆的底部，即数组的尾部</br>
>然后上移：将这个值和他的父节点进行交换，直到父节点小于等于这个插入的值</br>
>大小为K的堆中插入元素的时间复杂度为O（logK）
```
class MinHeap {
    constructor() {
        this.heap = [];
    }
    swap(i1, i2){
        const temp = this.heap[i1];
        this.heap[i1] = this.heap[i2];
        this.heap[i2] = temp;
    }
    getParentIndex(i){
        return (i - 1) >> 1; //Math.floor((i -1)/2)
    }
    shiftUp(index){
        if(index === 0) return;
        const parentIndex = this.getParentIndex(index);
        if(this.heap[parentIndex] > this.heap[index]) {
            this.swap(parentIndex, index);
            this.shiftUp();
        }
    }
    insert(value){
        this.heap.push(value);
        this.shiftUp(this.heap.length -1);
    }
}

const h = new MinHeap();
h.insert(3)
h.insert(2)
h.insert(1)
```

#### 删除堆顶
>用数组尾部元素替换堆顶（直接删除堆顶会破坏堆数据结构）</br>
>然后下移：将新堆顶和他的子节点进行交换，直到子节点大于等于这个新堆顶</br>
>大小为K的堆中删除堆顶的时间复杂度为O（logK）
```
class MinHeap {
    constructor() {
        this.heap = [];
    }
    swap(i1, i2){
        const temp = this.heap[i1];
        this.heap[i1] = this.heap[i2];
        this.heap[i2] = temp;
    }
    getParentIndex(i){
        return (i - 1) >> 1; //Math.floor((i -1)/2)
    }
    getLeftIndex(i){
        return i * 2 + 1;
    }
    getRightIndex(i){
        return i * 2 + 2;
    }
    shiftUp(index){
        if(index === 0) return;
        const leftIndex = this.getParentIndex(index);
        if(this.heap[parentIndex] > this.heap[index]) {
            this.swap(parentIndex, index);
            this.shiftUp(parentIndex);
        }
    }
    shiftDown(index){
        if(index === 0) return;
        const leftIndex = this.getLeftIndex(index);
        const rightIndex = this.getRightIndex(index);
        if(this.heap[leftIndex] < this.heap[index]) {
            this.swap(leftIndex, index);
            this.shiftDown(leftIndex);
        }
        if(this.heap[rightIndex] < this.heap[index]) {
            this.swap(rightIndex, index);
            this.shiftDown(rightIndex);
        }
    }
    insert(value){
        this.heap.push(value);
        this.shiftUp(this.heap.length -1);
    }
    pop(){
        this.heap[0] = this.heap.pop();
        this.shiftDown(0);
    }
}

const h = new MinHeap();
h.insert(3)
h.insert(2)
h.insert(1)
h.pop()
```

#### 获取堆顶和堆的大小
```
peek(){
	return this.heap[0];
}
size(){
	return this.heap.length;
}
```
#### leetcode
215、347、23

ps:
vscode小技巧：打断点，点击F5就能运行