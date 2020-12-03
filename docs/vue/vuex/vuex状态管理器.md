# Vuex状态管理器

Vuex状态管理器，集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

Vuex核心是store（仓库），包括保存应用的状态（State），应用状态的计算属性（Getters），更改应用的状态（Mutations），异步更改应用的状态（Actions），分割store的模块（Modules）.

Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，所有的组件也会相应地得到高效更新。

不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。

## 简单实现

Vuex首先要定义一个容器 state 保存数据，然后通过 mutation 定义更改 state 的方法，然后在页面通过 commit 提交调用 mutation 中的方法更改state中的状态。然后可以通过 store.state 仓库获取 state 中的数据。

* `this.$store.state.count`： 获取state数据
* `this.$store.commit('increment')`： 触发状态变更

创建store：
```js
// 创建store
const store = new Vuex.Store({
  // 保存state数据
  state: {
    count: 0
  },
  // 设置更改state方法
  mutations: {
    increment (state) {
      state.count++
    }
  }
})

var vm = new Vue({
  el: '#app',
  store, // 根实例注册store，注入所有子组件
  created() {
    console.log(this.$store.state.count)  // 0
    this.increment()
  },
  methods: {
    increment: function() {
      this.$store.commit('increment') // 提交变更
      console.log(this.$store.state.count) // 1
    }
  },
})
```

## State

State保存store仓库所有的状态，所有的获取和更改都离不开State。

### 在组件中获取Vuex状态

1、直接使用store获取
```js
const Counter = {
  template: `<div>{{ $store.state.count }}</div>`,
  created() {
    console.log(this.$store.state.count)
  },
}
```

2、使用计算属性获取

通过计算属性，每当state数据变化，就会重新获取state的值，从而自动触发更改view。
```js
// 通过计算属性返回一个值直接使用
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

3、mapState 辅助函数

当获取状态过多时，计算属性就显得很冗余，可以使用 `mapState` 辅助函数来完成。

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```
当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
```js
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

使用扩展运算符简写
```js
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
  })
}
```

最终版：
```js
import { mapState } from 'vuex'

export default {
  // ...
  computed: {
    ...mapState(['状态1', '状态2', '状态3'])
  }
}

// 使用
// this.状态1
// this.状态2
```

## Getter

Getter就像计算属性一样，来根据state的数据计算得到新的数据。getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

Getter 接受 `state` 作为其第一个参数，接受其他 `getters` 作为第二个参数：
```js
const store = new Vuex.Store({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    }
  }
})
```

### 通过属性访问

让getters返回一个属性，组件中调用这个属性获取到计算后的值。

通过 `store.getters` 对象访问：
```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
// 组件中
this.$store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

### 通过方法访问

让 getters 返回一个函数，调用时给 getters 传参。
```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```
```js
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

在组件中使用：
```js
computed: {
  doneTodosCount () {
    return this.$store.getters.doneTodosCount
  },
  getTodoById () {
    return this.$store.getters.getTodoById(2)
  }
}
```

### mapGetters 辅助函数

```js
// ...
computed: {
  ...mapGetters([
    'doneTodos',
    'getTodoById'
  ])
}

// 使用
this.doneTodos
this.getTodoById(2)  // 方法
```

## Mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。我们在 mutation 定义函数来更改状态。一条重要的原则就是要记住 mutation 必须是同步函数。
```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

使用store.commit触发事件更改状态：

```js
store.commit('increment')
```

给 mutation 传递参数：
```js
// ...
mutations: {
  increment (state, n) {
    state.count += n
  }
}

// 使用
store.commit('increment', 10)

// 传递参数最好是一个对象
store.commit('increment', {
  amount: 10
})

// 使用包含type属性的对象
// 使用type属性，就不需要写事件名了
store.commit({
  type: 'increment',
  amount: 10
})
```

添加state新属性：
```js
state.obj = { ...state.obj, newProp: 123 }
```

### 使用常量替代 Mutation 事件类型

Mutation 会有大量的事件来更改 state 的状态，为了比较直观查看事件和有利于格式检查我们使用常量来代替事件名，新建文件来统一保存这些常量。

```js
// mutation-types.js

export const SOME_MUTATION = 'SOME_MUTATION'
export const SOME_MUTATION = 'SOME_MUTATION'
```
```js
// store.js

import Vuex from 'vuex'
import * as styls from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [styls.SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

### mapMutations 辅助函数

使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用。

**和 mapState/mapGetters 不同，mapMutations和mapActions是映射在 methods 中的，而不是 computed 之中。**

```js
// ...
methods: {
  // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
  ...mapMutations([
    'increment',
  ]),
}

// 使用
this.increment({
  type: 'increment',
  amount: 10
})
```

## Action

Action 类似于 mutation，但Action提交的是mutation，并不直接更改状态，Action可以包含任意异步操作。

Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 `context.commit` 提交一个 mutation，或者通过 `context.state` 和 `context.getters` 来获取 state 和 getters
```js
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    // context就是store对象
    increment (context, payload) {
      context.commit('increment', payload)
    }
  }
})
```

解构赋值：
```js
actions: {
  increment ({ commit }, payload) {
    commit('increment', payload)
  }
}
```

### 分发Action

使用 `store.dispatch` 触发Action：
```js
// 分发
store.dispatch('incrementAsync')

// 传递对象参数
store.dispatch('incrementAsync', {
  amount: 10
})

// 以type对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

进行异步操作：
```js
actions: {
  buyProduct ({ commit, state }, productIdList) {
    // 把当前购物车的物品备份起来
    const savedCartItems = [...state.cart.added]
    // 购买商品，调用结算API
    Http.send({
      productIdList: productIdList
    }).succusss(() => {
      // 结算成功，清空购物车，添加到已付款
      commit(types.CLEAR_CART, productIdList)
      commit(types.ADD_PAYMENT, productIdList)
    }).fail(() => {
      // 结算失败，恢复数据
      commit(types.CHECKOUT_FAILURE, savedCartItems)
    })
  }
}
```

### mapActions 辅助函数

**和 mapState/mapGetters 不同，mapMutations和mapActions是映射在 methods 中的，而不是 computed 之中。**

```js
// ...
methods: {
  // 将 `this.incrementAsync()` 映射为 `this.$store.dispatch('incrementAsync')`
  ...mapActions([
    'incrementAsync'
  ]),
}

// 使用
this.incrementAsync({
  type: 'incrementAsync',
  amount: 10
})
```

### 组合 Action

一个action返回 Promise
```js
actionA ({ commit }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      commit('someMutation')
      resolve()
    }, 1000)
  })
}
```
使用：
```js
store.dispatch('actionA').then(() => {
  // ...
})
```
另一个action使用：
```js
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```

利用 async/await 
```js
// 假设 getData() 和 getOtherData() 返回的是 Promise

actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData()) // 等待getData执行
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

## Modules 多模块

当store变的较大时，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：
```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

### 模块的局部状态

对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。
```js
const moduleA = {
  state: () => ({
    count: 0
  }),
  mutations: {
    increment (state) {
      // 这里的 `state` 对象是模块的局部状态
      state.count++
    }
  },

  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}
```

同样，对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`：
```js
const moduleA = {
  // ...
  actions: {
    incrementIfOddOnRootSum ({ state, commit, rootState }) {
      if ((state.count + rootState.count) % 2 === 1) {
        commit('increment')
      }
    }
  }
}
```

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：
```js
const moduleA = {
  // ...
  getters: {
    sumWithRootCount (state, getters, rootState) {
      return state.count + rootState.count
    }
  }
}
```

目录结构：
```sh
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```