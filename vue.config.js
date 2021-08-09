module.exports = {
  devServer: {
    port: 8000,
    proxy: {
      '/api/login': {
        target: 'http://localhost:8080/api/login',
        ws: true,
        changeOrigin: true
      },
      '/api/register': {
        target: 'http://localhost:8080/api/register',
        ws: true,
        changeOrigin: true
      },
      '/api/cert': {
        target: 'http://localhost:8080/api/cert',
        ws: true,
        changeOrigin: true
      }
    }
  }
}
