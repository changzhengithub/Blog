# 短轮询、长轮询、长连接和WebSocket

HTTP协议只有当客户端向服务端发送请求时，服务端才会向客户端传送数据。

短轮询和长轮询都是HTTP请求的应用，都属于非持久连接。

WebSocket是一种双向通信协议。在建立连接后，WebSocket服务器端和客户端都能主动向对方发送或接收数据，就像Socket一样；WebSocket需要像TCP一样，先建立连接，连接成功后才能相互通信。


## 短轮询(Polling)
 
短轮询的原理非常简单，使用Ajax让浏览器每隔一定的时间就发送一次请求，询问服务器是否有新信息。这样获取消息非常浪费性能，并且延迟的时间也不好控制。

```js
function Polling() {
  fetch(url).then(data => {
    // somthing
  }).catch(err => {
    console.log(err);
  });
}
setInterval(polling, 5000);
```
## 长轮询(Long Polling)

长轮询和轮询差不多，都是采用轮询的方式，不过采取的是阻塞模型，也就是说，客户端发起连接后，如果没消息，服务器不会马上告诉你没消息，而是将这个请求挂起（pending），直到有消息才返回。返回完成或者客户端主动断开后，客户端再次建立连接，周而复始，一直回调回调回调。我们可以看出Long Poll(长轮询) 已经具备了一定的实时性。但长轮询一成功或失败就调用也是非常耗性能。

```js
function LongPolling() {
  fetch(url).then(data => {
    LongPolling(); // 成功或失败再重新获取
  }).catch(err => {
    LongPolling();
    console.log(err);
  });
}
LongPolling();
```

上面这两种应用都是非常消耗资源。轮询需要服务器有很快的处理速度和资源。长轮询(Long Polling) 需要有很高的并发，也就是说同时连接数的能力。同时也受到客户端的连接数限制，比如老早的IE6，客户端同事连接数为2。尽管如此，在过去 短轮询(Polling) 和 长轮询(Long Polling) 还是有广泛的应用，特别是实时聊天，短消息推送等方面， 长轮询(Long Polling) 是除了 Flash 之外唯一的选择。

## 长连接(SSE)

长连接SSE(Server-Sent Events)虽然和长轮询和短轮询都属于http协议通信，但轮询只是客户端发送请求，而SSE却是双通向的，且只需要建立一次连接就可以连续通讯。可以实现服务器端数据有更新，就可以马上发送到客户端。SSE规范比较简单，主要分为两个部分：浏览器中的EventSource对象，以及服务器端与浏览器端之间的通讯协议。

**基础用法**

在浏览器中可以通过EventSource构造函数来创建该对象

```js
var source = new EventSource('/sse');
```
SSE一些方法，并且可以自定义监听的一些方法。

```js
// 默认的事件
source.addEventListener('message', function (e) {
  console.log(e.data);
}, false);

// 用户自定义的事件名
source.addEventListener('my_msg', function (e) {
  process(e.data);
}, false);

// 监听连接打开
source.addEventListener('open', function (e) {
  console.log('open sse');
}, false);

// 监听错误
source.addEventListener('error', function (e) {
  console.log('error');
});
```
EventSource通过事件监听的方式来工作。注意上面的代码监听了y_msg事件，SSE支持自定义事件，默认事件通过监听message来获取数据。实现代码如下:

**简单示例**

客户端：
```js
// 显示聊天信息
let chat = new EventSource("/chat-room");
chat.onmessage = function (event) {
  let msg = event.data;
  $(".list-group").append("<li class='list-group-item'>" + msg + "</li>");
  // chat.close(); 关闭server-sent event
};

// 自定义事件
chat.addEventListener("myChatEvent", function (event) {
  let msg = event.data;
  $(".list-group").append("<li class='list-group-item'>" + msg + "</li>");
});
```
服务端：nodejs
```js
var express = require('express');
var router = express.Router();
router.get('/chat-room', function (req, res, next) {
  // 当res.white的数据data 以\n\n结束时 就默认该次消息发送完成，触发onmessage方法，以\r\n不会触发onmessage方法
  res.header({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive"
  });

  // res.white("event: myChatEvent\r\n"); 自定义事件
  res.write("retry: 10000\r\n"); // 指定通信的最大间隔时间
  res.write("data: start~~\n\n");
  res.end(); // 不加end不会认为本次数据传输结束 会导致不会有下一次请求
});
```

