// 数据展示区域配置
import { BASIC_TABLE } from "components/Table/TableConstant";
// const isEmpty = require("lodash/isEmpty");
export const tableConfig = {
  // 必填
  rowkey: "reportId",
  //必填，表格类型
  tableType: BASIC_TABLE,
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
    show: false, // 必填，是否分页组件
    frontPagingType: false, // 必填，是否前端分页
    pageMeta: {
      // 选填，分页组件配置，参考el-pagination的API
      // "page-size": 5
    }
  },
  // 必填
  columns: [
    {
      prop: "orgName",
      label: "单位名称",
      "header-align": "center",
      align: "left"
    },
    {
      prop: "monthValue",
      label: "本月汇总",
      "header-align": "center",
      align: "center",
      formatter: (row, column, cellValue) => {
        if (row.monthValue === null) {
          return "-";
        }
        return cellValue;
      }
    },
    {
      prop: "totalValue",
      label: "本年累计",
      "header-align": "center",
      align: "center",
      formatter: (row, column, cellValue) => {
        if (row.totalValue === null) {
          return "-";
        }
        return cellValue;
      }
    }
  ]
};
