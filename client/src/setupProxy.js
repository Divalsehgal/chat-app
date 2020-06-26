const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target:`http://${"localhost:5000"||"ancient-cliffs-69442.herokuapp.com"}`,
            changeOrigin: true,
        })
    );
};