## WebSocket

相对于 HTTP 连接的非持久连接来说，WebSocket 和SSE类似则是持久连接。

一旦 WebSocket 连接建立后，后续数据都以帧序列的形式传输。而且浏览器和服务器就可以随时主动发送消息给对方，是全双工通信。在海量并发及客户端与服务器交互负载流量大的情况下，极大的节省了网络带宽资源的消耗，有明显的性能优势，且客户端发送和接受消息是在同一个持久连接上发起，实时性优势明显。

从兼容性角度考虑，短轮询>长轮询>长连接SSE>WebSocket；

从性能方  面考虑，WebSocket>长连接SSE>长轮询>短轮询。

### WebSocket API

WebSocket 客户端的 API 和流程非常简单：创建 WebSocket 对象，然后指定 open、message等事件的回调即可。其中 message 是客户端与服务器端通过WebSocket通信的关键事件，想要在收到服务器通知后做点什么，写在message事件的回调函数里就好了。

**WebSocket 构造函数**

WebSocket 对象作为一个构造函数，用于新建 WebSocket 实例。

JavaScript 代码:

```js
var ws = new WebSocket('ws://localhost:8080/api/test');
```
执行上面语句之后，连接地址把http改为ws，客户端就会与服务器进行连接。

**webSocket.readyState**

`readyState` 属性返回实例对象的当前状态，共有四种。

* CONNECTING ：值为0，表示正在连接。
* OPEN ：值为1，表示连接成功，可以通信了。
* CLOSING ：值为2，表示连接正在关闭。
* CLOSED ：值为3，表示连接已经关闭，或者打开连接失败。

```js
switch (ws.readyState) {
  case WebSocket.CONNECTING:
    // do something
    break;
  case WebSocket.OPEN:
    // do something
    break;
  case WebSocket.CLOSING:
    // do something
    break;
  case WebSocket.CLOSED:
    // do something
    break;
  default:
    // this never happens
    break;
}
```
**webSocket.onopen**

实例对象的 `onopen`属性，用于指定连接成功后的回调函数。

```js
ws.onopen = function () {
  ws.send('Hello Server!');
}
```

如果要指定多个回调函数，可以使用addEventListener方法。

```js
ws.addEventListener('open', function (event) {
  ws.send('Hello Server!');
});
```
**webSocket.onclose**

实例对象的 `onclose` 属性，用于指定连接关闭后的回调函数

```js
ws.onclose = function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
};
 
ws.addEventListener("close", function(event) {
  var code = event.code;
  var reason = event.reason;
  var wasClean = event.wasClean;
  // handle close event
});
```
**webSocket.onmessage**

实例对象的 onmessage 属性，用于指定收到服务器数据后的回调函数。

```js
ws.onmessage = function(event) {
  var data = event.data;
  // 处理数据
};
 
ws.addEventListener("message", function(event) {
  var data = event.data;
  // 处理数据
});
```
注意，服务器数据可能是文本，也可能是二进制数据（ Blob 对象或 ArrayBuffer 对象）。

```js
ws.onmessage = function(event){
  if(typeof event.data === String) {
    console.log("Received data string");
  }
 
  if(event.data instanceof ArrayBuffer){
    var buffer = event.data;
    console.log("Received arraybuffer");
  }
}
```
除了动态判断收到的数据类型，也可以使用binaryType属性，显式指定收到的二进制数据类型。

```js
// 收到的是 blob 数据
ws.binaryType = "blob";
ws.onmessage = function(e) {
  console.log(e.data.size);
};
 
// 收到的是 ArrayBuffer 数据
ws.binaryType = "arraybuffer";
ws.onmessage = function(e) {
  console.log(e.data.byteLength);
};
```
**webSocket.send()**

实例对象的send()方法用于向服务器发送数据。

发送文本的例子。

```js
ws.send('your message');
```

发送 Blob 对象的例子。

```js
var file = document
  .querySelector('input[type="file"]')
  .files[0];
ws.send(file);
```

发送 ArrayBuffer 对象的例子。

```js
// Sending canvas ImageData as ArrayBuffer
var img = canvas_context.getImageData(0, 0, 400, 320);
var binary = new Uint8Array(img.data.length);
for (var i = 0; i < img.data.length; i++) {
  binary[i] = img.data[i];
}
ws.send(binary.buffer);
```
**webSocket.bufferedAmount**

