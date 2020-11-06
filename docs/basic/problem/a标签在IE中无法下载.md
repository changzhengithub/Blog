# a标签在IE中无法下载

判断是否是ie浏览器

```js
// 方法1 包括Edge
function isIEBrowser() {
  if (window.navigator.msSaveBlob) {
    return true
  } else {
    return false
  }
}

// 方法2
function isIEBrowser() {
  if (!!window.ActiveXObject || "ActiveXObject" in window) {
    return true
  } else {
    return false
  }
}
```

IE中a标签无法下载文件，只能下载.zip压缩包，如果想直接下载文件，可以借助 FileSaver.js 插件进行保存。

[FileSaver](https://github.com/eligrey/FileSaver.js)

使用：

```html
<body>
<div onclick="downloadPreset(url)">下载文件</div>

<!-- 引入js -->
<script src="js/FileSaver.js" type="text/javascript" charset="utf-8"></script>

<script>
  function downloadPreset(url) {
    var fileName = 'xxxx.txt';
    // 判断是否是IE、Edge浏览器，IE、Edge使用FileSaver.js下载，其他使用a标签下载
    if(window.navigator.msSaveBlob) {
      saveAs(url, fileName); // 使用FileSaver.js下载
    } else {
      // 谷歌浏览器 创建a标签 添加download属性下载
      var a = document.createElement('a');
      a.href = url;
      a.download = fileName; // Edge必须加上下载文件的文件名
      document.body.appendChild(a);
      a.click(); // 点击下载
      document.body.removeChild(a) // 下载完成移除a元素
    }
  }
</script>

</body>
```

通过blob数据类型类型进行下载，首先把要下载的文件转化成blob数据类型。

根据url地址，发送一个ajax请求，获取到blob类型数据，或者请求接口返回一个blob数据就可以直接使用IE浏览器的msSaveBlob方法进行下载。

```js
// 这个函数可以直接使用，替换一下url和fileName就可以
function downloadFile() {
  var url = 'xxxxx' // 文件地址，可以是链接，也可以是路径
  var fileName = 'xxxx.txt' // 任何类型的文件名
  var xhr = new XMLHttpRequest();
  xhr.open('get', url, true); 

  xhr.responseType = "blob"; // 主要就是这个 返回类型blob

  // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
  xhr.onload = function() {
    if(this.status === 200) {
      var blob = this.response;
      var href = window.URL.createObjectURL(blob); //创建下载的链接
      //判断是否是IE浏览器，是的话返回true
      if (window.navigator.msSaveBlob) {
        try {
          window.navigator.msSaveBlob(blob, fileName)
        } catch (e) {
          console.log(e);
        }
      } else {
        // 谷歌浏览器 创建a标签 添加download属性下载
        var a = document.createElement('a');
        a.href = href;
        a.download = fileName; //下载后文件名
        document.body.appendChild(a);
        a.click(); //点击下载
        document.body.removeChild(a); //下载完成移除元素
        window.URL.revokeObjectURL(href); //释放掉blob对象
      }
    }
  }
  // 发送ajax请求
  xhr.send()
}
```

参考链接：

[让浏览器下载文件的一些手段](https://cloud.tencent.com/developer/article/1488296)

[IE浏览器a标签无法下载问题解决（IE浏览器a标签download属性不兼容问题解决）](https://www.cnblogs.com/xuLessReigns/p/12177115.html)