# AJAX原理

传统的form表单提交，只要提交submit，网页就会刷新一下，提交一次请求。一次请求对应一个页面，没有办法在页面进来后，在当前页面再次请求数据。而ajax 异步网络请求，可以进行局部刷新，在页面进来后，可以再次进行请求数据而不刷新页面。

流程：

* 通过XMLHttpRequest对象new一个ajax实例
* 使用open方法初始化请求
* 使用send方法发送数据请求
* 调用onreadystatechange事件监听ajax状态
* 通过ajax状态xhr.readyState和http状态码xhr.status判断是否获取成功
* 通过xhr.responseText获取返回结果

**XMLHttpRequest()对象**

通过new XMLHttpRequest()创建一个ajax实例，但IE6一下不支持这个对象，IE6及以下以插件的形式ActiveXObject('Microsoft.XMLHTTP')来获取。

兼容性写法：

```js
xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
```

**xhr.open()方法**

xhr.open()初始化请求，并判断请求方式，接收三个参数。

xhr.open(method, url, bool)：

* method： 定义请求的方式 get post
* url：向后台请求的接口地址 
* bool：是否使用异步 默认是true

**xhr.send()方法**

xhr.send()方法向后端发送请求，GET方法直接调用，使用POST时，在里面添加请求的参数，与open方法拼接成一个完整的地址。

**xhr.setRequestHeader()**

设置 HTTP 请求头的值。必须在 open() 之后、send() 之前调用 setRequestHeader() 方法。

```js
xhr.setRequestHeader(header, value);
```

**xhr.abort()方法**

xhr.abort()终止请求

**xhr.onreadystatechange事件**

监听xhr请求状态readyState的改变，通过该方法监听xhr.readyState和xhr.status的状态来判断请求是否成功。

```js
xhr.onreadystatechange = function() {
  if(xhr.readyState==4 && xhr.status==200){
    console.log(xhr.responseText);
  }else{
    console.log(xhr.status+xhr.statusText);
  }
}
```

**xhr.readyState**

返回ajax请求当前所处的状态，一个xhr请求总处于下面几种状态中

* 0、（初始化）还没有调用open()方法
* 1、（载入）已调用open()方法，正在发送请求
* 2、（载入完成）send()方法完成，已收到全部响应内容
* 3、（解析）正在解析响应内容
* 4、（完成）响应内容解析完成，可以在客户端调用了

**xhr.status**

服务器(请求资源)的状态，http的状态码

* 1xx: 信息反馈
* 2xx: 请求成功
* 3xx: 重定向
* 4xx: 客户端错误
* 5xx: 服务端错误

**xhr.responseText**

接收后台返回的文本数据。后台接收请求后，返回的数据格式为字符串。


**get请求**

通过url地址进行传输，请求地址都方在xhr.open()方法中，参数放在url后面，以?来连接值 以key=value为例，多个值以&来连接起来。

特点：
* 1、由于url路径大小的限制 get方法后面的数据不能太多
* 2、get方法会被缓存
  * 如何解决缓存问题？传参的时候，加上随机数
  * 怎么生成随机数 常见的做法，用一个时间戳做随机数 new Date().getTime()
  * 传的如果是中文 最好转化成unicode encodeURI()
* 3、get不安全

```js
http://localhost/ajax/02.get.php?user=111&age=222
```

**post请求**

post方法通过服务器进行传输，url放在xhr.open()方法中，参数放在xhr.send()方法中来进行发送请求，以key1=value1&key2=value2格式发送。

特点：
* 1、安全性好一点
* 2、理论上讲在不考虑服务器带宽压力的情况下，post数据大小不限
* 3、post 不会被缓存

GET请求：
```js
var url = 'http://www.abc.com/api';
var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
xhr.open('get', url+'?page=1&num=10&'+new Date().getTime()); // 添加时间戳，防止缓存
xhr.send();
xhr.onreadystatechange = function() {
  if(xhr.readyState == 4 && xhr.status == 200){
    console.log(xhr.responseText); // 获取到数据，渲染
  }else{
    console.log(xhr.status+xhr.statusText);
  }
}
```

POST请求：

```js
var url = 'http://www.abc.com/api/login';
var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
xhr.open('post', url);
xhr.send('user='+user.name+'&age='+user.age);
xhr.onreadystatechange = function() {
  if(xhr.readyState == 4 && xhr.status == 200){
    console.log(xhr.responseText);
  }else{
    console.log(xhr.status+xhr.statusText);
  }
}
```

ajax封装：

```js
/*
params: {
  method: ''
  url: '',
  data: {

  },
  success: function(reponse){},
  fail: function(error){}
}
*/ 

function ajax(params) {
  var xhr = null;
  xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

  var data = '',
    url = params.url;
  if(params.data) {
    // 拼接参数
    for(var key in params.data) {
      data += key + '=' + params.data[key] + '&';
    }
    data = data.slice(data.lastIndexOf('&')); // 去掉多余的&
  }

  if(data && params.method.toLowerCase() === 'get') {
    url += '?' + data;
  }
  xhr.open(params.method.toLowerCase(), url, true);

  if(data && params.method.toLowerCase() === 'get') {
    xhr.send();
  } else {
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send(data);
  }

  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      params.success && params.success(JSON.parse(xhr.responseText));
    } else {
      var error = {
        code: xhr.status,
        message: xhr.statusText
      }
      params.fail && params.fail(error);
    }
  };
}

// 使用
ajax({
  url: '',
  method: 'get',
  data:{
    name: 'xxx',
    age: 18
  }
  success:function(data){
    console.log(data)
  }
  fail:function(error){
    console.log(error)
  }
});
```

promise封装：

```js
/*
params: {
  method: ''
  url: '',
  data: {

  }
}
*/
function ajax(params) {

  return new Promis(function(resolve, reject) {
    var xhr = null;
    xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    var data = '',
      url = params.url;
    if(params.data) {
      // 拼接参数
      for(var key in params.data) {
        data += key + '=' + params.data[key] + '&';
      }
      data = data.slice(data.lastIndexOf('&')); // 去掉多余的&
    }

    if(data && params.method.toLowerCase() === 'get') {
      url += '?' + data;
    }
    xhr.open(params.method.toLowerCase(), url, true);

    if(data && params.method.toLowerCase() === 'get') {
      xhr.send();
    } else {
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(data);
    }

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        resolve(JSON.parse(xhr.responseText))
      } else {
        var error = {
          code: xhr.status,
          message: xhr.statusText
        }
        reject(error)
      }
    }
  })
}

// 使用
ajax({
  url: '',
  method: 'get',
  data:{
    name: 'xxx',
    age: 18
  }
}).then(function(data) {
  console.log(data)
  return ajax({data: data})
}).then(function(data) {
  console.log(data)
}).catch(function(error) {
  console.log(error)
})
```


参考链接：

[MDN XMLHttpRequest](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest)