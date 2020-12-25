# H5页面加载YouTube视频

>最近写的项目里有一个需求是在页面加载一段视频，因为视频过大，不宜保存到本地，所以就上传到youtube上，然后在页面中打开。要求就是不要立刻打开，通过用户手动点击来播放视频。

首先，你加载youtube视频，youtube在墙外，所以你要科学上网（手动滑稽）。

这里有youtube官方文档，你可以快速浏览。

链接： [YouTube 嵌入式播放器及播放器参数](https://developers.google.com/youtube/player_parameters?hl=zh-CN) 、 [IFrame Player API](https://developers.google.com/youtube/iframe_api_reference?hl=zh-CN)

## 通过iframe标签来加载

如果只是简单加载出来youtube视频，你只需要一个iframe标签，把地址赋给src就可以。

如下，VIDEO_ID是youtube视频的id，但注意要在ID前期加上embed才能正常加载。
```sh
youtube地址：https://youtu.be/VIDEO_ID
```
```sh
改为：https://www.youtube.com/embed/VIDEO_ID
```
*使用：如下在iframe中直接嵌入，后面可以跟参数，来控制加载时的窗口，但是自动播放无法正常使用，所以你想通过给autoplay赋值来手动控制他来播放是行不通的。*
```html
<iframe 
  width="640" 
  height="360"
  src="https://www.youtube.com/embed/VIDEO_ID?autoplay=1&origin=http://example.com"  
  frameborder="0"
></iframe>
```
更改：之前说无法自动播放是错误的，最近通过加上一个参数 `enablejsapi=1` 就可以让后面参数在调用时起作用，并且可以通过动态赋值来改变参数，这样，我们就可以动态操作视频了。并且可以添加 `playlist=1` 让视频循环播放。
```html
<iframe 
  width="100%" 
  height="100%" 
  :src="'https://www.youtube.com/embed/'+VIDEO_ID+'?enablejsapi=1&autoplay=1&loop=1&playlist='+VIDEO_ID" 
  frameborder="0" 
  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
  allowfullscreen
>
</iframe>
```
参考：[YouTube 嵌入式播放器及播放器参数](https://developers.google.com/youtube/player_parameters?hl=zh-CN)

## 通过IFrame Player API来嵌入

如果想通过js来控制播放器，我们可以使用youtube的 IFrame Player API 来嵌入

使用：如下官方给我使用方法，通过创建script来加载api，你也可以把两个相关的js下载下来手动引入。 下面js加载好后，就可以通过全局对象 player 来调用里面的各种方法来手动控制播放器了。你可以打印一下player对象，方法都在上面，如使用办法方法：`player.playVideo()`。

值得注意的是，这里的循环播放loop参数无法使用，设置了也不会循环播放，后来查看了官方文档下的一句话才发现解决办法 。

循环播放要与playlist 参数一起用才可以，在playlist里添加自己的VIDEO_ID就可以循环播放了，但是这种循环播放每次重新播放都是重新加载一遍，中间会有停顿。要没有停顿的可以通过events里回调函数onStateChange来监听播放完成状态，然后再调用播放函数`player.playVideo()`重新播放。

还有使用API播放会报一个错误，[Failed to execute 'postMessage' on 'DOMWindow': The target origin provided ('<URL>') does not match the recipient window's origin ('<URL>')](https://stackoverflow.com/questions/27573017/failed-to-execute-postmessage-on-domwindow-https-www-youtube-com-http). 说是你的目标原点与你的本地地址不匹配。试了好多种方法配置了origin的地址也是不起作用下面地址。你可以试试修改其源码阻止这个报错。我是暂时没搞定，不过这个错误暂时不影响使用。

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="player"></div>

    <script>
      // 创建script标签，通过src引入官方API，然后插入
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      //  上面API引入后就会自动执行下面onYouTubeIframeAPIReady函数
      //   并赋值给全局对象player，在全局就可以通过player来调用API方法了
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '360',
          width: '640',
          videoId: 'VIDEO_ID',
          //  playerVars  里可以自定义播放器参数
          playerVars: {
              autoplay: 1,
              loop: 1,
              playlist: ['VIDEO_ID']  //  playlist添加VIDEO_ID进行循环播放
          }
          // events 监听常见的回调事件
          events: {
            'onReady': onPlayerReady
          }
        });
      }
      
      function onPlayerReady(event) {
        event.target.playVideo();
      }
    </script>
  </body>
</html>
```
参考：[IFrame Player API](https://developers.google.com/youtube/iframe_api_reference)

## 在vue中来加载youtube视频

在vue中加载视频，可以使用IFrame Player API在index.html页面进行加载。但可能会以为加载关系，而出现获取不到player的现象。

其次我们可以使用别人封装好的插件 vue-youtube，直接安装引入使用就可以了。当然还有其他的插件了，看你选择了 Vue YouTube Embed 、video.js
```sh
npm install vue-youtube
```
```js
import Vue from 'vue'

import VueYoutube from 'vue-youtube' 

Vue.use(VueYoutube)
<youtube width="100%" height="100%" :video-id="videoId" @ended="videoEnded" @error="videoError" ref="youtube"></youtube>
computed: {  
    player() {    
        return this.$refs.youtube.player  
    }
},
playTouTubeVideo () {   
    this.player.playVideo()
},
videoEnded () {
    // 监听视频播放完时重新播放  
    this.player.playVideo()
},
videoError () {   
    // 视频出错执行方法
},
destroyed () {   
    this.player.clearVideo()
}
```
链接： [vue-youtube](https://www.npmjs.com/package/vue-youtube)