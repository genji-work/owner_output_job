const devProxy = require("./proxy.conf.js");

// 生成代理配置对象
let proxyObj = {};
for (let key in devProxy) {
  proxyObj[key] = {
    target: devProxy[key].target,
    changeOrigin: devProxy[key].changeOrigin,
    pathRewrite: {
      [`^${key}`]: key
    }
  };
}
module.exports = {
  devServer: {
    // open: process.platform === 'darwin',
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: true,
    // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
    proxy: proxyObj // string | Object
  }
};
