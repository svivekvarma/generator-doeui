var Agent = require('agentkeepalive');
var proxyMiddleware = require('http-proxy-middleware');
var fallbackMiddleware = require('connect-history-api-fallback');

var keepaliveAgent = new Agent({
    //maxSockets: 100,
    keepAlive: true
    //maxFreeSockets: 10,
    //keepAliveMsecs: 1000,
    //timeout: 60000,
    //keepAliveTimeout: 30000 // free socket keepalive for 30 seconds
});

var onProxyRes = function (proxyRes, req, res) {
    //console.log("Hello");
    //console.log(proxyRes.headers);
    //console.log(req.headers);
    //console.log(res.headers);
    var key = 'www-authenticate';

    proxyRes.headers[key] = proxyRes.headers[key] && proxyRes.headers[key].split(',');
};

//https://github.com/aws/aws-sdk-js/issues/1137
//https://github.com/nodejs/node/issues/8650
module.exports = {
    server: {
        middleware: {
            1: proxyMiddleware('/CohortsAPI', {
                target: 'http://localhost/CohortsVivek/CohortsAPI',
                changeOrigin: true,   // for vhosted sites, changes host header to match to target's host
                logLevel: 'debug',
                onProxyRes: onProxyRes,
                agent: keepaliveAgent
            }),

            2: fallbackMiddleware({
                index: '/index.html', verbose: true
            })
        }
    }
};