import { VALUE_LINKAGE } from "components/Table/TableConstant";
import { subtract, multiply, divide } from "utils/utils";

const round = require("lodash/round");

export const B_WASTE_RECOVERY = {
  columns: [
    {
      prop: "AFTER_FLOW",
      label: "加热生活热水流量<br/>（吨/小时）",
      "header-align": "center",
      align: "right",
      widget: {
        key: "AFTER_FLOW",
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
      prop: "AFTER_TEMPERATURE_IMP",
      label: "加热生活热水进口水温<br/>（℃）",
      "header-align": "center",
      align: "right",
      widget: {
        key: "AFTER_TEMPERATURE_IMP",
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
      prop: "AFTER_TEMPERATURE_EXP",
      label: "加热生活热水出口水温<br/>（℃）",
      "header-align": "center",
      align: "right",
      widget: {
        key: "AFTER_TEMPERATURE_EXP",
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
      label: "项目年节约电量<br/>（万千瓦时）",
      "header-align": "center",
      align: "right"
    },
    {
      prop: "SAVE_POWER",
      label: "项目年节约电力<br/>（万千瓦）",
      "header-align": "center",
      align: "right"
    }
  ],
  editInit: {
    AFTER_FLOW: 0,
    AFTER_TEMPERATURE_IMP: 0,
    HOURS: null,
    SAVE_QUANTITY: null,
    SAVE_POWER: null
  },
  formula: function(_data_) {
    let a = subtract(
      _data_.AFTER_TEMPERATURE_EXP,
      _data_.AFTER_TEMPERATURE_IMP
    );
    let b = multiply(multiply(a, _data_.AFTER_FLOW), _data_.HOURS);
    let c = divide(divide(divide(multiply(b, 1000), 29308), 0.335), 10000);
    return round(c, 4);
  },
  rules: {}
};
