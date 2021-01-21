# git常见问题

## 提交本地分支dev到远程分支master上去

```git
git push origin dev:master
```

## git 报错：

>Post https://lfs.github.com/changzhengithub/tourbox/objects/f9d37c445c8675a30ed0e30e0329b0cd08442a6492b3f672971e1344cd949049/verify: read tcp 192.168.59.135:54097->13.250.168.23:443: wsarecv: An existing connection was forcibly closed by the remote host.
Uploading LFS objects:   0% (0/2), 6.1 KB | 0 B/s, done
>Post https://lfs.github.com/changzhengithub/tourbox/objects/0929c95ab7eff87e15692f391b22969b7dd58289dd4aaae99272f87f2e6c94f6/verify: read tcp 192.168.59.135:54107->13.250.168.23:443: wsarecv: An existing connection was forcibly closed by the remote host.
>error: failed to push some refs to 'https://github.com/changzhengithub/tourbox.git'

解决办法：

```git
git lfs push origin master
git push origin master
```

## vs code git 同步问题

[Settings Sync](https://code.visualstudio.com/docs/editor/settings-sync)

## git 克隆仓库
```git
git clone  http://10.1.1.11/service/tmall-service.git
```

## git 克隆指定分支
```git
git clone -b dev http://10.1.1.11/service/tmall-service.git
```

## 使用--depth 浅克隆
```sh
#只克隆最近一次commit提交的内容
git clone --depth 1 http://10.1.1.11/service/tmall-service.git
#指定分支
git clone --depth 1 --branch dev http://10.1.1.11/service/tmall-service.git
```

## git 修改本地和远程分支名

```git
git branch -a  #查看所有分支分支
git branch -r  #查看远程分支

git branch -m oldBranch newBranch  #本地分支重命名

git push --delete origin oldBranch  #删除远程分支（远端无此分支则跳过该步骤）

git push origin newBranch   #将重命名后的分支推到远端

git branch --set-upstream-to origin/newBranch  #把修改后的本地分支与远程分支关联
```

## 本地新建文件推送到远程未有的分支

```git
git init #初始化
git remote add origin https://github.com/changzhengithub/learn.git #关联远程仓库
git add .
git commit -am "init branch" #本地提交
git checkout -b newbranch #本地新建分支
git push origin newbranch:newbranch #把本地分支提交到远程上并新建newbranch分支
```

## vscode总弹出git登录弹框

到本地user下面把所有的.git文件都删了

打开终端输入命令，然后push会提示认证，重新认证一下就好了。
```git
git config --global credential.helper store
git config --global user.email "xxx@xxx.com"
git config --global user.name "xxxx"
```

## 撤销本地commit提交

不删除工作空间改动代码，撤销commit，并且撤销git add . 操作
```sh
git reset --mixed HEAD^
# --mixed是默认参数可省略
git reset HEAD^
```

不删除工作空间改动代码，只撤销commit，不撤销git add . 
```sh
git reset --soft HEAD^
```

删除工作空间改动代码，撤销commit，撤销git add . 
```sh
git reset --hard HEAD^
```
HEAD^的意思是上一个版本，也可以写成HEAD~1 ，如果你进行了2次commit，想都撤回，可以使用HEAD~2

修改commit注释
```sh
git commit --amend
```

## 删除远程分支

```sh
#查看所有分支
git branch -a
#删除本地
git branch -d <branchName>
#删除远程
git push origin --delete <branchName>
```