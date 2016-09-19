"use strict";

const KOA              = require("koa");
const KOAVHost         = require("koa-vhost");
const KOACompress      = require("koa-compress");

const Path             = require('path');
const ZLib             = require('zlib');

// 默认端口
const DEFAULT_LISTEN_PORT = 3000;
// 默认虚拟主机配置
const DEFAULT_VIRTUAL_HOST = "default";

/**
 * 服务应用
 */
class ServerApp{
    constructor(context){
        var koa = this.koa = KOA();

        koa.use(KOACompress({
            threshold: 64,
            flush: ZLib.Z_SYNC_FLUSH
        }));

        this.AppContext = context;
    }

    get server(){
        return this.koa;
    }

    vhost(file){
        let VirtualHost = null;

        try{
            VirtualHost = require("./extra/vhost-" + file);
        }catch(e){
            VirtualHost = null;

            console.error("    The virtual host(" + file + ") not found. ");
        }finally{
            return VirtualHost;
        }
    }

    load(vhost){
        console.log("******************************************");
        console.log("Load Virtual Host => " + vhost.ServerAlias + " {");
        let VirtualHost = this.vhost(vhost.ServerAlias);

        if(!VirtualHost){
            VirtualHost = this.vhost(DEFAULT_VIRTUAL_HOST);
            console.log("    Try to use \"" + DEFAULT_VIRTUAL_HOST + "\" host.");
        }

        if(!VirtualHost){
            console.error("    The virtual host not found.");
            process.exit(1);
        }else{
            const vsa = new VirtualHost(vhost, this.koa, this.AppContext);

            vsa.load();

            this.koa.use(KOAVHost(vhost.ServerAlias, vsa.server));
        }
        console.log("}");
    }

    listen(listen){
        let _listen = listen || DEFAULT_LISTEN_PORT;

        if(Array.isArray(_listen)){
            listen.map(function(currentValue, index, _array){
                this.listen(currentValue, function(){
                    console.log("server listen on port: " + currentValue);
                });
            }, this.koa);
        }else{
            _listen = Number(_listen);

            if(isNaN(_listen)){
                _listen = DEFAULT_LISTEN_PORT;
                console.log("\"listen\" not a numeric, use the default listen => " + DEFAULT_LISTEN_PORT);
            }

            this.koa.listen(_listen, function(){
                console.log("server listen on port: " + listen);
            });
        }
    }
};

module.exports = ServerApp;