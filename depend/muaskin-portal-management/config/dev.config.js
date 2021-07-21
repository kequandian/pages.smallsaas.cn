export default {
  proxy: {
    '/api': {
      target: 'http://120.79.77.207:8080',
      changeOrigin: true,
      // pathRewrite: { '^/server': '' },
    },
  }
}