# 封装axios

## 安装

```sh
npm install axios --save
```

## 基本使用

get请求：

```js
import axios from 'axios'

axios.get('http://xxx.com/api/news?id=123456').then(response => {
  console.log(response)
}).catch(err => {
  console.log(err)
})
```

post请求：
```js
import axios from 'axios'
axios({
  method: 'post',
  baseURL: 'http://xxx.com/api'
  url: '/login',
  headers: {
    'Content-Type': 'application/json'
  }
  data: {
    userName: 'xxxx',
    password: 'abc123456'
  }
}).then(response => {
  console.log(response)
}).catch(error => {
  console.log(error)
})
```
## 封装

每次在组件中直接调用axios添加各种配置会显的很麻烦，我们可以根据自己项目封装一个统一的API请求方法，统一配置好超时请求，请求头，请求提示，请求状态码判断，请求失败处理方法。封装好后，我直接调用，填写必要参数，只关注请求成功和失败处理就行。

封装框架：

把axios封装成一个可以链式调用的请求，类如果实现链式调用，首先每次执行方法后都要返回当前 this 才能继续调用下一个方法，就像返回 `new Promise()` 继续调用 `then` 一样。

```js


```



设置请求时间

请求头

是否要添加token

路由过滤

状态码判断

错误处理



返回当前对象才能继续使用其他方法

## 封装调用


```js
import Url from './Url.class'

// 新建一个CallBack类来保证每次回调的callbackSuccess都是更新的
class CallBack {
  callbackSuccess = null
  callbackFail = null

  success(callback) {
    this.callbackSuccess = callback
    return this
  }
  
  get(callback) {
    this.callbackFail = callback
    return this
  }
}

class Http {

  // 请求地址
  baseURL = process.env.NODE_ENV == "production" ? "生产环境URL" : "开发环境URL"
  // 超时时间
  timeout = 1000
  // 不需要加token的API
  excludeApis = ['LoginEmail', 'RegisterEmail']

  // 发送请求
  send(args) {
    const cb = new CallBack()

    // 超时时间
    axios.defaults.timeout = 3000;

    axios(this.formatArgs(args)).then(response => {
      this.dispense(response, cb)
    }).catch(error => {
      if (cb.callbackFail) cb.callbackFail(error)
    })

    return cb
  }

  // 配置API请求
  formatArgs(args) {
    // 基本配置
    const option = {
      url: Url[args.url],
      method: args.method.toLowerCase(),
      baseURL: this.api,
      headers: {
        'Content-Type': 'application/json'
      }
    }

    if (args.headers) Object.assign(option.headers, args.headers)

    let data = args.data ? args.data : {}
    switch (option.method) {
      case 'get':
        option.params = args.data
      break
      default:
        if (!this.excludeApis.includes(args.url)) data.access_token = window.token
        option.data = data
      break
    }

    return option
  }

  dispense (response, cb) {
    switch (response.code) {
      case 200:
        if (cb.successCallback) cb.successCallback(response.data)
        break
      case 401:
        console.log('')
        if (cb.failCallback) cb.failCallback(response)
        break
      case 403:
        console.log('')
        if (cb.failCallback) cb.failCallback(response)
        break
      default:
        if (cb.failCallback) cb.failCallback(response)
    }
  }
}

export default new Http()
```

使用：

```js

```