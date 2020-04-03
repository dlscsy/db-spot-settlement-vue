"use strict";
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

const port = process.env.port || process.env.npm_config_port || 8088; // dev port

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  outputDir: process.env.outputDir,
  assetsDir: "static",
  lintOnSave: process.env.NODE_ENV === "development",
  productionSourceMap: false,
  devServer: {
    port: port,
    open: false, // 是否加载完成之后直接打开浏览器
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src"),
        assets: resolve("src/assets"),
        components: resolve("src/components"),
        router: resolve("src/router"),
        store: resolve("src/store"),
        styles: resolve("src/styles"),
        templates: resolve("src/templates"),
        utils: resolve("src/utils"),
        views: resolve("src/views"),
        subjectframe: resolve("src/views/subject-frame")
      }
    }
  },
  chainWebpack(config) {
    // 设置svg-sprite-loader
    config.module
      .rule("svg")
      .exclude.add(resolve("src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end();
  },
  pages: {
    index: {
      entry: "./src/index.js"
    }
  }
};
