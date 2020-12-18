# vue-cli3.0添加typescript

## 创建项目

vue-cli3.0脚手架创建vue项目时提供添加 Typescript 选项，会默认配置好 ts 相关的配置，直接查看说明文档使用就可以开启服务了。

项目目录：
```sh
├── node_modules        # node包
├── public
│   ├── favicon.ico     # favicon图标
│   └── index.html      # html模板
├── src
│   ├── assets          # 主题 字体等静态资源 (由 webpack 处理加载)
│   ├── components      # 全局组件
│   ├── router          # 路由
│   │   └── index.js    # 路由
│   ├── store           # 全局 vuex store
│   │   └── index.js    # vuex
│   ├── views           # 所有页面
│   ├── App.vue         # 入口页面
│   ├── main.ts         # 入口文件 加载组件 初始化等
│   ├── shims-tsx.d.ts
│   └── shims-vue.d.ts
├── .browserslistrc     # browserslistrc 配置文件 (用于支持 Autoprefixer)
├── .eslintrc.js        # eslint 配置
├── .gitignore
├── babel.config.js     # babel-loader 配置
├── package-lock.json
├── package.json        # package.json 依赖
├── README.md
├── tsconfig.json       # typescript 配置
└── vue.config.js       # vue-cli 配置
```
创建好的项目和以前没有什么太大区别，就是js文件变成ts文件，然后多了 `shims-tsx.d.ts`、`shims-vue.d.ts` 和 `tsconfig.json`几个文件。

* shims-tsx.d.ts: 允许.tsx 结尾的文件，在 Vue 项目中编写 jsx 代码
* shims-vue.d.ts: 主要用于 TypeScript 识别.vue 文件，还可以添加其他要识别的对象，如`$router`
* tsconfig.json: typescript配置文件,主要用于指定待编译的文件和定义编译选项

然后查看一下 `package.json` 文件，就会发现 `dependencies` 里不止添加了 `vue-router`/ `vuex`/ `typescript` 等插件，还另外添加了`vue-class-component` 和 `vue-property-decorator` 插件，这两个就是在vue-cli中使用ts的关键。

让我们了解一下添加ts需要使用的插件：

1、vue-class-component

`vue-class-component` TypeScript装饰器，用于类样式的Vue组件。

2、vue-property-decorator

`vue-property-decorator`是基于 vue 组织里 `vue-class-component` 所做的拓展。

vue组件大多使用的模块都可以从此插件引入
```js
import { Vue, Component, Inject, Provide, Prop, Model, Watch, Emit, Mixins } from 'vue-property-decorator'
```

3、vue-class/vuex-module-decorators

`vue-class` 是`vue-class-component`上Vuex的扩展，和 `vuex-module-decorators` 用于vuex上添加ts。

这些文件如果不通过脚手架创建的时候添加的话也可以通过手动添加，把这些文件添加上去，然后再把组件改写成相对应的方式就可以了。

## 组件的改造

使用ts改造vue组件，基本都是使用插件 `vue-property-decorator` 提供的装饰器注入来改写了，在组件中使用vuex的数据及方法 `vue-class` 也提供了装饰器。

不要在类里面使用箭头函数

```vue
<script lang="ts">
import { Component, Vue, Prop, Model, Watch } from "vue-property-decorator";
import Child from "path/to/Child.vue";

// 组件注册
@Component({
  // 组件名
  name: 'Project',
  // 子组件
  components: {
    Child,
  },
  // 过滤
  filters: {
    capitalize(value: any) {
      return new Date(value).toLocaleString()
    }
  },
  // 路由守卫
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 可以通过 this 访问组件实例
    console.log("beforeRouteLeave");
    next();
  },
})

export default class Project extends Vue {
  /* props */
  @Prop() age!: number // 无类型
  @Prop({ type: String, default: "xxx" }) msg!: string  // 类型验证

  /* model */
  @Model('change', { type: Boolean }) checked!: boolean

  /* data */
  price = 99;
  count: number = 10;

  // 声明周期钩子
  created() {
    this.getData()
  }
  mounted() {}

  /* methods */
  getData() {}

  /* computed */
  get money(): number {
    return this.count * this.price;
  }

  /* emit */ 
  @Emit('ADD_COUNT_EVENT')
  addCount() {
    return this.count  // 返回值作为参数
  }

  /* ref */
  @Ref() projectDom!: any

  /* watch */
  @Watch("count")
  onCountChanged(newValue: number, oldValue: number): void {}
}
</script>
```
**总结：**

