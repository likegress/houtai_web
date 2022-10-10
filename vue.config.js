const { defineConfig } = require("@vue/cli-service");
let API = process.env.VUE_APP_API;
console.log(API);
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: "",
  devServer: {
    proxy: {
      "/api": {
        target: API ,
        changeOrigin: true,
        pathReWrite: {
          "^/api": "",
        },
      },
    },
  },
});
