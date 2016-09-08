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

# 配置文件
<pre>
{
  // 主机配置
  Host: {
    // 监听端口，可以是一个数字，如：3000, 也可以是一个数组同时绑定多个端口，如：[3000, 3001, 3002]
    // 绑定多个端口主要是方便用Nginx做负载
    listen: Number | Array
    // 虚拟主机列表配置
    VirtualHosts: [
      {
        // 服务管理员，值为一个email地址
        ServerAdmin: String
        // 服务名称，如：test.domain.com
        ServerName: String
        // 服务别名，用于绑定虚拟主机，如：test.domain.com
        ServerAlias: String
        // 虚拟主机文档根目录，如：/data/wwwroot
        DocumentRoot: String
        // 模板引擎
        TemplateEngine: String
        // 服务器日志，尚未实现
        ServerLog: {
          // 错误日志
          error: String
          // 访问日志
          access: String
        }
        // 静态文件服务器
        StaticServer: {
          // 最在生命周期，毫秒
          maxage: Number
          // 是否可访问隐藏文件
          hidden: Boolean
          // 默认文件名，如：index.html
          index: String
          // 如果为true，允许任何下游中间件先响应
          defer: Boolean
          // 启用gzip
          gzip: Boolean
        }
      }
    ]
  }
｝
</pre>
