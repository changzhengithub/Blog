module.exports = {
  title: 'Chang\'s blog',
  description: '我的个人博客，记录点滴',
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  // 主题配置
  themeConfig: {
    logo: '/img/logo.png',
    // 导航栏
    nav: [
      { text: 'Guide', link: '/guide/' },
      { text: 'Api', link: '/api/' },
    ],
    sidebar: {
      '/guide/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '',
            '/guide/test',
            '/guide/test2'
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
    search: true, // 搜索框
    activeHeaderLinks: false,
    lastUpdated: 'Last Updated', // 更新时间
  },
  // plugins: ['permalink-pinyin', ['autobar', {'pinyinNav': true}]],
};