# 在自定义组件上使用v-model进行数据双向绑定

## v-model数据双向绑定

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
vue2还不支持使用多个 `v-model`添加事件，vue3中通过 v-model:event1=xxx 跟参数来添加多个`v-model`。

虽然`v-model`可以进行数据双向绑定进行传值，但是 `v-model` 这种形式只能实现一个数据进行双向绑定，如果要实现多个数据进行双向绑定，可以是 `.sync` 修饰符 来简化操作。

## .sync 修饰符

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

[理解 v-model 以及在组件上如何使用](https://www.cnblogs.com/gtscool/p/13033534.html)

[组件使用v-model、$listeners、.sync](https://www.hellojava.com/a/84922.html)