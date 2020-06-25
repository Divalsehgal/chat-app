const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://7142e9316180.ngrok.io',
            changeOrigin: true,
        })
    );
};