export const lineExcelConfig = {
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

  "导线型号（改造前）": { prop: "beforeModelNum", required: true },
  "导线长度（km）（改造前）": { prop: "beforeLength", required: true },
  "单位线长导线电阻（Ω/km）（改造前）": {
    prop: "beforeResistance",
    required: true
  },
  "导线型号（改造后）": { prop: "afterModelNum", required: true },
  "单位线长导线电阻（Ω/km）（改造后）": {
    prop: "afterResistance",
    required: true
  },
  "线路平均电流（A）（改造后）": { prop: "afterAvgEleCurrent", required: true },
  "理论年节约电量(万千瓦时)": { prop: "theoryQuantity", required: true },
  "折算年节约电量(万千瓦时)": { prop: "convertQuantity", required: true }
};
