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

链式调用：

把axios封装成一个可以链式调用的请求，类似JQuery，如果实现类的链式调用，首先每次执行方法后都要返回当前 this 才能继续调用下一个方法，就像返回 `new Promise()` 继续调用 `then` 一样。
```js
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
  send(option) {
    const cb = new CallBack()
    setTimeout(() => {
      if (cb.callbackSuccess) cb.callbackSuccess(option)
    }, 1000)
    return cb
  }
}
var http = new Http();

http.send(123).success(function(option) {
  console.log(option)
});
```
如上面代码，通过 new 一个 Http实例来链式调用，Http 的 send 方法返回一个 CallBack 的实例 cb 来继续调用 success 方法，向 success 传递一个回调函数，cb 接收到后保存到 callbackSuccess 上，因为是 axios 方法请求是异步的，所以在axios里再调用 `cb.callbackSuccess` 时，这时候已经是被赋值的回调函数了，如果send里使用同步的话就无法调用了。

这里为什么单独使用一个 `CallBack` 类来保存回调呢，因为如果要放在 `Http` 中的话不能保证每次调用的 `callbackSuccess` 是空的，因为上一次调用被赋值过了。如果不想这么麻烦，也可以直接在Http里面使用静态方法，通过 Http 类来调用，而不是实例。

请求时间和拦截设置：

在axios请求前，一般都可以对其进行默认配置，比如请求时间，请求拦截和响应拦截，都可以为我们在请求的时候添加一些额外功能。

```js
// 超时时间
axios.defaults.timeout = 3000;

// 添加拦截器直接在axios添加全局的就可以了
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 比如发送前添加一个loading动画
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
```

发送请求：

发送请求前，我们可以设置过滤我们传递的参数，设置请求地址、请求头，判断methods请求方式，是否需要token等。在请求成功或者失败时可以为其设置专有的方法进行对应的处理。还可以引入vuex，把某些数据保存在vuex中。

```js
// 请求地址
baseURL = process.env.NODE_ENV == "production" ? "生产环境URL" : "开发环境URL"
// 不需要加token的API
excludeApis = ['LoginEmail', 'RegisterEmail']

axios(this.formatArgs(args)).then(response => {
  this.dispense(response, cb)
}).catch(error => {
  if (cb.callbackFail) cb.callbackFail(error)
})

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
  let errMsg = ''
  switch (response.code) {
    case 200:
      if (cb.callbackSuccess) cb.callbackSuccess(response.data)
      break
    case 401:
      errMsg = '未授权，请登录'
      break
    case 403:
      errMsg = '拒绝访问'
      break
    case 500:
      errMsg = '服务器内部错误'
      break
    default:
      if (cb.callbackFail) cb.callbackFail(response)
  }
}
```
## 全部代码

```js
// Http.class.js

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
  // 不需要加token的API
  excludeApis = ['LoginEmail', 'RegisterEmail']
  // 发送请求
  send(args) {
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
    let errMsg = ''
    switch (response.code) {
      case 200:
        if (cb.callbackSuccess) cb.callbackSuccess(response.data)
        break
      case 401:
        errMsg = '未授权，请登录'
        break
      case 403:
        errMsg = '拒绝访问'
        break
      case 500:
        errMsg = '服务器内部错误'
        break
      default:
        if (cb.callbackFail) cb.callbackFail(response)
    }
  }
}

export default new Http()
```

typescript写法：
```js

```
```js
// Url.class.js

export default class Url {
	static LoginEmail = 'login/email'
	static RegisterEmail = 'register/email'
	static SendEmialCode = 'send-code/email'
}
```

使用：

```js
// 组件中
import Http from '@/modules/Http.class'

Http.send({
  url: 'LoginEmail',
  method: 'post',
  data: {
    email: this.email,
    password: this.password
  }
}).success(data => {
  console.log(data)
}).fail(err => {
  console.log(err)
})
```