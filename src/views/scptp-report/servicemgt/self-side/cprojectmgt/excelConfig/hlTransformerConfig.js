export const hlTransformerExcelConfig = {
  上报月份: {
    prop: "theMonth",
    type: "date",
    format: "YYYY-MM",
    required: true
  },
  所属单位: { prop: "company", isCode: true, required: true },
  变压器编号: { prop: "transformerCode", required: true },
  客户名称: { prop: "userName", required: true },
  户号: { prop: "userNum", required: true },
  用户所处行业: { prop: "userTradeType", isCode: true, required: true },
  高损变压器型号: { prop: "transformerModelNum", required: true },
  容量: { prop: "capacity" },
  改造或淘汰年月: {
    prop: "reOrElMonth",
    type: "date",
    format: "YYYY-MM"
  },
  改造后变压器型号: { prop: "reformModelNum" },
  改造实施单位: { prop: "reformCompany" },
  改造实施方式: { prop: "reformType", isCode: true },
  改造后年节约电量: { prop: "saveQuantity" }
};
