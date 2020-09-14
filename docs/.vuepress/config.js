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
      { text: 'Api', link: '/api/' },
      { text: '掘金', link: 'https://juejin.im/user/1714893870337518' },
      { text: 'GitHub', link: 'https://github.com/changzhengithub'}
    ],
    sidebar: {
      '/basic/': [
        {
          title: 'CSS',
          collapsable: false,
          children: [
            'css/CSS使用规则'
          ]
        },
      ],
      '/vue/': [
        {
          title: 'Vue',
          collapsable: false,
          children: [
            'test'
          ],
        },
      ],
      '/react/': [
        {
          title: 'React',
          collapsable: false,
          children: [
            '/react/test'
          ],
        },
      ],
      '/server/': [
        {
          title: 'Server',
          collapsable: false,
          children: [
            '',
            '/server/test',
            '/server/test2'
          ],
        },
      ],
      '/api/': [
        {
          title: 'Classes',
          collapsable: false,
          children: [
            'classes/',
            'classes/test',
            'classes/test2',
          ]
        },
        {
          title: 'Detail',
          collapsable: false,
          children: [
            'detail/test',
            'detail/test2',
          ]
        }
      ]
    },
    activeHeaderLinks: false,
    lastUpdated: 'Last Updated', // 更新时间
  },
  // plugins: ['permalink-pinyin', ['autobar', {'pinyinNav': true}]],
};