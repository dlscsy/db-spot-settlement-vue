// 菜单的状态控制器模块
import Cookies from "js-cookie";
import { UPDATE_AUTH_MENU, TOGGLE_MENU_COLLAPSE } from "store/MutationTypes";
import { asyncRoutes } from "./menuinit";

// 定义该模块的状态
const state = {
  sideMenu: {
    authMenus: asyncRoutes,
    isCollapse: Cookies.get("sidebarStatus")
      ? !!+Cookies.get("sidebarStatus")
      : true
  }
};

// 定义该模块更新状态的方法
const mutations = {
  [TOGGLE_MENU_COLLAPSE](state) {
    state.sideMenu.isCollapse = !state.sideMenu.isCollapse;
    if (state.sideMenu.isCollapse) {
      Cookies.set("sidebarStatus", 1);
    } else {
      Cookies.set("sidebarStatus", 0);
    }
  },
  [UPDATE_AUTH_MENU](state, _authMenus_) {
    state.authMenus = _authMenus_;
  }
  // someFun: (state, param) => {}
  // 其中param提供外在参数，可选
  // 【mutation】通过commit方法调用
};

// 定义该模块异步处理方法
const actions = {
  updateAuthMenu({ commit }) {
    commit(UPDATE_AUTH_MENU);
  }
  // 分发Action的方式为store.dispatch("some-action")，在Module形式拆分声明的情况下为context.dispatch("some-action")
  // someFun: ({ dispatch, commit, getters, rootState, rootGetters }) => {}
  // 参数rootState是在Module形式拆分声明的情况下能够暴露出来
  // 参数rootGetters在Module形式拆分声明并且该Module的namespaced为true的情况下能够暴露出来
  // 若需要在全局命名空间内分发【action】或提交【mutation】，将{ root: true }作为第三参数传给【dispatch】或【commit】即可
};

const getters = {
  // someFun: ({ state, getters, rootState, rootGetters }) => {}
  // 参数rootState是在Module形式拆分声明的情况下能够暴露出来
  // 参数rootGetters在Module形式拆分声明并且该Module的namespaced为true的情况下能够暴露出来
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
