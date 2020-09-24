# 数组API

::: tip
MDN 都有想对应文档，和它的实现方法 [JavaScript 标准内置对象Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
::::

### 扩展运算符（...）

使用 `...` 复制数组，属于浅拷贝

``` js
var arr = [1, 2, 3, 4, 5]
var arr2 = [1, 2, 3, 4, [5, 6]]
var arr3 = [...arr]
console.log(arr3) // [1, 2, 3, 4, 5]

// 无法深拷贝
var arr4 = [...arr2]
arr4[4][0] = 7
console.log(arr2) // [1, 2, 3, 4, [7, 6]]
```

合并数组
``` js
var arr1 = [1, 2]
var arr2 = [3, 4]
var arr3 = [...arr1, ...arr2]
console.log(arr3) // [1, 2, 3, 4]
```

push添加数组

``` js
var arr1 = [1, 2]
var arr2 = [3, 4]
arr1.push(...arr2);
console.log(arr1) // [1, 2, 3, 4]
```

扩展字符串

``` js
[...'hello'] // [ "h", "e", "l", "l", "o" ]
```

解构赋值

``` js
var [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]
```

代替apply方法，如求数组最大值

``` js
var arr = [1, 2, 3, 4, 5]
Math.max(...arr) // 5
```

### API

`arr.indexOf()` 返回查找值的下标，没有返回-1

``` js
var arr = [1, 2, 3, 4, 5]
arr.indexOf(3) // 2
arr.indexOf(6) // -1
```

`arr.join()` 用连接符把数组里面的元素连接成字符串，与字符串API split 相反

``` js
var arr = [1, 3, 4, 5]
arr.join('xxx') // "1xxx3xxx4xxx5"
```

`arr.slice(start, [end])` 截取数组，含头不含尾，负数表示倒数第几个，不修改原数组，返回新数组

``` js
var arr = [1, 2, 3, 4, 5]
arr.slice(2, ) // [3, 4, 5]
arr.slice(2, 4) // [3, 4]
arr.slice(-4, -2) // [2, 3]
```

`arr.concat('a', arr1, arr2)` 拼接数组, 数组会被打散为单个元素再拼接, 不修改原数组

``` js
var arr1 = [1, 2]
var arr2 = [3, 4]
arr1.concat(arr2) // [1, 2, 3, 4]
```

`arr.reverse()` 反转数组，修改原数组

``` js
var arr = [1, 2, 3, 4, 5]
arr.reverse() // [5, 4, 3, 2, 1]
```

`arr.sort()` 数组排序，直接修改原数组。默认按照数组元素第一位的ASCII码从小到大排列。

``` js
var arr = [1, 2, 3, 4, 5]

// 升序(只限数组中是数字或者数字字符串)
arr.sort(function(a,b){return a-b;}); // [1, 2, 3, 4, 5]

// 降序(只限数组中是数字或者数字字符串)
arr.sort(function(a,b){return b-a;}); // [5, 4, 3, 2, 1]
```

`arr.splice(start, n, [value...])` 删除、替换、插入， 直接修改原数组， 返回所有被删除元素组成的子数组

从第start开始，删除n个，再插入value... 个元素， 当n为0时，在start后插入value，n不为0时，如果value省略就是删除n个元素，n和value相等就是替换n个元素

``` js
var arr = [1, 2, 3, 4, 5, 6]
// 删除
arr.splice(1, 1) // [2]  arr : [1, 3, 4, 5, 6]
// 添加
arr.splice(1, 0, 7, 8) // [] arr: [1, 2, 7, 8, 3, 4, 5, 6]
// 替换
arr.splice(1, 1, 9) // [2] arr: [1, 9, 3, 4, 5, 6]
```

`arr.forEach((item, index) => {})` 循环数组

``` js
var arr = [1, 2, 3]
arr.forEach((item, index) => {
  console.log(index ':' item)
})
// 0 : 1
// 1 : 2
// 2 : 3
```

`arr.every()` 判断数组中的元素是否都符号条件，返回Boolean值

``` js
var bool = [2, 3, 4, 5, 6].every((item) => item > 1)
console.log(bool); // ture
```

`arr.some()` 判断数组中的元素是否有符号元素的，返回Boolean值

``` js
var bool = [2, 3, 4, 5, 6].some((item) => item > 5)  
console.log(bool); // ture
```

`arr.map()` 映射，根据映射规则返回新数组， 新数组和旧数组一一对应关系， filter则是返回条件为true的元素

``` js
var users = [
  {name: "XiaoChang", "email": "zhang@email.com"},
  {name: "XiaoZhen",   "email": "jiang@email.com"},
  {name: "XiaoCuo",  "email": "li@email.com"}
];
var emails = users.map((user) => user.email);
console.log(emails.join(", ")); // zhang@email.com, jiang@email.com, li@email.com
var mapArr = arr.map((item) => item) 
console.log(mapArr) // [0, 2, 4, 6]  0不会被过滤掉
```

`arr.filter()` 筛选数组，条件为true才能被筛选，不和原数组对应

``` js
var arr = [0, 2, 4, 6]
var filterArr = arr.filter((item) => item)
console.log(filterArr) // [2, 4, 6]  0会被过滤掉
```

`arr.reduce() ` 对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。

``` js
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

accumulator (acc) (累计器，每次计算前上一次计算结果的值，第一次为initialValue或者数组第一个值)

currentValue (cur) (当前值)

index (idx) (当前索引)

array (src) (源数组)

initialValue 累加的第一个初始值，不提供则为数组第一个值

拿这四个参数去执行提供的函数运算

``` js
var arr = [1, 2, 3, 4, 5];
// 累加
var reduceVal = arr.reduce((acc, cur) => acc + cur, 10)
console.log(reduceVal);  // 25
10 + 1 ==> 11
11 + 2 ==> 13
13 + 3 ==> 16
16 + 4 ==> 20
20 + 5 ==> 25

// 累乘
var multiplyVal = arr.reduce((acc, cur) => acc * cur, 10)
console.log(multiplyVal);  // 1200
```

`arr.push()` // 末尾添加

`arr.pop()` // 末尾删除

`arr.unshift()` // 开头添加

`arr.shift()` // 开头删除


`arr.copyWithin(target, start, [end])`  将start-end的元素浅复制到 tartget 位置，并覆盖掉tartget

``` js
var arr = [1, 2, 3, 4, 5]
// 将3号位复制到0号位
arr.copyWithin(0, 3, 4) // [4, 2, 3, 4, 5]
```

`arr.fill(value[, start[, end]])` 用value 填充从start到end的元素 省略全部填充

``` js
var arr = [1, 2, 3, 4, 5]
arr.fill(4, 0, 1) // [4, 2, 3, 4, 5]
arr.fill(4) // [4, 4, 4, 4, 4]
```

`arr.find(value, index, arr)` 返回第一个符合条件的元素，并返回该元素，没有返回undefined

``` js
var arr = [1, 4, -5, 10]
arr.find((n) => n < 0) // -5
```


`arr.findIndex(value, index, arr)` 返回第一个符合条件元素的下标，没有返回 -1

``` js
var arr = [1, 4, -5, 10]
arr.findIndex((n) => n < 0) // 2
```

`arr.entries()`，`arr.keys()`, `arr.values()` 用于对数组的键值对，键名， 键值进行遍历， 都返回一个遍历器对象

``` js
var arr = ["a", "b", "c"];
var iterator = arr.entries();
console.log(iterator.next()); // {value: [0, "a"], done: false}
```

`arr.includes(s)`  判断是否包含某个值，返回布尔值 代替 indexOf , 返回Boolean值

``` js
var arr = [1, 2, 3, 4, 5]
arr.includes(4) // true
```

`arr.flat(arr)` // 遍历深层次数组，将多维数组扁平化，变成一位数组 返回新数组，对原数据没有影响

``` js
var arr = [1, 2, [3, 4]]
var arr2 = [1, [2, [3]]]

arr.flat() // [1, 2, 3, 4]

// 默认只能拉平1层，拉平多层，可以Infinity作为关键字
arr2.flat(Infinity) // [1, 2, 3]
```

` arr.flatMap(fn)`  接收一个map函数，对数组执行完map后返回的数组在进行flat() 操作。 只能展开一层数组。返回新数组，对原数据没有影响

``` js
var arr = [2, 3, 4]
arr.flatMap((x) => [x, x * 2]) // [2, 4, 3, 6, 4, 8]
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
```

`Array.from()` 将两类对象转为真正的数组。类似数组的对象（array-like object nodeList arguments）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。

``` js
  var obj = {
    {a: 1},
    {b: 2}
  }
  // NodeList对象
  let ps = document.querySelectorAll('p');
  Array.from(ps);
  // 将字符串转化为数组
  Array.from('xxxxx') // ["x", "x", "x", "x", "x"]
  // 从 Set 生成数组
  var set = new Set(['foo', 'bar', 'baz', 'foo']);
  Array.from(set); // [ "foo", "bar", "baz" ]
  // 从 Map 生成数组
  var map = new Map([[1, 2], [2, 4], [4, 8]]);
  Array.from(map); // [[1, 2], [2, 4], [4, 8]]
```

`Array.of()` 将一组值，转换为数组, 返回数组

``` js
Array.of(3, 11, 8) // [3,11,8]
```

`Array.isArray(arr)` 判断传递的值是不是一个数组，返回布尔值
``` js
var arr = [2, 3, 4]
Array.isArray(arr) // true
```