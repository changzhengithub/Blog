module.exports = {
  title: 'Chang\'s blog',
  description: '我的个人博客，记录点滴',
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  // 主题配置
  themeConfig: {
    logo: '/img/logo.png',
    // 导航栏
    nav: [
      { text: 'Basic', link: '/basic/' },
      { text: 'Vue', link: '/vue/' },
      { text: 'React', link: '/react/' },
      { text: 'Server', link: '/server/' },
      { text: 'Others', link: '/others/' },
      { text: '掘金', link: 'https://juejin.im/user/1714893870337518' },
      { text: 'GitHub', link: 'https://github.com/changzhengithub'}
    ],
    sidebar: {
      '/basic/': [
        {
          title: 'CSS',
          collapsable: true,
          children: [
            'css/css常用命名',
            'css/常见字体样式'
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
            'javascript/Object',
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
          title: 'Problem',
          collapsable: true,
          children: [
            'problem/a标签在IE中无法下载',
          ]
        },
      ],
      '/vue/': [
        'vue使用this.$refs 打印为undefined'
      ],
      '/react/': [
        'test'
      ],
      '/server/': [
        'test',
        'test2'
      ],
      '/others/': [
        {
          title: 'Canvas',
          collapsable: false,
          children: [
            'canvas/',
            'canvas/test'
          ]
        },
        {
          title: 'Videos',
          collapsable: false,
          children: [
            'videos/test'
          ]
        },
        {
          title: 'Git',
          collapsable: false,
          children: [
            'git/git常见问题',
            'git/git入门教程',
          ]
        }
      ]
    },
    activeHeaderLinks: true,
    lastUpdated: 'Last Updated', // 更新时间
  },
  // plugins: ['permalink-pinyin', ['autobar', {'pinyinNav': true}]],
};