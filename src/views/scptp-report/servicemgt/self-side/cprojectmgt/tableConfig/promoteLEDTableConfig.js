// 数据展示区域配置
import { BASIC_TABLE } from "components/Table/TableConstant";

export const promoteLEDTableConfig = {
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
      prop: "USER_TRADE_TYPE_RV",
      label: "所处行业",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.USER_TRADE_TYPE_RV;
      }
    },
    {
      prop: "projectName",
      label: "项目名称",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "EX_REFORM_RV",
      label: "是否系统内改造",
      width: "110",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.EX_REFORM_RV;
      }
    },
    {
      prop: "implCompany",
      label: "项目施工单位",
      "header-align": "center",
      align: "left"
    },
    {
      prop: "IMPL_TYPE_RV",
      label: "项目实施方式",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.IMPL_TYPE_RV;
      }
    },
    {
      prop: "ledNum",
      label: "LED灯具改造数量(盏)",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "saveAbility",
      label: "年节电能力(万千瓦时)",
      "header-align": "center",
      width: "90",
      align: "center"
    },
    {
      prop: "reducePowerRate",
      label: "灯具总降低功率(万千瓦)",
      "header-align": "center",
      width: "110",
      align: "center"
    },
    {
      prop: "investAmount",
      label: "项目投资金额(万元)",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "contractStartDate",
      label: "改造完成时间或合同开始时间(年月)",
      "header-align": "center",
      width: "130",
      align: "center"
    },
    {
      prop: "contractEndDate",
      label: "合同截止时间",
      "header-align": "center",
      width: "120",
      align: "center"
    }
  ]
};
