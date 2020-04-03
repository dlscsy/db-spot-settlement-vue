import { VALUE_LINKAGE } from "components/Table/TableConstant";
import { subtract, divide } from "utils/utils";

const round = require("lodash/round");

export const B_ELE_STORAGE = {
  columns: [
    {
      prop: "BEFORE_POWER_RATE",
      label: "工频工况或原电机耗电功率<br/>（非蓄冷（热）方式制冷）（千瓦）",
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
      label: "工频工况或原电机耗电功率<br/>（蓄冷（热）方式制冷）（千瓦）",
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
      prop: "SAVE_POWER",
      label: "项目年节约电力（万千瓦）",
      "header-align": "center",
      align: "right"
    }
  ],
  editInit: {
    BEFORE_POWER_RATE: 0,
    AFTER_POWER_RATE: 0,
    SAVE_POWER: null
  },
  formula: function(_data_) {
    let a = subtract(_data_.BEFORE_POWER_RATE, _data_.AFTER_POWER_RATE);
    let b = divide(a, 10000);
    return round(b, 4);
  },
  rules: {
    BEFORE_POWER_RATE: [
      {
        type: "number",
        required: true,
        message: "工频工况或原电机耗电功率不能为空（非蓄冷（热）方式制冷）",
        trigger: "change"
      }
    ],
    AFTER_POWER_RATE: [
      {
        type: "number",
        required: true,
        message: "工频工况或原电机耗电功率不能为空（蓄冷（热）方式制冷）",
        trigger: "change"
      }
    ]
  }
};
