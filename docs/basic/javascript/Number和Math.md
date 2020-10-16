# Number和Math

## Number

``` js
Number(xx) // 把某个值转化为数字类型

num.toFixed(x) // 把数字转换为字符串，返回指定x位小数点数字

parseInt() // 转换为整数 

parseInt(1e1) // 10

parseFloat() // 转换为浮点数
```
## Math

``` js
常量
Math.PI // 返回圆周率

方法
Math.abs()  // 返回绝对值

Math.max()/Math.min() // 返回最大/最小值

Math.random() // 返回0~1随机数

Math.round() // 返回四舍五入整数

Math.floor() // 返回向下取整

Math.ceil() // 返回向上取整
```


***求数组最大值***
``` js
Math.max.apply([], arr)

Math.max(...arr)
```

***求某个区间随机数***

``` js
(max - min) * Math.random() + min

Math.ceil(80 * Math.random() + 20) // 返回 20 ~ 100 的随机整数

Math.floor(100 * Math.random()) 100  // 以内随机整数
```