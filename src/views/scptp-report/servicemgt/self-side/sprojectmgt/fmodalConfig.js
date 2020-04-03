// form表单区域配置
import { getUserInfo } from "@/utils/auth";
import { subInfoTableConfig } from "./subInfoTableConfig";
// import {
//   validateChinese,
//   validateEmail,
//   validateCellPhone,
//   validateTelephone,
//   validateID,
//   validatePwdCanSpecialChar,
//   validateAccount
// } from "utils/validate";

// const isEmpty = require("lodash/isEmpty");
const moment = require("moment");

export const fmodalConfig = {
  // 必填
  mainTitle: "电网自身节电量节电力信息",
  // 选填，表单每行显示表单项个数，必须能被24整除
  // itemsInRowNum: 3,
  // 选填，配置项参考el-dialog的API
  modalMeta: {
    width: "70%",
    top: "10vh"
  },
  // 选填，配置项参考el-form的API
  formMeta: {
    "label-position": "right",
    "label-width": "150px"
  },
  baseItems: [
    {
      key: "theMonth",
      label: "上报月份",
      type: "date",
      subType: "month",
      widgetMeta: {
        placeholder: "请选择统计月份",
        "value-format": "yyyy-MM",
        readonly: true
      },
      initValue: moment().format("YYYY-MM"),
      validateExistField: true
    },
    {
      key: "company",
      label: "所属单位/供电局",
      type: "tree-select",
      url: `/commonController/getTreeOrgs/${getUserInfo().orgCode}`,
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择所属单位/供电局"
      },
      initValue: getUserInfo().orgCode,
      unEditable: true,
      validateExistField: true
    },
    {
      key: "projectCategory",
      label: "项目类别",
      type: "select",
      url: "/sProjectMgtController/getProjectCategory",
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择项目类别"
      },
      initValue: "1",
      unEditable: true,
      validateExistField: true
    }
  ],
  // 必填
  items: [
    {
      key: "projectName",
      label: "项目名称",
      type: "input",
      subType: "text",
      widgetMeta: {
        placeholder: "请输入项目名称"
      },
      initValue: "",
      unEditable: true,
      validateExistField: true
    },
    {
      key: "saveProperty",
      label: "节能量属性",
      type: "select",
      url: "/commonController/getDropDownCodesByCodeType/10",
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择节能量属性"
      },
      initValue: ""
    },
    {
      key: "saveCompany",
      label: "节能单位名称",
      type: "select",
      url: "/commonController/getSubOrgsByParentOrgCode/03",
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择节能单位"
      },
      initValue: ""
    },
    {
      key: "tradeCategory",
      label: "行业类别",
      type: "tree-select",
      url: "/commonController/getTreeTradeCategories/-1",
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择行业类别",
        clearable: false,
        filterable: true
      },
      initValue: ""
    },
    {
      key: "area",
      label: "所属地区",
      type: "input",
      subType: "text",
      widgetMeta: {
        placeholder: "请输入所属地区",
        readonly: true
      },
      initValue: "广东"
    },
    {
      key: "projectTotalInvest",
      label: "项目总投资（万元）",
      type: "inputNumber",
      widgetMeta: {
        placeholder: "请输入项目总投资",
        precision: 2,
        step: 0.1
      },
      initValue: ""
    },
    {
      key: "exContract",
      label: "是否合同能源管理",
      type: "select",
      url: "/commonController/getDropDownCodesByCodeType/11",
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择是否合同能源管理"
      },
      initValue: ""
    },
    {
      key: "exSaveCheck",
      label: "是否节能量审核",
      type: "select",
      url: "/commonController/getDropDownCodesByCodeType/11",
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择是否节能量审核"
      },
      initValue: ""
    },
    {
      key: "saveCheckCompany",
      label: "节能量审核单位",
      type: "input",
      subType: "text",
      widgetMeta: {
        placeholder: "请输入节能量审核单位"
      },
      initValue: ""
    },
    {
      key: "workingDate",
      label: "投运年月",
      type: "date",
      subType: "month",
      widgetMeta: {
        placeholder: "请选择投运年月",
        "value-format": "yyyy-MM"
      },
      initValue: ""
    },
    {
      key: "projectNum",
      label: "项目编号",
      type: "input",
      subType: "text",
      widgetMeta: {
        placeholder: "请输入项目编号"
      },
      initValue: ""
    },
    {
      key: "implCompany",
      label: "实施单位",
      type: "input",
      subType: "text",
      widgetMeta: {
        placeholder: "请输入实施单位"
      },
      initValue: "",
      dynamicItem: true
    },
    {
      key: "exSaveDiagnose",
      label: "是否节能诊断",
      type: "select",
      url: "/commonController/getDropDownCodesByCodeType/11",
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择是否节能诊断"
      },
      initValue: "",
      dynamicItem: true
    },
    {
      key: "diagnoseDate",
      label: "诊断时间",
      type: "date",
      subType: "date",
      widgetMeta: {
        placeholder: "请选择诊断时间",
        "value-format": "yyyy-MM-dd"
      },
      initValue: "",
      dynamicItem: true
    },
    {
      key: "projectImplProperty",
      label: "项目实施属性",
      type: "select",
      url: "/commonController/getDropDownCodesByCodeType/13",
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择项目实施属性"
      },
      initValue: "",
      dynamicItem: true
    },
    {
      key: "savePromoteType",
      label: "节能服务推动方式",
      type: "select",
      url: "/commonController/getDropDownCodesByCodeType/14",
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择节能服务推动方式"
      },
      initValue: "",
      dynamicItem: true
    },
    {
      key: "contractStartDate",
      label: "合同开始时间",
      type: "date",
      subType: "date",
      widgetMeta: {
        placeholder: "请选择合同开始时间",
        "value-format": "yyyy-MM-dd"
      },
      initValue: "",
      dynamicItem: true
    },
    {
      key: "contractEndDate",
      label: "合同截止时间",
      type: "date",
      subType: "date",
      widgetMeta: {
        placeholder: "请选择合同截止时间",
        "value-format": "yyyy-MM-dd"
      },
      initValue: "",
      dynamicItem: true
    }
  ],
  rules: {
    projectName: [
      {
        type: "string",
        required: true,
        message: "项目名称不能为空",
        trigger: "blur"
      }
    ],
    saveProperty: [
      {
        type: "string",
        required: true,
        message: "节能量属性不能为空",
        trigger: "blur"
      }
    ],
    saveCompany: [
      {
        type: "string",
        required: true,
        message: "节能单位名称不能为空",
        trigger: "blur"
      }
    ],
    tradeCategory: [
      {
        type: "string",
        required: true,
        message: "行业类别不能为空",
        trigger: "blur"
      }
    ],
    area: [
      {
        type: "string",
        required: true,
        message: "所属地区不能为空",
        trigger: "blur"
      }
    ],
    projectTotalInvest: [
      {
        type: "number",
        required: true,
        message: "项目总投资不能为空",
        trigger: "blur"
      }
    ],
    exContract: [
      {
        type: "string",
        required: true,
        message: "是否合同能源管理不能为空",
        trigger: "blur"
      }
    ],
    exSaveCheck: [
      {
        type: "string",
        required: true,
        message: "是否节能量审核不能为空",
        trigger: "blur"
      }
    ]
  },
  // 子信息所在表格的配置
  subInfoTableConfig: subInfoTableConfig
  // 选填，子表单的配置
  // childrenForm: []
};
