const { defineConfig } = require("@vue/cli-service");
let API = process.env.VUE_APP_API;
console.log(API);
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://shop.datong0.com",
        changeOrigin: true,
        pathReWrite: {
          "^/api": "",
        },
      },
    },
  },
});
