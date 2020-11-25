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

**自定义事件**

通过子组件`$emit`传递事件 和父组件`$on` 来监听

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

**通过自定义事件在组件上使用 `v-model`**

通过input输入框实现数据双向绑定模式演化成在组件上实现简单数据双向绑定，但是 `v-model` 只能实现一个数据在子组件和父组件之间进行传递，如果要使用多个数据的双向绑定一般手动实现，但也可以用 `.sync` 修饰符来缩写。

`v-model` 和 `.sync` 进行单一的数据双向传递，和多个数据双向传递， 都是可以代替 父子组件相互传值的，简化了父组件的操作，并减少了与父组件的耦合成度，只需要在子组件中定义好，父组件之间使用就可以。 如果要是跨组件来传递数据的话，最好使用 `$attrs` 和 `$listeners` 属性。

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
<son-component :num="number">
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











