export const diagnosisExcelConfig = {
  上报月份: {
    prop: "theMonth",
    type: "date",
    format: "YYYY-MM",
    required: true
  },
  所属单位: { prop: "company", isCode: true, required: true },
  户号: { prop: "userNum", required: true },
  诊断用户名称: { prop: "userName", required: true },
  诊断实施单位: { prop: "implCompany", required: true },
  用户所处行业: { prop: "userTradeType", isCode: true, required: true },
  诊断时间: {
    prop: "diagnosisDate",
    type: "date",
    format: "YYYY-MM-DD",
    required: true
  },
  诊断费用: { prop: "diagnosisCost", required: true },
  // 上年年用电量: { prop: "lastYearQuantity"},
  诊断报告年节电量: { prop: "saveQuantity" },
  是否意向开展改造: { prop: "exReform", isCode: true },
  是否意向开展合同能源管理: { prop: "exContract", isCode: true },
  是否完成改造: { prop: "exComplete", isCode: true },
  改造实施单位: { prop: "reformCompany" },
  改造实施方式: { prop: "reformType", isCode: true },
  诊断类别: { prop: "diagnosisCategory", isCode: true, required: true }
};
