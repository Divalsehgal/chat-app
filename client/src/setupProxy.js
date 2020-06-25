const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://782c015d4afb.ngrok.io',
            changeOrigin: true,
        })
    );
};