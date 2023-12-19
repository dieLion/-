const webpackDev = require("./webpack.dev")
const webpackBase = require("./webpack.base")
const webpackProd = require("./webpack.prod")

module.exports = (env) => {
  let obj = {}
  //生产环境
  if (env && env.prod === 'production') {
    obj = {
      ...webpackBase,
      ...webpackProd
    }
    if (webpackProd.plugins) {
      obj.plugins = [...webpackBase.plugins, ...webpackProd.plugins]
    }
  }
  else {
    obj = {
      ...webpackBase,
      ...webpackDev
    }
    if (webpackDev.plugins) {
      obj.plugins = [...webpackBase.plugins, ...webpackDev.plugins]
    }
  }
  console.log(obj.plugins)
  return obj
}