const { VUE_APP_HOST } = process.env;
module.exports = {
  publicPath:'/wardenzh/',
  devServer: {
    proxy: {
      "/warden": {
        target: VUE_APP_HOST,
        changeOrigin: true,
        ws: false,
        pathRewrite: {
            "^/warden": "/"
        }
      }
    }
  }
};
