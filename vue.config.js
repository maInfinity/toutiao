const path = require('path')
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${path.resolve(__dirname, 'src/styles/cover.less')}";`
        }
      }
    }
  }
}
