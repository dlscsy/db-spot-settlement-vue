import { VALUE_LINKAGE } from "components/Table/TableConstant";
import { subtract, multiply, divide } from "utils/utils";

const round = require("lodash/round");

export const B_HEAT_PUMP = {
  columns: [
    {
      prop: "AFTER_AVG_POWER_RATE",
      label: "热泵主机平均耗电功率<br/>（改造后）（千瓦）",
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
      prop: "COP",
      label: "cop（热电比）",
      "header-align": "center",
      align: "right",
      widget: {
        key: "COP",
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
    AFTER_AVG_POWER_RATE: 0,
    COP: 0,
    HOURS: null,
    SAVE_QUANTITY: null,
    SAVE_POWER: null
  },
  formula: function(_data_) {
    let a = subtract(_data_.COP, 1);
    let b = divide(
      multiply(multiply(a, _data_.AFTER_AVG_POWER_RATE), _data_.HOURS),
      10000
    );
    return round(b, 4);
  },
  rules: {}
};
