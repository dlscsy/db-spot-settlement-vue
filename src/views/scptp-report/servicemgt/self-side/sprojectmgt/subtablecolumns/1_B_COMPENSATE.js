import { VALUE_LINKAGE } from "components/Table/TableConstant";
import { subtract, multiply, divide } from "utils/utils";

const round = require("lodash/round");

export const B_COMPENSATE = {
  columns: [
    {
      prop: "CAPACITY",
      label: "无功补偿全投的容量值<br/>（kvar）",
      "header-align": "center",
      align: "right",
      widget: {
        key: "CAPACITY",
        type: "inputNumber",
        widgetMeta: {
          placeholder: "请输入",
          controls: false
        },
        linkageType: VALUE_LINKAGE,
        initValue: ""
      }
    },
    {
      prop: "TANGENT",
      label: "电容器的介质损耗角正切值",
      "header-align": "center",
      align: "right",
      widget: {
        key: "TANGENT",
        type: "inputNumber",
        widgetMeta: {
          placeholder: "请输入",
          precision: 4,
          controls: false
          // min: 0.0005,
          // max: 0.0012
        },
        linkageType: VALUE_LINKAGE,
        initValue: ""
      }
    },
    {
      prop: "EQUIVALENT",
      label: "无功经济当量",
      "header-align": "center",
      align: "right",
      widget: {
        key: "EQUIVALENT",
        type: "inputNumber",
        widgetMeta: {
          placeholder: "请输入",
          precision: 2,
          controls: false
          // min: 0.05,
          // max: 0.1
        },
        linkageType: VALUE_LINKAGE,
        initValue: ""
      }
    },
    {
      prop: "HOURS",
      label: "无功补偿装置在最大节电力情况下等效运行时间（小时）",
      "header-align": "center",
      align: "right",
      widget: {
        key: "HOURS",
        type: "inputNumber",
        widgetMeta: {
          placeholder: "请输入",
          precision: 2,
          controls: false
          // min: 1000,
          // max: 4000
        },
        linkageType: VALUE_LINKAGE,
        initValue: ""
      }
    },
    {
      prop: "THEORY_QUANTITY",
      label: "理论年节约电量<br/>（万千瓦时）",
      "header-align": "center",
      align: "right"
    },
    {
      prop: "CONVERT_QUANTITY",
      label: "折算年节约电量<br/>（万千瓦时）",
      "header-align": "center",
      align: "right"
    }
  ],
  editInit: {
    CAPACITY: 0,
    TANGENT: 0.0005,
    EQUIVALENT: 0.05,
    HOURS: 1000,
    THEORY_QUANTITY: null,
    CONVERT_QUANTITY: null
  },
  formula: function(_data_) {
    let a = subtract(_data_.EQUIVALENT, _data_.TANGENT);
    let b = multiply(_data_.CAPACITY, a);
    let c = multiply(b, _data_.HOURS);
    let d = divide(c, 10000);
    return round(d, 4);
  },
  rules: {
    CAPACITY: [
      {
        type: "number",
        required: true,
        message: "无功补偿全投的容量值不能为空",
        trigger: "change"
      }
    ],
    TANGENT: [
      {
        type: "number",
        required: true,
        message: "电容器的介质损耗角正切值不能为空",
        trigger: "change"
      }
    ],
    EQUIVALENT: [
      {
        type: "number",
        required: true,
        message: "无功经济当量不能为空",
        trigger: "change"
      }
    ],
    HOURS: [
      {
        type: "number",
        required: true,
        message: "无功补偿装置在最大节电力情况下等效运行时间不能为空",
        trigger: "change"
      }
    ]
  }
};
