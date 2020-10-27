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