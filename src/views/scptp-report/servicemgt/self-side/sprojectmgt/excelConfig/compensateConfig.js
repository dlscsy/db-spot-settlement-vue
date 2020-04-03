export const compensateExcelConfig = {
  上报月份: {
    prop: "theMonth",
    type: "date",
    format: "YYYY-MM",
    required: true,
    base: true
  },
  项目名称: { prop: "projectName", required: true, base: true },
  节能量属性: {
    prop: "saveProperty",
    isCode: true,
    required: true,
    base: true
  },
  所属单位: { prop: "company", isCode: true, required: true, base: true },
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
  行业类别: { prop: "tradeCategory", isCode: true, required: true, base: true },
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
  节能量审核单位: { prop: "saveCheckCompany", base: true },
  投运年月: {
    prop: "workingDate",
    type: "date",
    format: "YYYY-MM",
    base: true
  },
  项目编号: { prop: "projectNum", base: true },

  无功补偿全投的容量值: { prop: "capacity", required: true },
  电容器的介质损耗角正切值: { prop: "tangent", required: true },
  无功经济当量: { prop: "equivalent", required: true },
  无功补偿装置在最大节电力情况下等效运行时间: { prop: "hours", required: true },
  理论年节约电量: { prop: "theoryQuantity", required: true },
  折算年节约电量: { prop: "convertQuantity", required: true }
};
