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

vue-cli创建项目时，vuex默认没有使用ts，如果想要vuex的使用更标准化可以手动改写store中的js文件，然后再通过插件 `vue-class/vuex-module-decorators` 提供的装饰器来获取和调用vuex数据和方法。

改写store：

store使用模块化写法，我们手动把这些模块中的js文件改写成 ts 文件。

目录结构：
```sh
├── main.js
└── store
    ├── index.ts          # 组装模块并导出 store 的地方
    ├── state.ts          # state
    ├── state-types.ts    # state types
    ├── getters.ts        # getter
    ├── mutations.ts      # mutation
    ├── mutation-types.ts # mutation types
    ├── actions.ts        # action
    └── actions-types.ts  # action types
```

```js
// index.js
import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import state from './state'
import mutations from './mutations'
import mutations from './mutations'
import { RootState } from './state-types'

Vue.use(Vuex)

const store: StoreOptions<RootState> = {
  // 全局
  state,
  mutations,
}
export default new Vuex.Store<RootState>(store);
```

```js
// state.js
import { RootState } from './state-types'

const state: RootState = {
  count: 0,
  token: ''
}

export default state
```
```js
// state-types.js
export interface RootState {
  token: string,
  count: number,
}
```

组件获取store

使用 `vue-class` 插件提供的装饰器代替 map 函数
```js

```

## Http改写

## 常见问题






