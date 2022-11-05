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
      },
      '/socket': {
        target: 'ws://localhost:9090',
        ws: false,
        originChange: true,
        pathRewrite: {
          '/socket': ''
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
