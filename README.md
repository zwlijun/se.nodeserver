# se.nodeserver
基于NodeJS和KOA搭建的Web应用框架 

# 目录结构
+ nodeserver
  + node_modules  node模块，自行决定安装哪些模块
    + koa
    + koa-compress
    + koa-mount
    + koa-rewrite
    + koa-router
    + koa-static
    + koa-vhost
    + koa-views
  + sbin  应用目录，启动和配置虚拟主机
    + conf  配置目录
      + extra 虚拟主机配置及实现
        - vhost-default.js  默认虚拟主机，格式 vhost-${ServerAlias}.js
      - conf.app.js 服务装载(端口监听、虚拟主机装载)
      - conf.js HOST配置文件
    - server.js 服务启动文件
    - startup.sh  Shell脚本，根据实际情况调整
