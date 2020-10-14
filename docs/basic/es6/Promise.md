# Promise

## Promise的含义

Promise异步编程的一种解决方案。

Promise，简单说就是一个容器，保存着某个未来才会结束的事件（通常是一个异步操作）的结果。

Promise对象有以下两个特点。

1、对象的状态不受外界影响，promise对象代表一个异步操作，有三种状态： pending（进行中）、fulfilled（已成功）、和rejected（已失败），只要异步操作的结果可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。

2、一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending到fulfilled和从pending到rejected。只要这两种状况发生，状态就凝固了，不会再变了。

Promise 用来解决回调地狱问题。

Promise一旦执行就无法中途取消，Promise内部抛出错误不会反应到外部，当处于pending状态时无法得知进展到哪一个阶段。

## Promise基本用法

Promise对象是一个构造函数，通过new用来生成Promise实例。

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作 */) {
    resolve(value)
  } else {
    reject(error)
  }
})
```
Promise构造函数接受一个函数作为参数，该函数有两个参数分别是resolve合reject，他们是两个函数。

resolve函数是把状态从pending到resolved(fulfilled)，在异步操作成功时调用，并将异步操作的结果当做参数传递出去。reject函数是把状态从pending到rejected，在异步操作失败时调用，并将异步操作报出的错误当做参数传递出去。

一般来说，调用resolve或reject以后，Promise 的使命就完成了，后面操作放到then里面，所以最后在他们面前加上return

```js
const promise = new Promise(function(resolve, reject) {
  // ... some code
  if (/* 异步操作 */) {
    return resolve(value)
  } else {
    return reject(error)
  }
})
```

## then方法

then会接收resolve和reject传递出的结果。then 接收两个函数参数，第一个是resolve的回调返回成功数据，第二个是reject的回调返回失败数据。

then方法可以通过return返回一个数据，下一个then方法会接收到这个数据，所以就可以采用链式调用，把上一个Promise的结果当做参数传入第二个Promise执行异步操作，把这个Promise返回出去，下一个then方法就会获取到执行后的结果。

then方法的调用前面必须是一个Promise实例才行。所以then链式调用也是必须通过return返回一个Promise实例下才行。

应用场景： 一个接口的根据另一个接口的数据来获取

```js
function ajax(params) {
  // 这里ajax函数第一次调用then就要返回Promise实例
  return new Promise(function(resolve, reject) {
    var xhr = null;
    xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open("post","url");
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send("user="+user.value+"&age="+age.value);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
          resolve(xhr.responseText)
        } else {
          reject(xhr.err)
        }
    }
  })
}

ajax(params).then(function (data) {
  console.log(data)
  return ajax(data) // 通过return返回一个Promise对象，下一个then就可以接收到执行异步操作后返回的结果。
}, function (err) {
  console.log(err)
}).then(function (data) {
  console.log(data)
  return ajax(data)
}).then(function (data) {
  console.log(data)
})
```

## Promise.catch方法

catch方法捕捉错误的回调函数

```js
ajax(params).then(function(posts) {
  // ...
}).catch(function(error) {
  console.log('发生错误！', error);
});
```

采用链式调用时，catch会有'冒泡'性质，不论哪个地方出现错误都会被最后的catch捕捉到，因为是按次序执行，遇到错误就会抛出，不会往后执行，所以一个链式后面跟一个catch用来捕捉就行了。

一般来说，不要在then()方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。

catch()方法返回的还是一个 Promise 对象，因此后面还可以接着调用then()方法。但一般写在最后最好。

## Promise.finally()方法

finally()方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。

```js
promise
.then(result => {···})
.catch(error => {···})
.finally(() => {···});
```

不管promise最后的状态，执行完then或catch指定的回调函数以后，都会执行finally方法指定的回调函数。

## Promise.all()方法

Promise.all()方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

同时执行多个Promise操作时，把这几个Promise放到一个数组中，传入Promise.all()方法中进行同步执行。返回值也是数组。

```js
var p1 = ajax(param1)
var p2 = ajax(param2)
var p3 = ajax(param3)

Promise.all([p1, p2, p3]).then(function(){

}).catch(function(){})
```

当多个实例都为fulfilled或者有一个为rejected就会调用Promise.all()方法后的回调函数。

当有一个是rejected状态时就会触发all方法的catch方法，就会报错。如果它有自己的catch方法就不会触发all方法的catch。

## Promise.race()方法

和all方法一样接收多个Promise实例，比较哪个Promise实例先执行。哪个先执行哪个的状态就是返回的回调。

```js
var p1 = ajax(param1)
var p2 = ajax(param2)
var p3 = ajax(param3)

Promise.race([p1, p2, p3]).then(function(){

}).catch(function(){})
```

## Promise.any()方法

和all方法一样接收多个Promise实例，只要有一个是fulfilled状态，回调就是fulfilled状态，全部为rejected回调才为rejected状态，返回的是一个包含所有实例rejected错误的数组。

## Promise.resolve()方法

将现有对象转为 Promise 对象

## Promise.reject(reason)方法

也会返回一个新的 Promise 实例，该实例的状态为rejected。

## Promise.try()方法

在不想区分或不知道一个方法是同步还是异步时，使用try方法执行标准流程，让其具有统一API，如果是同步就执行同步，异步就按异步处理。

## 应用

加载图片

```js
const preloadImage = function (path) {
  return new Promise(function (resolve, reject) {
    const image = new Image();
    image.onload  = resolve;
    image.onerror = reject;
    image.src = path;
  });
};

preloadImage('./images/logo.png').then(function() {
  console.log('图片加载完成');
  // some code...
}).catch(function() {
  console.log('图片加载失败');
})
```