# CSS使用规则

::: tip
只针对平时常见使用，命名因人而异
:::

## CSS class 常见命名

``` js
首页：index
容器: container
内容: content
外套: wrap
包装：wrapper

页头: header
登录条: login-bar
标志: logo
侧栏: side-bar
广告: banner
导航: nav
子导航: sub-nav
菜单: menu
子菜单: sub-menu
搜索: search
滚动: scroll
页面主体: main
内容: content
标签页: tab
文章列表: list
提示信息: msg
小技巧: tips
栏目标题: title
友情链接: friend-link
页脚: footer
加入: joinus
指南: guild
服务: service
热点: hot
新闻: news
下载: download
注册: register
状态: status
按钮: btn
投票: vote
合作伙伴: partner
版权: copyright
```
## CSS id 的命名

``` js

主导航: main-nav
子导航: sub-nav
页脚: footer
整个页面: content
页眉: header
页脚: footer
商标: label
标题: title
主导航: main-nav（global-nav）
顶导航: topnav
边导航: sidebar
左导航: leftside-bar
右导航: rightside-bar
旗志: logo
标语: banner
菜单内容: menu1-content
菜单容量: menu-container
子菜单: submenu
边导航图标: sidebar-icon
注释: note
面包屑: breadcrumb（即页面所处位置导航提示）

搜索: search
登陆: login
功能区: shop（如购物车，收银台）
当前的: current
```

## 样式文件命名

``` js
主要的: master.css
布局版面: layout.css
专栏: columns.css
文字: font.css
打印样式: print.css
主题: themes.css
```

## CSS 属性书写顺序

``` css
// 定位
'position',
'top',
'right',
'bottom',
'left',
'z-index',

// 盒模型
'box-sizing',
'display',
'flex',

// 浮动
'float',

// 盒模型内部
'width',
'height',
'padding',
'margin',
'overflow',

// 字体
'font',
'color',
'line-height',
'text-align',
'text-decoration',
'text-shadow',

// 列表
'list-style',

// 鼠标
'pointer-events',
'cursor',

'visibility',
'zoom',
'table-layout',
'resize',
'user-select',

// 背景
'background',
'background-color',
'background-image',
'filter',
'background-repeat',
'background-attachment',
'background-position',
'background-position-x',
'background-position-y',
'background-clip',
'background-origin',
'background-size',

// 边框
'border',
'border-color',
'border-style',
'border-width',
'border-radius',
'border-image',

// 轮廓
'outline',
'box-shadow',
'opacity',

// transition
'transition',
'transition-delay',
'transition-timing-function',
'transition-duration',
'transition-property',
'transform',
'transform-origin',
'perspective',
'appearance',
'animation',
'animation-name',
'animation-duration',
'animation-play-state',
'animation-timing-function',
'animation-delay',
'animation-iteration-count',
'animation-direction',
'animation-fill-mode',

// 媒体填充
'fill',
'stroke'
```