# CSS常见样式

## 常见字体样式

```css
/* 允许一个英文单词换行 */
overflow-wrap: break-word;

/* 文本阴影： x, y, blur, color */
text-shadow: 1px 1px 2px black;
/* 多重阴影 */
text-shadow: 1px 1px 2px black, 1px 1px 2px blue, 1px 1px 2px blue;

/* 首字母缩进 */
text-indent: 2em;

/* :not() 不包含被选中的元素 */

:not(p) {} /* 选择所有不是段落（p）的元素 */
p:not(.fancy) {} /* 类名不是 `.fancy` 的 <p> 元素 */
body :not(div):not(span) {} /* 既不是 <div> 也不是 <span> 的元素 */
body :not(.crazy, .fancy) {} /* 类名不是 `.crazy` 或 `.fancy` 的元素 */

```

## 文字溢出部分显示为省略号

单行文本

```css
white-space: nowrap;       /* 使文本不可换行 */
overflow: hidden;          /* 隐藏溢出部分 */ 
text-overflow: ellipsis;   /* 显示省略符号来代表被隐藏的文本 */
```

多行文本

```css
overflow: hidden;             /* 隐藏溢出部分 */
text-overflow: ellipsis;      /* 显示省略符号来代表被隐藏的文本 */
display: -webkit-box;         /* 将对象作为弹性伸缩盒子模型显示 */
-webkit-box-orient: vertical; /* 设置盒子内排列顺序为纵向 */
-webkit-line-clamp: 2;        /* 限制块元素显示的文本的行数 */

```

## 首字母特殊样式

**1、 ::first-letter 选中第一行第一个字母设置特殊样式**

```css
p::first-letter {
  color: red;
}
```
**2、单词首字母大写**

* js做法过滤：

```js
function capitalizeFirst(str) {
    return str.toLowerCase().replace(/(|^)[a-z]/g, function(L){ L.toUpperCase() });
};
```

* css方案：

>text-transform: capitalize | uppercase | lowercase | none

  - none：默认。
  - capitalize： 单词首字母大写。
  - uppercase：仅有大写字母。
  - lowercase：仅有小写字母。

```css
.capitalize-first{
  text-transform: capitalize;
}
```

**3、首字母下沉**

* 1、利用伪元素::first-letter然后float

```css
p::first-letter { 
  float: left; 
  margin: 0 .2em 0 0; 
  font-size: 5em; 
  color: #c69c6d; 
}
p {clear:both;} /*清除首字的浮动，避免影响p标签的高度与其相叠加*/
```

* 2、利用initial-letter属性:需要配合first-letter一起使用

```css
p::first-letter { 
  color: #c69c6d;
  initial-letter:3 1;/*第一个表示行高，第二个表示沉度*/
}
```

## 自定义滚动条

```css
/*滚动条整体样式*/
*::-webkit-scrollbar {
  width: 8px; /*定义纵向滚动条宽度*/
  height: 8px; /*定义横向滚动条高度*/
}

/*滚动条内部滑块*/
*::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: hsla(220, 4%, 58%, 0.3);
  transition: background-color 0.3s;
}

/*鼠标悬停滚动条内部滑块*/
*::-webkit-scrollbar-thumb:hover {
  background: #bbb;
}

/*滚动条内部轨道*/
*::-webkit-scrollbar-track {
  background: #ededed;
}
```

## 0.5像素边框

* 利用缩放`scale`处理

利用伪类和绝对定位，设置一个宽高为200%的元素，border为1px，缩放0.5，边框就为0.5了。

```css
div::after{
  position:absolute;
  top:0;
  left:0;
  z-index: 1;
  display: block;
  content:"";
  width:200%;
  height:200%;
  border:1px solid red;
  -webkit-transform : scale(0.5);
  transform : scale(0.5);
}
```

* 利用`background-image`背景渐变

渐变一半透明一半有颜色，但只能实现单边。

```css
div::after {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  content: "";
  width: 1px;
  height: 100%;
  background-image: linear-gradient(0deg, transparent 50%, #f50404 50%);
}
```

* 利用`box-shadow`阴影

```css
div {
  box-shadow: inset 0px -1px 1px -1px #c8c7cc;
}
```

## 三角形特殊形状

## 



