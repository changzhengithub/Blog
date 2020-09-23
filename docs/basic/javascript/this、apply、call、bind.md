# this、apply、call、bind


## this的指向

在 ES5 中，this的指向始终坚持一个原理：**this 永远指向最后调用它的那个*对象*，this 永远指向最后调用它的那个*对象*，this 永远指向最后调用它的那个*对象***。

例 1：

``` js
  var name = "windowsName";
  function a() {
    var name = "chang";
    console.log(this.name);          // windowsName
    console.log(this);               // Window
  }
  a();
  console.log(this)                  // Window
```
为什么是这个this指向了window，还是根据 **this永远指向最后调用它的那个对象**  这句话，来看最后调用函数 `a` 的地方 `a()` ， 前面没有调用它的对象，那么就是全局对象window，就相当于 `window.a()` ， 所以`this`就指向`window`。 

再看下这个例子：
例 2：

``` js
  var name = "windowsName";
  var a = {
    name: 'chang',
    fn: function() {
      console.log(this.name);          
    }
  }
  a.fn()  // chang
```
这里看最后调用函数 `fn()` 的是对象 `a` 所以this就指向了a，打印的就是a的name。

再看一个例子：
例 3：

``` js
  var name = "windowsName";
  var a = {
    name: 'chang',
    fn: function() {
      console.log(this.name);          
    }
  }
  a.fn()  // chang
  var f = a.fn;
  f()     // windowsName
```

根据这个例子就可以清晰的比较了，在对象 `a` 直接调用函数 `fn` 时，this 指向对象 `a` ，然后把 a 的方法 fn 赋值给 f ，再执行 `f()` 时，最后调用 `f()` 的对象是全局对象 `window.f()` 了，所以 this 也指向了 window 。

再看一个例子：
例 4：

``` js
  var name = "windowsName";
  function fn() {
    var name = 'chang';
    console.log(this); // window
    fn2();
    function fn2() {
      console.log(this.name);      
    }
  }
  fn() // windowsName
```
在 `fn` 里的 `this` 指向是 `window`，调用 `fn2` 的对象还是 `window` 全局对象，所以打印 `name` 还是 `windowsName`



## 改变this的指向

### 1、ES6的箭头函数

**箭头函数的 this 始终指向函数定义时的 this，而非执行时。**

箭头函数需要记着这句话：“箭头函数中没有 this 绑定，必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined”。

例 4：

``` js
  var name = "windowsName";
  var a = {
    name: 'chang',
    fn1: function() {
      console.log(this.name);          
    },
    fn2: function() {
      setTimeout( () => {
        this.fn1()
        setTimeout( () => {
          this.fn1()
        },500);
      },1000);        
    }
  }
  a.fn2()  
  // chang
  // chang
```
`setTimeout` 里的this如果不使用箭头函数会被改变的, 使用箭头函数后this和当前包裹它的函数fn2的this一样，就是两层嵌套的this还是指向它的最外层包裹函数this。

### 2、使用 变量保存 this

通过 `var _this = this` 来保存this指向，这是一种常用的方法。

### 3、使用 apply、call、bind

apply、call、bind 都可以改变this指向。

**apply和call的使用:**

``` js
  var a = {
    name: 'chang',
    fn: function() {
      console.log(this.name);          
    }
  }
  a.fn()   // chang

  var b = {
    name: 'zhen'
  }

  a.fn.apply(b, ) // zhen
  a.fn.call(b, ) // zhen
```
现在有两个对象 a和b，对象a有一个fn方法，打印自己的name属性，但b没有，b也想打印自己的name，这时就可以通过apply或者call方法把a的fn函数的this指向给b，让b来借用a的fn方法打印自己的name。

**bind的使用:**

``` js
  var name = "windowsName";
  var a = {
    name: 'chang',
    fn: function() {
      console.log(this.name);          
    }
  }
  a.fn()       // chang

  var f = a.fn;
  f()          // windowsName

  f.bind(a)(); // chang
  f.call(a, ) // chang
  f.apply(a, ) // chang
```

以例3为例 f() 在第一次调用时其调用对象是window，然后通过bind绑定把this重新指向了a对象。


## apply、call、bind 的区别

### 语法

**调用一个存在的函数func时，为其指定一个this对象为thisArg，让thisArg可以调用当前func函数。**

``` js
func.apply(thisArg, [argsArray])

func.call(thisArg, arg1, arg2, ...)

func.bind(thisArg[, arg1[, arg2[, ...]]])
```

### 区别：

apply和call方法意思相同，区别在于传递的参数方式不同，apply是传递一个数组，call是传递一个参数列表。

bind是创建的一个新函数，不像apply和call可以直接运行，需要手动调用才会执行。







