// 数据展示区域配置
import { BASIC_TABLE } from "components/Table/TableConstant";

export const diagnosisTableConfig = {
  // 必填
  rowkey: "guid",
  // 必填，表格类型
  tableType: BASIC_TABLE,
  // 必填，multiple, single
  selectionType: "multiple",
  // 必填，表格是否初始化数据
  initLoad: true,
  // 选填，配置项参考el-table的API
  tableMeta: {
    "empty-text": ""
  },
  // 必填
  pagination: {
    show: true, // 必填，是否分页组件
    frontPagingType: false, // 必填，是否前端分页
    pageMeta: {
      // 选填，分页组件配置，参考el-pagination的API
      // "page-size": 5
    }
  },
  // 必填
  columns: [
    {
      prop: "COMPANY_RV",
      label: "所属单位",
      "header-align": "center",
      align: "center",
      fixed: true,
      formatter: row => {
        return row.dictionaries.COMPANY_RV;
      }
    },
    {
      prop: "PROJECT_CATEGORY_RV",
      label: "项目类别",
      "header-align": "center",
      align: "left",
      fixed: true,
      formatter: row => {
        return row.dictionaries.PROJECT_CATEGORY_RV;
      }
    },
    {
      prop: "theMonth",
      label: "上报月份",
      "header-align": "center",
      align: "center",
      fixed: true
    },
    {
      prop: "userNum",
      label: "户号",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "userName",
      label: "诊断用户名称",
      "header-align": "center",
      align: "left"
    },
    {
      prop: "implCompany",
      label: "诊断实施单位",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "USER_TRADE_TYPE_RV",
      label: "用户所处行业",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.USER_TRADE_TYPE_RV;
      }
    },
    {
      prop: "diagnosisDate",
      label: "诊断时间",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "diagnosisCost",
      label: "诊断费用(万元)",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "zzz7",
      label: "上年年用电量(万千瓦时)",
      "header-align": "center",
      width: "100",
      align: "center"
    },
    {
      prop: "saveQuantity",
      label: "诊断报告年节电量(万千瓦时)",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "EX_REFORM_RV",
      label: "是否意向开展改造",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.EX_REFORM_RV;
      }
    },
    {
      prop: "EX_CONTRACT_RV",
      label: "是否意向开展合同能源管理",
      width: "100",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.EX_CONTRACT_RV;
      }
    },
    {
      prop: "EX_COMPLETE_RV",
      label: "是否完成改造",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.EX_COMPLETE_RV;
      }
    },
    {
      prop: "reformCompany",
      label: "改造实施单位",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "REFORM_TYPE_RV",
      label: "改造实施方式",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.REFORM_TYPE_RV;
      }
    }
  ]
};
