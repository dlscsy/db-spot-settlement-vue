// 数据展示区域配置
import { BASIC_TABLE } from "components/Table/TableConstant";

export const tableConfig = {
  // 必填
  rowkey: "userId",
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
      prop: "account",
      label: "用户账户",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "userName",
      label: "用户姓名",
      "header-align": "center",
      align: "left"
    },
    {
      prop: "contactNum",
      label: "联系电话",
      "header-align": "center",
      align: "center"
    },
    // {
    //   prop: "sex",
    //   label: "性别",
    //   "header-align": "center",
    //   align: "center",
    //   formatter: row => {
    //     return row.dictionaries.SEX_RELATION_VALUE;
    //   }
    // },
    // {
    //   prop: "userState",
    //   label: "用户状态",
    //   "header-align": "center",
    //   align: "center",
    //   formatter: row => {
    //     return row.dictionaries.USER_STATE_RELATION_VALUE;
    //   }
    // },
    {
      prop: "orgCode",
      label: "所属组织机构",
      "header-align": "center",
      align: "left",
      formatter: row => {
        return row.dictionaries.ORG_CODE_RELATION_VALUE;
      }
    },
    {
      prop: "regdate",
      label: "注册日期",
      "header-align": "center",
      align: "center"
    }
  ]
};
