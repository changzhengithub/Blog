# video视频播放

## video标签播放

video标签的属性
```js
<video
  id="video" 
  src="video.mp4" 
  controls = "true"
  poster="images.jpg" /*视频封面*/
  preload="auto" 
  webkit-playsinline="true" /*这个属性是ios 10中设置可以 让视频在小窗内播放，也就是不是全屏播放*/  
  playsinline="true"  /*IOS微信浏览器支持小窗内播放*/ 
  x-webkit-airplay="allow" 
  x5-video-player-type="h5"  /*启用H5播放器,是wechat安卓版特性*/
  x5-video-player-fullscreen="true" /*全屏设置， 设置为 true 是防止横屏*/
  x5-video-orientation="portraint" //播放器支付的方向， landscape横屏，portraint竖屏，默认值为竖屏
  style="object-fit:fill" // 填充全屏
  >
</video>
```

video事件：

'loadstart','canplay','canplaythrough','ended','timeupdate'play(),pause();
```js

```

## youtube视频播放

## 视频优化
