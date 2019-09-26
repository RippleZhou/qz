"use strict";

import Vue from "vue";
import md5 from "js-md5";

Plugin.install = function(Vue) {
  Object.defineProperties(Vue.prototype, {
    $md5: {
      get() {
        return md5;
      }
    },
    md5: {
      get() {
        return md5;
      }
    }
  });
};

Vue.use(Plugin);

export default Plugin;
