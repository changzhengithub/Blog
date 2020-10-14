# Class 类

ES5中的对象，通过构造函数生成一个对象

```js
function Person(name) {
  this.name = name
  this.say = function() {
    console.log(this.name)
  }
}
// 原型属性和方法
Person.prototype.helloName = 'zhen'
Person.prototype.sayHello= function() {
  console.log('hello' + this.helloName)
}

var person = new Person('chang');
person.name // chang
person.say() // chang
person.sayHello() // 'hellozhen'
```

ES5中对象的静态方法，直接定义在构造函数上，构造函数可以直接调用，实例化对象没办法获取

```js
Person.age = 19;
Person.say = function() {
  console.log('我是静态方法')
}

// 调用静态方法
Person.getInfo();
```

 ES6中的Class类可以看做是一个语法糖，他的绝大部分功能ES5都能实现。

 ```js
class Person {
  constructor(name) {
    this.name = name
  }
  say() {
    console.log(this.name)
  }
}

var person = new Person('chang');
person.name // chang
person.say() // chang

typeof Person // "function"
Person === Person.prototype.constructor // true 
 ```

 类的`constructor`就是构造方法，对应着ES5的构造函数。`this`是实例对象，`say`是类的方法。类的数据类型就是函数，类本身就指向构造函数。

 类的所有方法都想当于定义在类的原型上。constructor方法也是在类的原型上面。

 ```js
class Point {
  constructor() {}
  toString() {}
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {}
}
```

 在类的实例上面调用方法，其实就是调用原型上的方法。

 prototype对象的constructor属性，直接指向“类”的本身。

 ```js
 class B{}
 var b = new B()
 b.constructor // class B{}
 B.prototype.constructor // class B{}
 b.constructor === B.prototype.constructor // true 
 ```

 ## constructor方法

 constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。

 ## 取值函数（getter）和存值函数（setter）

 ## 静态属性和方法

