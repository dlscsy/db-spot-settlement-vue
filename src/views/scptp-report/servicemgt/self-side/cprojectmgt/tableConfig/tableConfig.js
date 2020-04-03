// 数据展示区域配置
export const tableConfig = {
  // 必填
  rowkey: "reportId",
  // 必填，multiple, single
  selectionType: "multiple",
  // 必填，表格是否初始化数据
  initLoad: true,
  // 选填，配置项参考el-table的API
  tableMeta: {
    "empty-text": ""
  },
  // 选填，配置项参考el-pagination的API
  pagination: false,
  // 必填
  columns: [
    {
      prop: "detail",
      label: "所属单位",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "reportName",
      label: "项目类别",
      "header-align": "center",
      align: "left"
    },
    {
      prop: "theMonth",
      label: "统计年月",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "statisticsState",
      label: "户号",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "submitState",
      label: "客户名称",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "dd",
      label: "所处行业",
      "header-align": "center",
      align: "left"
      // formatter: row => {
      //   return row.dictionaries.ORG_ID_RELATION_VALUE;
      // }
    },
    {
      prop: "statisticsOperator",
      label: "项目名称",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "statisticsDate",
      label: "降低负荷手段",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "submitOperator",
      label: "激励措施或应用新技术新设备内容",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "submitDate",
      label: "项目实施方式",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "returnOpinion1",
      label: "项目实施年月",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "returnOpinion2",
      label: "年累计",
      "header-align": "center",
      align: "center",
      children: [
        {
          prop: "returnOpinion3",
          label: "转移电量（万kWh）",
          "header-align": "center",
          align: "center"
        },
        {
          prop: "returnOpinion4",
          label: "峰段时长（h）",
          "header-align": "center",
          align: "center"
        },
        {
          prop: "returnOpinion5",
          label: "转移负荷（万kW）",
          "header-align": "center",
          align: "center",
          children: [
            {
              prop: "returnOpinion6",
              label: "转移电量（万kWh）",
              "header-align": "center",
              align: "center"
            },
            {
              prop: "returnOpinion7",
              label: "峰段时长（h）",
              "header-align": "center",
              align: "center"
            }
          ]
        }
      ]
    }
  ]
};
