# Class 类

 ES6中的Class类可以看做是一个语法糖，他的绝大部分功能ES5都能实现。

 class类的constructor方法相当于ES5构造函数，其他属性和方法相当于定义在ES5构造函数原型上的属性和方法。class就相当于把构造函数和他的原型结合在一起了。

 通过class关键字来声明，通过new实例化对象。

 ```js
class Star {
  // class body
}

new Star();
 ```

## 类的constructor方法

constructor方法是类的构造函数（默认方法），用于传递参数，会默认返回实例对象（this），不需要通过return就可以返回。

一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加。

`constructor`里的`this`指向创建的实例，通过`new`会自动调用`constructor`函数。

 ```js
class Person {
  // 类的共有属性放到constructor里面
  constructor(name) {
    this.name = name
  }
  say() {
    console.log(this.name)
  }
}

var person = new Person('chang');
person.name // chang
person.say // chang
 ```

类的所有方法都想当于定义在类的原型上。constructor方法也是在类的原型上面。

在实例上面调用方法，其实就是调用原型上的方法。

实例对象的constructor属性也指向类。类的prototype原型对象的constructor属性，也指向类的本身。

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

var point = new Point()
point.constructor // class Point{}
Point.prototype.constructor // class Point{}
point.constructor === Point.prototype.constructor // true 
```

## 实例属性新写法

一般实例的属性都是定义在constructor()方法里面的this上面，但也可以定义在类的最顶层，直接写就行，不用加this

```js
class Student {
  constructor() {
    this.age = 18;
    this.name = 'chang'
  }
  say() {
    console.log(this.name);
  }
}
// 相当于
class Student {
  age = 18;
  name = 'chang'
  say() {
    console.log(this.name);
  }
}

```

## 取值函数（getter）和存值函数（setter）

使用get函数和set函数来对**某个属性**进行取值和存值，并拦截该属性的存取行为。

 ```js
class Phone {
  num = 0
  // 通过return来取值
  get price() {
    console.log('价格属性获取成功');
    return this.num
  }
  // 通过传递参数来存值
  set price(newValue) {
    this.num = newValue
    console.log('价格属性设置成功');
  }
}

var p = new Phone()
p.price
// 价格属性获取成功
// 0
p.price = 180
// 价格属性设置成功
// 180
console.log(p.price) 
// 180

 ```

 ## 静态属性和方法

 ES5中对象的静态方法，直接定义在构造函数上，构造函数可以直接调用，实例化对象没办法获取

```js
function Person() {
  // code body
}
Person.age = 19;
Person.say = function() {
  console.log('我是静态方法')
}
var p = new Person();
// 调用静态方法
Person.getInfo(); // 我是静态方法
p.age // undefined
```

ES6的静态属性和方法

使用关键字static来表示静态属性和方法，如果静态方法包含this关键字，这个this指的是类，而不是实例。

父类的静态方法，可以被子类继承。

```js
class Person {
  static name = 'chang'
  static say() {
    console.log(this.name)
  }
}

var p = new Person();
Person.name // chang
Person.say() // chang
p.name // undefined
```

## 私有属性和方法

ES6不提供，可以通过区别命名来实现，但这种外部还是能调用。

```js
class Widget {
  // 公有方法
  foo (baz) {
    this._bar(baz);
  }
  // 私有方法
  _bar(baz) {
    return this.snaf = baz;
  }
}
```

目前，有一个提案，为class加了私有属性。方法是在属性名之前，使用#表示。

可以和static一起使用，表示只能类的内部调用，实例调用会报错。

```js
class Person {
  #age = 18
  static #say() {
    console.log(this.#age)
  }
}
```

## 继承

ES5的继承

```js
// 父类
function Person(name) {
  this.name = name
  this.say = function() {
    console.log(this.name)
  }
}
Person.prototype.helloName = 'zhen'
Person.prototype.sayHello= function() {
  console.log('hello' + this.helloName)
}

// 原型加对象冒充混合继承
function Web(name) {
  Person.call(this, name)
}
Web.prototype = new Person()

var web = new Web('chang');
web.name // chang
web.say() // chang
web.sayHello() // 'hellozhen'
```

ES6使用extends继承父类

```js
class Father {
  money() {
    console.log(100)
  }
}

class Son extends Father {}

var son = new Son();
son.money(); // 100
```

使用`super`关键字继承父类的属性和方法。

子类必须在`constructor`方法中调用`super`方法，否则新建实例时会报错。这是因为子类自己的`this`对象，必须先通过父类的构造函数完成塑造，继承父类的属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用`super`方法，子类就得不到`this`对象。

虽然是调用父类的构造方法，但这相当于使用`call`来借用父类的方法和属性，`this`指向的是子类。

使用`super`关键字访问和调用父类上的函数。可以调用父类的构造函数，也可以调用普通函数。

在子类的`constructor`中通过`super`调用父类的`constructor`方法把参数传递给父类。

在子类中只有在使用`super`之后，才可以定义自己的`this`。

```js
class Phone {
  constructor(brand, price) {
    this.brand = brand;
    this.price = price;
    this.type = 1
  }
  call() {
    console.log('我可以打电话')
    console.log(this.type)
  }
}

class SmartPhone extends Phone {
  constructor(brand, price, color, size) {
    super(brand, price) // 调用父类constructor，传递参数  ==> Phone.call(this, brand, price)
    this.brand = brand;
    this.price = price;
    this.color = color;
    this.size = size;
    this.type = 2
  }
  newCall() {
    console.log(this.brand) // 子类的属性
  }
  photo() {
    console.log('我可以拍照')
  }
  play() {
    console.log('我可以玩游戏')
  }
  // 通过super关键字调用父类方法，但不能调用父类属性
  print() {
    console.log(super.brand)
  }
  test() {
    super.call()
  }
}

var xiaomi = new SmartPhone('小米', 1999, 'black', 4.7);

xiaomi.call() // 我可以打电话
xiaomi.photo() // 我可以拍照
xiaomi.brand // 小米
xiaomi.color // black

xiaomi.print() // undefined 
xiaomi.test() 
// 我可以打电话
// 2 
```

上面代码，super关键字指向的是父类的原型对象，所以实例（constructor中的）上的属性和方法和属性super是无法调用的（子类可以调用），只能调用原型上的属性和方法。

如果子类方法和父类方法同名，则会覆盖父类方法。




