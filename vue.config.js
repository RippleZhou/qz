const { VUE_APP_HOST } = process.env;
module.exports = {
  devServer: {
    proxy: {
      "/": {
        target: VUE_APP_HOST,
        changeOrigin: true,
        ws: false,
        pathRewrite: {}
      }
    }
  }
};
