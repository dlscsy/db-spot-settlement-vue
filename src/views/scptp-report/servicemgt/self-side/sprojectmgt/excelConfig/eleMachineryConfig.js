export const eleMachineryExcelConfig = {
  上报月份: {
    prop: "theMonth",
    type: "date",
    format: "YYYY-MM",
    required: true,
    base: true
  },
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
  所属单位: {
    prop: "company",
    isCode: true,
    required: true,
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
  // 所属地区: { prop: "area", required: true },
  是否合同能源管理: {
    prop: "exContract",
    isCode: true,
    required: true,
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

  "工频工况或原电机耗电功率(千瓦)（改造前）": {
    prop: "beforePowerRate",
    required: true
  },
  "变频工况或更换后电机耗电功率（千瓦）（改造后）": {
    prop: "afterPowerRate",
    required: true
  },
  "设备年运行小时数（小时）": { prop: "hours", required: true },
  "项目年节约电量（万千瓦时）": { prop: "saveQuantity", required: true },
  "项目年节约电力（万千瓦）": { prop: "savePower", required: true }
};
