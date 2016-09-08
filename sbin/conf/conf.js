"use strict";

/*******************************************************
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
*******************************************************/
module.exports = {
    Host: {
        listen: [
            3001,
            3002,
            3003
        ],
        VirtualHosts: [
            {
                ServerAdmin: "zwlijun@qq.com",
                ServerName: "localhost",
                ServerAlias: "localhost",
                DocumentRoot: "/data/wwwroot/seshenghuo/seshenghuo/htdocs",
                TemplateEngine: "ejs",
                ServerLog: {
                    error: "",
                    access: ""
                },
                StaticServer: {
                    maxage: 15 * 60 * 1000, //15m
                    hidden: false,
                    index: "index.html",
                    defer: false,
                    gzip: true
                }
            },
            {
                ServerAdmin: "zwlijun@qq.com",
                ServerName: "dev.third.com",
                ServerAlias: "dev.third.com",
                DocumentRoot: "/data/wwwroot/third",
                TemplateEngine: "ejs",
                ServerLog: {
                    error: "",
                    access: ""
                },
                StaticServer: {
                    maxage: 15 * 60 * 1000, //15m
                    hidden: false,
                    index: "index.html",
                    defer: false,
                    gzip: true
                }
            }
        ]
    }
};