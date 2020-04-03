export const clientSideExcelConfig = {
  上报月份: {
    prop: "theMonth",
    type: "date",
    format: "YYYY-MM",
    required: true
  },
  所属单位: { prop: "company", isCode: true, required: true },
  户号: { prop: "userNum", required: true },
  客户名称: { prop: "userName", required: true },
  项目名称: { prop: "projectName", required: true },
  用户所处行业: { prop: "userTradeType", isCode: true, required: true },
  技术分类: { prop: "technologyCategory", isCode: true, required: true },
  项目类型: { prop: "projectType", isCode: true, required: true },
  机组编号: { prop: "unitCode", required: true },
  机组容量: { prop: "unitCapacity" },
  投入运行时间: {
    prop: "workingDate",
    type: "date",
    format: "YYYY-MM-DD"
  },
  目录电价: { prop: "catalogPrice" },
  上网电价: { prop: "gridPrice" },
  机组发电量: { prop: "unitQuantity" },
  余额上网电量: { prop: "reQuantity" },
  "余额上网电量（折算）": { prop: "reConvertQuantity" },
  企业自用电量: { prop: "selfQuantity" }
};
