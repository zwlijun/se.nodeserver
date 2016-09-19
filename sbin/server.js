"use strict";

const Host          = require("./conf/conf").Host;
const ServerApp     = require("./conf/conf.app");
const VirtualHosts  = Host.VirtualHosts;
const listen        = Host.listen;

let dirname = __dirname;
let serverRoot = dirname.substring(0, dirname.indexOf("/sbin"));

let AppContext = {
	root: serverRoot,
	sbin: dirname,
	app: serverRoot + "/app"
};

console.log("##########################################");
console.log("AppContext: " + JSON.stringify(AppContext));
console.log("VirtualHosts: " + VirtualHosts.length);
console.log("Listen: " + listen);

let App = new ServerApp(AppContext);

for(let i = 0; i < VirtualHosts.length; i++){
    App.load(VirtualHosts[i]);
}

App.listen(listen);
console.log("##########################################");
