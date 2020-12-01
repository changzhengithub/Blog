# vue知识点

## vue实例对象
vue 实际上就是一个对象，所有属性和方法都被挂载到实例对象上。

```js
  var app = new Vue({
    el: '#app',
    data: {
      message: '我是vue数据'
    },
    methods: {
      getAttr: function() {
        console.log(111)
      }
    },
  })

  // vue的属性和方法都挂载在app上，实际上就是一个对象。
  console.log(app);
  console.log(app.$el); // <div id="app"><h1>我是vue数据</h1></div>
  console.log(app.$data); // {message: '我是vue数据'}
  console.log(app.getAttr()); // 111

  // `$root`属性也可以获取到
  // 获取根组件的数据
  app.$root.message // 111
  // 写入根组件的数据
  app.$root.message = '通过$root写入'
  // 调用根组件的方法
  app.$root.getAttr() // 111
```

## vue生命周期

用来监听vue实例创建的一系列初始化过程。

在实例化Vue过程中，会直接触发的生命周期有`beforeCreate`、`created`、`beforeMount`、`mounted`，在数据更新的过程中触发的生命周期有`beforeUpdate`、`updated`，在`keep-alive`缓存组件时会触发 `activated`和`deactivated`钩子函数，在销毁组件的过程中触发的生命周期有`beforeDestroy`、`destroyed`。

beforeCreate：vue实例初始化后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用，也就是页面创建之前被调用。

created：vue实例创建好后立即调用，data数据可以被观测到，但是挂载还没开始，$el属性还不可见。

beforeMount：挂载之前被调用，相关渲染函数首次被调用。

mounted：实例被挂载后调用，el整个节点被vue节点`vm.$el`替换，这时可以获取到DOM节点了。

beforeUpdate：data数据更新时被调用。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。

updated：数据更新完毕，DOM更新成功，组件更新完毕后被调用。

activated：被 `keep-alive` 缓存的组件激活时调用。

deactivated：被 `keep-alive` 缓存的组件停用时调用。

beforeDestroy：实例销毁之前调用。在这一步，实例仍然完全可用。

destroyed：实例销毁后调用。该钩子被调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。

## 计算属性和侦听器

计算属性：

`computed`根据一个已有的值来计算得到另一个新的值，虽然通过函数也能得到，但是计算属性具有缓存效果，只要根据的那个值发生变化才会重新计算一遍，而函数每次进来都会运行。

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
  <p>function reversed message: "{{ getMessage() }}"</p>

  <input type='text' placeholder='输入名' v-modal='firstName'/>
  <input type='text' placeholder='输入名' v-modal='lastName'/>
  <p>姓名：{{fullName}}</p>
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello',
    firstName: '',
    lastName: ''
  },
  // computed
  computed: {
    // 通过计算已有的值来得到新的值
    reversedMessage: function () {
      return this.message.split('').reverse().join('')
    },
    fullName: function() {
      return this.firstName + this.lastName
    }
  },
  // 通过方法
  methods: {
    getMessage: function () {
      return this.message.split('').reverse().join('')
    }
  }
})
```

侦听属性：

监听某个数据的变化，通过监听某个值，根据变化前和变化后的值来得出一个新的值。虽然大部分情况下计算属性更合适，但当需要在数据变化时执行异步或开销较大的操作时，侦听属性是最有用的。

```html
<div id="example">
  <input type='text' placeholder='xx' v-modal='message'/>
  <p>{{answer}}</p>
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: '',
    answer: 'hello'
  },
  // watch
  watch: {
    // 监听某个值，来得到新的值
    message: function(newValue, oldValue) {
      console.log(newValue);
      console.log(oldValue);
      this.answer = newValue
    }
  },
})
```

## class与style绑定

class的绑定：

```html
<div id="example">
  <!-- 对象语法 -->
  <p :class="{active: activeIndex == 0, font: isFont, weight: isWeight}">{{message}}</p>
  <p :class="objectClass">{{message}}</p>
  <!-- 数组语法 -->
  <p :class="['active', 'font']">{{message}}</p>
  <p :class="[activeClass, fontClass]">{{message}}</p>
    <!-- 数组中可以使用三目 -->
  <p :class="[isActive ? 'active': '', 'font']">{{message}}</p>
  <!-- 综合使用 -->
  <p :class="[{active: activeIndex == 0}, 'font']">{{message}}</p>
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'hello world',
    activeIndex: 0,
    isActive: true,
    isFont: true,
    isWeight: true,
    objectClass: {
      font: true, 
      weight: true
    },
    activeClass: 'active',
    fontClass: 'font',
  },
})
```

style绑定：

```html
<div id="example">
  <!-- 对象语法 -->
  <p :style="{color: activeColor, fontSize: fontSize, lineHeight: '100px'}">{{message}}</p>
  <p :style="styleObject">{{message}}</p>
  <!-- 数组语法 -->
  <p :style="[baseStyle, styleObject]">{{message}}</p>
  <!-- 综合使用 -->
  <p :style="[baseStyle, styleObject, {marginLeft: marginLeft}]">{{message}}</p>

  <!-- 多重值 只会选择一个 -->
  <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>

