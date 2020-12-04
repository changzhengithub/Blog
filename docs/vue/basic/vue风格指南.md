# 风格指南

## 组件的命名风格

组件名最好是多个单词的

单文件组件：

**单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)。**
```sh
components/
|- MyComponent.vue
```
```js
import MyComponent from './MyComponent.vue'

export default {
  name: 'MyComponent',
  // ...
}
```
引用组件：

在HTML中使用组件要么是PascalCase单标签，要么是kebab-case闭合标签

```html
<MyComponent/>

<my-component></my-component>
```

完整单词的组件名：

**组件名应该倾向于完整单词而不是缩写。**


基础组件名：

**应用特定样式和约定的基础组件 (也就是展示类的、无逻辑的或无状态的组件) 应该全部以一个特定的前缀开头，比如 Base、App 或 V。**

```sh
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue

components/
|- AppButton.vue
|- AppTable.vue
|- AppIcon.vue
```

单例组件名：

**只应该拥有单个活跃实例的组件应该以 The 前缀命名，以示其唯一性。**

这不意味着组件只可用于一个单页面，而是每个页面只使用一次。这些组件永远不接受任何 prop，因为它们是为你的应用定制的，而不是它们在你的应用中的上下文。如果你发现有必要添加 prop，那就表明这实际上是一个可复用的组件，只是目前在每个页面里只使用一次。

```sh
components/
|- TheHeading.vue
|- TheSidebar.vue
```

紧密耦合的组件名：

**和父组件紧密耦合的子组件应该以父组件名作为前缀命名。**

```sh
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

组件名中的单词顺序：

```sh
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

## 书写风格及注意

Prop 定义应该尽量详细：

**prop 的定义应该尽量详细，至少需要指定其类型。最好不要在后面直接写数组。**

Prop 名大小写：

**在声明 prop 的时候，其命名应该始终使用 camelCase，而在模板和 JSX 中应该始终使用 kebab-case。**

在 JavaScript 中更自然的是 camelCase。而在 HTML 中则是 kebab-case。

```js
props: {
  greetingText: String
}
```
```html
<WelcomeMessage greeting-text="hi"/>
```

多个 attribute 的元素：

**多个 attribute 的元素应该分多行撰写，每个 attribute 一行。**

```html
<MyComponent
  foo="a"
  bar="b"
  baz="c"
/>
```

指令缩写：

**指令缩写 (用 : 表示 v-bind:、用 @ 表示 v-on: 和用 # 表示 v-slot:) 应该要么都用要么都不用。**

元素 attribute 的顺序：

* 定义 (提供组件的选项)
  * is
* 列表渲染 (创建多个变化的相同元素)
  * v-for
* 条件渲染 (元素是否渲染/显示)
  * v-if
  * v-else-if
  * v-else
  * v-show
  * v-cloak
* 渲染方式 (改变元素的渲染方式)
  * v-pre
  * v-once
* 全局感知 (需要超越组件的知识)
  * id
* 唯一的 attribute (需要唯一值的 attribute)
  * ref
  * key
* 双向绑定 (把绑定和事件结合起来)
  * v-model
* 其它 attribute (所有普通的绑定或未绑定的 attribute)
* 事件 (组件事件监听器)
  * v-on
* 内容 (覆写元素的内容)
  * v-html
  * v-text