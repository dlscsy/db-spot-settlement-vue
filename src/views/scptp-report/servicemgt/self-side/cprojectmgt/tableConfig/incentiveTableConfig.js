// 数据展示区域配置
import { BASIC_TABLE } from "components/Table/TableConstant";

export const incentiveTableConfig = {
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
      align: "left",
      width: "190",
      fixed: true,
      formatter: row => {
        return row.dictionaries.COMPANY_RV;
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
      prop: "PROJECT_CATEGORY_RV",
      label: "项目类别",
      "header-align": "center",
      align: "left",
      width: "230",
      fixed: true,
      formatter: row => {
        return row.dictionaries.PROJECT_CATEGORY_RV;
      }
    },
    {
      prop: "userNum",
      label: "户号",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "userName",
      label: "客户名称",
      "header-align": "center",
      align: "left"
    },
    {
      prop: "USER_TRADE_TYPE_RV",
      label: "所处行业",
      "header-align": "center",
      align: "left",
      formatter: row => {
        return row.dictionaries.USER_TRADE_TYPE_RV;
      }
    },
    {
      prop: "projectName",
      label: "项目名称",
      "header-align": "center",
      align: "left"
    },
    {
      prop: "REDUCE_METHOD_RV",
      label: "降低负荷手段",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.REDUCE_METHOD_RV;
      }
    },
    {
      prop: "incentiveContent",
      label: "激励措施或应用新技术新设备内容",
      "header-align": "center",
      align: "left",
      width: "180"
    },
    {
      prop: "implDate",
      label: "项目实施年月",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "year",
      label: "年累计",
      "header-align": "center",
      align: "center",
      children: [
        {
          prop: "transferQuantityYear",
          label: "转移电量（万kWh）",
          "header-align": "center",
          align: "right",
          width: "90"
        },
        {
          prop: "peakDurationYear",
          label: "峰段时长（h）",
          "header-align": "center",
          align: "right"
        },
        {
          prop: "transferLoadYear",
          label: "转移负荷（万kW）",
          "header-align": "center",
          align: "right",
          width: "90"
        }
      ]
    },
    {
      prop: "month",
      label: "本月",
      "header-align": "center",
      align: "center",
      children: [
        {
          prop: "transferQuantity",
          label: "转移电量（万kWh）",
          "header-align": "center",
          align: "right",
          width: "90"
        },
        {
          prop: "peakDuration",
          label: "峰段时长（h）",
          "header-align": "center",
          align: "right"
        }
      ]
    },
    {
      prop: "DATASOURCE_RV",
      label: "数据来源",
      "header-align": "center",
      align: "center",
      fixed: "right",
      formatter: row => {
        return row.dictionaries.DATASOURCE_RV;
      }
    },
    {
      prop: "DATA_STATE_RV",
      label: "数据状态",
      "header-align": "center",
      align: "center",
      fixed: "right",
      formatter: row => {
        return row.dictionaries.DATA_STATE_RV;
      }
    }
  ]
};
