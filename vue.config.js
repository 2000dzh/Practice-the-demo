module.exports = {
  lintOnSave: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        'D:\\新前端\\scss-vue3\\src\\assets\\styles\\variables.scss',
        "D:\\新前端\\scss-vue3\\src\\assets\\styles\\mixins.scss",
      ],
    },
  },
  css: {
    requireModuleExtension: true, //开启 CSSmodule 并保留xxx.module.css后缀
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  //需要配置10kb下的图片打包成base64的格式
  chainWebpack: (config) => {
    config.module
      .rule("images")
      .use("url-loader")
      .loader("url-loader")
      .tap((options) => Object.assign(options, { limit: 10000 }));
  },
  configureWebpack: {
    plugins: [require("unplugin-vue-define-options/webpack")()],
  },
};
