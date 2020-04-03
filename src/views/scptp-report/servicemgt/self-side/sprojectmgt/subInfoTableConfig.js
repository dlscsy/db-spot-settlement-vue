// 数据展示区域配置
import { EDIT_TABLE } from "components/Table/TableConstant";

export const subInfoTableConfig = {
  // 必填
  rowkey: "GUID",
  // 必填，表格类型
  tableType: EDIT_TABLE,
  // 必填，multiple, single
  selectionType: "multiple",
  // 必填，表格是否初始化数据
  initLoad: false,
  // 选填，配置项参考el-table的API
  tableMeta: {
    "empty-text": ""
  },
  // 必填
  pagination: {
    // "page-size": 5
    show: true, // 必填，是否分页组件
    frontPagingType: true, // 必填，是否前端分页
    pageMeta: {
      // 选填，分页组件配置，参考el-pagination的API
      layout: "total, ->, jumper, prev, pager, next"
    }
  }
};
