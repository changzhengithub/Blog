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

在实例化Vue过程中，会直接触发的生命周期有`beforeCreate`、`created`、`beforeMount`、`mounted`，在数据更新的过程中触发的生命周期有`beforeUpdate`、`updated`，在销毁组件的过程中触发的生命周期有`beforeDestroy`、`destroyed`。

beforeCreate：vue实例初始化，

created：

beforeMount：

mounted：

beforeUpdate：

updated：

activated：

deactivated：

beforeDestroy：

destroyed：