</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'hello world',
    activeColor: 'red',
    fontSize: '30px',
    marginLeft: '50px'
    baseStyle: {
      fontWeight: 'bold'
    },
    styleObject: {
      color: 'red',
      fontSize: '30px'
    }
  },
})
```

## 条件渲染

用 `key` 管理可复用的元素：

如果出现在切换输入框时，之前输入的值还保留在输入框内时，是因为vue对比DOM没有发现改变，所以没有重新渲染，要更新需要给每个输入框加上`key`属性，来区别重新渲染。

v-if 和 v-show 的区别：

`v-if` 是真正的条件渲染，为真时才会渲染元素。而 `v-show` 不管条件真假都会被渲染，只是简单的对`display`进行切换。`v-if` 相比较 `v-show` 开销更大，因此需要频繁切换的使用 `v-show` ，很少改变用 `v-if`。

`v-for` 列表渲染要加上 `key`，`v-if` 最好不要和 `v-for` 一起使用。


## 事件修饰符

可以串联使用，也可以只添加修饰符后面不跟函数。

* `.stop`：  阻止冒泡
* `.prevent`： 阻止默认事件
* `.capture`： 捕获内部事件，先在此处理，再在内部处理
* `.self`： 只在自己身上时才触发
* `.once`： 只执行一次
* `.passive`： 告诉浏览器不想阻止事件的默认行为

## 表单

[表单输入绑定](https://cn.vuejs.org/v2/guide/forms.html)

值绑定：

当选中时，给绑定一个其他的值，而不止是其默认的值。

```html
<!-- 不绑值 -->
<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle">
<!-- 绑值 -->
<!-- 当选中为yes，否则为no 而不再是true和false -->
<input type="checkbox" v-model="toggle" true-value="yes" false-value="no" >

<!-- 其他 -->
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a">
<!-- 当选中时picked为数据msg -->
<input type="radio" v-model="picked" :value="msg">
<!-- 当选中时 selected是一个绑定的对象 -->
<select v-model="selected">
  <option :value="{ number: 123 }">123</option>
</select>
```

修饰符：

* `.lazy`： v-model 是实时更新，使用lazy就变成 chang 事件之后在更新
* `.number`： 切换用户输入的number为number类型
* `.trim`：  去掉空白字符

```html
<input type="type" v-model.lazy="message">
<input type="number" v-model.number="message">
<input v-model.trim="message">
```

## 组件

每个组件的data必须是一个函数。

每个组件必须只有一个根元素。

**注册一个组件：**

```js
// 全局注册  全局注册后可以在任何地方使用
// 定义一个名为 button-counter 的新组件
Vue.component('templateName', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

// 局部注册  使用需要在components中注册后才能使用
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }

new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```

## props传值

props传值遵循单向数据量，只能从父组件向子组件传递。父级组件数据变更，子组件props值也会刷新。子组件要变更props值，最好使用一个本地数据来保存props在更改，不要直接更改props。

父组件：
```html
<!-- 传递数字、布尔、数组、对象都要使用动态传参 -->
<blog-post title="Vue" :likes="11" :isPublished="false" :commentIds="[1, 2, 3]" :author="{name: 'xxx', age: 18}"></blog-post>
```

子组件：

```js
// 接收多个值
// 数组形式
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
// 对象形式指定类型
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}

