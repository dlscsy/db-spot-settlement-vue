// TAB页的状态控制器模块
import {
  ADD_VISITED_TAB,
  UPDATE_VISITED_TAB,
  DEL_VISITED_TAB,
  DEL_OTHER_VISITED_TABS,
  DEL_ALL_VISITED_TABS,
  ADD_CACHED_TAB,
  DEL_CACHED_TAB,
  DEL_OTHER_CACHED_TABS,
  DEL_ALL_CACHED_TABS
} from "store/MutationTypes";

// 定义该模块的状态
const state = {
  visitedTabs: [], // 打开过的即访问过的TAB标签页集合
  cachedTabs: [] // 需要保持页面中数据的缓存状态的TAB标签页集合
};

// 定义该模块更新状态的方法
const mutations = {
  [ADD_VISITED_TAB](state, tab_route) {
    if (state.visitedTabs.some(t => t.path === tab_route.path)) return;
    state.visitedTabs.push(
      Object.assign({}, tab_route, {
        title: tab_route.meta.title || "未命名标签页"
      })
    );
  },
  [ADD_CACHED_TAB](state, tab) {
    if (state.cachedTabs.includes(tab.name)) return;
    if (!tab.meta.noCache) {
      state.cachedTabs.push(tab.name);
    }
  },
  [UPDATE_VISITED_TAB](state, tab) {
    for (let t of state.visitedTabs) {
      if (t.path === tab.path) {
        t = Object.assign(t, tab);
        break;
      }
    }
  },
  [DEL_VISITED_TAB](state, tab) {
    for (const [i, t] of state.visitedTabs.entries()) {
      if (t.path === tab.path) {
        state.visitedTabs.splice(i, 1);
        break;
      }
    }
  },
  [DEL_OTHER_VISITED_TABS](state, tab) {
    state.visitedTabs = state.visitedTabs.filter(t => {
      return t.meta.noClose || t.path === tab.path;
    });
  },
  [DEL_ALL_VISITED_TABS](state) {
    const noCloseTabs = state.visitedTabs.filter(tab => tab.meta.noClose);
    state.visitedTabs = noCloseTabs;
  },
  [DEL_CACHED_TAB](state, tab) {
    for (const i of state.cachedTabs) {
      if (i === tab.name) {
        const index = state.cachedTabs.indexOf(i);
        state.cachedTabs.splice(index, 1);
        break;
      }
    }
  },
  [DEL_OTHER_CACHED_TABS](state, tab) {
    for (const i of state.cachedTabs) {
      if (i === tab.name) {
        const index = state.cachedTabs.indexOf(i);
        state.cachedTabs = state.cachedTabs.slice(index, index + 1);
        break;
      }
    }
  },
  [DEL_ALL_CACHED_TABS](state) {
    state.cachedTabs = [];
  }
};

// 定义该模块异步处理方法
const actions = {
  addTab({ dispatch }, tab) {
    dispatch("addVisitedTab", tab);
    dispatch("addCachedTab", tab);
  },
  addVisitedTab({ commit }, tab) {
    commit(ADD_VISITED_TAB, tab);
  },
  addCachedTab({ commit }, tab) {
    commit(ADD_CACHED_TAB, tab);
  },
  updateVisitedTab({ commit }, tab) {
    commit(UPDATE_VISITED_TAB, tab);
  },
  delTab({ dispatch, state }, tab) {
    return new Promise(resolve => {
      dispatch("delVisitedTab", tab);
      dispatch("delCachedTab", tab);
      resolve({
        visitedTabs: [...state.visitedTabs],
        cachedTabs: [...state.cachedTabs]
      });
    });
  },
  delVisitedTab({ commit, state }, tab) {
    return new Promise(resolve => {
      commit(DEL_VISITED_TAB, tab);
      resolve([...state.visitedTabs]);
    });
  },
  delCachedTab({ commit, state }, tab) {
    return new Promise(resolve => {
      commit(DEL_CACHED_TAB, tab);
      resolve([...state.cachedTabs]);
    });
  },
  delOtherTabs({ dispatch, state }, tab) {
    return new Promise(resolve => {
      dispatch("delOtherVisitedTabs", tab);
      dispatch("delOtherCachedTabs", tab);
      resolve({
        visitedTabs: [...state.visitedTabs],
        cachedTabs: [...state.cachedTabs]
      });
    });
  },
  delOtherVisitedTabs({ commit, state }, tab) {
    return new Promise(resolve => {
      commit(DEL_OTHER_VISITED_TABS, tab);
      resolve([...state.visitedTabs]);
    });
  },
  delOtherCachedTabs({ commit, state }, tab) {
    return new Promise(resolve => {
      commit(DEL_OTHER_CACHED_TABS, tab);
      resolve([...state.cachedTabs]);
    });
  },
  delAllTabs({ dispatch, state }) {
    return new Promise(resolve => {
      dispatch("delAllVisitedTabs");
      dispatch("delAllCachedTabs");
      resolve({
        visitedTabs: [...state.visitedTabs],
        cachedTabs: [...state.cachedTabs]
      });
    });
  },
  delAllVisitedTabs({ commit, state }) {
    return new Promise(resolve => {
      commit(DEL_ALL_VISITED_TABS);
      resolve([...state.visitedTabs]);
    });
  },
  delAllCachedTabs({ commit, state }) {
    return new Promise(resolve => {
      commit(DEL_ALL_CACHED_TABS);
      resolve([...state.cachedTabs]);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
