# 数组API

::: tip
MDN 都有想对应文档，和它的实现方法 [JavaScript 标准内置对象Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
::::

``` js
// ...扩展运算符
var arr = [1, 2, 3, 4, 5]
// 复制数组 浅拷贝
var arr2 = [...arr]
// 合并数组
var arr3 = [...arr1, ...arr2]
// push添加数组
arr3.push(...arr2);
// 字符串
[...'hello'] // [ "h", "e", "l", "l", "o" ]
// 解构赋值
var [first, ...rest] = [1, 2, 3, 4, 5];
first // 1
rest  // [2, 3, 4, 5]
// 代替apply方法，如求数组最大值

// API

1. arr.indexOf() // 返回查找值的下标，没有返回-1

2. arr.join() // 用连接符把数组里面的元素连接成字符串
  [1, 3, 4, 5].join('xxx') // "1xxx3xxx4xxx5"

3. arr.slice(start, [end]) // 截取数组，含头不含尾，负数表示倒数第几个，不修改原数组，返回新数组

4. arr.concat('a', arr1, arr2) // 拼接数组, 数组会被打散为单个元素再拼接, 不修改原数组

5. arr.reverse() // 反转数组，修改原数组

6. arr.sort() // 数组排序，直接修改原数组，返回被删除元素组成的子数组
  // 默认按照数组元素第一位的ASCII码从小到大排列。
  // 可以设置下列的比较器函数来控制升序，降序或者打乱。
  arr.sort(function(a,b){return a-b;}); // 升序(只限数组中是数字或者数字字符串)
  arr.sort(function(a,b){return b-a;}); // 降序(只限数组中是数字或者数字字符串)

7. arr.splice(start, n, [value...]) // 删除、替换、插入， 直接修改原数组， 返回所有被删除元素组成的子数组
  // 从第start开始，删除n个，再插入value... 个元素
  // n 为 0 插入value， n不为0 value省略为删除n个，n和value相等为替换
  var arr = [1, 2, 3, 4, 5, 6]
  // 删除
  arr.splice(1, 1) // [2]  arr : [1, 3, 4, 5, 6]
  // 添加
  arr.splice(1, 0, 7, 8) // [] arr: [1, 2, 7, 8, 3, 4, 5, 6]
  // 替换
  arr.splice(1, 1, 9) // [2] arr: [1, 9, 3, 4, 5, 6]

8. arr.forEach((item, index) => {}) // 循环数组

9. arr.every() // 判断数组中的元素是否都符号条件，返回Boolean值
  var bool = [2, 3, 4, 5, 6].every((item) => item > 1)
  console.log(bool); // ture

10. arr.some() // 判断数组中的元素是否有符号元素的，返回Boolean值
  var bool = [2, 3, 4, 5, 6].some((item) => item > 5)  
  console.log(bool); // ture

11. arr.map() // 映射，根据映射规则返回新数组， 新数组和旧数组一一对应关系
  var users = [
    {name: "XiaoChang", "email": "zhang@email.com"},
    {name: "XiaoZhen",   "email": "jiang@email.com"},
    {name: "XiaoCuo",  "email": "li@email.com"}
  ];
  var emails = users.map((user) => user.email);
  console.log(emails.join(", ")); // zhang@email.com, jiang@email.com, li@email.com
  var mapArr = arr.map((item) => item) 
  console.log(mapArr) // [0, 2, 4, 6]  0不会被过滤掉

12. arr.filter() // 筛选数组，条件为true才能被筛选，不和原数组对应
  var arr = [0, 2, 4, 6]
  var filterArr = arr.filter((item) => item)
  console.log(filterArr) // [2, 4, 6]  0会被过滤掉

13. arr.reduce() 
  // arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
  // accumulator (acc) (累计器，每次计算前上一次计算结果的值，第一次为initialValue或者数组第一个值)
  // currentValue (cur) (当前值)
  // index (idx) (当前索引)
  // array (src) (源数组)
  // initialValue 累加的第一个初始值，不提供则为数组第一个值

  var arr = [1, 2, 3, 4, 5];
  var reduceVal = arr.reduce((acc, cur) => acc + cur, 10)
  console.log(reduceVal);  // 25
  10 + 1 ==> 11
  11 + 2 ==> 13
  13 + 3 ==> 16
  16 + 4 ==> 20
  20 + 5 ==> 25

14. arr.push() // 末尾添加

15. arr.pop() // 末尾删除

16. arr.unshift() // 开头添加

17. arr.shift() // 开头删除

18. arr.copyWithin(target, start, [end]) // 将start-end的元素浅复制到 tartget 位置，并覆盖掉tartget
  // 将3号位复制到0号位
  [1, 2, 3, 4, 5].copyWithin(0, 3, 4) // [4, 2, 3, 4, 5]

19. arr.fill(value[, start[, end]]) // 用value 填充从start到end的元素 省略全部填充
  [1, 2, 3].fill(4, 0, 1) // [4, 2, 3]

20. arr.find(value, index, arr) // 返回第一个符合条件的元素，并返回该元素，没有返回undefined
  [1, 4, -5, 10].find((n) => n < 0) // -5

21. arr.findIndex(value, index, arr) // 返回第一个符合条件元素的下标，没有返回 -1

22. arr.entries()，arr.keys(), arr.values() // 用于对数组的键值对，键名， 键值进行遍历， 都返回一个遍历器对象
  var arr = ["a", "b", "c"];
  var iterator = arr.entries();
  console.log(iterator.next()); // {value: [0, "a"], done: false}

23. arr.includes()  // 判断是否包含某个值，返回布尔值 代替 indexOf

24. arr.flat(n) // 遍历深层次数组，将多维数组扁平化，变成一位数组 返回新数组，对原数据没有影响
  [1, 2, [3, 4]].flat() // [1, 2, 3, 4]
  // 默认只能拉平1层，拉平多层，可以Infinity作为关键字
  [1, [2, [3]]].flat(Infinity) // [1, 2, 3]

25. arr.flatMap(fn) 
  // 接收一个map函数，对数组执行完map后返回的数组在进行flat() 操作。
  // 只能展开一层数组
  // 返回新数组，对原数据没有影响

  [2, 3, 4].flatMap((x) => [x, x * 2]) // [2, 4, 3, 6, 4, 8]
  // 相当于 [[2, 4], [3, 6], [4, 8]].flat()

26. Array.from() // 将两类对象转为真正的数组
  // 类似数组的对象（array-like object nodeList arguments）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）。
  // NodeList对象
  let ps = document.querySelectorAll('p');
  Array.from(ps);
  // 将字符串转化为数组
  Array.from('xxxxx') // ["x", "x", "x", "x", "x"]
    
27. Array.of() // 将一组值，转换为数组, 返回数组
  Array.of(3, 11, 8) // [3,11,8]

28. Array.isArray(xx) // 判断传递的值是不是一个数组，返回布尔值

```