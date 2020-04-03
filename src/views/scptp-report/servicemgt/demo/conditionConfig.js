// 条件区域配置
export const conditionConfig = {
  // 选填，配置项参考el-form的API
  formMeta: {},
  // 选填，附加的查询条件
  additionalConditions: {},
  // 必填
  items: [
    {
      key: "account",
      label: "用户账号",
      type: "input",
      subType: "text",
      widgetMeta: {
        placeholder: "请输入用户账号"
      },
      initValue: "sadasdas"
    },
    {
      key: "userName",
      label: "用户姓名",
      type: "input",
      subType: "text",
      widgetMeta: {
        placeholder: "请输入账户姓名"
      },
      initValue: ""
    },
    {
      key: "orgCode",
      label: "所属组织机构",
      type: "tree-select",
      url: "/commonController/getTreeOrgs/00",
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择所属组织机构",
        clearable: true
      },
      initValue: ""
    },
    {
      key: "regdate",
      label: "注册日期",
      type: "date",
      subType: "daterange",
      widgetMeta: {
        "range-separator": "至",
        "start-placeholder": "开始日期",
        "end-placeholder": "结束日期",
        "value-format": "yyyy-MM-dd"
      },
      initValue: ""
    }
  ]
};
