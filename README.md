# SE.NodeServer
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
        // 监听端口，值为数字或数组
        // 如：3000、[3000, 3001, 3002]
        // 数组主要是方便Nginx做负载
        listen: Number | Array
        // 虚拟主机列表配置
        VirtualHosts: [
            {
                // 管理员邮箱，如：admin@domain.com
                ServerAdmin: String
                // 服务名称，如：domain.com
                ServerName: String
                // 服务别名，如：domain.com
                ServerAlias: String
                // 站点根目录，如：/data/wwwroot
                DocumentRoot: String
                // 模板引擎，如：ejs
                TemplateEngine: String
                // 服务日志，未实现
                ServerLog: {
                    // 错误日志
                    error: String
                    // 访问日志
                    access: String
                }
                // 静态服务器置 @see https://github.com/koajs/static
                StaticServer: {
                    // Browser cache max-age in milliseconds. defaults to 0
                    maxage: Number
                    // Allow transfer of hidden files. defaults to false
                    hidden: Boolean
                    // Default file name, defaults to 'index.html'
                    index: String
                    // If true, serves after yield next, 
                    // allowing any downstream middleware to respond first.
                    defer: Boolean
                    // Try to serve the gzipped version of a file automatically 
                    // when gzip is supported by a client and if the requested 
                    // file with .gz extension exists. defaults to true.
                    gzip: Boolean
                }
            }
        ]
    }
}
</pre>
