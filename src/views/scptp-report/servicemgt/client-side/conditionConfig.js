// 条件区域配置
import { getUserInfo } from "@/utils/auth";
const moment = require("moment");

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
      key: "theMonth",
      label: "统计年月",
      type: "date",
      subType: "month",
      widgetMeta: {
        placeholder: "请选择统计年月",
        "value-format": "yyyy-MM",
        format: "yyyy-MM",
        "picker-options": {
          disabledDate: date => {
            return date.getTime() > Date.now();
          }
        }
      },
      // initValue: moment().format("yyyy-MM")
      initValue: moment().format("YYYY-MM")
    }
  ]
};
