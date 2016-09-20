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
const spawn            = require('child_process').spawnSync;

class VirtualHost{
    constructor(vhostConf, ServerKOA, AppContext){
        this.vhost = vhostConf;
        this.serverKOA = ServerKOA;
        this.AppContext = AppContext;
        this.virtualKOA = KOA();
    }

    get server(){
        return this.virtualKOA;
    }

    dir(path){
        if(path.endsWith("/")){
            return path;
        }

        return path + "/";
    }

    loadLogicModules(path){
        console.log(">>>>>>>>>>>>LOGIC MODULE DEAL[S]<<<<<<<<<<<<");
        try{
            require(path);
            console.log(">>>>>>>>>>>>LOGIC MODULE DEAL[E]<<<<<<<<<<<<");
            console.log("    Load `NODE-INF` success. module = " + path);
        }catch(e){
            console.log(">>>>>>>>>>>>LOGIC MODULE DEAL[E]<<<<<<<<<<<<");
            console.log("    Load `NODE-INF` failed. message = " + e.message);
            // this.loadLogicModules(path);
        }
    }

    load(){
        let context = this.AppContext;
        let vkoa = this.virtualKOA;
        let vhost = this.vhost;
        let staticServer = vhost.StaticServer || {};
        let nms = vhost.NodeModules;

        let docRoot = Path.resolve(vhost.DocumentRoot);
        //设置静态文件
        vkoa.use(KOAStatic(docRoot, {
            maxage: staticServer.maxage || 0,
            hidden: staticServer.hidden || false,
            index: staticServer.index || "index.html",
            defer: staticServer.defer || false,
            gzip: staticServer.gzip || true
        }));

        //装载业务的Node模块
        spawn("rm", ["-rf", this.dir(context.nms) + nms.alias]);
        spawn("ln", ["-s", nms.root, this.dir(context.nms) + nms.alias]);

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

        //初始化业务Node模块脚本
        this.loadLogicModules(nms.alias);

        //设置路由
        // let Router = KOARouter();

        // Router.get("/", function *(next){
        //  this.body = "It's works!";
        // });
        // vkoa.use(KOAMount("/", Router.middleware()));

    }
}

module.exports = VirtualHost;