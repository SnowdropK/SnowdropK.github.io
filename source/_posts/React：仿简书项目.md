---
title: React：仿简书项目
date: 2019-02-23 18:15:12
tags:
---
### 关键知识点
项目配置：
```
Redux、Redux-thunk、axios
```
1、
```
<Fragment></Fragment>：占位符，不会出现在节点中
```
2、
this指向问题，用bind

3、
给数组加值，擅用解构：[...this.state.list,newValue]

4、
```
dangrouslySetInnerHTML={{__html:item随便}}不转义，容易被XSS注入脚本攻击。
```

<!-- more -->

5、
父组件可以将数据、方法传给子组件，子组件可以使用父组件传过来的数据，使用父组件传过来的方法，从而改变父组件的数据。注意，子组件里没有父组件的方法，所以要通过bind（this），将this指向父组件，否则指向的是子组件，就会提示找不到这个方法。

6、
```
新版推荐以下方法修改值
prevState即setState所传的参数，是数据改变之前的state,
this.setState((prevState) => ({
    list:[...prevState,prevState.newValue],
    newValue:''
}))
```

7、
```
import PropTypes from 'prop-types'

testItem.PropTypes = {
    test:PropTypes.string.isRequired,
    test2:PropTypes.number,
    test3:PropTypes.func,
    content:PropTypes.arrayOf(PropTypes.number,PropTypes.string)
}

testItem.defaultProps = {
    test:'default content'
}
```

8、
数据发生变化，驱动页面发生变化，那么如何提高性能？
可通过比较虚拟Dom的变化来比较，比直接通过Dom性能要高
```
虚拟Dom是一个JS对象，用来描述真实的Dom
<div id='abc'><span>hello</span></div>
即
['div',{id:'abc'},['span',{},'hello']
['div',{id:'abc'},['span',{},'goodBye']
```
#### React 数据视图更新原理
原来不好的两种方案

<!--![](https://user-gold-cdn.xitu.io/2019/2/25/16924f0a57f5cec3?w=1920&h=1080&f=jpeg&s=160580)-->
方案一：
```
1、state 数据
2、JSX模板
3、数据 + 模板 结合， 生成真实的DOM显示
4、state 发生改变
5、数据 + 模板结合，生成真实的DOM,替换原始的DOM

缺陷：
第一次生成了一个完整的DOM片段
第二次生成了一个完整的DOM片段
第二次的DOM替换第一次的DOM，非常耗性能
```
方案二：
```
1、state 数据
2、JSX模板
3、数据 + 模板 结合， 生成真实的DOM显示
4、state 发生改变
5、数据 + 模板结合，生成真实的DOM,并不直接替换原始的DOM
6、新的DOM(DocumentFragment) 和原始的DOM做比对，找差异
7、找出页面哪里发生了变化
8、用新的DOM中发生变化的元素，替换掉老的DOM中对应的元素

缺陷：
性能的提升并不明显
```
方案三：
```
1、state 数据
2、JSX模板
3、数据 + 模板 生成虚拟DOM（虚拟DOM就是一个JS对象，可以用来描述真实的DOM）
    <div id='abc'><span>hello</span></div>
    即
    ['div',{id:'abc'},['span',{},'hello']
    ['div',{id:'abc'},['span',{},'goodBye']
4、用虚拟DOM的结构生成真实的DOM 来显示
    <div id='abc'><span>hello</span></div>
5、state发生变化
6、数据 + 模板 生成新的虚拟DOM（极大的提升了性能）
    ['div',{id:'abc'},['span',{},'hello']
7、比较原始虚拟DOM和新的虚拟DOM的区别，找到区别是哪里（极大提升了性能）
8、直接操作DOM，改变对应DOM节点发生的变化

优点：
1、性能提升了
2、使得跨端应用得以实现。 React Native
```
<!--![最优方案](https://user-gold-cdn.xitu.io/2019/2/23/1691aacfadefb7fa?w=1920&h=1080&f=jpeg&s=144753)-->
9、JSX -> creatElement -> 虚拟Dom（JS对象）-> 真实的Dom
```
return <div></div>
return React.createElement('div'，{},'item')
```
10、React虚拟DOM中的Diff算法：[虚拟 DOM Diff 算法解析](https://www.infoq.cn/article/react-dom-diff)

11、ref 可用来获取Dom节点

12、

![](https://user-gold-cdn.xitu.io/2019/2/25/1692515c024c45c5?w=1920&h=1080&f=jpeg&s=96068)

13、安装charles：用于接受请求，返回本地的数据，模拟服务器

14、axios用于向后台请求数据，替代ajax
```
componentDidMount() {
    axios.get('/api/todolist').then(()=>{
        console.log('获取数据')
    }).catch(()=>{
        console.log('获取报错')
    })
}
```
15、redux devtools,redux用于多个组件之间的数据通信
```
npm install --save redux
```

16、安装 styled-components

17、reset.css

18、Redux的工作流程

![](https://user-gold-cdn.xitu.io/2019/3/4/169493ff3eac78f8?w=1920&h=1080&f=jpeg&s=76646)



![](https://user-gold-cdn.xitu.io/2019/3/5/1694be43949d75c5?w=1482&h=1080&f=jpeg&s=354029)