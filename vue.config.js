const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/school': {
        target: 'http://localhost:9090',
        originChange: true,
        pathRewrite: {
          '/school': ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            'primary-color': '#0AA679'
          }
        }
      }
    }
  }
})
