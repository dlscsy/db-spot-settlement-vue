// 数据展示区域配置
import { BASIC_TABLE } from "components/Table/TableConstant";
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
      prop: "reportName",
      label: "报表名称",
      "header-align": "center",
      align: "left",
      width: "180"
    },
    {
      prop: "theMonth",
      label: "报表年月",
      "header-align": "center",
      align: "center",
      width: "90"
    },
    {
      prop: "statisticsState",
      label: "报表统计状态",
      "header-align": "center",
      align: "center",
      width: "100",
      formatter: row => {
        if (row.statisticsState === "0") {
          return "未统计";
        } else {
          return "<span style='color:#4fc2b9'>已统计</span>";
        }
      }
    },
    {
      prop: "submitState",
      label: "报表上报状态",
      "header-align": "center",
      align: "center",
      width: "100",
      formatter: row => {
        if (row.submitState === "0") {
          return "未上报";
        } else if (row.submitState === "1") {
          return "<span style='color:#4fc2b9'>已上报</span>";
        } else {
          return "<span style='color:red'>已回退</span>";
        }
      }
    },
    {
      prop: "dd",
      label: "下级(已上报/未上报)",
      "header-align": "center",
      align: "center",
      width: "130",
      formatter: row => {
        return row.yesSubmit + "/" + row.noSubmit;
      }
    },
    {
      prop: "statisticsOperator",
      label: "统计人",
      "header-align": "center",
      align: "center",
      width: "150"
    },
    {
      prop: "statisticsDate",
      label: "统计时间",
      "header-align": "center",
      width: "150",
      align: "center"
    },
    {
      prop: "submitOperator",
      label: "上报人",
      "header-align": "center",
      width: "150",
      align: "center"
    },
    {
      prop: "submitDate",
      label: "上报时间",
      "header-align": "center",
      width: "150",
      align: "center"
    },
    {
      prop: "returnOpinion",
      label: "回退意见",
      "header-align": "center",
      align: "left"
    }
  ]
};