// props验证：
props: {
  // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
  propA: Number,
  // 多个可能的类型
  propB: [String, Number],
  // 必填的字符串
  propC: {
    type: String,
    required: true
  },
  // 带有默认值的数字
  propD: {
    type: Number,
    default: 100
  },
  // 带有默认值的对象
  propE: {
    type: Object,
    // 对象或数组默认值必须从一个工厂函数获取
    default: function () {
      return { message: 'hello' }
    }
  },
  // 自定义验证函数
  propF: {
    validator: function (value) {
      // 这个值必须匹配下列字符串中的一个
      return ['success', 'warning', 'danger'].indexOf(value) !== -1
    }
  }
```

## 自定义事件

通过子组件`$emit`传递事件然后父组件监听

```js
// 子组件
Vue.component('son', {
  data: function () {
    return {
      msg: 'xxxx'
    }
  },
  methods: {
    sendMsg: function() {
      this.$emit('GET_MSG_EVENT', this.msg) // 第一个参数传递事件名，第二个参数是传参，最好是一个对象
    }
  },
  template: '<button @click="sendMsg">事件传递</button>'
})
```

```js
// 父组件：

// <div id="example">
//   <son @GET_MSG_EVENT="getMsg"></son>  接收传进来的事件
// </div>

var vm = new Vue({
  el: '#example',
  data: {
    msg: ''
  },
  methods: {
    // msg为传入的参数
    getMsg: function(msg) {
      this.msg = msg
    }
  }
})
```

## `v-model` 实现数据双向绑定

通过input输入框实现数据双向绑定模式演化成在组件上实现简单数据双向绑定，但是 `v-model` 只能实现一个数据在子组件和父组件之间进行传递，如果要使用多个数据的双向绑定一般手动实现，但也可以用 `.sync` 修饰符来缩写。

`v-model` 和 `.sync` 进行单一的数据双向传递，和多个数据双向传递， 都是可以代替 父子组件相互传值的，简化了父组件的操作，并减少了与父组件的耦合成度，只需要在子组件中定义好，父组件之间使用就可以。 如果要是跨组件来传递数据的话，使用 `$attrs` 和 `$listeners` 属性对每个组件进行绑定。

`v-model`在组件上实现最主要的是通过 `model` 选项自定义事件名。

在input上实现一个 `v-model` 指令
```html
<div id="app">
  <input type="text" :value="msg" @input="getValue($event)">
  <p>{{msg}}</p>
</div>
```
```js
var vm = new Vue({
  el: '#app',
  data: {
    msg: ""
  },
  methods: {
    getValue: function(e) {
      this.msg = e.target.value
    }
  },
})
```

通过自定义事件`$emit`在组件上实现 `v-model`指令
```html
<div id="app">
  <!-- 父组件接收到input事件获取value值赋值给msg -->
  <custom-input :value="msg" @input="getValue"></custom-input>
  <p>{{msg}}</p>
</div>
```
```js
// 子组件通过$emit发送一个input事件和value值
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  `
})

var vm = new Vue({
  el: '#app',
  data: {
    msg: ''
  },
  methods: {
    getValue: function(value) {
      this.msg = value
    }
  },
})
```

现在直接在子组件上使用 `v-model`指令
```html
<div id="app">
  <!-- <custom-input :value="msg" @input="getValue"></custom-input> -->
  <custom-input v-model="msg"></custom-input>
  <p>{{msg}}</p>
</div>
```
```js
// 子组件通过$emit发送一个input事件和value值
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      :value="value"
      @input="$emit('input', $event.target.value)"
    >
  `
})
```
来看这两行代码：
```html
<custom-input :value="msg" @input="getValue"></custom-input>
<custom-input v-model="msg"></custom-input>
```

通过对比，我们直接使用 `v-model` 代替了了 value 的传入和 input 事件的监听，那 value 和 input 从何而来呢?

当我们给组件添加 `v-model` 属性时，默认会把value 作为组件的属性，把 input作为给组件绑定事件时的事件名，所以使用`v-model`就代替了名为 value 的 props 和名为 input 的事件。但如果我们不想使用 value 属性名和自定义事件 input 名字呢，在 Vue 2.2 及以上版本，就可以在定义组件时通过 `model` 选项的方式来定制 props/event 。

```html
<div id="app">
  <custom-input v-model="msg"></custom-input>
  <p>{{msg}}</p>
</div>
```
```js
Vue.component('custom-input', {
  // 自定义prop和event
  model: {
    prop: 'name',
    event: 'getName'
  },
  props: ['name'],
  template: `
    <input
      :value="name"
      @input="$emit('getName', $event.target.value)"
    >
  `
})
```

在组件上使用 `v-model` 最开始是`input`框输入进行双向绑定，然后通过model 可以自定义 `props` 和 `event` 后，就可以进行任何的 `$emit` 事件发送了，并不局限于input双向绑定，直接可以代替props父组件传值/$emit子传父了。

```html
<!-- 父组件 -->
<div id="app">
  <calc-num v-model="number"></calc-num>
  <p>{{number}}</p>
</div>
```
```js
// 子组件
Vue.component('calc-num', {
  model: {
    prop: 'num',
    event: 'addNum'
  },
  props: {
    num: Number,
  },
  methods: {
    add() {
      this.$emit('addNum', this.num + 1)
    },
  },
  template: `
    <button @click="add">点击按钮自增</button>
  `
})

var vm = new Vue({
  el: '#app',
  data: {
    number: 1,
  },
})
```
虽然`v-model`可以进行数据双向绑定进行传值，但是 `v-model` 这种形式只能实现一个数据进行双向绑定，如果要实现多个数据进行双向绑定，可以是 `.sync` 修饰符 来简化操作。

## `.sync` 修饰符 

sync意为同步

$emit 自定义事件实现一个简单数据双向绑定组件可以简写为下面形式：
```html
<div id="app">
  <!-- GET_AGE 事件后直接简写成 age = $event 不用在父组件写函数了-->
  <father-com :age = "age" @GET_AGE="age = $event"></father-com>
  <p>{{age}}</p>
</div>
```
```js
Vue.component('father-com', {
  props: ['age'],
  methods: {
    send() {
      this.$emit('GET_AGE', 18)
    }
  },
  template: `
    <div>
      <button @click="send">发送</button>
    </div>
  `
})
var vm = new Vue({
  el: '#app',
  data: {
    age: 0
  },
})
```

然后使用 `update:myPropName` 模式触发事件代替 `GET_AGE` 事件名：
```html
<div id="app">
  <father-com :age = "age" @update:getage="age = $event"></father-com>
  <p>{{age}}</p>
