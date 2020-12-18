# 搭建vue项目工程

## 安装

```sh
npm install -g @vue/cli
```

## 创建项目

```sh
vue create hello-world
```
通过create命令创建vue项目，可以选择添加我们需要的选项，比如，路由，vuex，axios，typescript等，也可以选择默认，当然也可以什么都不选，然后回车，等待命令创建好项目就可以了，然后运行 `npm run serve` 开启项目。

## 目录与静态资源

目录结构：
```sh
├── node_modules        # node包
├── public
│   ├── favicon.ico     # favicon图标
│   └── index.html      # html模板
├── src
│   ├── assets          # 主题 字体等静态资源 (由 webpack 处理加载)
│   ├── components      # 全局组件
│   ├── router          # 路由
│   │   └── index.js    # 路由
│   ├── store           # 全局 vuex store
│   │   └── index.js    # vuex
│   ├── pages           # 多页入口
│   ├── views           # 所有页面
│   ├── App.vue         # 入口页面
│   ├── main.ts         # 入口文件 加载组件 初始化等
│   ├── shims-tsx.d.ts
│   └── shims-vue.d.ts
├── .browserslistrc     # browserslistrc 配置文件 (用于支持 Autoprefixer)
├── .eslintrc.js        # eslint 配置
├── .gitignore
├── babel.config.js     # babel-loader 配置
├── package-lock.json
├── package.json        # package.json 依赖
├── README.md
├── tsconfig.json       # typescript 配置
└── vue.config.js       # vue-cli 配置
```

静态资源存放：

任何放在public文件夹下的文件都不会被webpack处理，只进行简单的复制，引入其中的文件需要使用绝对路径来引用。放在其他文件下通过相对路径而引入的，都会被webpack处理，比如图片，小于多少kb的会被内联，打包在一起，减少HTTP请求，可以在 `vue.config.js` 的 ` chainWebpack ` 进行设置。

当动态引入图片时，我们应该把图片放在public文件下。

如果项目不是部署在根目录下，那么引入public文件的内容就需要配置 publicPath 前缀。

在模板中，你首先需要向你的组件传入基础 URL：
```js
data () {
  return {
    // 获取根路径
    publicPath: process.env.BASE_URL
  }
}
```
然后：
```html
<img :src="`${publicPath}my-image.png`">
```

## vue.onfig.js配置

vue-cli3.0默认是把全局CLI配置给隐藏了，如果想要进行全局CLI配置，可以在根目录下(`package.json` 同级)新建一个 `vue.config.js` 文件来进行配置。webpack需要在 `configureWebpack` 选项中配置。
```js
// vue.config.js
module.exports = {
  // 选项...
  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,

  // devServer:{type:Object} 3个属性host,port,https
  // 它支持webPack-dev-server的所有选项
  devServer: {
      host: 'xxx.xxx.xxx.xx', // 本机地址
      port: 8080, // 端口号
      https: false, // https:{type:Boolean}
      open: true, //配置自动启动浏览器
      // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
      proxy: {
          '/api': {
              target: 'http://www.xxx.com/api', // 跨域地址
              changeOrigin: true,
              pathRewrite: {
                  '^/api': ''
              }
          }
      }
  },
  // webpack配置
  configureWebpack: {},
  // css配置
  css: {},
  // 多页面配置
  pages: {}
}
```
配置链接：[vue.config.js配置](https://cli.vuejs.org/zh/config/)

## 多页面

配置多页面应用，要单独为其添加入口文件 `main.js` 和路由、vuex等，但是公共组件是可以被共享的。

在 src 下添加 pages 目录，在里面创建多页面，之前的单页面配置也拿到 pages 里。然后对每个页面进行单独的配置。
```sh
├── pages
│   ├── index          # index页面
│   │   ├── App.vue    # App组件
│   │   ├── router.js  # 路由配置
│   │   ├── store.js   # vuex
│   │   └── main.js    # 入口
│   ├── product        # product页面
│   │   ├── App.vue    # App组件
│   │   ├── router.js  # 路由配置
│   │   ├── store.js   # vuex
│   │   └── main.js    # 入口
```

然后在 `vue.config.js` 里配置 `pages` 选项。
```js
module.exports = {
  // vue 多页面配置
  pages: {
    index: {
      // page 的入口
      entry: 'src/pages/index/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    product: {
      entry: "src/pages/product/main.js",
      template: "public/product.html",
      filename: "product.html",
    },
  },
}
```

## 环境变量和模式

像 `<%= BASE_URL %>` 和 `process.env.NODE_ENV` 这些地址都是怎么得到的，这些是 `.env` 文件下的全局环境变量，也就是在当前项目都可以使用它。

**环境变量**

环境变量总共有四种方式：
```sh
.env                # 在所有的环境中被载入
.env.local          # 在所有的环境中被载入，但会被 git 忽略
.env.[mode]         # 只在指定的模式中被载入，mode是模式名字，随便取
.env.[mode].local   # 只在指定的模式中被载入，但会被 git 忽略
```

添加全局环境变量：

添加全局环境变量直接在 `.env` 文件下添加“键=值”对就行了，在src中使用环境变量的话，必须以 `VUE_APP_*` 开头。
```sh
VUE_APP_SECRET=secret
FOO=bar
```
使用：
```sh
# 全局使用
process.env.VUE_APP_SECRET

# src外使用
process.env.FOO

# public/index.html使用
<%= BASE_URL %>
```
除了 VUE_APP_* 变量之外，有两个特殊的变量 `NODE_ENV` 和 `BASE_URL` 会自动根据环境的变化而变化，不会是一个固定的值。

**模式**

环境变量默认有三种模式：
* `development`： 开发环境
* `production`：生产环境
* `test`：测试环境

在对应的模式下配置相应的环境变量，只会在相对应的模式下显示出来。比如添加 `.env.development`模式，要在 `package.json` 上添加 `--mode` 指令：
```sh
"scripts": {
  "docs:dev": "vuepress dev docs --mode development",
  "docs:build": "vuepress build docs"
},
```

## css配置




## 添加路由

## 添加vuex

## 添加axios


## 添加UI框架

## 静态资源存放
