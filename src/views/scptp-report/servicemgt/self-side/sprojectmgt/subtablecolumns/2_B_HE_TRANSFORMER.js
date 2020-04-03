import {
  VALUE_LINKAGE,
  DROPDOWN_VALUE_LINKAGE
} from "components/Table/TableConstant";
import { addFun, subtract, multiply, divide } from "utils/utils";

const round = require("lodash/round");

export const B_HE_TRANSFORMER = {
  columns: [
    {
      prop: "THEORY_QUANTITY",
      label: "理论年节约电量<br/>（万千瓦时）",
      fixed: true,
      width: "140",
      "header-align": "center",
      align: "right"
    },
    {
      prop: "CONVERT_QUANTITY",
      label: "折算年节约电量<br/>（万千瓦时）",
      fixed: true,
      width: "140",
      "header-align": "center",
      align: "right"
    },
    {
      prop: "BEFORE_MODEL_NUM",
      label: "变压器型号及容量（改造前）",
      width: "180",
      "header-align": "center",
      align: "right",
      widget: {
        key: "BEFORE_MODEL_NUM",
        type: "select",
        url: "/commonController/getModelNum/S_TRANSFORMER_PARAM",
        fetchType: "get",
        widgetMeta: {
          placeholder: "请选择",
          filterable: true
        },
        initValue: ""
      }
    },
    {
      prop: "BEFORE_CAPACITY",
      label: "容量（改造前）",
      width: "120",
      "header-align": "center",
      align: "right",
      widget: {
        key: "BEFORE_CAPACITY",
        type: "select",
        url: "/commonController/getCapacityByModelNum",
        fetchType: "get",
        params: { MODEL_NUM: "" },
        widgetMeta: {
          placeholder: "请选择",
          filterable: true
        },
        linkageType: DROPDOWN_VALUE_LINKAGE,
        linkageFields: "BEFORE_MODEL_NUM",
        paramFields: "MODEL_NUM",
        initValue: ""
      }
    },
    {
      prop: "BEFORE_NOLOAD_LOSS",
      label: "变压器空载损耗（改造前）",
      width: "180",
      "header-align": "center",
      align: "right",
      widget: {
        key: "BEFORE_NOLOAD_LOSS",
        type: "inputNumber",
        widgetMeta: {
          placeholder: "请输入",
          precision: 4,
          controls: false
          // min: 0.6,
          // max: 1
        },
        linkageType: VALUE_LINKAGE,
        initValue: ""
      }
    },
    {
      prop: "BEFORE_SHORT_LOSS",
      label: "变压器短路损耗（改造前）",
      width: "180",
      "header-align": "center",
      align: "right",
      widget: {
        key: "BEFORE_SHORT_LOSS",
        type: "inputNumber",
        widgetMeta: {
          placeholder: "请输入",
          precision: 4,
          controls: false
          // min: 4,
          // max: 6
        },
        linkageType: VALUE_LINKAGE,
        initValue: ""
      }
    },
    {
      prop: "AFTER_MODEL_NUM",
      label: "变压器型号及容量（改造后）",
      width: "180",
      "header-align": "center",
      align: "right",
      widget: {
        key: "AFTER_MODEL_NUM",
        type: "select",
        url: "/commonController/getModelNum/S_TRANSFORMER_PARAM",
        fetchType: "get",
        widgetMeta: {
          placeholder: "请选择",
          filterable: true
        },
        initValue: ""
      }
    },
    {
      prop: "AFTER_CAPACITY",
      label: "容量（改造后）",
      width: "120",
      "header-align": "center",
      align: "right",
      widget: {
        key: "AFTER_CAPACITY",
        type: "select",
        url: "/commonController/getCapacityByModelNum",
        fetchType: "get",
        params: { MODEL_NUM: "" },
        widgetMeta: {
          placeholder: "请选择",
          filterable: true
        },
        linkageType: DROPDOWN_VALUE_LINKAGE,
        linkageFields: "AFTER_MODEL_NUM",
        paramFields: "MODEL_NUM",
        initValue: ""
      }
    },
    {
      prop: "AFTER_NOLOAD_LOSS",
      label: "变压器空载损耗（改造后）",
      width: "180",
      "header-align": "center",
      align: "right",
      widget: {
        key: "AFTER_NOLOAD_LOSS",
        type: "inputNumber",
        widgetMeta: {
          placeholder: "请输入",
          precision: 4,
          controls: false
          // min: 0.6,
          // max: 1
        },
        linkageType: VALUE_LINKAGE,
        initValue: ""
      }
    },
    {
      prop: "AFTER_SHORT_LOSS",
      label: "变压器短路损耗（改造后）",
      width: "180",
      "header-align": "center",
      align: "right",
      widget: {
        key: "AFTER_SHORT_LOSS",
        type: "inputNumber",
        widgetMeta: {
          placeholder: "请输入",
          precision: 4,
          controls: false
          // min: 4,
          // max: 6
        },
        linkageType: VALUE_LINKAGE,
        initValue: ""
      }
    },
    {
      prop: "AFTER_AVG_LOAD_RATE",
      label: "变压器平均负载率（改造后）",
      width: "200",
      "header-align": "center",
      align: "right",
      widget: {
        key: "AFTER_AVG_LOAD_RATE",
        type: "inputNumber",
        widgetMeta: {
          placeholder: "请输入",
          precision: 4,
          controls: false
          // min: 0.35,
          // max: 0.5
        },
        linkageType: VALUE_LINKAGE,
        initValue: ""
      }
    }
  ],
  editInit: {
    BEFORE_MODEL_NUM: "",
    BEFORE_CAPACITY: "0",
    BEFORE_NOLOAD_LOSS: 0.6,
    BEFORE_SHORT_LOSS: 4,
    AFTER_MODEL_NUM: "",
    AFTER_CAPACITY: "0",
    AFTER_NOLOAD_LOSS: 0.6,
    AFTER_SHORT_LOSS: 4,
    AFTER_AVG_LOAD_RATE: 0,
    THEORY_QUANTITY: null,
    CONVERT_QUANTITY: null
  },
  formula: function(_data_) {
    let a = subtract(_data_.BEFORE_NOLOAD_LOSS, _data_.AFTER_NOLOAD_LOSS);
    let b = divide(
      multiply(_data_.AFTER_CAPACITY, _data_.AFTER_AVG_LOAD_RATE),
      _data_.BEFORE_CAPACITY
    );
    let c = multiply(
      _data_.AFTER_SHORT_LOSS,
      multiply(_data_.AFTER_AVG_LOAD_RATE, _data_.AFTER_AVG_LOAD_RATE)
    );
    let d = multiply(_data_.BEFORE_SHORT_LOSS, multiply(b, b));
    let e = subtract(d, c);
    let f = addFun(a, e);
    let g = divide(multiply(f, 8760), 10000);
    return round(g, 4);
  },
  rules: {
    BEFORE_MODEL_NUM: [
      {
        type: "string",
        required: true,
        message: "变压器型号及容量不能为空（改造前）",
        trigger: "change"
      }
    ],
    BEFORE_CAPACITY: [
      {
        type: "string",
        required: true,
        message: "容量不能为空（改造前）",
        trigger: "change"
      }
    ],
    BEFORE_NOLOAD_LOSS: [
      {
        type: "number",
        required: true,
        message: "变压器空载损耗不能为空（改造前）",
        trigger: "change"
      }
    ],
    BEFORE_SHORT_LOSS: [
      {
        type: "number",
        required: true,
        message: "变压器短路损耗不能为空（改造前）",
        trigger: "change"
      }
    ],
    AFTER_MODEL_NUM: [
      {
        type: "string",
        required: true,
        message: "变压器型号及容量不能为空（改造后）",
        trigger: "change"
      }
    ],
    AFTER_CAPACITY: [
      {
        type: "string",
        required: true,
        message: "容量不能为空（改造后）",
        trigger: "change"
      }
    ],
    AFTER_NOLOAD_LOSS: [
      {
        type: "number",
        required: true,
        message: "变压器空载损耗不能为空（改造后）",
        trigger: "change"
      }
    ],
    AFTER_SHORT_LOSS: [
      {
        type: "number",
        required: true,
        message: "变压器短路损耗不能为空（改造后）",
        trigger: "change"
      }
    ],
    AFTER_AVG_LOAD_RATE: [
      {
        type: "number",
        required: true,
        message: "变压器平均负载率不能为空（改造后）",
        trigger: "change"
      }
    ]
  }
};
