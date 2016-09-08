"use strict";

const Host          = require("./conf/conf").Host;
const ServerApp     = require("./conf/conf.app");
const VirtualHosts  = Host.VirtualHosts;
const listen        = Host.listen;

console.log("##########################################");
console.log("VirtualHosts: " + VirtualHosts.length);
console.log("Listen: " + listen);

var App = new ServerApp();

for(let i = 0; i < VirtualHosts.length; i++){
    App.load(VirtualHosts[i]);
}

App.listen(listen);
console.log("##########################################");
