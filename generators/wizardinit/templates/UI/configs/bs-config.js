var proxyMiddleware = require('http-proxy-middleware');
var fallbackMiddleware = require('connect-history-api-fallback');

module.exports = {
    server: {
        middleware: {
            1: proxyMiddleware('/CohortsAPI', {
                target: 'http://localhost/CohortsVivek/CohortsAPI',
                changeOrigin: true,   // for vhosted sites, changes host header to match to target's host
                logLevel: 'debug'
            }),

            2: fallbackMiddleware({
                index: '/index.html', verbose: true
            })
        }
    }
};