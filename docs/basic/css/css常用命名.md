# CSS使用规则

::: tip 提示
只针对平时常见使用，命名因人而异
:::

## 列表递进规则

``` js
  // 递进规则
  list --> item
  layout --> grid --> row --> col
  menu --> submenu/slidemenu --> cell/item
  layout --> grid --> cell/item
  block --> | title
            | card --> cell/item/grid
  collapse --> | panel --> detail         
               | content/list/card
  nav --> subnav/slidebar --> wrap --> | tab
                                       | content/panel/card
```

## CSS 常见命名

``` js
首页：index
容器: container
内容: content
外套: wrap
包装：wrapper
页头: header
广告: banner
页面主体: main
页脚: footer

标志: logo
导航: nav
面包屑: breadcrumb
主导航: mainnav
子导航: subnav
顶导航: topnav
侧栏: sidebar
菜单: menu
子菜单: submenu
搜索: search
按钮: btn

标题: title
摘要: summary
文章列表: list
详情: detail/particular
描述: describe/description

分页: page
子页面: subpage
主页面: homepage
标签页: tag

功能区: shop（如购物车，收银台）
工具条: tool
下拉菜单: dropmenu
面板: panel
折叠: fold
折叠面板: collapse
下拉菜单: drop/dropdown
图标: icon
栅格: grid
布局: layout
列表: list
卡片: card
面板分割: split
分割线: divider
单元格: cell
徽标: badge
锚点: anchor
步骤条: steps
加载进度条: loadingbar
开关: switch
表格: table
滑块: slide
选择器: picker
级联选择: cascader
穿梭框: transfer
评分: rate
上传: upload
表单: form

消息提示: notify
通知提醒: notice
对话框: modal
抽屉: drawer
弹出层: popup
文字提示: tooltip
气泡提示: poptip
进度条: progeress
头像: avatar
走马灯：carousel
时间轴: timeline
加载中: spin
提示信息: msg
小技巧: tips
标签页: tab
商标: label
注释: note
指南: guide
热点: hot
新闻: news
图片列表: piclist
新闻列表: newslist
商标: barnding
缩略图: screenshot
友情链接: friend-link
版权: copyright
论坛: forum

当前的: current
滚动: scroll
充值: pay
评论: review
加入: joinus
服务: service
下载: download
登陆: login
注册: register
状态: status
投票: vote
合作伙伴: partner
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
::: tip 顺序
**css书写顺序一般是：场合—>尺寸—>装饰—>颜色—>其他**
:::
``` css
** 场合（position，top，right，z-index，display，float等）**
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

** 尺寸（width，height，padding，margin等） **

'width',
'height',
'padding',
'margin',
'overflow',

** 装饰（font，line-height，letter-spacing，color ，text-align等）**
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

** 颜色（background，border等）**
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

** 其他（animation，transition等）**
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