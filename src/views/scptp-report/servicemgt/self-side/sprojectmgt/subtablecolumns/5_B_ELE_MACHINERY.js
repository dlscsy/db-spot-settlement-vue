import { VALUE_LINKAGE } from "components/Table/TableConstant";
import { subtract, multiply, divide } from "utils/utils";

const round = require("lodash/round");

export const B_ELE_MACHINERY = {
  columns: [
    {
      prop: "BEFORE_POWER_RATE",
      label: "工频工况或原电机耗电功率<br/>（改造前）（千瓦）",
      "header-align": "center",
      align: "right",
      widget: {
        key: "BEFORE_POWER_RATE",
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
      prop: "AFTER_POWER_RATE",
      label: "变频工况或更换后电机耗电功率<br/>（改造后）（千瓦）",
      "header-align": "center",
      align: "right",
      widget: {
        key: "AFTER_POWER_RATE",
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
    BEFORE_POWER_RATE: 0,
    AFTER_POWER_RATE: 0,
    HOURS: null,
    SAVE_QUANTITY: null,
    SAVE_POWER: null
  },
  formula: function(_data_) {
    let a = subtract(_data_.BEFORE_POWER_RATE, _data_.AFTER_POWER_RATE);
    let b = divide(multiply(a, _data_.HOURS), 10000);
    return round(b, 4);
  },
  rules: {
    BEFORE_POWER_RATE: [
      {
        type: "number",
        required: true,
        message: "工频工况或原电机耗电功率不能为空（改造前）",
        trigger: "change"
      }
    ],
    AFTER_POWER_RATE: [
      {
        type: "number",
        required: true,
        message: "变频工况或更换后电机耗电功率不能为空（改造前）",
        trigger: "change"
      }
    ]
  }
};
