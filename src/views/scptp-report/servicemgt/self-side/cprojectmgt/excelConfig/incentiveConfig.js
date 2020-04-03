export const incentiveExcelConfig = {
  上报月份: {
    prop: "theMonth",
    type: "date",
    format: "YYYY-MM",
    required: true
  },
  所属单位: { prop: "company", isCode: true, required: true },
  户号: { prop: "userNum", required: true },
  客户名称: { prop: "userName", required: true },
  用户所处行业: { prop: "userTradeType", isCode: true, required: true },
  项目名称: { prop: "projectName", required: true },
  降低负荷手段: { prop: "reduceMethod", isCode: true },
  激励措施或应用新技术新设备内容: { prop: "incentiveContent" },
  项目实施年月: {
    prop: "implDate",
    type: "date",
    format: "YYYY-MM"
  },
  转移电量: { prop: "transferQuantity" },
  峰段时长: { prop: "peakDuration" }
};
