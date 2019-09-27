import Vue from "vue";

import "./plugins/axios";
import "./plugins/js-md5";
import "./plugins/vant.js";

import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@/assets/less/main.less";

import ApiService from "@/service/api.service";
import { SET_AUTH } from "./store/mutations.type";
ApiService.init(); // 初始化

Vue.config.productionTip = false;

// 全局守卫
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("userInfo");
  const { isLogin } = store.state.auth;
  if (isLogin) {
    next()
  }
  if (user) {
    store.commit(SET_AUTH, JSON.parse(user));
    next();
  } else if (to.name !== "login") {
    next("/login");
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
