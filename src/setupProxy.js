const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
      credentials: 'include',
      onProxyReq: (proxyReq, req, res) => {
        console.log('Proxying request to:', proxyReq.path);
      }
    })
  );
  
  app.use(
    '/oauth2',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false,
      credentials: 'include'
    })
  );
};
