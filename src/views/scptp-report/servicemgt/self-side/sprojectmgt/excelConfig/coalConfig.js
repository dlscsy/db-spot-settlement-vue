export const coalExcelConfig = {
  上报月份: {
    prop: "theMonth",
    type: "date",
    format: "YYYY-MM",
    required: true,
    base: true
  },
  // 所属单位: { prop: "company", isCode: true, required: true },
  项目名称: {
    prop: "projectName",
    required: true,
    base: true
  },
  节能量属性: {
    prop: "saveProperty",
    isCode: true,
    required: true,
    base: true
  },
  实施单位: {
    prop: "implCompany",
    base: true
  },
  项目类别: {
    prop: "projectCategory",
    isCode: true,
    required: true,
    base: true
  },
  节能单位名称: {
    prop: "saveCompany",
    isCode: true,
    required: true,
    base: true
  },
  行业类别: {
    prop: "tradeCategory",
    isCode: true,
    required: true,
    base: true
  },
  所属供电局: {
    prop: "company",
    isCode: true,
    required: true,
    base: true
  },
  是否节能诊断: {
    prop: "exSaveDiagnose",
    isCode: true,
    base: true
  },
  诊断时间: {
    prop: "diagnoseDate",
    type: "date",
    format: "YYYY-MM-DD",
    base: true
  },
  项目实施属性: {
    prop: "projectImplProperty",
    isCode: true,
    base: true
  },
  节能服务推动方式: {
    prop: "savePromoteType",
    isCode: true,
    base: true
  },
  是否合同能源管理: {
    prop: "exContract",
    isCode: true,
    required: true,
    base: true
  },
  合同开始时间: {
    prop: "contractStartDate",
    type: "date",
    format: "YYYY-MM-DD",
    base: true
  },
  合同截止时间: {
    prop: "contractEndDate",
    type: "date",
    format: "YYYY-MM-DD",
    base: true
  },
  "项目总投资（万元）": {
    prop: "projectTotalInvest",
    required: true,
    base: true
  },
  是否节能量审核: {
    prop: "exSaveCheck",
    isCode: true,
    required: true,
    base: true
  },
  节能量审核单位: {
    prop: "saveCheckCompany",
    base: true
  },
  投运年月: {
    prop: "workingDate",
    type: "date",
    format: "YYYY-MM",
    base: true
  },
  项目编号: { prop: "projectNum", base: true },

  "锅炉平均热效率(％)（改造前）": { prop: "beforeEfficiency", required: true },
  "锅炉平均热效率(％)（改造后）": { prop: "afterEfficiency", required: true },
  "锅炉每小时耗原煤量（吨）（改造后）": {
    prop: "afterCoalQuantity",
    required: true
  },
  "设备年运行小时数（小时）": { prop: "hours", required: true },
  "项目年节约电量（万千瓦时）": { prop: "saveQuantity", required: true }
};
