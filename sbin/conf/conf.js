"use strict";

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