</div>
```
```js
Vue.component('father-com', {
  props: ['age'],
  methods: {
    send() {
      this.$emit('update:getage', 18)
    }
  },
  template: `
    <div>
      <button @click="send">发送</button>
    </div>
  `
})
var vm = new Vue({
  el: '#app',
  data: {
    age: 0
  },
})
```
上面这接收事件写法就可以使用 .sync 修饰符来代替
```html
<father-com :age = "age" @update:getage="age = $event"></father-com>
<!-- 使用 .sync 代替-->
<father-com :getage.sync="age"></father-com>
```
```js
Vue.component('father-com', {
  props: ['age'],
  methods: {
    send() {
      this.$emit('update:getage', 18)
    }
  },
  template: `
    <div>
      <button @click="send">发送</button>
    </div>
  `
})
var vm = new Vue({
  el: '#app',
  data: {
    age: 0
  },
})
```

当我们用一个对象同时设置多个 prop 的时候，也可以将这个 .sync 修饰符和 v-bind 配合使用：
```html
<div id="app">
  <!-- <child-com 
    :value='obj.value' @aaa='obj.value = $event'
    :name='obj.name'  @bbb='obj.name = $event'
    :age='obj.age' @ccc='obj.age = $event'>
  </child-com> -->
  <!-- <child-com v-bind:value.sync='obj.value' 
               v-bind:name.sync="obj.name" 
               v-bind:age.sync="obj.age">
    </child-com> -->
  <child-com v-bind.sync="obj"></child-com>
</div>
```
```js
Vue.component('child-com', {
  props: ['value','name','age'],
  methods: {
    inputValueEvent(event) {
      this.$emit('update:value', event.target.value)
    },
    inputNameEvent(event) {
      this.$emit('update:name', event.target.value)
    },
    inputAgeEvent(event) {
      this.$emit('update:age', event.target.value)
    }
  },
  template: `
    <div>
      <input type="text" :value="value" @input='inputValueEvent'>
      <br>
      <input type="text" :value="name" @input='inputNameEvent'>
      <br>
      <input type="text" :value="age" @input='inputAgeEvent'>
    </div>
  `
})
var vm = new Vue({
  el: '#app',
  data: {
    obj: { value: '双向绑定' , name: 'coderlyl' , age: 20}
  },
  methods: {
    getMsg: function(name) {
      console.log(name) // xxxxx
    }
  }
})
```

## $attrs 和 $listeners 跨组件传递：

父子传值 `props` 和子传父 `$emit` 的话跨一级传递还好，但是跨多个级别传递的话就会非常麻烦，而`$attrs` 和 `$listeners`就是他们的加强版，不需要每个都要传，只需要在每个组件上绑定这两个属性，那么绑定的组件就可以获取最顶级父组件传递的 `props` 值和子组件发送的 `$emit` 事件。

`$attrs` 来获取父组件传递的props值 `{{$attrs.age}}`。

中间的组件都要 添加 `v-bind='$attrs' v-on='$listeners'` 这两个属性才能监听到，并且中间的组件也能监听到传递的 props 和发送的事件。
```html
<div id="app">
  <!-- 最顶级父组件中接收孙组件传递的事件 -->
  <father-com :age="age" @send-msg="getMsg"></father-com>
</div>
```
```js
Vue.component('father-com', {
  inheritAttrs: true,
  template: `
    <div>
      <p>父组件：{{$attrs.age}}</p>
      <son v-bind='$attrs' v-on='$listeners'></son>
    </div>
  `
})
Vue.component('son', {
  inheritAttrs: true,
  methods: {
    getValue: function(name) {
      console.log(name) // xxxxx
    }
  },
  template: `
    <div>
      <p>子组件：{{$attrs.age}}</p>
      <grandson v-bind='$attrs' v-on='$listeners' @send-msg="getValue"></grandson>
    </div>
  `
})
// 孙组件进行发送事件
Vue.component('grandson', {
  inheritAttrs: true,
  methods: {
    sendMsg() {
      this.$emit('send-msg', 'xxxxx')
    },
  },
  template: `
    <div>
      <p>孙组件：{{$attrs.age}}</p>
      <button @click="sendMsg">发送事件</button>
    </div>
  `
})
var vm = new Vue({
  el: '#app',
  data: {
    age: 18
  },
  methods: {
    // 父组件获取到孙组件发送的事件
    getMsg: function(name) {
      console.log(name) // xxxxx
    }
  }
})
```



## 插槽

通过插槽 `<slot>` 来分发内容，给一个占位符，等待插入元素。通过 `<slot>` 在指定的位置添加特殊的元素，而不是在组件创建时就固定好内容，允许在不同的地方调用组件时添加定制化的内容。

子组件 `<son-component>` 中：

```js
Vue.component('son-component', {
  props: ['num'],
  template: `
    <section>
      <p>我是子组件</p>
      <p>父组件数据： {{num}}</p>
      <slot></slot>
    </section>
  `
})
```
在父组件中使用：
```html
<div id="app">
  <p>我是父组件</p>
  <!-- 使用子组件，在其中插入元素，就会在 slot 的位置显示 -->
  <son-component :num="number">
    <span>我是插槽内容 {{number}}</span>
  </son-component>
</div>
```

在父组件中添加就只能获取父组件的作用域，无法获取插槽所在子组件的作用域。

**默认内容：**

在 `<slot>hello</slot>` 添加默认的内容，父组件添加内容就不显示。

**具名插槽（多个插槽）：**

添加多个插槽时，要为每个插槽指定一个特殊属性 `name`。
```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <!-- 默认为 default -->
    <slot></slot> 
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```
父组件添加内容：

v-slot 只能添加在 `<template>` 上，default可以不用写，没有被template包裹的视为默认插槽内容。
```html
<son-component>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>

  <template v-slot:default>
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>
  <!-- <p>A paragraph for the main content.</p>
  <p>And another one.</p> -->

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</son-component>
```

**作用域插槽：**

在父组件中获取子组件中的数据，可以在子组件 `<slot>` 上绑定子组件数据，传给父组件的 `<template>` 上，这样在父组件定义插槽内容就可以获取子组件的内容了。

子组件：

```html
<!-- user为子组件数据 -->
<span>
  <slot v-bind:user="user"> {{ user.lastName }} </slot>
  <!-- 相当于props传值 -->
  <slot :user="user"> {{ user.lastName }} </slot>
