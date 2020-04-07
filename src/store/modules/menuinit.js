export const asyncRoutes = [
  {
    menuId: "DEMO-R0",
    path: "/user",
    component: "",
    name: "demo",
    meta: {
      title: "demo",
      icon: "report"
    },
    children: [
      {
        menuId: "DEMO-R0-1",
        path: "user-demo",
        component: "",
        name: "用户管理",
        meta: {
          title: "用户管理"
        }
      }
    ]
  },
  {
    menuId: "XQC-R0",
    path: "/servicemgt",
    component: "",
    name: "需求侧管理",
    meta: {
      title: "需求侧管理",
      icon: "management"
    },
    children: [
      {
        menuId: "XQC-R0-1",
        path: "grid-energy-saving",
        component: "",
        name: "电网节能管理",
        meta: {
          title: "电网节能管理",
          icon: "menuclose"
        },
        children: [
          {
            menuId: "XQC-R0-1-1",
            path: "project-info-mgt",
            component: "",
            name: "项目信息管理",
            meta: {
              title: "项目信息管理"
            }
          },
          {
            menuId: "XQC-R0-1-2",
            path: "grid-energy-saving-project-gather",
            component: "",
            name: "电网节能项目汇总",
            meta: {
              title: "电网节能项目汇总"
            }
          }
        ]
      },
      {
        menuId: "XQC-R0-2",
        path: "society-energy-saving-service-detail",
        component: "",
        name: "社会节能管理",
        meta: {
          title: "社会节能管理",
          icon: "menuclose"
        },
        children: [
          {
            menuId: "XQC-R0-2-1",
            path: "project-info-mgt",
            component: "",
            name: "项目信息管理",
            meta: {
              title: "项目信息管理"
            }
          },
          {
            menuId: "XQC-R0-2-2",
            path: "society-energy-saving-project-gather",
            component: "",
            name: "社会节能项目汇总",
            meta: {
              title: "社会节能项目汇总"
            }
          },
          {
            menuId: "XQC-R0-2-3",
            path: "client-project-info-summary",
            component: "",
            name: "项目信息汇总",
            meta: {
              title: "项目信息汇总"
            }
          }
        ]
      }
    ]
  },
  {
    menuId: "JLBB-R0",
    path: "/calculat-report",
    component: "",
    name: "计量报表",
    meta: {
      title: "计量报表",
      icon: "report"
    },
    children: [
      {
        menuId: "JLBB-R0-1",
        path: "calculat-report-gather",
        component: "",
        name: "计量报表汇总",
        meta: {
          title: "计量报表汇总"
        }
      }
    ]
  },
  {
    menuId: "ZXSB-R0",
    path: "/nationalreport",
    component: "",
    name: "中心上报",
    meta: {
      title: "中心上报",
      icon: "report"
    },
    children: [
      {
        menuId: "ZXSB-R0-1",
        path: "nationalreport",
        component: "",
        name: "中心上报",
        meta: {
          title: "中心上报"
        }
      }
    ]
  },
  {
    menuId: "SYSTEM-LOG",
    path: "/system-log",
    component: "",
    name: "系统日志",
    meta: {
      title: "系统日志",
      icon: "tabitemicon"
    },
    children: [
      {
        menuId: "SYSTEM-LOG-1",
        path: "system-log",
        component: "",
        name: "操作日志",
        meta: {
          title: "操作日志"
        }
      }
    ]
  }
];