实例对象的bufferedAmount属性，表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。

```js
var data = new ArrayBuffer(10000000);
socket.send(data);
 
if (socket.bufferedAmount === 0) {
  // 发送完毕
} else {
  // 发送还没结束
}
```
**webSocket.onerror**

实例对象的onerror属性，用于指定报错时的回调函数。

```js
socket.onerror = function(event) {
  // handle error event
};
 
socket.addEventListener("error", function(event) {
  // handle error event
});
```

### 简单的示例

首先通过node 来生成一个websocket服务，node 服务开启后，在客户端使用websocket API来请求开启的地址，本地localhost地址就可以，然后把http换成ws就行。

**服务器端**

本地先创建一个server.js文件，执行 `npm i` 和 `npm init` 创建package.json和package-lock.json文件，然后安装一下需要的插件。然后执行代码`node server.js` 开启本地websocket服务。

```js
npm i axios
npm i ws
npm i dateformat
```

server.js:
```js
var axios = require('axios');
var dateFormat = require("dateformat");
var WebSocket = require("ws"),
  WebSocketServer = WebSocket.Server,
  wss = new WebSocketServer({
    port: 8080,
    path: "/guest"
  });

// 收到来自客户端的连接请求后，开始给客户端推消息
wss.on("connection", function (ws) {
  ws.on("message", function (message) {
    console.log("received: %s", message);
  });
  sendGuestInfo(ws);
});

function sendGuestInfo(ws) {
  axios.get('http://mock-api.com/6KL9bvzk.mock/api/name')
  .then(function (response) {
    console.log(response.data);
    var data = response.data;
    var guest = data.name + data.surname;
    var guestInfo = {
      guest: guest,
      time: dateFormat(new Date(), "HH:MM:ss")
    };
    if (ws.readyState === WebSocket.OPEN) {
      // 发，送
      ws.send(JSON.stringify(guestInfo));
      // 用随机来“装”得更像不定时推送一些
      setTimeout(function () {
        sendGuestInfo(ws);
      }, (Math.random() * 5 + 3) * 1000);
    }
  })
  .catch(function (error) {
    console.log(error);
  })
}
```

服务端通过请求http://mock-api.com/6KL9bvzk.mock/api/name地址MOCK生成了一条假数据。函数sendGuestInfo()会不定时执行，并把包含姓名和时间的信息通过send()方法发送给客户端，想当于服务器发送消息。另外，注意send()方法需要以字符串形式来发送json数据。

另一种写法：

```js
// server.js
const express = require('express');
const app = express();
const server = require('http').Server(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8080});
wss.on('connection', function connection(ws) {
  console.log('server: receive connection');
  ws.on('message', function incoming(message) {
      console.log('server: recevied: %s', message);
  });
  ws.send('world');
});

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
app.listen(3000);
```

这就像是服务器自己在做一些事，然后在需要的时候会通知客户端一些信息。这些是服务端来发送数据，客户端只需要使用WebSocket来监听接收到的消息就行了。

**客户端**

客户端直接使用WebSocket API 几个步骤来监听服务端给的地址就可以了，把拿到的消息，对应的状态渲染出来就OK了。

给的API接口要把http换成ws。

```js
var socket = new WebSocket("ws://localhost:8080/guest");

// 连接成功
socket.onopen = function(openEvent) {
  console.log("WebSocket conntected.");
};

// 收到服务器发送的消息
socket.onmessage = function(messageEvent) {
  var data = messageEvent.data,
  dataObject = JSON.parse(data);
  console.log("Guest at " + dataObject.time + ": " + dataObject.guest);
};

// 发生错误
socket.onerror = function(errorEvent) {
  console.log("WebSocket error: ", errorEvent);
};

// 关闭连接
socket.onclose = function(closeEvent) {
  console.log("WebSocket closed.");
};

// 客户端向服务器发送消息

socket.send('your message');
```

WebSocket的URL格式是 ws://与wss://。因此，需要注意下URL地址的写法，这也包括注意WebSocket服务器端的路径（如这里的/guest）等信息。因为是本地的示例所以这里是localhost。

然后在本地打开html文件，在控制台就可以看到会不定时的打印服务端发送的数据。

参考链接：

[WebSocket 协议介绍及 WebSocket API 应用](https://www.css88.com/archives/9293)

[webSocket(二) 短轮询、长轮询、Websocket、sse](https://juejin.im/post/6844903955240058893)