</span>
```
父组件使用：
```html
<!-- 定义一个slotProps的props对象 -->
<current-user>
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```
使用ES6解构
```html
<current-user v-slot:default="{ user }">
  {{ user.firstName }}
</current-user>
```

**具名插槽缩写：**

`v-slot:header` 可以缩写成 `#header`
```html
<son-component>
  <template #header>
    <h1>Here might be a page title</h1>
  </template>

  <template #default="{user}">
    <p>A paragraph for the main content.</p>
    <p>And another one.</p>
  </template>

  <template #footer>
    <p>Here's some contact info</p>
  </template>
</son-component>
```
**插槽复用**

在一个循环列表里定义一个具名插槽，可以实现循环来使用同一个插槽。
```html
<ul>
  <li v-for="todo in todos" :key="todo.id" >
    <!--
    我们为每个 todo 准备了一个插槽，
    将 `todo` 对象作为一个插槽的 prop 传入。
    -->
    <slot name="todo" :todo="todo">
      <!-- 默认内容 -->
      {{ todo.text }}
    </slot>
  </li>
</ul>
```
使用：
```html
<todo-list :todos="todos">
  <template #todo="{ todo }">
    <span v-if="todo.isComplete">✓</span>
    {{ todo.text }}
  </template>
</todo-list>
```

## 动态组件 & 异步组件

动态组件通过 `<component>` 切换不同的组件名来显示组件
```html
<!-- 组件会在 `currentTabComponent` 改变时改变 -->
<component :is="currentTabComponent"></component>
```

**`<keep-alive>` 缓存组件：**

被 `keep-alive` 包裹的组件不会重新刷新，还会保留离开时的状态。

```html
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component :is="currentTabComponent"></component>
</keep-alive>
```

```html
<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive>
    <component :is="view"></component>
  </keep-alive>
</transition>
```

`include` 和 `exclude` 来过滤要缓存的组件和不要缓存的组件 或者路由。都可以用逗号分隔字符串、正则表达式或一个数组来表示。

```html
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>

<!-- 数组 -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>

<!-- 配合路由一起使用，匹配要缓存的路由 -->
<keep-alive :include="['IndexComponent']">
  <router-view/>
</keep-alive>
```
异步路由和组件：

```js
// router中异步加载路由
const IndexComponent = () => import(/* webpackChunkName: 'indexs' */ '@/views/index/index.vue')

// 组件中异步加载组件
components: {
  'my-component': () => import('./my-async-component')
}
```

## 处理边界情况

**通过访问父组件实例 `$parent`：**

```js
this.$parent  // 获取父组件实例
this.$parent.name  // 获取父组件数据
this.$parent.getValue() // 调用父组件方法
```

**访问子组件实例 `ref`/ `$children`：**

```js
this.$refs.son   // 获取子组件
this.$refs.son.age // 获取子组件数据
this.$refs.son.getAttr() // 调用子组件方法

this.$children     // 获取子组件数组
this.$children[0].age  // 获取子组件数据
this.$children[0].getAttr() // 调用子组件方法
```

**依赖注入：**

`provide`/`inject` 这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。可以把依赖注入看作一部分“大范围有效的 prop”。

* `provide` 选项应该是一个对象或返回一个对象的函数。
* `inject` 选项应该是一个字符串数组，或一个对象

:::tip
提示：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的 property 还是可响应的。
:::

提供属性：
```js
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}

// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
```
提供方法：
```js
// 父级组件提供 'getMap' 方法
var Provider = {
  provide: function () {
    return {
      getName: this.getName,
      msg: this.msg
    }
  }
  methods: {
    getName: function() {
      console.log('chang')
    },
  },
}
// 子组件注入 'getName'
var Child = {
  inject: ['getName', 'msg'],
  created () {
    console.log(this.msg) //
    console.log(this.getName()) // => 'chang'
  }
}
```

**程序化的事件侦听器**

* 通过 `$on(eventName, eventHandler)` 侦听一个事件
* 通过 `$once(eventName, eventHandler)` 一次性侦听一个事件
* 通过 `$off(eventName, eventHandler)` 停止侦听一个事件

`$once` 一次性监听一个事件可以使用与监听引入的第三方插件，进来时只需要监听一次，然后就不需要手动来清除了。比如监听日期组件picker 或者swiper或者是计时器。

```js
mounted: function () {
  this.timeCycle();
  this.attachDatepicker('startDateInput')
  this.attachDatepicker('endDateInput')
},
methods: {
  attachDatepicker(refName) {
    var picker = new Pikaday({
      field: this.$refs[refName],
      format: 'YYYY-MM-DD'
    })

    this.$once('hook:beforeDestroy', function () {
      picker.destroy()
    })
  },
  timeCycle () {
    window.clearInterval(this.ticker)
    this.ticker = setInterval(this.countDown, 1000)
    this.$once('hook:beforeDestroy', () => {
      window.clearInterval(this.ticker)                                 
    })
  },
}
```
**循环引用**

