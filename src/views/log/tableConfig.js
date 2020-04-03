// 数据展示区域配置
import { BASIC_TABLE } from "components/Table/TableConstant";
export const tableConfig = {
  // 必填
  rowkey: "logId",
  //必填，表格类型
  tableType: BASIC_TABLE,
  // 必填，multiple, single
  selectionType: "single",
  // 必填，表格是否初始化数据
  initLoad: false,
  // 选填，配置项参考el-table的API
  tableMeta: {
    "empty-text": ""
  },
  // 选填，配置项参考el-pagination的API
  pagination: {
    show: true, // 必填，是否分页组件
    frontPagingType: false, // 必填，是否前端分页
    pageMeta: {
      // 选填，分页组件配置，参考el-pagination的API
      // "page-size": 10
    }
  },
  // 必填
  columns: [
    {
      prop: "logType",
      label: "日志类型",
      "header-align": "center",
      width: 300,
      align: "left",
      formatter: row => {
        if (row.logType === "1") {
          return "登录日志";
        } else {
          return "操作日志";
        }
      }
    },
    {
      prop: "account",
      label: "账号",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "dictionaries.ORG_CODE_RV",
      label: "账号所在单位",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.ORG_CODE_RV;
      }
    },
    {
      prop: "loginTime",
      label: "登录时间",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "operationTime",
      label: "操作时间",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "logIp",
      label: "登录人IP地址",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "operatorContent",
      label: "操作内容",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "remark",
      label: "备注",
      "header-align": "center",
      align: "center"
    }
  ]
};
