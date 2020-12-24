# video视频播放

页面中难免会使用video来播放一些视频，如果只是PC端还好，各种属性和事件基本都会支持的，但是如果要是适配移动端就恶心了，IOS还好些效果和PC端差不多，Android各种浏览器的兼容性就很难适配，特别是安卓浏览器会自动把video浮在最上层播放，这很让人头大。

## video标签属性

* `src`：视频地址
* `muted`：静音
* `autoplay`：自动播放
* `controls`：属性规定视频下载时显示的图像，或者在用户点击播放按钮前显示的图像
* `poster`：视频封面。
* `preload`：在页面加载后载入视频
* `webkit-playsinline="true"/playsinline`：视频内嵌播放，不脱离文档流 。只适合IOS，安卓无效。
* `x5-video-player-type="h5"/x5-playsinline`：启用同层H5播放器，保证wechat安卓在H5页面内播放，但也基本无效。
* `x5-video-orientation="portraint"`：声明播放器的方向，可选值landscape 横屏, portraint竖屏。默认值portraint。
* `x5­-video­-player­-fullscreen`：全屏设置。true全屏播放，false不全屏播放。
* `style="object-fit:fill"`：object-fit视频填充效果

```js
<video
  id="video" 
  src="video.mp4"
  poster="images.jpg"
  autoplay
  controls
  preload="auto" 
  playsinline
  webkit-playsinline="true"
  x5-video-player-type="h5"
  x5-video-orientation="portraint"
  x5-video-player-fullscreen="true"
  style="object-fit:fill" // 填充全屏
  >
</video>
```

## video可监听事件

* `abort`：播放被终止时触发
* `canplay`：媒体数据可供播放触发。
* `canplaythrough`：媒体数据可供播放完毕触发。
* `ended`：播放结束
* `error`：发生错误
* `loadstart`：在媒体开始加载时触发
* `play`：播放视频
* `pause`：播放暂停
* `timeupdate`：已经播放，元素的currentTime属性表示的时间已经改变。

