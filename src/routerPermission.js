// 系统前台路由守卫

import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/auth";
import getPageTitle from "@/utils/get-page-title";

NProgress.configure({ showSpinner: false });

// 设置白名单
const whiteList = ["/login"];

router.beforeEach(async (to, from, next) => {
  NProgress.start();

  document.title = getPageTitle(to.meta.title);

  const hasToken = getToken();

  // debugger;
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      next();
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login?redirect=${to.path}`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
