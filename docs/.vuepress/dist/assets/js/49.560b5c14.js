(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{352:function(t,a,e){"use strict";e.r(a);var s=e(42),r=Object(s.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"git常见问题"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git常见问题"}},[t._v("#")]),t._v(" git常见问题")]),t._v(" "),e("h2",{attrs:{id:"提交本地分支dev到远程分支master上去"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#提交本地分支dev到远程分支master上去"}},[t._v("#")]),t._v(" 提交本地分支dev到远程分支master上去")]),t._v(" "),e("div",{staticClass:"language-git extra-class"},[e("pre",{pre:!0,attrs:{class:"language-git"}},[e("code",[t._v("git push origin dev:master\n")])])]),e("h2",{attrs:{id:"git-报错"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git-报错"}},[t._v("#")]),t._v(" git 报错：")]),t._v(" "),e("blockquote",[e("p",[t._v("Post https://lfs.github.com/changzhengithub/tourbox/objects/f9d37c445c8675a30ed0e30e0329b0cd08442a6492b3f672971e1344cd949049/verify: read tcp 192.168.59.135:54097->13.250.168.23:443: wsarecv: An existing connection was forcibly closed by the remote host.\nUploading LFS objects:   0% (0/2), 6.1 KB | 0 B/s, done\nPost https://lfs.github.com/changzhengithub/tourbox/objects/0929c95ab7eff87e15692f391b22969b7dd58289dd4aaae99272f87f2e6c94f6/verify: read tcp 192.168.59.135:54107->13.250.168.23:443: wsarecv: An existing connection was forcibly closed by the remote host.\nerror: failed to push some refs to 'https://github.com/changzhengithub/tourbox.git'")])]),t._v(" "),e("p",[t._v("解决办法：")]),t._v(" "),e("div",{staticClass:"language-git extra-class"},[e("pre",{pre:!0,attrs:{class:"language-git"}},[e("code",[t._v("git lfs push origin master\ngit push origin master\n")])])]),e("h2",{attrs:{id:"vs-code-git-同步问题"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#vs-code-git-同步问题"}},[t._v("#")]),t._v(" vs code git 同步问题")]),t._v(" "),e("p",[e("a",{attrs:{href:"https://code.visualstudio.com/docs/editor/settings-sync",target:"_blank",rel:"noopener noreferrer"}},[t._v("Settings Sync"),e("OutboundLink")],1)]),t._v(" "),e("h2",{attrs:{id:"git-克隆仓库"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git-克隆仓库"}},[t._v("#")]),t._v(" git 克隆仓库")]),t._v(" "),e("div",{staticClass:"language-git extra-class"},[e("pre",{pre:!0,attrs:{class:"language-git"}},[e("code",[t._v("git clone  http://10.1.1.11/service/tmall-service.git\n")])])]),e("h2",{attrs:{id:"git-克隆指定分支"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git-克隆指定分支"}},[t._v("#")]),t._v(" git 克隆指定分支")]),t._v(" "),e("div",{staticClass:"language-git extra-class"},[e("pre",{pre:!0,attrs:{class:"language-git"}},[e("code",[t._v("git clone -b dev http://10.1.1.11/service/tmall-service.git\n")])])]),e("h2",{attrs:{id:"git-修改本地和远程分支名"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#git-修改本地和远程分支名"}},[t._v("#")]),t._v(" git 修改本地和远程分支名")]),t._v(" "),e("div",{staticClass:"language-git extra-class"},[e("pre",{pre:!0,attrs:{class:"language-git"}},[e("code",[t._v("git branch -a  #查看所有分支分支\ngit branch -r  #查看远程分支\n\ngit branch -m oldBranch newBranch  #本地分支重命名\n\ngit push --delete origin oldBranch  #删除远程分支（远端无此分支则跳过该步骤）\n\ngit push origin newBranch   #将重命名后的分支推到远端\n\ngit branch --set-upstream-to origin/newBranch  #把修改后的本地分支与远程分支关联\n")])])]),e("h2",{attrs:{id:"本地新建文件推送到远程未有的分支"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#本地新建文件推送到远程未有的分支"}},[t._v("#")]),t._v(" 本地新建文件推送到远程未有的分支")]),t._v(" "),e("div",{staticClass:"language-git extra-class"},[e("pre",{pre:!0,attrs:{class:"language-git"}},[e("code",[t._v("git init #初始化\ngit remote add origin https://github.com/changzhengithub/learn.git #关联远程仓库\ngit add .\ngit commit -am "),e("span",{pre:!0,attrs:{class:"token string"}},[t._v('"init branch"')]),t._v(" #本地提交\ngit checkout -b newbranch #本地新建分支\ngit push origin newbranch:newbranch #把本地分支提交到远程上并新建newbranch分支\n")])])])])}),[],!1,null,null,null);a.default=r.exports}}]);