递归组件：

在自己当中调用自己，比如菜单栏，一级一级打开，发现模式都是一样，这样就可以使用递归，在自己的列表中渲染自己。

递归组件一定要定义组件的 `name` 并且每次调用时要加上判断条件。


**`v-once` 创建低开销的静态组件**

如果一个组件中有大量的静态内容，在根元素添加 `v-once` 属性可以确保这些内容只计算一次然后缓存起来。


## 过渡&动画

### 单元素/组件的过渡

在 transition 组件中实现过渡效果，实现条件：

* 条件渲染 (使用 v-if)
* 条件展示 (使用 v-show)
* 动态组件
* 组件根节点

**过渡类名：**

过渡一般都是通过定义name 的 css类名样式来设置过渡效果的，`v-enter-active` 和 `v-leave-active` 是设置进入和离开时的效果的，比如设置 `transition` 和 `transition` 等； `v-enter` 和 `v-leave-to` 一般是设置 进入时的初始样式 和离开后的样式； `v-enter-to` 和 `v-leave` 是设置元素进入结束的样式和元素开始离开的样式，因为这两个样式就是元素在页面正常显示的样式，所以一般不用写。

**使用过渡：**
```css
.fade-enter-active {
  transition: all .3s ease;
}

.fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.fade-enter, .fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
```
```html
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```
```js
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
```

**使用动画：**
```css
.fade-enter-active {
  animation: bounce-in .5s;
}

.fade-leave-active {
  animation: bounce-in .5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```
```html
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```
**配合使用第三方动画库：**

通过自定义过渡类名 `enter-active-class` 和 `enter-active-class` 配合第三方动画库animate.css 实现进入和离开的动画效果。

```html
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition enter-active-class="animated tada"
    leave-active-class="animated bounceOutRight">
    <p v-if="show">hello</p>
  </transition>
</div>
```

**显性的过渡持续时间**

使用 `duration` 为过渡进入和离开设置时间，不论其他样式怎么设置，进入和离开都是`duration`设置的时间。下面 shake 动画一个执行1000毫秒才离开，进入执行500毫秒才停止。
```html
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition enter-active-class="animated shake"
    leave-active-class="animated shake" 
    :duration="{ enter: 500, leave: 1000 }">
      <p v-if="show">hello</p>
  </transition>
</div>
```

**JavaScript 钩子**
```html
<transition
  @before-enter="beforeEnter"
  @enter="enter"
  @after-enter="afterEnter"
  @enter-cancelled="enterCancelled"

  @before-leave="beforeLeave"
  @leave="leave"
  @after-leave="afterLeave"
  @leave-cancelled="leaveCancelled"
>
</transition>
```
```js
// 通过 el 获取 DOM元素进行样式设置
methods: {
  beforeEnter: function (el) {},
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  enter: function (el, done) {done()},
  afterEnter: function (el) {},
  enterCancelled: function (el) {},

  beforeLeave: function (el) {},
  // 当与 CSS 结合使用时
  // 回调函数 done 是可选的
  leave: function (el, done) {done()},
  afterLeave: function (el) {},
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {}
}
```

### 初始渲染的过渡

通过 `appear` 属性设置元素第一次进入页面时的动画，直接添加 `appear` 属性则是进入时的过渡效果，也可以通过appear类名或者appear钩子来设置第一次进入的动画。不影响name设置的进入和离开的动画。

```html
<!-- 默认使用进场动画 -->
<transition appear>
  <!-- ... -->
</transition>

<!-- css 类名 -->
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" (2.1.8+)
  appear-active-class="custom-appear-active-class"
>
  <!-- ... -->
</transition>

<!-- js钩子 -->
<transition
  appear
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
  v-on:after-appear="customAfterAppearHook"
  v-on:appear-cancelled="customAppearCancelledHook"
>
  <!-- ... -->
</transition>
```

### 多个元素过渡

单个元素是通过显示和隐藏把离场动画和入场动画都作用于一个元素上面，而多个元素是离场和入场动画分别作用于两个元素上面，通过条件判断显示不同的元素，让离场动画作用于离开的元素，进场动画作用在进入的元素。如选项卡的切换，轮播图的切换等过渡动画都可以使用。

:::tip
当有相同标签名的元素切换时，需要通过 key attribute 设置唯一的值来标记以让 Vue 区分它们，否则 Vue 为了效率只会替换相同标签内部的内容。即使在技术上没有必要，给在 <transition> 组件中的多个元素设置 key 是一个更好的实践。
:::

一个简单切换效果：
```css
.fade-enter-active {
  transition: all 1s;
}

.fade-leave-active {
  transition: all 1s;
}
.fade-enter {
  /* transform: translateX(100%); */
  opacity: 0;
}
.fade-leave-to {
  /* transform: translateX(-100%); */
  opacity: 0;
}
```
```html
<div id="demo">
  <button v-on:click="show = !show">
    Toggle
  </button>
  <transition name="fade" >
    <button class="box" v-if="show" key="Save">Save</button>
    <button class="box" v-if="!show" key="Edit">Edit</button>
  </transition>
</div>
```

