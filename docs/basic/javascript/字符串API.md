# 字符串API

## 基本
``` js
String(xx) // 把某个值转化为字符串

charAt(index) // 返回指定位置字符串

indexOf()  // 查找某个字符串，返回下标，没有返回 -1

str.concat(str1, str2...)  // 连接字符串

str.slice(start, end) // 返回截取某个区间的字符串

str.substr(start, length) // 返回截取指定length字符串

str.split() // 以str中的某个字符分割为数组
  'xhxhxhxhx'.split('h')  // ['x', 'x', 'x', 'x', 'x']

str.trim() // 去掉字符串中的空格
```

## 查找

``` js
str.match(val)/str.match(regexp) // 检索返回匹配到值的数组
  'h1h2h3'.match(/\d+/g) //  ["1", "2", "3"]

str.replace(regexp/substr, replacement) // 以replacement替换匹配到的正则或字符串
  'xxxhxxh'.replace('h', 'g') // "xxxgxxh" 字符串只匹配第一个
  'xxxhxxHxx'.replace(/h/ig, 'g') // "xxxgxxgxx" 全局匹配
  // $& $1 $2

str.search(val/regexp) // 返回第一个匹配到的字符串的起始位置，没有返回-1 和indexOf类似
```

## ES6

``` js
str.includes(x) // 是否包含某个字符串，返回布尔值  比indexOf方便多了
str.startsWith(x) // 返回布尔值，表示参数字符串是否在原字符串的头部。
str.endsWith(x) // 返回布尔值，表示参数字符串是否在原字符串的尾部。

str.repeat(n) // 返回一个新字符串,将原字符串重复n次
```