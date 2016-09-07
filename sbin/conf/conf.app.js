"use strict";

const KOA              = require("koa");
const KOAVHost         = require("koa-vhost");
const KOACompress      = require("koa-compress");

const Path             = require('path');
const ZLib             = require('zlib');

class ServerApp{
    constructor(){
        var koa = this.koa = KOA();

        koa.use(KOACompress({
            threshold: 64,
            flush: ZLib.Z_SYNC_FLUSH
        }));
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
            VirtualHost = this.vhost("default");
            console.log("    Try to use default host.");
        }

        if(!VirtualHost){
            console.error("    The virtual host not found.");
            process.exit(1);
        }else{
            const vsa = new VirtualHost(vhost, this.koa);

            vsa.load();

            this.koa.use(KOAVHost(vhost.ServerAlias, vsa.server));
        }
        console.log("}");
        console.log("******************************************");
    }

    listen(listen){
        let _listen = listen || 3000;

        if(Array.isArray(_listen)){
            listen.map(function(currentValue, index, _array){
                this.listen(currentValue, function(){
                    console.log("server listen on port: " + currentValue);
                });
            }, this.koa);
        }else{
            this.koa.listen(_listen, function(){
                console.log("server listen on port: " + listen);
            });
        }
    }
};

module.exports = ServerApp;