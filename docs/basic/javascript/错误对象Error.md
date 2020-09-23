# 错误对象Error


### 创建一个错误

``` js
new Error(message)

new RangeError(message)
```

### 错误类型

EvalError：
创建一个error实例，表示错误的原因：与 eval() 有关。

InternalError：
创建一个代表Javascript引擎内部错误的异常抛出的实例。 如: "递归太多".

RangeError：
创建一个error实例，表示错误的原因：数值变量或参数超出其有效范围。

ReferenceError：
创建一个error实例，表示错误的原因：无效引用。

SyntaxError：
创建一个error实例，表示错误的原因：eval()在解析代码的过程中发生的语法错误。

TypeError：
创建一个error实例，表示错误的原因：变量或参数不属于有效类型。

URIError：
创建一个error实例，表示错误的原因：给 encodeURI()或  decodeURl()传递的参数无效。

### 捕获和抛出错误

``` js

throw // 在控制台抛出错误

throw ('xxxx') // Uncaught xxxx

throw new RangeError('xxxx');  // Uncaught RangeError: xxxx

// 使用try catch 捕获错误并使用throw抛出
try {
  console.log(a)
} catch (err) {
  throw err
}
// Uncaught ReferenceError: a is not defined
```