module.exports = {
  title: 'Chang\'s blog',
  description: '我的个人博客，记录点滴',
  head: [
    ['link', {
      rel: 'icon',
      href: '/logo.ico'
    }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  // 主题配置
  themeConfig: {
    logo: '/img/logo.png',
    // 导航栏
    nav: [{
        text: 'Basic',
        link: '/basic/'
      },
      {
        text: 'Vue',
        link: '/vue/'
      },
      {
        text: 'Others',
        link: '/others/'
      },
      {
        text: '掘金',
        link: 'https://juejin.im/user/1714893870337518'
      },
      {
        text: 'GitHub',
        link: 'https://github.com/changzhengithub'
      }
    ],
    sidebar: {
      '/basic/': [{
          title: 'CSS',
          collapsable: true,
          children: [
            'css/css常用命名',
            'css/CSS常见样式',
            'css/字体设置'
          ]
        },
        {
          title: 'JavaScript',
          collapsable: true,
          children: [
            'javascript/基础问题',
            'javascript/字符串API',
            'javascript/Number和Math',
            'javascript/数组API',
            'javascript/对象API',
            'javascript/日期Date',
            'javascript/错误对象Error',
            'javascript/正则表达式',
            'javascript/this、apply、call、bind',
            'javascript/原型的理解',
            'javascript/解决跨域问题',
            'javascript/事件循环与宏任务、微任务',
            'javascript/变量提升和函数提升',
            'javascript/防抖与节流',
            'javascript/赋值与浅拷贝、深拷贝',
            'javascript/本地存储',
            'javascript/常见代码实现',
            'javascript/浏览器端数据库indexedDB',
            'javascript/短轮询、长轮询、长连接和WebSocket',
            'javascript/ajax原理'
          ]
        },
        {
          title: 'ES6',
          collapsable: true,
          children: [
            'es6/Set与Map',
            'es6/Promise',
            'es6/Generator函数的语法',
            'es6/async函数',
            'es6/Class类'
          ]
        },
        {
          title: 'Faq',
          collapsable: true,
          children: [
            'faq/a标签在IE中无法下载',
          ]
        },
      ],
      '/vue/': [{
          title: '基础内容',
          collapsable: true,
          children: [
            'basic/vue知识点',
            'basic/vue风格指南',
            'basic/在组件上使用v-model',
            'basic/组件之间的通信',
            'basic/vue过渡效果实现',
            'basic/axios封装',
            'basic/vue添加typescript',
            'basic/vue添加flex',
            'basic/搭建vue项目工程',
          ]
        },
        {
          title: 'Vue3.0',
          collapsable: true,
          children: [
            'vue3/vue3新内容',
          ]
        },
        {
          title: 'Vue Router',
          collapsable: true,
          children: [
            'router/vue路由',
            'router/vue-cli添加路由',
          ]
        },
        {
          title: 'Vuex',
          collapsable: true,
          children: [
            'vuex/vuex状态管理器',
            'vuex/vue-cli添加vuex',
          ]
        },
        {
          title: 'Faq',
          collapsable: true,
          children: [
            'faq/vue常见问题',
            'faq/vue使用this.$refs 打印为undefined',
          ]
        }
      ],
      '/others/': [{
          title: 'Canvas',
          collapsable: true,
          children: [
            'canvas/canvas绘制环形进度条',
          ]
        },
        {
          title: 'Videos',
          collapsable: true,
          children: [
            'videos/video视频播放',
            'videos/H5页面加载YouTube视频',
          ]
        },
        {
          title: 'Git',
          collapsable: true,
          children: [
            'git/git常见问题',
            'git/git入门教程',
          ]
        },
        {
          title: 'Mobile',
          collapsable: true,
          children: [
            'mobile/移动端适配',
            'mobile/移动端常见问题'
          ]
        }
      ]
    },
    activeHeaderLinks: true,
    lastUpdated: 'Last Updated', // 更新时间
  },
  // plugins: ['permalink-pinyin', ['autobar', {'pinyinNav': true}]],
};