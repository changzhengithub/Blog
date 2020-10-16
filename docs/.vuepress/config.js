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
          collapsable: false,
          children: [
            'css/css常用命名'
          ]
        },
        {
          title: 'JavaScript',
          collapsable: false,
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
          ]
        },
        {
          title: 'ES6',
          collapsable: false,
          children: [
            'es6/Set与Map',
            'es6/Promise',
            'es6/Generator函数的语法',
            'es6/async函数',
            'es6/Class类'
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
        }
      ]
    },
    activeHeaderLinks: true,
    lastUpdated: 'Last Updated', // 更新时间
  },
  // plugins: ['permalink-pinyin', ['autobar', {'pinyinNav': true}]],
};