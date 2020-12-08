(window.webpackJsonp=window.webpackJsonp||[]).push([[55],{370:function(s,t,e){"use strict";e.r(t);var a=e(42),n=Object(a.a)({},(function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[e("h1",{attrs:{id:"vue-cli3-0添加typescript"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vue-cli3-0添加typescript"}},[s._v("#")]),s._v(" vue-cli3.0添加typescript")]),s._v(" "),e("h2",{attrs:{id:"创建项目"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#创建项目"}},[s._v("#")]),s._v(" 创建项目")]),s._v(" "),e("p",[s._v("vue-cli3.0脚手架创建vue项目时提供添加 Typescript 选项，会默认配置好 ts 相关的配置，直接查看说明文档使用就可以开启服务了。")]),s._v(" "),e("p",[s._v("项目目录：")]),s._v(" "),e("div",{staticClass:"language-sh extra-class"},[e("pre",{pre:!0,attrs:{class:"language-sh"}},[e("code",[s._v("├── node_modules        "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# node包")]),s._v("\n├── public\n│   ├── favicon.ico     "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# favicon图标")]),s._v("\n│   └── index.html      "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# html模板")]),s._v("\n├── src\n│   ├── assets          "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 主题 字体等静态资源 (由 webpack 处理加载)")]),s._v("\n│   ├── components      "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 全局组件")]),s._v("\n│   ├── router          "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 路由")]),s._v("\n│   │   └── index.js    "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 路由")]),s._v("\n│   ├── store           "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 全局 vuex store")]),s._v("\n│   │   └── index.js    "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# vuex")]),s._v("\n│   ├── views           "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 所有页面")]),s._v("\n│   ├── App.vue         "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 入口页面")]),s._v("\n│   ├── main.ts         "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 入口文件 加载组件 初始化等")]),s._v("\n│   ├── shims-tsx.d.ts\n│   └── shims-vue.d.ts\n├── .browserslistrc     "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# browserslistrc 配置文件 (用于支持 Autoprefixer)")]),s._v("\n├── .eslintrc.js        "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# eslint 配置")]),s._v("\n├── .gitignore\n├── babel.config.js     "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# babel-loader 配置")]),s._v("\n├── package-lock.json\n├── package.json        "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# package.json 依赖")]),s._v("\n├── README.md\n├── tsconfig.json       "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# typescript 配置")]),s._v("\n└── vue.config.js       "),e("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# vue-cli 配置")]),s._v("\n")])])]),e("p",[s._v("创建好的项目和以前没有什么太大区别，就是js文件变成ts文件，然后多了 "),e("code",[s._v("shims-tsx.d.ts")]),s._v("、"),e("code",[s._v("shims-vue.d.ts")]),s._v(" 和 "),e("code",[s._v("tsconfig.json")]),s._v("几个文件。")]),s._v(" "),e("ul",[e("li",[s._v("shims-tsx.d.ts: 允许.tsx 结尾的文件，在 Vue 项目中编写 jsx 代码")]),s._v(" "),e("li",[s._v("shims-vue.d.ts: 主要用于 TypeScript 识别.vue 文件，还可以添加其他要识别的对象，如"),e("code",[s._v("$router")])]),s._v(" "),e("li",[s._v("tsconfig.json: typescript配置文件,主要用于指定待编译的文件和定义编译选项")])]),s._v(" "),e("p",[s._v("然后查看一下 "),e("code",[s._v("package.json")]),s._v(" 文件，就会发现 "),e("code",[s._v("dependencies")]),s._v(" 里不止添加了 "),e("code",[s._v("vue-router")]),s._v("/"),e("code",[s._v("vuex")]),s._v("等插件，还另外添加了"),e("code",[s._v("vue-class-component")]),s._v(" 和 "),e("code",[s._v("vue-property-decorator")]),s._v(" 插件，这两个就是在vue-cli中使用ts的关键。")]),s._v(" "),e("p",[s._v("让我们了解一下添加ts需要使用的插件：")]),s._v(" "),e("p",[s._v("1、vue-class-component")]),s._v(" "),e("p",[e("code",[s._v("vue-class-component")]),s._v(" TypeScript装饰器，用于类样式的Vue组件。")]),s._v(" "),e("p",[s._v("2、vue-property-decorator")]),s._v(" "),e("p",[e("code",[s._v("vue-property-decorator")]),s._v("是基于 vue 组织里 "),e("code",[s._v("vue-class-component")]),s._v(" 所做的拓展。")]),s._v(" "),e("p",[s._v("vue组件大多使用的模块都可以从此插件引入")]),s._v(" "),e("div",{staticClass:"language-js extra-class"},[e("pre",{pre:!0,attrs:{class:"language-js"}},[e("code",[e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("import")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v(" Vue"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" Component"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" Inject"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" Provide"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" Prop"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" Model"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" Watch"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" Emit"),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" Mixins "),e("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("from")]),s._v(" "),e("span",{pre:!0,attrs:{class:"token string"}},[s._v("'vue-property-decorator'")]),s._v("\n")])])]),e("p",[s._v("3、vue-class/vuex-module-decorators")]),s._v(" "),e("p",[e("code",[s._v("vue-class")]),s._v(" 是"),e("code",[s._v("vue-class-component")]),s._v("上Vuex的扩展，和 "),e("code",[s._v("vuex-module-decorators")]),s._v(" 用于vuex上添加ts。")]),s._v(" "),e("p",[s._v("这些文件如果不通过脚手架创建的时候添加的话也可以通过手动添加，把这些文件添加上去，然后再把组件改写成相对应的方式就可以了。")]),s._v(" "),e("h2",{attrs:{id:"路由使用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#路由使用"}},[s._v("#")]),s._v(" 路由使用")]),s._v(" "),e("h2",{attrs:{id:"vuex使用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vuex使用"}},[s._v("#")]),s._v(" vuex使用")]),s._v(" "),e("h2",{attrs:{id:"页面使用"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#页面使用"}},[s._v("#")]),s._v(" 页面使用")])])}),[],!1,null,null,null);t.default=n.exports}}]);