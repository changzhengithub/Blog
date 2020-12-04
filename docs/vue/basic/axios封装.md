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
## 封装原理

每次在组件中直接调用axios添加各种配置会显的很麻烦，我们可以根据自己项目封装一个统一的API请求方法，统一配置好超时请求，请求头，请求提示，请求状态码判断，请求失败处理方法。封装好后，我直接调用，填写必要参数，只关注请求成功和失败处理就行。

设置请求时间

请求头

是否要添加token

路由过滤

状态码判断

错误处理



返回当前对象才能继续使用其他方法

## 封装调用