参考链接：[媒体相关事件](https://developer.mozilla.org/zh-CN/docs/Web/Guide/Events/Media_events)

```js
var video = document.getElementsById('video');
video.addEventListener('canplay', function() {
  if (video.currentTime > 0.1) {
    console.log('xxx')
  }
})
```

## video对象属性和方法

**错误**
* `video.error`： 获取错误信息
* `video.error.code`： 1.用户终止 2.网络错误 3.解码错误 4.URL无效

**网络状态**
* `video.currentSrc`： 返回当前资源的URL
* `video.src`： 返回或设置当前资源的URL
* `video.networkState`：当前网络状态
  * 0.此元素未初始化 
  * 1.正常但没有使用网络 
  * 2.正在下载数据 
  * 3.没有找到资源
* `video.load()`： 重新加载src指定的资源
* `video.buffered`： 返回已缓冲区域，TimeRanges
* `video.preload`： none:不预载 metadata:预载资源信息 auto:自动

**准备状态**
* `video.readyState`：视频就绪状态
  * 1:HAVE_NOTHING
  * 2:HAVE_METADATA
  * 3.HAVE_CURRENT_DATA 
  * 4.HAVE_FUTURE_DATA 
  * 5.HAVE_ENOUGH_DATA

**回放状态**
* `video.currentTime`： 当前播放的位置，赋值可改变位置
* `video.duration`： 当前资源长度 流返回无限
* `video.paused`： 是否暂停
* `video.defaultPlaybackRate`：默认的回放速度，可以设置
* `video.playbackRate`：当前播放速度，设置后马上改变
* `video.played`： 返回已经播放的区域，TimeRanges，关于此对象见下文
* `video.ended`： 是否结束
* `video.autoPlay`： 是否自动播放
* `video.loop`： 是否循环播放
* `video.play()`： 播放
* `video.pause()`： 暂停

**视频控制**
* `video.controls`：是否有默认控制条
* `video.volume`： 音量
* `video.muted`： 静音

参考链接： [Video 对象](https://www.w3school.com.cn/jsref/dom_obj_video.asp)

## 存在的坑

1、自动播放

如果需要微信/网易云音乐/微博/QQ/浏览器等各平台完美自动播放，不行。可以让视觉设计引导用户点击屏幕，进行播放视频。

iOS在微信无法自动播放，需要通过 `WeixinJSBridgeReady` 事件进行自动播放。
```js
document.addEventListener('WeixinJSBridgeReady', function() {
    var video = document.getElementById('video');
    video.play();
  },
  false
);
```
Android一般不能自动播放，也有能支持的，如果要播放，可以通过监听`touchstart`事件引导用户手动触发。
```js
document.addEventListener('touchstart', function(){ 
  var video = document.getElementById('video');
  video.play();
}, false);
```

2、事件无法监听

当我们给video添加poster视频封面，在视频加载好开始播放时，封面图片突然消失，屏幕闪了一下这就很尴尬了，为了更好的体验，可以给视频加一个遮罩，放上视频第一帧图片，然后可以通过判断video的各种状态来判断隐藏遮罩。比如监听`video.readyState` 状态或者`canplay`等其他事件。

问题：

当我们监听这些属性或者事件时，在ios下readyState和canplay/canplaythrough事件都不会执行回调。ios是点击播放后才会去加载视频流。android下会执行canplay事件回调，但视频流也是边下边播。所以无法准确获得视频可加载时间点。

总结：H5现在视频标准不完善，除了timeupdate、ended事件外，其他事件慎用。
```js
video.addEventListener('timeupdate', () => {
  if (video.currentTime > 0.1) {
    console.log('视频已经播放')
  }
}, false)
```

3、安卓浮在最上层

安卓系统的浏览器都会有一个问题，就是只要视频播放，视频就会浮在最上层，无法被遮盖住，并且播放完不会自动关闭。当我们想在上面添加遮罩时就会是一个很蛋疼的问题。

首先当我们不需要遮罩层，就正常播放时，为了不让它遮住我们的页面，可以在它播放完时手动给咔嚓掉。

```js
video.addEventListener('ended', () => {
  video.style.display='none';
}, false)
```

当我们确实需要遮罩层，或者视频需要在元素下面播放时，就不得不放弃video了。

解决办法：

1、使用JSMpeg插件流媒体转化，基本原理还是canvas。
2、我们可以使用canvas画一个视频来模拟video。


## 使用FFmpeg

使用FFmpeg 把视频转化为canvas画布渲染，是通过FFmpeg把视频转化成 ts 格式，然后通过jsMpeg.js把 ts 格式视频渲染到canvas上。

1、安装FFmpeg

到官网 [FFmpeg](https://ffmpeg.org/download.html)下载FFmpeg，或者通过npm安装。

2、添加环境变量

打开到 bin 文件夹 `C:\pakages\ffmpeg-2020-12-20-git-ab6a56773f-full_build\bin` 复制地址，然后右击此电脑>属性>高级系统设置>环境变量>Path>编辑>新建，然后把地址复制上去就可以了。

3、转化为ts格式视频

新建文件夹，把视频复制进去，然后在此文件夹打开终端命令行，输入下面命令进行转化。具体参数可到官网去看。
```sh
ffmpeg -i movie.mp4 -f mpegts -codec:v mpeg1video -codec:a mp2 -b 0 movie.ts
```

4、把ts渲染到canvas上

到官网[jsmpeg](https://github.com/phoboslab/jsmpeg) 下载jsmpeg.js然后引入。

```html
<script src="js/jsmpeg.js" type="text/javascript" charset="utf-8"></script>
<canvas id="second-first-canvas"></canvas>
```
```js
var player = null
var url = 'src/videos/product-second-01-mobile-2.0.1.ts'

transVideo('#second-first-canvas', url)

// 转化ts格式视频为canvas播放
function transVideo(id, url) {
  player = new JSMpeg.Player(url, {
    canvas: $(id)[0],
    autoplay: true,
    progressive: false,
    loop: true,
    onVideoDecode: function() {
      $(id).next().addClass('play-hide');
    }
  })
},
```

然后通过 player 可以对视频进行操作，这样就可以在安卓手机上进行行内内联视频播放了。

## canvas获取视频

```js
// 获取画布
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// 创建video标签
var video = document.createElement("video");
video.src = "xxx.mp4"; 
video.autoPlay = false;
video.loop = true;
videoContainer = {
  video : video,
  ready : false,   
};

video.oncanplaythrough = readyToPlayVideo;

function readyToPlayVideo(event){
  videoContainer.scale = Math.min(canvas.width / this.videoWidth,  canvas.height / this.videoHeight); 
  videoContainer.ready = true;
  requestAnimationFrame(updateCanvas);
}
// 轮询获取视频流，不停渲染到画布上
function updateCanvas(){
  ctx.clearRect(0,0,canvas.width,canvas.height); 
  if(videoContainer !== undefined && videoContainer.ready){ 
    var scale = videoContainer.scale;
    var vidH = videoContainer.video.videoHeight;
    var vidW = videoContainer.video.videoWidth;
    var top = canvas.height / 2 - (vidH /2 ) * scale;
    var left = canvas.width / 2 - (vidW /2 ) * scale;
    ctx.drawImage(videoContainer.video, left, top, vidW * scale, vidH * scale);
    if(videoContainer.video.paused){
      drawPayIcon();
    }
  }
  requestAnimationFrame(updateCanvas);
}

// 添加点击播放的按钮
function drawPayIcon(){
  ctx.fillStyle = "black";
  ctx.globalAlpha = 0.5;
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "#DDD"; 
  ctx.globalAlpha = 0.75;
  ctx.beginPath();
  var size = (canvas.height / 2) * 0.5;
  ctx.moveTo(canvas.width/2 + size/2, canvas.height / 2);
  ctx.lineTo(canvas.width/2 - size/2, canvas.height / 2 + size);
  ctx.lineTo(canvas.width/2 - size/2, canvas.height / 2 - size);
  ctx.closePath();
  ctx.fill();
  ctx.globalAlpha = 1; // restore alpha
}

// 暂停事件
function playPauseClick(){
  if(videoContainer !== undefined && videoContainer.ready){
    if(videoContainer.video.paused){                                 
      videoContainer.video.play();
    }else{
      videoContainer.video.pause();
    }
  }
}
canvas.addEventListener("click",playPauseClick);
```

如果PC端首屏渲染也可以使用canvas来进行操作。

参考链接： 

[H5 Video踩坑记录](https://lq782655835.github.io/blogs/project/project-h5-video-summary.html)

[实现微信H5视频行内autoplay](https://segmentfault.com/a/1190000020674521)

[jsmpeg](https://github.com/phoboslab/jsmpeg)