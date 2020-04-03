// 状态控制器入口
import Vue from "vue";
import Vuex from "vuex";

import menuAuth from "store/modules/menu-auth";
import tabs from "store/modules/tabs";
import user from "store/modules/user";
import getters from "./getters";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // 引入模块
    menuAuth,
    tabs,
    user
  },
  // 引入getter
  getters
});
