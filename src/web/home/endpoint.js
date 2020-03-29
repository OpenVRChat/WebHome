var config = require("./config.js")
var isElectron = "true" === app.dataset.isElectron;
var endpoint = app.dataset.endpoint;
window.isElectron = isElectron;
window.apiKey = "JlE5Jldo5Jibnk5O5hTx6XVqsJu4WJ26";
window.endpoint = isElectron ? endpoint : window.location.origin;
var isProd = -1 !== window.endpoint.indexOf("api.vrchat.cloud") && -1 === window.endpoint.indexOf("dev");
var debugEndpoint = new URL(window.location.href).searchParams.get("endpoint");
if(null != debugEndpoint)
    window.endpoint = debugEndpoint
window.environment = isProd ? "production" : "development"
if("production" === window.environment && -1 === window.location.href.indexOf("keeplogs")) {
    console.info = function() {};
    console.log = function() {};
    console.group = function() {};
}
window.apiUrl = function(n) {
    var i = "?";
    if(-1 < n.indexOf("?"))
        i = "&";
    return `${config.apiAddress}${n}${i}apiKey=${window.apiKey}`
};
var pipelineEndpoint = "ws://localhost:1337";
if(0 <= window.endpoint.indexOf("api"))
    pipelineEndpoint = window.endpoint.replace("api", "pipeline").replace("http", "ws");
if(0 <= window.endpoint.indexOf("vrchat.com") || 0 <= window.endpoint.indexOf("vrchat.net"))
    pipelineEndpoint = "wss://pipeline.vrchat.cloud";

module.exports = {
    endpoint: window.endpoint,
    pipelineEndpoint: pipelineEndpoint,
    isProd: isProd,
    apiUrl: window.apiUrl
};
