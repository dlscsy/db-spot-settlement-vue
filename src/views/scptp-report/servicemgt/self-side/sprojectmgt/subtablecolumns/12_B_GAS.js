import { VALUE_LINKAGE } from "components/Table/TableConstant";
import { subtract, multiply, divide } from "utils/utils";

const round = require("lodash/round");

export const B_GAS = {
  columns: [
    {
      prop: "BEFORE_EFFICIENCY",
      label: "锅炉平均热效率<br/>(改造前)(％)",
      "header-align": "center",
      align: "right",
      widget: {
        key: "BEFORE_EFFICIENCY",
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
      prop: "AFTER_EFFICIENCY",
      label: "锅炉平均热效率<br/>(改造后)(％)",
      "header-align": "center",
      align: "right",
      widget: {
        key: "AFTER_EFFICIENCY",
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
      prop: "AFTER_GAS_QUANTITY",
      label: "平均每小时耗燃气量<br/>(改造后)(m³/h)",
      "header-align": "center",
      align: "right",
      widget: {
        key: "AFTER_GAS_QUANTITY",
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
      label: "项目年节约电量<br/>（万千瓦时）",
      "header-align": "center",
      align: "right"
    }
  ],
  editInit: {
    BEFORE_EFFICIENCY: 0,
    AFTER_EFFICIENCY: 0,
    AFTER_GAS_QUANTITY: 0,
    HOURS: 0,
    SAVE_QUANTITY: null
  },
  formula: function(_data_) {
    let a = divide(_data_.AFTER_EFFICIENCY, _data_.BEFORE_EFFICIENCY);
    let b = subtract(a, 1);
    let c = divide(8.1, 7);
    let d = multiply(
      multiply(multiply(_data_.AFTER_GAS_QUANTITY, b), _data_.HOURS),
      c
    );
    let e = divide(divide(d, 0.335), 10000);
    return round(e, 4);
  },
  rules: {
    BEFORE_EFFICIENCY: [
      {
        type: "number",
        required: true,
        message: "锅炉平均热效率（改造前）",
        trigger: "change"
      }
    ],
    AFTER_EFFICIENCY: [
      {
        type: "number",
        required: true,
        message: "锅炉平均热效率（改造后）",
        trigger: "change"
      }
    ],
    AFTER_GAS_QUANTITY: [
      {
        type: "number",
        required: true,
        message: "平均每小时耗燃气量(改造后)",
        trigger: "change"
      }
    ]
  }
};
