---
title: React官方文档学习笔记（二）
date: 2019-01-13 18:09:28
tags:
---
### 深入 JSX
##### 在运行时选择类型
错误
```
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 错误！JSX 标签名不能为一个表达式。
  return <components[props.storyType] story={props.story} />;
}
```
正确：如果你的确想通过表达式来确定 React 元素的类型，请先将其赋值给大写开头的变量，不能是小写的！

<!-- more -->

```
import React from 'react';
import { PhotoStory, VideoStory } from './stories';

const components = {
  photo: PhotoStory,
  video: VideoStory
};

function Story(props) {
  // 正确！JSX 标签名可以为大写开头的变量。
  const SpecificStory = components[props.storyType];
  return <SpecificStory story={props.story} />;
}
```

##### 扩展属性
```
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```
当你构建通用容器时，扩展属性会非常有用。然而，这样做也可能让很多不相关的属性，传递到不需要它们的组件中使代码变得混乱。我们建议你谨慎使用此语法。

##### Context
Context 设计目的是为共享那些被认为对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。

### Fragments
React 中一个常见模式是为一个组件返回多个元素。Fragments 可以让你聚合一个子元素列表，并且不在DOM中增加额外节点。
```
class Columns extends React.Component {
  render() {
    return (
      <>
        <td>Hello</td>
        <td>World</td>
      </>
    );
  }
}

<table>
  <tr>
    <td>Hello</td>
    <td>World</td>
  </tr>
</table>
```

### Portals

### 高阶组件
具体而言，高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件