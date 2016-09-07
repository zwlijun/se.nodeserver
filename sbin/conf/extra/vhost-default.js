"use strict";

const KOA              = require("koa");
const KOAVHost         = require("koa-vhost");
const KOACompress      = require("koa-compress");
const KOAMount         = require("koa-mount");
const KOARouter        = require("koa-router");
const KOARewrite       = require("koa-rewrite");
const KOAStatic        = require("koa-static");
const KOAViews         = require("koa-views");

const Path             = require('path');
const ZLib             = require('zlib');

class VirtualHost{
    constructor(vhostConf, ServerKOA){
        this.vhost = vhostConf;
        this.serverKOA = ServerKOA;
        this.virtualKOA = KOA();
    }

    get server(){
        return this.virtualKOA;
    }

    load(){
        let vkoa = this.virtualKOA;
        let vhost = this.vhost;
        let staticServer = vhost.StaticServer || {};

        let docRoot = Path.resolve(vhost.DocumentRoot);
        //设置静态文件
        vkoa.use(KOAStatic(docRoot, {
            maxage: staticServer.maxage || 0,
            hidden: staticServer.hidden || false,
            index: staticServer.index || "index.html",
            defer: staticServer.defer || false,
            gzip: staticServer.gzip || true
        }));

        //设置压缩
        vkoa.use(KOACompress({
            threshold: 64,
            flush: ZLib.Z_SYNC_FLUSH
        }));

        //设置设置模板
        vkoa.use(KOAViews(docRoot), {
            map: {
                html: vhost.TemplateEngine
            }
        });

        //设置路由
        // let Router = KOARouter();

        // Router.get("/", function *(next){
        //  this.body = "It's works!";
        // });
        // vkoa.use(KOAMount("/", Router.middleware()));

    }
}

module.exports = VirtualHost;