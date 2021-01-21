# Object

::: tip
MDN [JavaScript 标准内置对象Object](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object)
::::

每个对象都会有这三个方法

``` js
var obj = {}

obj.constructor // 查看构造函数

obj.toString() // 返回一个表示该对象的字符串

obj.valueOf() // 返回值为该对象的原始值
```

## obj.hasOwnProperty(prop)

判断一个对象是否具有属性prop且非原型属性， 返回Boolean值
``` js
var obj1 = {a: 1}
obj1.hasOwnProperty('a') // ture
obj1.hasOwnProperty('toString') // false
obj1.hasOwnProperty('hasOwnProperty');   // 返回 false
```

## object.isPrototypeOf(obj)

判断该对象obj是否存在于另一个对象object的原型链上，object是obj的原型。返回Boolean值
``` js
var obj = {}
function Bar() {}
Bar.prototype = obj
var bar = new Bar()
obj.isPrototypeOf(bar) // true  bar继承自obj
Object.prototype.isPrototypeOf(obj) // ture
```

## obj.propertyIsEnumerable(prop)

判断prop属性是否可枚举，返回Boolean值
``` js
var obj = {a: 1}
obj.propertyIsEnumerable('a') // ture
obj.propertyIsEnumerable('length') // false
```

## Object.is()

方法判断两个值是否为同一个值,与严格比较运算符（===）的行为基本一致。
``` js
Object.is('foo', 'foo') // true
```

## Object.assign(target, ...sources)

方法用于对象的合并，将源对象（source）的所有可枚举属性，复制到目标对象（target）。返回目标对象。

属于浅拷贝，同名属性被替换
``` js
var target = {a: 1, b: 2}
var source = {b: 3, c: 4}
var resultTarget = Object.assign(target, source)
console.log(resultTarget) // {a: 1, b: 3, c: 4}
```

## Object.create(proto)

创建一个空对象，将这个对象的__proto__属性指向proto对象，proto为null，新对象是空对象，没有原型，不继承任何对象

就是给他的构造函数指定一个原型对象， 新对象能继承proto的属性 ， 和 Object.setPrototypeOf 一样。
``` js
var proto = {a: 1}
var obj = Object.create(proto)
console.log(obj) // {}
console.log(obj.__proto__) // {a: 1}
```

## Object.defineProperty(obj, prop, descriptor)

在obj对象上定义一个新属性，或者修改现有属性，并返回此对象。  
``` js
// descriptor：对这个prop属性进行描述
// descriptor: {
//   configurable: 当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 false
//   enumerable : 当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。 默认为 false
//   value : 该属性对应的值。可以是任何有效的 JavaScript 值（数值，对象，函数等）。 默认为 undefined
//   writable : 当且仅当该属性的 writable 键值为 true 时，属性的值，也就是上面的 value，才能被赋值改变。 默认为 false。
//   get: 属性的 getter 函数
//   set: 属性的 setter 函数
// }
var obj = {}; // 创建一个新对象
// 在对象中添加一个属性与数据描述符的示例
Object.defineProperty(obj, "a", {
  value : 37,
  writable : true,
  enumerable : true,
  configurable : true
});
console.log(obj) // {a: 37}

// 修改obj的属性
Object.defineProperty(obj, "a", {
  value: 38
})
console.log(obj) // {a: 38}
```

`Object.keys(obj)`  返回obj键名数组

`Object.values(obj)` 返回obj键值数组

`Object.entries(obj)`  返回obj键值对数组

``` js
var obj = { foo: 'bar', age: 42 };

Object.keys(obj) // ["foo", "age"]

Object.values(obj) // ["bar", 42]

Object.entries(obj) // [ ["foo", "bar"], ["age", 42] 
```

`Object.fromEntries()`  是Object.entries()的逆操作，用于将一个键值对数组转为对象
``` js
Object.fromEntries([
  ['foo', 'bar'],
  ['baz', 42]
])
// { foo: "bar", baz: 42 }
```

`Object.getPrototypeOf(obj)` 获取对象obj的原型
``` js
var proto = {};
var obj = Object.create(proto);
Object.getPrototypeOf(obj) === proto; // true
```

`Object.setPrototypeOf(obj, prototype)` 设置对象obj的原型为prototype
``` js
var obj = {a: 1}
var proto = {b: 2}
Object.setPrototypeOf({}, null)  // {}
Object.setPrototypeOf(obj, proto)  // {a: 1}
console.log(obj.__proto__) // {b: 2}
console.log(obj.__proto__ === proto) // true
```

`Object.freeze()`  冻结一个对象, 所有属性都不可能以任何方式被修改

`Object.isFrozen()`  判断一个对象是否被冻结。

`Object.seal()`  封闭一个对象， 只可修改当前对象，不能添加和删除。

`Object.isSealed()`  判断一个对象是否被密封。

