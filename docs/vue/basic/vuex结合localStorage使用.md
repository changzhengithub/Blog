# vuex结合localStorage使用

vuex状态管理器，具有全局状态自动更新功能，在不同组件中共用一个状态，当一个组件将数据改变时，其他组件也可以响应改变化，但是当页面刷新时就会清空vuex数据。

localStorage本地存储永久保存在本地，除非手动清除。

## vuex和localStorage的区别

1、最重要的区别：vuex存储在内存，localstorage则以文件的方式存储在本地。

2、应用场景：vuex用在组件之间的传值，localStorage主要用于不同页面之间的传值。

3、永久性： vuex刷新页面就会消失，localStorage永久存储。

localStorage看似可以取代vuex来进行页面或者组件之间传值，实则不能，localStorage不能像vuex那样可以在多个组件之间实时更新，必须得手动获取才能得到localStorage的值。

## 作用

数据持久化： 使用vuex结合localStorage，让不需要被页面刷新就清空的数据进行永久保存，比如登录信息，购物车和不经常变动的数据。

## 使用

方式一：

如果使用比较简单的使用，比如只使用state 和 mutations ，并且可以让数据全局保存，我们可以通过 `get` 和 `set` 来直接调用和设置，就不需要使用 map 辅助函数来完成vuex的操作了。

封装一个Storage.class.js文件：
```js
export default class Storage {
  static set token (token) {
    this.save('token', token)
  }
  static get token () {
    return this.getOut('token')
  }

  static save (name, content) {
    window.app.$store.commit(name, content)
    let result = content
    if (typeof content === 'object') result = JSON.stringify(content)
    localStorage.setItem(name, result)
  }
  static getOut (name) {
    let result = null
    if (localStorage.getItem(name)) result = localStorage.getItem(name)
    if (typeof JSON.parse(result) === 'object') result = JSON.parse(result)
    if (window.app.$store.state[name] !== null) {
      result = window.app.$store.state[name]
    } else if (result !== null) {
      this.save(name, result)
    }
    return result
  }
}
```
使用：
```js
import Storage from '@/modules/Storage.class'

// 获取
this.token = Storage.token

// 设置
Storage.token = data.token
```

方式二：

只存储要永久化的数据，在vuex就行设置，和方式一差不多，但是不调用vuex，只封装保存和读取localStorage函数，然后再需要做永久化储存的数据下调用。
```js
export default class Storage {

  static set token(token) {
    this.setLocal('token', token)
  }
  static get token() {
    return this.getLocal('token')
  }

  static setLocal(name, content) {
    let result = content
    if (typeof content === 'object') result = JSON.stringify(content)
    localStorage.setItem(name, result)
  }
  static getLocal(name) {
    let result = null
    if (localStorage.getItem(name)) result = localStorage.getItem(name)
    if (typeof JSON.parse(result) === 'object') result = JSON.parse(result)
    return result
  }

  static setSession(name, content) {
    let result = content
    if (typeof content === 'object') result = JSON.stringify(content)
    localStorage.setItem(name, result)
  }
  static getSession(name) {
    let result = null
    if (localStorage.getItem(name)) result = localStorage.getItem(name)
    if (typeof JSON.parse(result) === 'object') result = JSON.parse(result)
    return result
  }
}
```
使用：
```js
// mutations.js

import * as mutationTypes from './mutation-types'
import Storage from '@/modules/Storage.class'

const mutations = {
  [mutationTypes.GET_TOKEN] (state, token) {
    state.token = token
    // 设置
    Storage.token = token
  }
}
export default mutations
```
```js
// state.js
import Storage from '@/modules/Storage.class'

const state = {
  // 获取
  token: Storage.token || ''
}

export default state
```