过渡模式mode：

* `in-out`：新元素先进行过渡，完成之后当前元素过渡离开。

* `out-in`：当前元素先进行过渡，完成之后新元素过渡进入。

这两种模式 `out-in` 模式虽然看起来效果好一点，但是效果不够连贯，一个消失后才显示另一个。要想过渡比较连贯，一个开始消失，另一个就开始显示另一个可以使用 `position: absolute;` 让所有元素都浮动起来，这样切换效果就会连贯起来了。

一个滑动离开一个滑动进入效果：
```css
.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
/* 定义离开和进入效果 */
.fade-enter {
  transform: translateX(100%);
  opacity: 0;
}
.fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
/* 元素都浮动起来 */
.btn {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
}
```
```html
<div id="app">
  <button @click="isEditing = !isEditing">切换状态</button>
  <transition name="fade">
    <button class="btn" v-if="isEditing" key="Save">Save</button>
    <button class="btn" v-if="!isEditing" key="Edit">Edit</button>
  </transition>
</div>
```

一个滑动离开后一个再显示效果： 

配合 `mode="out-in"` 模式使用，不使用绝对定位
```css
.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
/* 定义离开和进入效果 */
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
```
```html
<div id="app">
  <button @click="isEditing = !isEditing">切换状态</button>
  <transition name="fade" mode="out-in">
    <button class="btn" v-if="isEditing" key="Save">Save</button>
    <button class="btn" v-if="!isEditing" key="Edit">Edit</button>
  </transition>
</div>
```

一个显示一个消失效果： 

绝对定位 和 `mode="out-in"` 模式使用哪个模式都可以，两个一起使用也可以。
```css
.fade-enter-active, .fade-leave-active {
  transition: all 1s;
}
/* 定义离开和进入效果 */
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.btn {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 9;
}
```
```html
<div id="app">
  <button @click="isEditing = !isEditing">切换状态</button>
  <transition name="fade" mode="out-in">
    <button class="btn" v-if="isEditing" key="Save">Save</button>
    <button class="btn" v-if="!isEditing" key="Edit">Edit</button>
  </transition>
</div>
```

### 多个组件过渡

多个组件的过渡不需要使用 key 属性。只需要使用动态组件就可以了，其他的设置效果和多个元素设置效果一样。

```html
<transition name="fade">
  <component :is="componentName"></component>
</transition>
```

### 列表过渡

单个元素和多个元素过渡，都只是同一时间渲染一个元素，要同时渲染多个，比如列表这种，使用 `<transition-group>` 组件，其特点为：

* 不同于 `<transition>`，它会以一个真实元素呈现：默认为一个 `<span>`。你也可以通过 `tag` 属性更换为其他元素。
* **过渡模式**不可用，因为我们不再相互切换特有的元素。
* 内部元素总是需要提供唯一的 key 属性值。
* CSS 过渡的类将会应用在内部的元素中，而不是这个组/容器本身。

`<transition-group>` 组件不仅使列表的单个元素在进行显示消失时有一个过渡，还可以改变定位，并在改变定位时实现一个动画效果，可以使用 `v-move` 在其中定义 `transition` 属性，实现过渡切换。

```css
.list-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active {
  transition: all 1s;
}
.list-leave-active {
  position: absolute;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
```
```html
<div id="app">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <button v-on:click="shuffle">Shuffle</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item">
      {{ item }}
    </span>
  </transition-group>
</div>
```
```js
var vm = new Vue({
  el: '#app',
  data: {
    items: [1,2,3,4,5,6,7,8,9],
    nextNum: 10
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
    shuffle: function () {
      this.items = _.shuffle(this.items)
    }
  }
})
```

组件使用过渡：

将 `<transition>` 作为根组件，元素放在其中，判断条件在 created 声明周期中设置为显示，这样组件从消失到显示就可以为其设置过渡效果。

## 混入

混入 (mixin) 来分发 Vue 组件中的可复用功能。把多个组件中具有相同方法或者数据提取出来，然后使用mixin混入到需要的组件中。一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

数据对象在内部会进行递归合并，并在发生冲突时以组件数据优先。同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。

v-cli中使用：

定义一个mixin.js文件
```js
// mixin.js
export const toggle = {
  data () {
    isshowing: false
  },
  created() {
    console.log(1111)
  },
  methods: {
    toggleShow() {
      this.isshowing = !this.isshowing
    }
  }
}
```

其他组件引入：
```js
import { mixin } from 'mixin.js'

export default {
  mixins: [mixin],
  created() {

  },
  mounted () {
      
  }
}
```

全局混入：
```js
// main.js
Vue.mixin({
  mounted() {
    console.log("我是mixin");
  }
})
```

## 自定义指令

vue可以像 `v-model` `v-for` 一样能自己定义一个特定功能的指令，比如 `v-focus` 、`v-resize`、`v-lazyload` 这些。自定义指令分为全局注册自定义指令和局部注册自定义指令。

比如全局自定义注册一个自动获取焦点的输入框指令 `v-focus`
```js
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

注册局部指令，组件中也接受一个 directives 的选项：
```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

**钩子函数**

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

* `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
* `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
* `update`：所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新。
* `componentUpdated`：指令所在组件的 VNode 及其子 VNode 全部更新后调用。
* `unbind`：只调用一次，指令与元素解绑时调用。

