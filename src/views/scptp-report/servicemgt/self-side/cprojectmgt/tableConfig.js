// 数据展示区域配置
export const tableConfig = {
  // 必填
  rowkey: "projectId",
  // 必填，multiple, single
  selectionType: "multiple",
  // 必填，表格是否初始化数据
  initLoad: true,
  // 选填，配置项参考el-table的API
  tableMeta: {
    "empty-text": ""
  },
  // 选填，配置项参考el-pagination的API
  pagination: {
    // "page-size": 5
  },
  // 必填
  columns: [
    {
      prop: "company",
      label: "所属单位",
      width: "190",
      fixed: true,
      "show-overflow-tooltip": true,
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.COMPANY_RV;
      }
    },
    {
      prop: "theMonth",
      label: "统计月份",
      width: "90",
      fixed: true,
      "header-align": "center",
      align: "center"
    },
    {
      prop: "projectCategory",
      label: "项目类别",
      width: "200",
      fixed: true,
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.PROJECT_CATEGORY_RV;
      }
    },
    {
      prop: "projectName",
      label: "项目名称",
      width: "200",
      "header-align": "center",
      align: "left"
    },
    {
      prop: "saveProperty",
      label: "节能量属性",
      width: "100",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.SAVE_PROPERTY_RV;
      }
    },
    {
      prop: "saveCompany",
      label: "节能单位",
      width: "150",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.SAVE_COMPANY_RV;
      }
    },
    {
      prop: "tradeCategory",
      label: "行业类别",
      width: "120",
      "header-align": "center",
      align: "left",
      formatter: row => {
        return row.dictionaries.TRADE_CATEGORY_RV;
      }
    },
    {
      prop: "area",
      label: "所属地区",
      width: "100",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "exContract",
      label: "是否合同能源管理",
      width: "120",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.EX_CONTRACT_RV;
      }
    },
    {
      prop: "projectTotalInvest",
      label: "项目总投资（万元）",
      width: "200",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "exSaveCheck",
      label: "是否节能量审核",
      width: "120",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.EX_SAVE_CHECK_RV;
      }
    },
    {
      prop: "saveCheckCompany",
      label: "节能量审核单位",
      width: "120",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "workingDate",
      label: "投运年月",
      width: "100",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "dataSource",
      label: "数据来源",
      width: "100",
      fixed: "right",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.DATASOURCE_RV;
      }
    },
    {
      prop: "dataState",
      label: "数据状态",
      width: "100",
      fixed: "right",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.DATA_STATE_RV;
      }
    }
  ]
};
