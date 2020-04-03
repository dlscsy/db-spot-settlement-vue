import { VALUE_LINKAGE } from "components/Table/TableConstant";
import { subtract, multiply, divide } from "utils/utils";

const round = require("lodash/round");

export const B_LIGHTING = {
  columns: [
    {
      prop: "BEFORE_AVG_POWER_RATE",
      label: "灯具耗电平均功率<br/>（改造前）（千瓦）",
      "header-align": "center",
      align: "right",
      widget: {
        key: "BEFORE_AVG_POWER_RATE",
        type: "inputNumber",
        widgetMeta: {
          placeholder: "请输入",
          precision: 4,
          controls: false
        },
        linkageType: VALUE_LINKAGE,
        initValue: ""
      }
    },
    {
      prop: "AFTER_AVG_POWER_RATE",
      label: "灯具耗电平均功率<br/>（改造后）（千瓦）",
      "header-align": "center",
      align: "right",
      widget: {
        key: "AFTER_AVG_POWER_RATE",
        type: "inputNumber",
        widgetMeta: {
          placeholder: "请输入",
          precision: 4,
          controls: false
        },
        linkageType: VALUE_LINKAGE,
        initValue: ""
      }
    },
    {
      prop: "HOURS",
      label: "设备年运行小时数<br/>（小时）",
      "header-align": "center",
      align: "right",
      widget: {
        key: "HOURS",
        type: "inputNumber",
        widgetMeta: {
          placeholder: "请输入",
          precision: 2,
          controls: false
        },
        linkageType: VALUE_LINKAGE,
        initValue: ""
      }
    },
    {
      prop: "SAVE_QUANTITY",
      label: "项目年节约电量（万千瓦时）",
      "header-align": "center",
      align: "right"
    },
    {
      prop: "SAVE_POWER",
      label: "项目年节约电力（万千瓦）",
      "header-align": "center",
      align: "right"
    }
  ],
  editInit: {
    BEFORE_AVG_POWER_RATE: 0,
    AFTER_AVG_POWER_RATE: 0,
    HOURS: null,
    SAVE_QUANTITY: null,
    SAVE_POWER: null
  },
  formula: function(_data_) {
    let a = subtract(_data_.BEFORE_AVG_POWER_RATE, _data_.AFTER_AVG_POWER_RATE);
    let b = divide(multiply(a, _data_.HOURS), 10000);
    return round(b, 4);
  },
  rules: {}
};
