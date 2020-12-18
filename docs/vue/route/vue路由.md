# vue路由

## 创建路由

首先，通过 `new VueRouter` 创建一个路由实例，在 `routes` 中定义路由，每个路由应该是一个组件。然后把创建好的路由实例挂载到 Vue 实例上，这样一个基本的路由就创建好了，然后，通过 `<router-view>` 组件在HTML中创建路由入口，路由就是从该组件进入，显示定义的路由组件，然后通过 `<router-link>` 来导航，`<router-link>` 就相当于一个 `<a>` 标签，添加路由地址，来进行跳转。

```html
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

```js
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // (缩写) 相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
var vm = new Vue({
  el: '#app',
  router, // 根实例注册router，注入所有子组件
  data: {
    message: 300
  }
})
```
路由创建好后，可以通过 `this.$router` 来访问整个路由实例，也可以在当前组件中通过 `this.$route` 访问路由信息。

在当前组件中使用watch监听路由变化：
```js
watch: {
  $route(to, from) {
    // 对路由变化作出响应...
  }
}
```

## 动态路由

像详情页，新闻页等虽然ID不同，但是渲染的样式都是一样的，都是在同一个组件，我们就可以使用动态路由传参来实现这种功能。

路由：
```js
const Detail = {
  template: '<div>detail page</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: Detail }
  ]
})
```

传参：

`router-link` 是可以直接在后面添加参数，但是想动态传参后面可以使用编程式导航来传递。
```html
<!-- 在当前获取到ID 然后把ID传入进去 -->
<router-link to="/foo/123">Go to Foo</router-link>
<!-- 动态传参 -->
<router-link :to="'/foo/'+id">Go to Foo</router-link>
```
获取：
```js
// this.$router.push({ name: 'user', params: { id: '123' }})
// 在当前组件通过 $route.params 获取参数
created() {
  console.log(this.$route.params) // {id: 123}
}
```

## 嵌套路由

嵌套路由通过在自己组件中继续使用 `<router-view>` 组件添加路由入口来实现，一级套一级，在 `routes` 中配置 `children` 来配置子路由。

```js
// 在当前组件中继续添加<router-view>入口
const Bar = {
  template: `<div>
    <h2>bar</h2>
    <router-view></router-view>
  </div>`
}
// 添加children
const router = new VueRouter({
  routes: [
    { 
      path: '/bar', component: Bar,
      children: [
        {
          // UserProfile 会被渲染在 Bar 的 <router-view> 中
          path: 'profile',
          component: UserProfile
        },
        {
          // UserPosts 会被渲染在 Bar 的 <router-view> 中
          path: 'posts',
          component: UserPosts
        }
      ]
    }
  ]
})
```

## 命名路由

在路由配置中，给某个路由设置名称，然后进行跳转时可以直接使用这个名字进行跳转就行了。
```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```

## 编程式导航

除了使用 `<router-link>` 组件来进行路由跳转外，还可以使用router实例的方法，通过编写代码实现。和 `window.history`的方法类型。

`router.push()`方法：
```js
// 字符串
this.$router.push('bar')

// 对象
this.$router.push({ path: 'bar' })

// 命名的路由
this.$router.push({ name: 'user', params: { userId: '123' }})

// 带查询参数，变成 /register?plan=private
this.$router.push({ path: 'register', query: { plan: 'private' }})
```

`router.replace()`方法：

replace和push方法一样，只是不会添加history历史记录

`router.go(n)`方法：

go方法进行导航跳转，前进多少，后退多少。类似 `window.history.go(n)`。

```js
// 在浏览器记录中前进一步，等同于 history.forward()
this.$router.go(1)

// 后退一步记录，等同于 history.back()
this.$router.go(-1)

// 前进 3 步记录
this.$router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
this.$router.go(-100)
this.$router.go(100)
```

## 命名视图

在一个组件添加多个 `<router-view/>` 组件，显示多个视图。

```html
<router-view name="header"></router-view>
<router-view name="main"></router-view>
<router-view name="footer"></router-view>
```
```js
// 在components定义多个路由组件
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        header: Header,
        main: Main,
        footer: Footer
      }
    }
  ]
})
```

## 重定向&别名

重定向：

访问到 `/a` 路由时，url被替换成 `/b`，然后匹配到 `/b`的路由对应的组件。
```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }, // 
    { path: '/a', redirect: { name: 'foo' }} // 命名路由
  ]
})
```

别名：

`/a` 的别名是 `/b`，意味着，当用户访问 `/b` 时，url会保持为 `/b`，但是路由匹配则为 `/a`，就像用户访问 `/a` 一样。

"别名"的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。
```js
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

