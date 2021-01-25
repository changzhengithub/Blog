# vue3新内容

vue3.0 前面的基础内容基本没有什么变化。

## 声明周期变化

vue3.0生命周期最后两个周期有所改变，`beforeDestroy` 和 `destroyed` 两个钩子变为 `beforeUnmount` 和 `unmounted`。

* `beforeUnmount`： 在卸载组件实例之前调用。
* `unmounted`： 卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。

## Teleport

有时候我们封装了一个modal弹框组件，把它放在父组件中引用，但是我们希望它的浮动不只是根据父元素来定位，我们希望它可以在我们想要的祖先元素上定位，或者直接定位在body上。平时需要全局状态或者拆分组件来解决，现在我们可以通过 `Teleport` 来解决，直接控制在哪个父节点渲染HTML。
```js
app.component('modal-button', {
  data() {
    return { 
      modalOpen: false
    }
  },
  template: `
  
    <button @click="modalOpen = true">
        Open full screen modal! (With teleport!)
    </button>

    <teleport to="body">
      <div v-if="modalOpen" class="modal">
        <div>
          I'm a teleported modal! 
          (My parent is "body")
          <button @click="modalOpen = false">
            Close
          </button>
        </div>
      </div>
    </teleport>
  `
})
```

## 渲染函数

和vue2的区别
```js
// vue2使用createElement创建虚拟DOM VNode
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h1', 
      this.blogTitle,
      {
        // 事件
        on: {
          '!click': this.clickHandler
        },
      }
    )
  }
})

// vue3直接使用 h 函数创建
Vue.component('anchored-heading', {
  render() {
    return h(
      'h1', 
      {
        onClick: this.clickHandler,
        // 修饰符
        capture: true
      }, 
      this.blogTitle)
  }
})
```

整体上和

