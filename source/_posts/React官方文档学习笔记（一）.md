---
title: React官方文档学习笔记（一）
date: 2018-12-06 18:08:08
tags:
---
### （一）JSX
JSX的表达式要放在大括号中,推荐在 JSX 代码的外面扩上一个小括号，这样可以防止分号自动插入的bug。
```
const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);
```
Babel 转译器会把 JSX 转换成一个名为 React.createElement() 的方法调用，下面两种方法效果等同。
```
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
```
```
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```

>React DOM 在渲染之前默认会过滤所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS(跨站脚本) 攻击。

<!-- more -->

### （二）元素渲染
将React元素渲染到根DOM节点中。
```
const element = <h1>Hello, world</h1>;
ReactDOM.render(element, document.getElementById('root'));
```
React元素都是**不可变**的。当元素被创建之后，无法改变其内容或属性，目前的方法是**创建新的元素**，然后将它传入ReactDOM.render()方法。（经典例子计时器：每隔一秒生成新的元素放入render渲染，不过render基本只调用一次，接下来可以用**state**来改变页面的数据）

React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。
### （三）组件 & Props
##### 函数定义/类定义组件
```
//函数定义组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
//类定义组件
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
### (四)State & 生命周期
##### 将函数转换为类
使用类就允许我们使用其它特性，例如局部状态、生命周期钩子
##### 状态更新可能是异步的
this.props 和 this.state可能是异步更新的，不应该依靠它们的值来计算下一个状态。
```
//此代码可能无法更新计数器
this.setState({
  counter: this.state.counter + this.props.increment,
});
// 箭头函数
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
// 常规函数
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
```
##### 经典时钟案例
```
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(),1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({date: new Date()});
  }

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```
### （五）事件处理
##### 事件绑定方法
```
//传统的 HTML
<button onclick="activateLasers()">
  Activate Lasers
</button>

//React
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

##### 向事件处理程序传递参数
```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
上述两种方式是等价的，分别通过 arrow functions 和 Function.prototype.bind 来为事件处理函数传递参数。

上面两个例子中，参数 e 作为 React 事件对象将会被作为第二个参数进行传递。通过箭头函数的方式，事件对象必须显式的进行传递，但是通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。

### （六）条件渲染

### （七）列表 & Keys
##### 基础列表组件
让我们来给每个列表元素分配一个 key 来解决上面的那个警告：
```
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
        {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}
const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
##### Keys
当元素没有确定的id时，你可以使用他的序列号索引index作为key。如果列表可以重新排序，我们不建议使用索引来进行排序，因为这会导致渲染变得很慢。
```
const todoItems = todos.map((todo, index) =>
  // Only do this if items have no stable IDs
  <li key={index}>
    {todo.text}
  </li>
);
```
##### 用keys提取组件
```
function ListItem(props) {
  // 对啦！这里不需要指定key:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 又对啦！key应该在数组的上下文中被指定
    <ListItem key={number.toString()}
              value={number} />

  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```
### （八）表单
##### 受控组件
```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

##### 多个输入的解决方法
```
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```
由于 value 属性是在我们的表单元素上设置的，因此显示的值将始终为 React数据源上this.state.value 的值。由于每次按键都会触发 handleChange 来更新当前React的state，所展示的值也会随着不同用户的输入而更新。

### （九）状态提升

### （十）组合 vs 继承
##### 组合
```
function FancyBorder(props) {
  return (
    <div className={'FancyBorder FancyBorder-' + props.color}>
      {props.children}
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Thank you for visiting our spacecraft!
      </p>
    </FancyBorder>
  );
}

ReactDOM.render(
  <WelcomeDialog />,
  document.getElementById('root')
);
```
<FancyBorder> JSX 标签内的任何内容都将通过 children 属性传入 FancyBorder。


思考：
顺带扩充的还可以了解：Vue双向绑定的实现原理。

额外思考：为什么React不自带双向绑定。

附加思考题：Vue和React的原理，Vue和React的相同点与不同点等等。

额外附加思考题：从template到页面显示一个dom，Vue的执行过程是怎么样的。

从render函数到显示一个dom，React的执行过程是怎么样的。

如果能把这些附加题搞明白，面试可以过我这一关了。（O(@_@)O）



