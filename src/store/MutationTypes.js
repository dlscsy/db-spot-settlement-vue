// 用常量的方式定义全局更新状态的方法

// 更新菜单--还未真正使用
export const UPDATE_AUTH_MENU = "updateAuthMenu";
// 转换菜单【收起/展开】状态
export const TOGGLE_MENU_COLLAPSE = "toggleMenuCollapse";
// 新增访问的TAB标签页
export const ADD_VISITED_TAB = "addVisitedTab";
// 更新访问的TAB标签页--目前了解的是适用于$route.fullPath的情况，以用于识别路由中携带参数并且参数发生改变时触发
export const UPDATE_VISITED_TAB = "updateVisitedTab";
// 访问的TAB标签页中指定删除某个TAB标签页
export const DEL_VISITED_TAB = "delVisitedTab";
// 访问的TAB标签页中指定删除其他TAB标签页
export const DEL_OTHER_VISITED_TABS = "delOtherVisitedTabs";
// 删除所有访问的TAB标签页
export const DEL_ALL_VISITED_TABS = "delAllVisitedTabs";
// 新增需要缓存页面数据状态的TAB标签页
export const ADD_CACHED_TAB = "addCachedTab";
// 需要缓存页面数据状态的TAB标签页中指定删除某个TAB标签页
export const DEL_CACHED_TAB = "delCachedTab";
// 需要缓存页面数据状态的TAB标签页中指定删除其他TAB标签页
export const DEL_OTHER_CACHED_TABS = "delOtherCachedTabs";
// 删除需要缓存页面数据状态的TAB标签页
export const DEL_ALL_CACHED_TABS = "delAllCachedTabs";
// 设置TOKEN
export const SET_TOKEN = "setToken";
// 设置用户信息
export const SET_USER_INFO = "setUserInfo";
