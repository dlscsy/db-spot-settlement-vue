// 条件区域配置
import { getUserInfo } from "@/utils/auth";
const moment = require("moment");
export const conditionConfig = {
  // 选填，配置项参考el-form的API
  formMeta: {
    "label-width": "130px"
  },
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
      key: "theMonth",
      label: "上报月份",
      type: "date",
      subType: "month",
      widgetMeta: {
        "value-format": "yyyy-MM"
      },
      initValue: moment(new Date()).format("YYYY-MM")
    },
    {
      key: "projectCategory",
      label: "项目类别",
      type: "select",
      url: "/commonController/getDropDownCodesByCodeType/1",
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择项目类别"
      },
      initValue: "1"
    },
    {
      key: "userNum",
      label: "用户编号",
      type: "input",
      subType: "text",
      widgetMeta: {
        placeholder: "请输入用户编号"
      },
      initValue: ""
    },
    {
      key: "category",
      label: "分类",
      type: "select",
      url: "/commonController/getDropDownCodesByCodeType/3",
      fetchType: "get",
      widgetMeta: {
        placeholder: "分类",
        clearable: true
      },
      initValue: ""
    }
  ]
};
