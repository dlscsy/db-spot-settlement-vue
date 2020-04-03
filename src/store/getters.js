// 定义全局公共的getter，方便项目各个部分能够快速获得全局公共状态
const getters = {
  authMenus: state => state.menuAuth.sideMenu.authMenus,
  isCollapse: state => state.menuAuth.sideMenu.isCollapse,
  visitedTabs: state => state.tabs.visitedTabs,
  cachedTabs: state => state.tabs.cachedTabs,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo
};
export default getters;
