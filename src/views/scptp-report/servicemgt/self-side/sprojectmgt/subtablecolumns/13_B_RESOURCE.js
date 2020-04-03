import { VALUE_LINKAGE } from "components/Table/TableConstant";
import { subtract, multiply, divide } from "utils/utils";

const round = require("lodash/round");

export const B_RESOURCE = {
  columns: [
    {
      prop: "AFTER_AVG_POWER_RATE",
      label: "发电机平均发电功率<br/>（改造后）（千瓦）",
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
      prop: "AFTER_RESOURCE_RATE",
      label: "资源综合利用发电占自用电率<br/>（改造后）（%）",
      "header-align": "center",
      align: "right",
      widget: {
        key: "AFTER_RESOURCE_RATE",
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
          controls: false
          // min: 4500,
          // max: 7000
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
    AFTER_RESOURCE_RATE: 0,
    HOURS: null,
    SAVE_QUANTITY: null,
    SAVE_POWER: null
  },
  formula: function(_data_) {
    let a = subtract(1, divide(_data_.AFTER_RESOURCE_RATE, 100));
    let b = multiply(multiply(_data_.AFTER_AVG_POWER_RATE, a), _data_.HOURS);
    return round(b, 4);
  },
  rules: {
    AFTER_AVG_POWER_RATE: [
      {
        type: "number",
        required: true,
        message: "工频工况或原电机耗电功率不能为空（改造前）",
        trigger: "change"
      }
    ],
    AFTER_RESOURCE_RATE: [
      {
        type: "number",
        required: true,
        message: "变频工况或更换后电机耗电功率不能为空（改造前）",
        trigger: "change"
      }
    ]
  }
};
