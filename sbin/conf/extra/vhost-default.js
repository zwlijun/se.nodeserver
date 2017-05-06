"use strict";

const KOA              = require("koa");
const KOACompress      = require("koa-compress");
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
        this.virtualKOA = new KOA();
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
            require(path).mount(this.server);
            console.log(">>>>>>>>>>>>LOGIC MODULE DEAL[E]<<<<<<<<<<<<");
            console.log("    Load `NODE-INF` success. module = " + path);
        }catch(e){
            console.log(">>>>>>>>>>>>LOGIC MODULE DEAL[E]<<<<<<<<<<<<");
            console.log("    Load `NODE-INF` failed. module = " + path + "; message = " + e.message);
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
        let tplRoot = Path.resolve(vhost.NodeTemplateRoot);

        console.log("******************************************");
        console.log("VirtualHost DocumentRoot: " + docRoot);
        console.log("VirtualHost NodeTemplateRoot: " + tplRoot);
        console.log("******************************************");

        //装载业务的Node模块
        spawn("rm", ["-rf", this.dir(context.nms) + nms.alias]);
        spawn("ln", ["-s", nms.root, this.dir(context.nms) + nms.alias]);

        //设置压缩
        let compress = KOACompress({
            threshold: 64,
            flush: ZLib.Z_SYNC_FLUSH
        });
        vkoa.use(compress);

        //设置静态文件
        vkoa.use(new KOAStatic(docRoot, {
            maxage: staticServer.maxage || 0,
            hidden: true === staticServer.hidden,
            index:  staticServer.index || "index.html",
            defer:  true === staticServer.defer,
            gzip:   false !== staticServer.gzip
        }));

        //设置设置模板
        let views = KOAViews(tplRoot, {
            map: {
                html: vhost.TemplateEngine
            }
        });
        vkoa.use(views);

        //初始化业务Node模块脚本
        this.loadLogicModules(nms.alias);
    }
}

module.exports = VirtualHost;