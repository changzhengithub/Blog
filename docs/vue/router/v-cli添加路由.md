## v-cli添加路由

## 安装：

在使用 vue-cli3.0 搭建Vue项目时，会有提示安装 vuex router等选项，可以直接选择。
```js
npm install vue-router
```

## 使用

创建router实例：

在main.js同级文件创建router.js文件，来构建router路由，然后抛出这个router实例。
```js
// router.js

import Vue from 'vue'
import Router from 'vue-router'

const IndexComponent = () => import(/* webpackChunkName: 'indexs' */ '@/views/index/index.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index',
      name: 'index',
      component: IndexComponent
    }
  ]
})
```

注册到Vue实例上：
```js
// main.js

import Vue from 'vue'
import App from './App.vue'
import router from './router'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

## 拆分模块

如果路由过大，可以进行路由拆分，就是单纯的把路由 routes 数组拆分开到不同文件中去。

在src目录下创建 router 文件夹：
```sh
└── src
  ├── main.js
  └── router           # router文件
      ├── index.js     # 我们组装模块并导出 router 的地方
      ├── a.js         # 模块a
      └── b.js         # 模块b
```

a模块：
```js
// a.js

const A1Component = () => import(/* webpackChunkName: 'a' */ '@/views/a1/a1.vue')
const A2Component = () => import(/* webpackChunkName: 'a' */ '@/views/a2/a2.vue')

export default [
  {
    path: '/a1',
    name: 'a1',
    component: A1Component
  },
  {
    path: '/a2',
    name: 'a2',
    component: A2Component
  }
]
```

b模块：
```js
// b.js

const B1Component = () => import(/* webpackChunkName: 'b' */ '@/views/b1/b1.vue')
const B2Component = () => import(/* webpackChunkName: 'b' */ '@/views/b2/b2.vue')

export default [
  {
    path: '/b1',
    name: 'b1',
    component: B1Component
  },
  {
    path: '/b2',
    name: 'b2',
    component: B2Component
  }
]
```
合并到index.js文件：
```js
// index.js

import Vue from 'vue'
import Router from 'vue-router'
import a from './a.js'
import b from './b.js'

const IndexComponent = () => import(/* webpackChunkName: 'indexs' */ '@/views/index/index.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/index',
      name: 'index',
      component: IndexComponent
    },
    ...a,
    ...b
  ]
})
```

注册到Vue实例上：
```js
// main.js

import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```
