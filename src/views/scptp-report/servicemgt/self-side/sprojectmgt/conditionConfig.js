// 条件区域配置
import { getUserInfo } from "@/utils/auth";

export const conditionConfig = {
  // 选填，配置项参考el-form的API
  formMeta: {
    "label-width": "130px"
  },
  // 必填
  items: [
    {
      key: "company",
      label: "所属单位",
      type: "tree-select",
      url: `/commonController/getTreeOrgs/${getUserInfo().orgCode}`,
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择所属单位"
      },
      initValue: getUserInfo().orgCode
    },
    {
      key: "theMonth",
      label: "上报月份",
      type: "date",
      subType: "monthrange",
      widgetMeta: {
        "range-separator": "至",
        "start-placeholder": "开始月份",
        "end-placeholder": "结束月份",
        "value-format": "yyyy-MM"
      },
      initValue: ""
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
      initValue: ""
    },
    {
      key: "trageCategory",
      label: "行业类别",
      type: "tree-select",
      url: "/commonController/getTreeTradeCategories/-1",
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择行业类别",
        clearable: true,
        filterable: true
      },
      initValue: ""
    },
    {
      key: "projectName",
      label: "项目名称",
      type: "input",
      subType: "text",
      widgetMeta: {
        placeholder: "请输入项目名称"
      },
      initValue: ""
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
      label: "节能单位",
      type: "select",
      url: "/commonController/getSubOrgsByParentOrgCode/03",
      fetchType: "get",
      widgetMeta: {
        placeholder: "请选择节能单位"
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
      subType: "monthrange",
      widgetMeta: {
        "range-separator": "至",
        "start-placeholder": "开始月份",
        "end-placeholder": "结束月份",
        "value-format": "yyyy-MM"
      },
      initValue: ""
    }
  ]
};
