import {
  VALUE_LINKAGE,
  DROPDOWN_VALUE_LINKAGE
} from "components/Table/TableConstant";
import { subtract, multiply, divide } from "utils/utils";

const round = require("lodash/round");

export const B_LINE = {
  columns: [
    {
      prop: "THEORY_QUANTITY",
      label: "理论年节约电量<br/>（万千瓦时）",
      fixed: true,
      width: "160",
      "header-align": "center",
      align: "right"
    },
    {
      prop: "CONVERT_QUANTITY",
      label: "折算年节约电量<br/>（万千瓦时）",
      fixed: true,
      width: "160",
      "header-align": "center",
      align: "right"
    },
    {
      prop: "BEFORE_MODEL_NUM",
      label: "导线型号（改造前）",
      width: "200",
      "header-align": "center",
      align: "right",
      widget: {
        key: "BEFORE_MODEL_NUM",
        type: "select",
        url: "/commonController/getModelNum/S_CABLE_PARAM",
        fetchType: "get",
        widgetMeta: {
          placeholder: "请选择",
          filterable: true
        },
        linkageType: DROPDOWN_VALUE_LINKAGE,
        initValue: ""
      }
    },
    {
      prop: "BEFORE_RESISTANCE",
      label: "单位线长导线电阻（改造前）<br/>（Ω/km）",
      width: "180",
      "header-align": "center",
      align: "right",
      widget: {
        key: "BEFORE_RESISTANCE",
        type: "inputNumber",
        widgetMeta: {
          placeholder: "请输入",
          precision: 4,
          controls: false
          // min: 0.2,
          // max: 0.4
        },
        linkageType: VALUE_LINKAGE,
        initValue: ""
      }
    },
    {
      prop: "BEFORE_LENGTH",
      label: "导线长度（改造前）<br/>（km）",
      width: "180",
      "header-align": "center",
      align: "right",
      widget: {
        key: "BEFORE_LENGTH",
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
      prop: "AFTER_MODEL_NUM",
      label: "导线型号（改造后）",
      width: "200",
      "header-align": "center",
      align: "right",
      widget: {
        key: "AFTER_MODEL_NUM",
        type: "select",
        url: "/commonController/getModelNum/S_CABLE_PARAM",
        fetchType: "get",
        widgetMeta: {
          placeholder: "请选择",
          filterable: true
        },
        linkageType: DROPDOWN_VALUE_LINKAGE,
        initValue: ""
      }
    },
    {
      prop: "AFTER_RESISTANCE",
      label: "单位线长导线电阻（改造后）<br/>（Ω/km）",
      width: "180",
      "header-align": "center",
      align: "right",
      widget: {
        key: "AFTER_RESISTANCE",
        type: "inputNumber",
        widgetMeta: {
          placeholder: "请输入",
          precision: 4,
          controls: false
          // min: 0.2,
          // max: 0.4
        },
        linkageType: VALUE_LINKAGE,
        initValue: ""
      }
    },
    {
      prop: "AFTER_AVG_ELE_CURRENT",
      label: "线路平均电流（改造后）<b/>（A）",
      width: "180",
      "header-align": "center",
      align: "right",
      widget: {
        key: "AFTER_AVG_ELE_CURRENT",
        type: "inputNumber",
        widgetMeta: {
          placeholder: "请输入",
          precision: 4,
          controls: false
        },
        linkageType: VALUE_LINKAGE,
        initValue: ""
      }
    }
  ],
  editInit: {
    BEFORE_MODEL_NUM: "",
    BEFORE_RESISTANCE: "0",
    BEFORE_LENGTH: 0,
    AFTER_MODEL_NUM: "",
    AFTER_RESISTANCE: "0",
    AFTER_AVG_ELE_CURRENT: 0,
    THEORY_QUANTITY: null,
    CONVERT_QUANTITY: null
  },
  formula: function(_data_) {
    let a = subtract(_data_.BEFORE_RESISTANCE, _data_.AFTER_RESISTANCE);
    let b = multiply(
      3,
      multiply(_data_.AFTER_AVG_ELE_CURRENT, _data_.AFTER_AVG_ELE_CURRENT)
    );
    let c = multiply(multiply(b, a), _data_.BEFORE_LENGTH);
    let d = divide(multiply(c, 8760), 10000000);
    return round(d, 4);
  },
  rules: {
    BEFORE_MODEL_NUM: [
      {
        type: "string",
        required: true,
        message: "导线型号不能为空（改造前）",
        trigger: "change"
      }
    ],
    BEFORE_RESISTANCE: [
      {
        type: "number",
        required: true,
        message: "单位线长导线电阻不能为空（改造前）",
        trigger: "change"
      }
    ],
    BEFORE_LENGTH: [
      {
        type: "number",
        required: true,
        message: "导线长度不能为空（改造前）",
        trigger: "change"
      }
    ],
    AFTER_MODEL_NUM: [
      {
        type: "string",
        required: true,
        message: "导线型号不能为空（改造后）",
        trigger: "change"
      }
    ],
    AFTER_RESISTANCE: [
      {
        type: "number",
        required: true,
        message: "单位线长导线电阻不能为空（改造后）",
        trigger: "change"
      }
    ],
    AFTER_AVG_ELE_CURRENT: [
      {
        type: "number",
        required: true,
        message: "线路平均电流不能为空（改造后）",
        trigger: "change"
      }
    ]
  }
};
