# vue常见问题

## v-if 和 v-show 的区别

`v-if` 是真正的条件渲染，为真时才会渲染元素。而 `v-show` 不管条件真假都会被渲染，只是简单的对`display`进行切换。`v-if` 相比较 `v-show` 开销更大，因此需要频繁切换的使用 `v-show` ，很少改变用 `v-if`。

## 解决v-if和v-for一起使用

为了过滤一个列表中的项目 (比如 v-for="user in users" v-if="user.isActive")。在这种情形下，请将 users 替换为一个计算属性 (比如 activeUsers)，让其返回过滤后的列表。

## 解决页面加载闪烁问题

```css
[v-cloak] {
  display: none;
}
```
```html
<div id="app" v-cloak></div>
```

## 为什么组件的data是一个函数

当一个组件被定义，data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果 data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，从而返回初始数据的一个全新副本数据对象。

## 跨组件传值和监听事件

[在组件上使用v-model](/vue/组件之间的通信.html)

## 在自定义组件上使用v-model进行传值

[在组件上使用v-model](/vue/在组件上使用v-model.html)

## vue命令创建失败提示"command failed: npm install --loglevel error --registry=https://registry.npmjs.org/"

一是使用淘宝安装，打开目录"C:\Users\Administrator"下的.vuerc 文件，修改里面的 `useTaobaoRegistry` 为 true。

二是清除npm缓存：
```sh
npm cache clean --force
```

## $router和$route有什么区别

