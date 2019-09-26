import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import wallet from "./wallet.module";
import order from "./order.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    wallet,
    order
  }
});
