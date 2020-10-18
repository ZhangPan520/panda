module.exports = {
  devServer: {
    proxy: { // 反向代理
      '/maoyan': {
        target: 'https://m.maoyan.com',
        changeOrigin: true,
        pathRewrite: {
          '^/maoyan': ''
        }
      }
    }
  }
}
