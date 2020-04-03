export const unContractExcelConfig = {
  所属单位: { prop: "company", isCode: true, required: true },
  上报月份: {
    prop: "theMonth",
    type: "date",
    format: "YYYY-MM",
    required: true
  },
  分类: { prop: "category", isCode: true, required: true },
  客户编号: { prop: "userNum", required: true },
  客户名称: { prop: "userName", required: true },
  所处行业: { prop: "userTradeType", isCode: true, required: true },
  诊断时间: {
    prop: "diagnosisDate",
    type: "date",
    format: "YYYY-MM-DD",
    required: true
  },
  技术分类: { prop: "technologyCategory", isCode: true, required: true },
  项目类型: { prop: "projectType", isCode: true, required: true },
  项目名称或技术措施: { prop: "projectName", required: true },
  "项目竣工时间（年月）": {
    prop: "projectCompleteDate",
    format: "YYYY-MM",
    type: "date",
    required: true
  },
  是否经过第三方审核: { prop: "exCheck", isCode: true, required: true },
  口径二投资金额: { prop: "investAmount1", required: true },
  口径一投资金额: { prop: "investAmount", required: true },
  项目施工单位名称: { prop: "implCompany", required: true },
  节能服务推动方式: { prop: "savePromoteType", isCode: true },
  年度用电规模: { prop: "eleScale", required: true },
  口径二实际节约电量: { prop: "saveQuantity1", required: true },
  口径二折算后节约电量: { prop: "saveConvertQuantity1", required: true },
  口径二实际节约电力: { prop: "savePower1", required: true },
  口径二折算后节约电力: { prop: "saveConvertPower1", required: true },
  口径二节约电费: { prop: "saveCost1", required: true },
  口径一实际节约电量: { prop: "saveQuantity", required: true },
  口径一折算后节约电量: { prop: "saveConvertQuantity", required: true },
  口径一实际节约电力: { prop: "savePower", required: true },
  口径一折算后节约电力: { prop: "saveConvertPower", required: true },
  口径一节约电费: { prop: "saveCost", required: true },
  是否客户自身技术力量实施: { prop: "exSelfImpl", isCode: true }
};
