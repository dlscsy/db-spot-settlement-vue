import Vue from "vue";
import Router from "vue-router";
import TheMainPage from "subjectframe/TheMainPage.vue";
import Login from "views/login";
import AssistEmptyRouterView from "views/AssistEmptyRouterView.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  // base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "mainpage",
      component: TheMainPage
    },
    {
      path: "/redirect",
      component: TheMainPage,
      hidden: true,
      children: [
        {
          path: "/redirect/:path*",
          component: () => import("views/redirect/index")
        }
      ]
    },
    {
      path: "/servicemgt",
      component: TheMainPage,
      name: "需求侧管理",
      redirect: "noRedirect",
      meta: {
        title: "需求侧管理",
        icon: "management"
      },
      children: [
        {
          path: "grid-energy-saving",
          component: AssistEmptyRouterView,
          name: "电网节能管理",
          redirect: "noRedirect",
          meta: {
            title: "电网节能管理"
          },
          children: [
            {
              path: "project-info-mgt",
              component: () =>
                import(
                  "views/scptp-report/servicemgt/self-side/sprojectmgt/SProjectMgt"
                ),
              name: "项目信息管理",
              meta: {
                title: "项目信息管理"
              }
            },
            {
              path: "grid-energy-saving-project-gather",
              component: () =>
                import(
                  "views/scptp-report/servicemgt/client-side/ClientSideSummary"
                ),
              name: "电网节能项目汇总",
              meta: {
                title: "电网节能项目汇总",
                projectSide: 0
              }
            }
          ]
        },
        {
          path: "society-energy-saving-service-detail",
          component: AssistEmptyRouterView,
          name: "社会节能管理",
          redirect: "noRedirect",
          meta: {
            title: "社会节能管理"
          },
          children: [
            {
              path: "project-info-mgt",
              component: () =>
                import(
                  "views/scptp-report/servicemgt/self-side/cprojectmgt/CProjectMgt"
                ),
              name: "社会节能服务明细表项目信息管理",
              meta: {
                title: "项目信息管理"
              }
            },
            {
              path: "society-energy-saving-project-gather",
              component: () =>
                import(
                  "views/scptp-report/servicemgt/client-side/ClientSideSummary"
                ),
              name: "社会节能项目汇总",
              meta: {
                title: "社会节能项目汇总",
                projectSide: 1
              }
            },
            {
              path: "client-project-info-summary",
              component: () =>
                import(
                  "views/scptp-report/servicemgt/client-side/summary/CProjectSummary"
                ),
              name: "项目信息汇总",
              meta: {
                title: "项目信息汇总",
                projectSide: 1
              }
            }
          ]
        }
      ]
    },
    {
      path: "/calculat-report",
      component: TheMainPage,
      name: "计量报表",
      redirect: "noRedirect",
      meta: {
        title: "计量报表",
        icon: "report"
      },
      children: [
        {
          path: "calculat-report-gather",
          component: () =>
            import("views/scptp-report/calculatemgt/CalculateSideSummary"),
          name: "计量报表汇总",
          meta: {
            title: "计量报表汇总"
          }
        }
      ]
    },
    {
      path: "/nationalreport",
      component: TheMainPage,
      name: "中心上报",
      // redirect: "noRedirect",
      meta: {
        title: "中心上报",
        icon: "report"
      },
      children: [
        {
          path: "nationalreport",
          component: () =>
              import("views/spot/nationalreport/NationalReport"),
          name: "中心上报",
          meta: {
            title: "中心上报"
          }
        }
      ]
    },
    {
      path: "/system-log",
      component: TheMainPage,
      name: "系统日志",
      // redirect: "noRedirect",
      meta: {
        title: "系统日志",
        icon: "report"
      },
      children: [
        {
          path: "system-log",
          component: () => import("views/log/SystemLog"),
          name: "操作日志",
          meta: {
            title: "操作日志"
          }
        }
      ]
    }
  ]
});

/**
 * redirect: "noRedirect"        如果不希望通过路径面包屑点击链接跳转路由的话
 * name: "router-name"           设置路由名称（必填），主要用于路由与TAB标签页之间的联动关系
 * meta : {
    title: "title"               标题的设置可以用于显示在浏览器标签页上或者路径面包屑中，在菜单加载中用于菜单项的标题显示
    icon: "svg-name"             用于菜单项中的图标
    noCache: true                是否页面需要保持页面中数据的缓存状态
    noClose: true                是否tab页可以关闭
    breadcrumb: false            是否在路径面包屑中显示该路由路径信息
    activeMenu: "/example/list"  是否是激活的菜单路由
  }
 */
