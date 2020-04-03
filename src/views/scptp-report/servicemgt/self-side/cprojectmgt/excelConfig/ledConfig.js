export const ledExcelConfig = {
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
  是否系统内改造: { prop: "exReform", isCode: true, required: true },
  项目实施单位: { prop: "implCompany", required: true },
  项目实施方式: { prop: "implType", required: true, isCode: true },
  LED灯具改造数量: { prop: "ledNum", required: true },
  年节电能力: { prop: "saveAbility", required: true },
  灯具总降低功率: { prop: "reducePowerRate" },
  项目投资金额: { prop: "investAmount" },
  改造完成时间或合同开始时间: {
    prop: "contractStartDate",
    type: "date",
    format: "YYYY-MM"
  },
  合同截止时间: {
    prop: "contractEndDate",
    type: "date",
    format: "YYYY-MM"
  }
};
