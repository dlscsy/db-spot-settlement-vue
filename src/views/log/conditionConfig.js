// 条件区域配置
import { getUserInfo } from "@/utils/auth";
// const moment = require("moment");

export const conditionConfig = {
  // 选填，配置项参考el-form的API
  formMeta: {},
  // 选填，附加的查询条件
  additionalConditions: { projectSide: "" },
  // 必填
  items: [
    {
      key: "company",
      label: "所属单位",
      type: "tree-select",
      url: `/commonController/getTreeOrgs/${getUserInfo().orgCode}`,
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择所属单位"
      },
      initValue: getUserInfo().orgCode
    },
    {
      key: "operationTime",
      label: "操作时间",
      type: "date",
      subType: "daterange",
      widgetMeta: {
        "range-separator": "至",
        "start-placeholder": "开始日期",
        "end-placeholder": "结束日期",
        "value-format": "yyyy-MM-dd"
      },
      initValue: ""
    },
    {
      key: "logType",
      label: "日志类型",
      type: "select",
      url: "/commonController/getDropDownCodesByCodeType/24",
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择日志类型",
        clearable: true
      },
      initValue: ""
    }
  ]
};