## 路由组件传参

之前动态路由传参是通过 `$route` 来获取参数对象的，这样耦合性太高，我们可以通过使用 `props` 将组件和路由解耦。

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
```
使用 `props` 解耦：
```js
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    // 在配置中添加props选项
    { path: '/user/:id', component: User, props: true },

    // 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项：
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

## history模式

路由默认使用 hash 模式，改变url时，页面不会刷新，也不需要后端配置，更简单，但是比较丑，带有一个 # 符号。可以使用 history 模式来去掉 # 符号，不过这种模式需要后端配置支持，如果项目文件不在根路径，要配置基本路径才行。

```js
const router = new VueRouter({
  mode: 'history',
  base: '/en/blog/', // 配置根路径
  routes: [
    { path: '*', component: NotFoundComponent } // 配置404页面
  ]
})
```

## 路由导航守卫

vue路由导航守卫主要用来通过跳转或取消的方式守卫导航，分为全局守卫，组件守卫，单个路由。

记住**参数或查询的改变并不会触发进入/离开的导航守卫**。你可以通过观察 `$route` 对象来应对这些变化，或使用 `beforeRouteUpdate` 的组件内守卫。

全局守卫挂在 router 实例上，分为全局前置守卫和全局后置钩子。

### 全局前置守卫

使用 `router.beforeEach` 注册一个全局前置守卫，全局前置守卫从开始创建router开始就会一直处于监听路由跳转的状态，只要有路由跳转就会在跳转前触发此守卫。

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

接收三个参数，详情请看vue-router官网：
* to: Route: 即将要进入的目标 路由对象
* from: Route: 当前导航正要离开的路由
* next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。可以在其中添加路由进行跳转。

**确保 next 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。**
```js
// 判断用户是否验证，没有的话跳转到login页面
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```

### 全局解析守卫

`router.beforeResolve` 和 `beforeEach` 类似，区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。

### 全局后置钩子

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 next 函数也不会改变导航本身，在路由守卫和组件守卫都调用完最后调用该后置钩子。
```js
router.afterEach((to, from) => {
  // ...
})
```

### 路由独享的守卫

路由独享的守卫，可以在路由配置上直接添加 `beforeEnter` 守卫，来监听单个的路由：
```js
// 与全局前置守卫的方法参数一样
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

### 组件内的守卫

在组件内可以直接定义以下导航守卫：

* `beforeRouteEnter`： 路由进来前
* `beforeRouteUpdate`： 路由更新
* `beforeRouteLeave`： 路由离开前

```js
const Foo = {
  template: `xxx`,

  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

`beforeRouteEnter` 守卫 不能 访问 `this`，因为守卫在导航确认前被调用，组件还没创建呢所以无法调用。

不过，你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

`beforeRouteLeave` 离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。
```js
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```

导航守卫解析流程：从当前路由点击离开跳转到新的路由

离开-->全局--->路由-->组件-->后置

## 路由元信息

在 `routes` 中通过 `meta` 字段给路由配置路由元信息，为这个路由添加一个元信息，通过这个路由上的信息我们可以拿来为这个路由添加判断条件。比如通过判断这个元字段来体式是否需要验证或者是否有权限访问该路由等。
```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { 
            requiresAuth: true,
            isPower: true
          }
        }
      ]
    }
  ]
})
```

在当前路由可以通过 `this.$route.meta`来获取，在导航守卫中可以通过 `$route.matched` 获取。

```js
// 检查该路由是否需要判断是否登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```

## 过渡效果

可以通过给路由入口 `<router-view>` 添加 `<transition>` 组件来设置全部路由的过渡效果。
```html
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition
```
```js
// 接着在根组件内
// watch $route 决定使用哪种过渡
watch: {
  '$route' (to, from) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
  }
}
```

## 滚动行为

当切换路由时，让页面自动滚动到指定的位置。只需要在 `router` 中添加一个 `scrollBehavior` 方法。

```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
```
例子：
```js
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}
```

## 路由懒加载

异步加载：
```js
const Foo = () => import('./Foo.vue')

const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})
```

把组件按组分块：

有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 命名 chunk，一个特殊的注释语法来提供 chunk name 。
```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```

## 警告

当访问到没有的路由时，我们给出一个警告提示页面。
```js
const NotFoundComponent = () => import(/* webpackChunkName: "not-found" */ './NotFoundComponent.vue')

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFoundComponent
    }
  ]
})
```







