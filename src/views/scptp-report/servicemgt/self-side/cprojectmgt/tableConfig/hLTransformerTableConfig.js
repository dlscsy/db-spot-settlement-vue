// 数据展示区域配置
import { BASIC_TABLE } from "components/Table/TableConstant";
export const hLTransformerTableConfig = {
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
      label: "客户名称",
      "header-align": "center",
      align: "left"
    },
    {
      prop: "transformerCode",
      label: "变压器编号",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "USER_TRADE_TYPE_RV",
      label: "所处行业",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.USER_TRADE_TYPE_RV;
      }
    },
    {
      prop: "transformerModelNum",
      label: "高损变压器型号",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "capacity",
      label: "容量(万千伏安)",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "reOrElMonth",
      label: "改造或淘汰年月",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "reformModelNum",
      label: "改造后变压器型号",
      width: "120",
      "header-align": "center",
      align: "center"
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
    },
    {
      prop: "saveQuantity",
      label: "改造后年节约电量(万千瓦时)",
      "header-align": "center",
      width: "120",
      align: "center"
    }
  ]
};
