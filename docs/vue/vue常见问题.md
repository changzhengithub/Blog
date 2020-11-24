# vue常见问题

## v-if 和 v-show 的区别

## 为什么组件的data是一个函数

## 跨组件传值和监听事件


## 在自定义组件上使用v-model进行传值

v-model 在组件上使用，首先是可以通过$emit发送事件来实现，又因为 `v-model` 指令可以省略在父组件上使用props传值和接收事件，和 `model` 选项可以自定义传入的props名和发送的事件名，所以 `v-model` 可以在组件上进行传值。

作用： 来代替在父组件中来回传值和接收值，直接在子组件中定义好发送的事件名和传入的值就可以了。在父组件中一个 v-model 就可以传props和接收事件了。

第一步、先在input上模仿一个 `v-model` 指令
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

第二步、通过自定义事件`$emit`在组件上模仿 `v-model`指令
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

第三部、直接在子组件上使用 `v-model`指令
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

使用： 

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

[理解 v-model 以及在组件上如何使用](https://www.cnblogs.com/gtscool/p/13033534.html)