每个钩子函数调用时都可以接收以下参数，来获取和操作：

* `el`：指令所绑定的元素，可以用来直接操作 DOM。
* `binding`：一个对象，包含指令名、传入的参数、绑定的值、修饰符等各种值。
* `vnode`：Vue 编译生成的虚拟节点。移步 VNode API 来了解更多详情。
* `oldVnode`：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

```html
<div id="app">
  <div v-demo:foo.a.b="message"></div>
</div>
```
```js
Vue.directive('demo', {
  inserted: function (el, binding, vnode) {
    console.log(el) // <div></div>
    console.log(binding)
    // {
    //   arg: "foo"
    //   def: {inserted: ƒ}
    //   expression: "message"
    //   modifiers: {a: true, b: true}
    //   name: "demo"
    //   rawName: "v-demo:foo.a.b"
    //   value: "xxx"
    // }
  }
})
var vm = new Vue({
  el: '#app',
  data: {
    message: 'xxx'
  }
})
```

**动态指令参数**

实现一个让元素可以固定在某一个方向的指令 `v-pin` ，固定在一个方向可以直接传入固定的值就可以了，但是如果可以固定在上下左右多个方向呢，我们可以使用动态指令参数 `v-mydirective:[argument]="value"`来设置，`argument`可以根据传入的值进行更新。

```html
<div id="app">
  <h3>Scroll down inside this section ↓</h3>
  <p v-pin:[direction]="300">I am pinned onto the page at 200px to the left.</p>
</div>
```
```js
Vue.directive('pin', {
  bind: function (el, binding, vnode) {
    el.style.position = 'fixed'
    el.style[binding.arg] = binding.value + 'px'
  }
})
var vm = new Vue({
  el: '#app',
  data: {
    direction: 'bottom'
  }
})
```

## 渲染函数

大多数时候使用模板来创建组件，但有些时候我们需要 `render` 函数来渲染一个组件也很实用。

在定义组件时使用 `render` 函数返回一个通过 `createElement` 创建的虚拟DOM来代替 `template` 模板。

```js
Vue.component('temp', {
  // 通过render函数的createElement创建一个虚拟DOM
  render: function (createElement) {
    return createElement(
      'div',   // 标签名称
      {
        attrs: {
          id: 'foo'
        },
      }
      [
        createElement('a', {
          attrs: {
            name: 'xxx',
            href: 'http://www.xxx.com'
          }
        })
      ] // 子节点数组
    )
  },
  // 其他模板选项：
  props: {},

})
```

`createElement` 参数对象接收三个参数：

* `String`： 一个 HTML 标签名、组件选项对象。必填项。
* `Object`： 一个与模板中 attribute 对应的数据对象。可选。
* `String | Array`： 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，也可以使用字符串来生成“文本虚拟节点”。可选。

```js
createElement(
  'div',
  {
    // (详情见下一节)
  },
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

模板属性：
```js
{
  // 与 `v-bind:class` 的 API 相同，
  // 接受一个字符串、对象或字符串和对象组成的数组
  'class': {
    foo: true,
    bar: false
  },
  // 与 `v-bind:style` 的 API 相同，
  // 接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML attribute
  attrs: {
    id: 'foo'
  },
  // 组件 prop
  props: {
    myProp: 'bar'
  },
  // DOM property
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器在 `on` 内，
  // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
  // 需要在处理函数中手动检查 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽的格式为
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其它特殊顶层 property
  key: 'myKey',
  ref: 'myRef',
  // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
}
```

事件&修饰符

模板创建事件是写在 `methods` 中的，通过函数渲染的事件是写在 `on` 中的，修饰符则用特效的符号代替，不能替代的则用原生事件代替。

| 修饰符	| 前缀 |
| ----   | ---- |
|.passive	| & |
|.capture	| ! |
|.once	| ~ |
|.capture.once 或
|.once.capture	| ~! |

```js
// 事件挂载
on: {
  '!click': this.doThisInCapturingMode,
  '~keyup': this.doThisOnce,
  '~!mouseover': this.doThisOnceInCapturingMode
}
```

用在单文件中：

```html
<template functional>
</template>
```

这个就像react中的函数组件一样，没有其他数据交互，只是一个简单静态组件，就使用函数渲染来完成，渲染开销会低很多。

## 插件

使用插件：

通过全局方法 Vue.use() 使用插件。它需要在你调用 new Vue() 启动应用之前完成

```js
// 调用 `MyPlugin.install(Vue)`
Vue.use(MyPlugin)

// Vue.use(MyPlugin, { someOption: true })

new Vue({
  // ...组件选项
})
```

开发插件：

Vue.js 的插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }
  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })
  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })
  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

## 过滤器

过滤器用于一些常见的文本格式化。一般在模板中，后面也可以在数据绑定中使用。可以在组件中定义过滤器，也可以定义全局过滤器。

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>

<!-- 串联使用 -->
{{ message | filterA | filterB }}
```

在组件中定义局部过滤器：

`capitalize` 是定义的过滤器名称。filters和methods同级别。
```js
filters: {
  capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
}
```

全局注册过滤器：

注意和filter和局部filters的区别。
```js
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

new Vue({
  // ...
})
```






