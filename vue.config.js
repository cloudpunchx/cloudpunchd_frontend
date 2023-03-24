// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
//   configureWebpack: {
//     devtool: `source-map`
//   }
// })

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new MiniCssExtractPlugin()
    ]
  }
};