需要放到装饰器Component里的：
* name, components, filters, directives 等
* 组件导航守卫

需要放到类里面的：
* 直接写的：
  * data, methods, render, computed
  * 声明周期钩子
* 需要装饰器的：
  * props, watch, model, provide/inject, emit, ref 等

vue-property-decorator文档：[vue-property-decorator](https://github.com/kaorun343/vue-property-decorator)

Mixins混入：

```js
// mixins.js
import Vue from 'vue'
import Component from 'vue-property-decorator'

@Component
export class Hello extends Vue {
  hello = 'Hello'
}

@Component
export class World extends Vue {
  world = 'World'
}
```
使用：
```js
import Component, { mixins } from 'vue-property-decorator'
import { Hello, World } from './mixins'

@Component
export class HelloWorld extends mixins(Hello, World) {
  created () {
    console.log(this.hello + ' ' + this.world + '!') // -> Hello World!
  }
}
```

## 路由使用

路由和以前没有什么太大区别，大致写法都是一样。

```js
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

// 异步路由
const About = () => import(/* webpackChunkName: "about" */ '../views/About.vue')

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
```

## vuex改写

vue-cli创建项目时，vuex默认没有使用ts，如果想要vuex的使用更标准化可以手动改写store中的js文件，然后再通过插件 `vue-class` 提供的装饰器来获取和调用vuex数据和方法。

改写store：

store使用模块化写法，我们手动把这些模块中的js文件改写成 ts 文件。一般项目不需要分模块来做，只需要把文件分开来引入，这样也是比较清晰和规范的写法。如果是大型项目可以考虑分模块来写，如下面的目录所示。

目录结构：
```sh
├── main.js
└── store
    ├── index.ts              # 组装模块并导出 store 的地方
    ├── state.ts              # state
    ├── state-types.ts        # state types
    ├── getters.ts            # getter
    ├── mutations.ts          # mutation
    ├── mutation-types.ts     # mutation types
    ├── actions.ts            # action
    ├── actions-types.ts      # action types
    └── moduleA               # 模块A
        ├── index.ts          # 模块A store导出
        ├── state.ts          # 模块A state
        ├── state-types.ts    # 模块A state types
        ├── getters.ts        # 模块A getter
        ├── mutations.ts      # 模块A mutation
        ├── mutation-types.ts # 模块A mutation types
        ├── actions.ts        # 模块A action
        └── actions-types.ts  # 模块A action types
```

store仓库基本写法：
```js
// store/index.js
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import { RootState } from './state-types'

// 导入模块A
import moduleA from './moduleA/index'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  // 全局
  state,
  getters,
  mutations,
  actions,
  // 模块
  modules: {
    moduleA
  }
}

export default new Vuex.Store<RootState>(store);
```
```js
// store/state.js
import { RootState } from './state-types'

const state: RootState = {
  count: 100,
  token: ''
}

export default state
```
```js
// store/state-types.js
export interface RootState {
  token: string,
  count: number,
}
```
```js
// store/getters.js
import { RootState } from './state-types'

const getters = {
  doubleCount: (state: RootState) => {
    return state.count * 2
  },
  multipleCount: (state: RootState) => (multiple: number) => {
    return state.count * multiple
  },
}

export default getters
```
```js
// store/mutations.js
import * as mutationTypes from './mutation-types'
import { RootState } from './state-types'

const mutations = {
  [mutationTypes.ADD_COUNT] (state: RootState, amount: number) {
    state.count += amount
  },
  [mutationTypes.GET_TOKEN] (state: RootState, token: string) {
    state.token = token
  }
}

export default mutations
```
```js
// store/mutation-types.js
export const ADD_COUNT = 'ADD_COUNT';
export const GET_TOKEN = 'GET_TOKEN';
```
```js
// store/actions.js
import { ActionContext } from "vuex";
import { RootState } from './state-types'
import * as aTypes from './action-types'
import * as mTypes from './mutation-types'

type ActionStore = ActionContext<RootState, any>

const actions = {
  [aTypes.ADD_COUNT_ASYNC] ({ commit }: ActionStore, amount: number) {
    setTimeout(() => {
      commit(mTypes.ADD_COUNT, amount)
    }, 1000)
  },
  [aTypes.GET_TOKEN_ASYNC] ({ commit }: ActionStore, token: string) {
    setTimeout(() => {
      commit(mTypes.GET_TOKEN, token)
    }, 1000)
  }
}

export default actions
```
```js
// store/action-types.js
export const ADD_COUNT_ASYNC = 'ADD_COUNT_ASYNC';
export const GET_TOKEN_ASYNC = 'GET_TOKEN_ASYNC';
```

模块A写法：
```js
// moduleA/index.js
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

// 一定要写 namespaced 命名空间
const moduleA = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default moduleA
```
```js
// moduleA/state.js
import { moduleAState } from './state-types'

const state: moduleAState = {
  subCount: 10
}

export default state
```
```js
// moduleA/state-types.js
export interface moduleAState {
  subCount: number,
}
```
```js
// moduleA/getters.js
import { moduleAState } from './state-types'

const getters = {
  doubleSubCount: (state: moduleAState) => {
    return state.subCount * 2
  },
  multipleSubCount: (state: moduleAState) => (multiple: number) => {
    return state.subCount * multiple
  },
}

export default getters
```
```js
// moduleA/mutations.js
import * as mATypes from './mutation-types'
import { moduleAState } from './state-types'

const mutations = {
  [mATypes.ADD_SUB_COUNT] (state: moduleAState, amount: number) {
    state.subCount += amount
  }
}

export default mutations
```
```js
// moduleA/mutation-types.js
export const ADD_SUB_COUNT = 'ADD_SUB_COUNT';
export const GET_TOKEN = 'GET_TOKEN';
```
```js
// moduleA/actions.js
import { ActionContext } from "vuex";
import * as mATypes from './mutation-types'
import * as aATypes from './action-types'
import { RootState } from '../state-types'
import { moduleAState } from './state-types'

// 第一个泛型参数为当前模块的
type ActionStore = ActionContext<moduleAState, RootState>

const actions = {
  [aATypes.ADD_SUB_COUNT_ASYNC] ({ commit }: ActionStore, amount: number) {
    setTimeout(() => {
      commit(mATypes.ADD_SUB_COUNT, amount)
    }, 1000)
  },
}

export default actions
```
```js
// moduleA/action-types.js
export const ADD_SUB_COUNT_ASYNC = 'ADD_SUB_COUNT_ASYNC';
```

在组件获取store

使用 `vue-class` 插件提供的装饰器代替 map 函数
```vue
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <button @click="addCount(amount)">addCount</button>
      <button @click="addCountAsync(amount)">addCountAsync</button>
      <button @click="getToken('foisuoiu325kjsd')">getToken</button>
      <button @click="getTokenAsync('111111111111')">getTokenAsync</button>
      <p>{{count}}</p>
      <p>{{doubleCount}}</p>
      <p>{{multipleCount(3)}}</p>
      <p>{{token}}</p>
    </div>

    <p>moduleA 子模块</p>
    <button @click="addSubCount(subAmount)">addCount</button>
    <button @click="addSubCountAsync(subAmount)">addCountAsync</button>
    <p>{{subCount}}</p>
    <p>{{doubleSubCount}}</p>
    <p>{{multipleSubCount(3)}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as mTypes from '@/store/mutation-types'
import * as aTypes from '@/store/action-types'
import * as mATypes from '@/store/moduleA/mutation-types'
import * as aATypes from '@/store/moduleA/action-types'

import { State, Getter, Mutation, Action, namespace } from 'vuex-class'

// 引入模块A
const moduleA = namespace('moduleA')

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  // state
  @State count!: number
  @State token!: string
  // 子模块
  @moduleA.State subCount!: number
  // getter
  @Getter doubleCount!: number
  @Getter multipleCount!: Function
  // 子模块
  @moduleA.Getter doubleSubCount!: number
  @moduleA.Getter multipleSubCount!: Function
  // mutation
  @Mutation(mTypes.ADD_COUNT) addCount!: Function
  @Mutation(mTypes.GET_TOKEN) getToken!: Function
  // 子模块
  @moduleA.Mutation(mATypes.ADD_SUB_COUNT) addSubCount!: Function
  // action
  @Action(aTypes.ADD_COUNT_ASYNC) addCountAsync!: Function
  @Action(aTypes.GET_TOKEN_ASYNC) getTokenAsync!: Function
  // 子模块
  @moduleA.Action(aATypes.ADD_SUB_COUNT_ASYNC) addSubCountAsync!: Function

  // data
  amount = 10
  subAmount = 20

  created() {
    console.log(this.doubleCount)
    console.log(this.multipleCount(3))
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
```

## Http改写

```js
import Url from './Url.class'
import axios from 'axios'

interface ArgsType {
  url: string;
  method: string;
  data?: object;
  baseURL?: string;
  headers?: object;
  [key: string]: any;
}

interface objType {
  [key: string]: any;
}


// 新建一个CallBack类来保证每次回调的callbackSuccess都是更新的
class CallBack {
  public callbackSuccess: any | undefined
  public callbackFail: any | undefined

  success(callback: Function): CallBack {
    this.callbackSuccess = callback
    return this
  }
  
  fail(callback: Function): CallBack {
    this.callbackFail = callback
    return this
  }
}

class Http {

  // 请求地址
  public baseURL: string = process.env.NODE_ENV == "production" ? "生产环境URL" : "开发环境URL"
  // 超时时间
  public timeout: number = 1000
  // 不需要加token的API
  public excludeApis: Array<string> = ['LoginEmail', 'RegisterEmail']
  // 保存的token
  public token: string = 'xxxxxx'

  // 单个请求发送
  send(args: ArgsType): CallBack {
    const cb = new CallBack()
    // 超时时间
    axios.defaults.timeout = 3000
    axios(this.formatArgs(args)).then(response => {
      this.dispense(response, cb)
    }).catch(error => {
      if (cb.callbackFail) cb.callbackFail(error)
    })

    return cb
  }

    // 多请求同时发送
    sendAsync (args: ArgsType) {
      try {
        return axios(this.formatArgs(args)).then(response => {
          const { code, description } = response.data
          switch (code) {
            case 200:
              return Promise.resolve(response.data)
            default:
              return Promise.reject(response.data)
            }
        }).catch(error => {
          throw new Error(error)
        })
      } catch (error) {
        console.log(error)
      }
    }

  // 配置API请求
  formatArgs(args: ArgsType): Object {
    // 基本配置
    const option: ArgsType = {
      url: Url[args.url],
      method: args.method.toLowerCase(),
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (args.headers) Object.assign(option.headers, args.headers)

    let data: objType = args.data ? args.data : {}
    switch (option.method) {
      case 'get':
        option.params = args.data
      break
      default:
        if (!this.excludeApis.includes(args.url)) data.access_token = this.token
        option.data = data
      break
    }

    return option
  }
  dispense (response: objType, cb: CallBack) {
    let errMsg = ''
    switch (response.code) {
      case 200:
        if (cb.callbackSuccess) cb.callbackSuccess(response.data)
        break
      case 401:
        errMsg = '未授权，请登录'
        if (cb.callbackFail) cb.callbackFail(errMsg)
        break
      case 500:
        errMsg = '服务器内部错误'
        if (cb.callbackFail) cb.callbackFail(errMsg)
        break
      default:
        if (cb.callbackFail) cb.callbackFail(response)
    }
  }
}

export default new Http()
```

## 常见问题

### shims-vue.d.ts 有什么用处

```js
declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}
```
Typescript 默认不支持 `*.vue` 文件，所以需要创建一个 `shims-vue.d.ts` 文件，告诉ts  `*.vue` 文件让vue处理。在导入代码的时候也需要加上 `.vue` 后缀。


### Vue使用全局属性

比如引入插件，插件的全局方法挂载到Vue实例下，使用时却报错，如 `this.$Toast()/this.$Message`。

比如window添加全局属性，也会报错。

解决办法： 我们创建一个 `global.d.ts` d.ts文件专门用来添加全局扩充。
```js
// 定制一个文件，设置你想要补充的类型

import Vue from 'vue'

// window全局属性
interface Window {
  app: any;
}

//  声明为 Vue 补充的东西
declare module "vue/types/vue" {
  interface Vue {
    $Toast: any;
    $Message: any;
  }
}
```








