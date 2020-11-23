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

注册一个组件：

```js
// 定义一个名为 button-counter 的新组件
Vue.component('templateName', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

每个组件的data必须是一个函数。

每个组件必须只有一个根元素。

父组件向子组件传值使用 `props`

监听子组件事件：

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

