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
    // {
    //   prop: "detail",
    //   label: "详情",
    //   "header-align": "center",
    //   align: "center"
    // },
    {
      prop: "reportName",
      label: "报表名称",
      "header-align": "center",
      width: 300,
      align: "left"
    },
    {
      prop: "theMonth",
      label: "报表年月",
      "header-align": "center",
      align: "center",
      formatter: row => {
        //后台返回的是201912形式的字符串，需格式转换
        let theMonth = row.theMonth;
        //截取年
        let year = theMonth.substr(0, 4);
        //截取月
        let month = theMonth.substr(4, 2);
        return year + "-" + month;
      }
    },
    {
      prop: "statisticsState",
      label: "报表统计状态",
      "header-align": "center",
      align: "center",
      formatter: row => {
        if (row.statisticsState === "0") {
          return "未统计";
        } else {
          return "<span style='color:#4fc2b9'>已统计</span>";
        }
      }
    },
    // {
    //   prop: "dd",
    //   label: "下级(已统计/未统计)",
    //   "header-align": "center",
    //   align: "center",
    //   formatter: row => {
    //     return row.yesSubmit + "/" + row.noSubmit;
    //   }
    // },
    {
      prop: "statisticsOperator",
      label: "统计人",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "statisticsDate",
      label: "统计时间",
      "header-align": "center",
      align: "center"
    }
  ]
};
