# Set与Map

## Set

### 基本用法
ES6提供了新数据结构Set， 它 ***类似于数组，但不是数组***，成员都是唯一的，没有重复的。

Set本身是一个构造函数，用来生成 Set 数据结构。

向Set添加值时，不会发生类型转换，判断两个值相等类似于（===）

```js
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

// Set(4) {2, 3, 5, 4}  通过add方法添加Set成员，重复的会去掉。
```

Set函数可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数，用来初始化。

```js
const set = new Set([1, 2, 3, 4, 4]);
[...set]  // [1, 2, 3, 4]

const items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
items.size // 5

const set = new Set(document.querySelectorAll('div'));
set.size // 3
```

### Set 实例的属性和方法

**属性：**

`Set.prototype.constructor`：构造函数，默认就是Set函数。

`Set.prototype.size`：返回Set实例的成员总数。

**方法：**

分为操作方法和遍历方法

操作方法：

`Set.prototype.add(value)`：添加某个值，返回 Set 结构本身。

`Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。

`Set.prototype.has(value)`：返回一个布尔值，表示该值是否为Set的成员。

`Set.prototype.clear()`：清除所有成员，没有返回值。

```js
const s = new Set();
s.add(1).add(2).add(2);
s.size // 2
s.has(1) // true
s.has(3) // false
s.delete(2);
s.has(2) // false
s.clear() // Set(0) {}
```

遍历方法：

`Set.prototype.keys()`：返回键名的遍历器

`Set.prototype.values()`：返回键值的遍历器

`Set.prototype.entries()`：返回键值对的遍历器

`Set.prototype.forEach()`：使用回调函数遍历每个成员

由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

```js
var s = new Set(['green', 'red', 'blue'])

s.keys() // SetIterator {"green", "red", "blue"}
s.values() // SetIterator {"green", "red", "blue"}
s.entries() // SetIterator {"green" => "green", "red" => "red", "blue" => "blue"}
s.forEach((value, key) => console.log(key + ' : ' + value)) // 与数组forEach类似
// green : green
// red : red
// blue : blue
```

**Set应用**

根据它不会添加重复值可以用来数组去重

```js
// 去除数组的重复成员
[...new Set(array)]

// 也可以字符串去重
[...new Set('ababbc')].join('') // "abc"
```

Array.from方法可以将 Set 结构转为数组。

所以另一种去重方法

```js
function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]) // [1, 2, 3]
```


## Map

传统对象Object本质上是键值对的集合（Hash 结构）但只能用字符串做键，而Map去不用限于字符串，可以使用各种类型（包括对象）来当键。

Object是 "字符串-值"模式，Map是 "值-值" 模式，是一种更完善的Hash结构

作为构造函数，Map 也可以接受一个数组（或者具有 iterable 接口的其他数据结构）作为参数。该数组的成员是一个个表示键值对的数组。

```js
const map = new Map([['name', '张三'], ['title', 'Author']]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"
```

Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。简单类型的值全等就相等。

```js
const map = new Map();

const k1 = ['a'];
const k2 = ['a'];

map
.set(k1, 111)
.set(k2, 222);

map.get(k1) // 111
map.get(k2) // 222
```

### Map 实例的属性和方法

`Map.prototype.size`：返回Set实例的成员总数。

`Map.prototype.set(key, value)`：set方法设置键key的值为value，返回整个Map结构。key已存在会被更新。

`Map.prototype.get(key)`：get方法读取key对应的键值，如果找不到key，返回undefined。

`Map.prototype.has(key)`：has方法返回一个布尔值，表示某个键是否在当前 Map 对象之中。

`Map.prototype.delete(key)`：delete方法删除某个键，返回true。如果删除失败，返回false。

`Map.prototype.clear()`：clear方法清除所有成员，没有返回值。

```js
const map = new Map();

map.set(123, 123);
map.set('age', 18);

map.size // 2

map.get('age') // 18
map.has('age') // true
map.delete('age') // true
map.clear()
console.log(map) // Map(0) {}
```

Map 结构原生提供三个遍历器生成函数和一个遍历方法。

`Map.prototype.keys()`：返回键名的遍历器。

`Map.prototype.values()`：返回键值的遍历器。

`Map.prototype.entries()`：返回所有成员的遍历器。

`Map.prototype.forEach()`：遍历 Map 的所有成员

```js
const map = new Map();
map.set(123, 123);
map.set('age', 18);

map.keys() // MapIterator {123, "age"}
map.values() // MapIterator {123, 18}
map.entries() // MapIterator {123 => 123, "age" => 18}
map.forEach((value, key) => console.log(key + ' : ' + value))
// 123 : 123
// age : 18
```

map结构转化为数组，使用扩展运算符

```js
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map] // [[1,'one'], [2, 'two'], [3, 'three']]

[...map.keys()] // [1, 2, 3]

[...map.values()] // ['one', 'two', 'three']

[...map.entries()] // [[1,'one'], [2, 'two'], [3, 'three']]
```

## WeakSet与WeakMap

WeakSet和WeakMap与Set和Map结构类似，只是WeakSet和WeakMap只接受对象作为键名，不接受其他类型的值作为键名。

```js
const map = new WeakSet();
const map = new WeakMap();
```

WeakSet与WeakMap 应用的典型场合就是 DOM 节点作为键名。

```js
let myWeakmap = new WeakMap();

myWeakmap.set(
  document.getElementById('logo'),
  {timesClicked: 0})
;

document.getElementById('logo').addEventListener('click', function() {
  let logoData = myWeakmap.get(document.getElementById('logo'));
  logoData.timesClicked++;
}, false);
```

上面代码中，`document.getElementById('logo')` 是一个 DOM 节点，每当发生click事件，就更新一下状态。我们将这个状态作为键值放在 WeakMap 里，对应的键名就是这个节点对象。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。