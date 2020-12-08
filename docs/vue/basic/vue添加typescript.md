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

然后查看一下 `package.json` 文件，就会发现 `dependencies` 里不止添加了 `vue-router`/`vuex`等插件，还另外添加了`vue-class-component` 和 `vue-property-decorator` 插件，这两个就是在vue-cli中使用ts的关键。

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


## 路由使用


## vuex使用


## 页面使用

