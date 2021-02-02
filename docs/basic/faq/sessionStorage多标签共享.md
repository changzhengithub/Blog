# sessionStorage多标签共享

sessionStorage本地存储，允许在当前会话页共享数据，会话结束会清除数据。但是如果是通过新标签打开页面时会新建sessionStorage，不能共享数据，如果要想共享的话，可以通过localStorage和监听storage事件来解决。

localStorage的storage的事件是可以在全网站下来监听的，只要一个页面修改了localStorage，其他页面也会监听到，所以我们利用这一特性来在新打开的页面重新设置sessionStorage。

解决思路：

当我们在新打开页面开始就让其设置一个localStorage，那么原来的页面接收到storage事件，我们在原来页面把sessionStorage当做值设置给localStorage，然后再删除，这样在新页面也会收到原页面设置localStorage的事件，通过storage事件的event来获取原页面设置的值，然后在新页面设置sessionStorage。新页面打开时和原页面之间来回监听两次storage事件，这个是异步的，所以要考虑下后续的判断。

代码：
```js
// set global sessionStorage.js

var storage = window.localStorage;
var session = window.sessionStorage;

// 新页面随便设置一个localStorage来启动storage事件
storage.setItem('trigger_before_storage', Date.now());

// 所有页面都监听storage事件
window.addEventListener('storage', function(event) {
  // 判断storage事件来自哪里
  if (event.key == 'trigger_before_storage') {
    // 当新页面打开时设置localStorage触发storage事件，在原页面监听到
    // 设置localStorage，把原页面sessionStorage传进去，然后再把此localStorage删除
    localStorage.setItem('trigger_after_storage', session.getItem('userInfo'));
    localStorage.removeItem('trigger_after_storage');
  } else if (event.key == 'trigger_after_storage') {
    // 监听原页面设置localStorage的storage事件，通过event获取其设置的值
    // 设置sessionStorage
    sessionStorage.setItem('userInfo', event.oldValue);
  }
});
```