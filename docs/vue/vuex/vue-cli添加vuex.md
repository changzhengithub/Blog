# vue-cli添加vuex

## 安装

在使用 vue-cli3.0 搭建Vue项目时，会有提示安装 vuex router等选项，可以直接选择。

```sh
npm install vuex --save
```

## 添加到项目

### 方式一

如果项目比较小，但又想使用Vuex，我们可以直接在 main.js 文件同目录下创建 store.js 文件，来创建 Vuex 实例。
```js
// store.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    num: 100
  },
  getters: {
    calcCount: (state) => {
      return state.count++ 
    },
    calcNum: (state, getters) => {
      return state.num + getters.calcCount
    },
    calcAll: (state) => (payload) => {
      return state.count + state.num + payload.amount
    }
  },
  mutations: {
    increment (state, amount) {
      state.count += amount
    }
  },
  actions: {
    incrementAsync ({commit}, payload) {
      commit('increment', payload)
    }
  }
})
```

在 main.js 中引入注册到vue实例上
```js
import Vue from 'vue'
import App from './App.vue'
import store from './store'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

### 方式二

如果项目是多人协作开发，并有大量数据要保存，我们要更规范的来开发，添加 vuex 也要规范，使项目一目了然。

在 src 目录下创建 store 文件夹，里面分别创建对应js文件。

项目目录：
```sh
└── src
  ├── main.js
  ├── router
  │   ├── router.js
  │   └── ...  
  └── store                 # store文件
      ├── index.js          # 我们组装模块并导出 store 的地方
      ├── state.js          # 根级别的 state
      ├── getters.js        # 根级别的 getter
      ├── mutations.js      # 根级别的 mutation
      ├── actions.js        # 根级别的 action
      ├── mutation-types.js # 根级别的 mutation types
      └── action-types.js  # 根级别的 action types
```
index.js文件：
```js
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
```

state.js文件：
```js
const state = {
  // 定义state初始状态
  count: 0,
  num: 100
}
export default state
```

getters.js文件：
```js
const getters = {
  calcCount: (state) => {
    return state.count++ 
  },
  calcNum: (state, getters) => {
    return state.num + getters.calcCount
  },
  calcAll: (state) => (payload) => {
    return state.count + state.num + payload.amount
  }
}

export default getters
```

mutations.js文件：
```js
import * as styls from './mutation-types.js'

const mutations = {
  [styls.INCREMENT] (state, payload) {
    state.count += payload.amount
  }
}

export default mutations
```

actions.js文件：
```js
import * as mStyls from './mutation-types.js'
import * as aStyls from './action-types.js'

const actions = {
  [aStyls.INCREMENT_ASYNC] ({commit}, payload) {
    commit(mStyls.INCREMENT, payload)
  }
}

export default actions
```

mutation-types.js文件：
```js
export const INCREMENT = 'INCREMENT'

export const SOME_MUTATION = 'SOME_MUTATION'
```

action-types.js文件：
```js

export const INCREMENT_ASYNC = 'INCREMENT_ASYNC'

export const SOME_MUTATION = 'SOME_MUTATION'
```

### 方式三

当项目变的很大，数据很冗余和臃肿，这时我们就要使用 Modules 来拆分 store 了，使其一个模块对应专一的模块数据。

目录结构：
```sh
├── main.js
└── store
    ├── index.js          # 组装模块并导出 store 的地方
    ├── state.js          # 根级别的 state
    ├── getters.js        # 根级别的 getter
    ├── mutations.js      # 根级别的 mutation
    ├── actions.js        # 根级别的 action
    ├── mutation-types.js # 根级别的 mutation types
    ├── actions-types.js  # 根级别的 action types
    ├── moduleA
    │   ├── index.js          # 组装模块并导出A模块 store 
    │   ├── state.js          # A模块 state
    │   ├── getters.js        # A模块 getter
    │   ├── mutations.js      # A模块 mutation
    │   ├── actions.js        # A模块 action
    │   ├── mutation-types.js # A模块 mutation types
    │   └── actions-types.js  # A模块 action types
    └── moduleB
        ├── index.js          # 组装模块并导出B模块 store 
        ├── state.js          # B模块 state
        ├── getters.js        # B模块 getter
        ├── mutations.js      # B模块 mutation
        ├── actions.js        # B模块 action
        ├── mutation-types.js # B模块 mutation types
        └── actions-types.js  # B模块 action types
```
moduleA index.js文件：
```js
import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

export const moduleA = {
  state: state
  getters: getters,
  mutations: mutations,
  actions: actions
}
```
moduleB index.js文件：
```js
import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

export const moduleB = {
  state: state
  getters: getters,
  mutations: mutations,
  actions: actions
}
```

store index.js文件：
```js
import Vue from 'vue'
import Vuex from 'vuex'
import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'

import moduleA from './moduleA/index.js'
import moduleB from './moduleB/index.js'



Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    moduleA,
    moduleB
  }
})

export default store
```

## 使用

在组件中使用
```js
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import * as mStyls from './mutation-types.js'
import * as aStyls from './action-types.js'

export default {
  name: 'Test',
  data () {
    return {
      origin: null
    }
  },
  created () {
    console.log(this.count)
    console.log(this.num)

    this[mStyls.INCREMENT]({
      type: styls.INCREMENT,
      amount: 10
    })

    this[aStyls.INCREMENT_ASYNC]({
      type: styls.INCREMENT_ASYNC,
      amount: 10
    })
    this.calcCount()
    this.calcNum()
    this.calcAll({
      amount: 10
    })
  },
  methods: {
    ...mapMutations([mStyls.INCREMENT])
    ...mapActions([aStyls.INCREMENT_ASYNC])
  },
  computed: {
    ...mapState(['count', 'num']),
    ...mapGetters(['calcCount', 'calcNum', 'calcAll'])
  }
}
```