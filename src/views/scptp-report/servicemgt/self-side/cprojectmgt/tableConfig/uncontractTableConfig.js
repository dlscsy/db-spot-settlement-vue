// 数据展示区域配置
import { BASIC_TABLE } from "components/Table/TableConstant";

export const uncontractTableConfig = {
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
      width: "190",
      fixed: true
    },
    {
      prop: "PROJECT_CATEGORY_RV",
      label: "项目类别",
      "header-align": "center",
      align: "left",
      width: "190",
      fixed: true,
      formatter: row => {
        return row.dictionaries.PROJECT_CATEGORY_RV;
      }
    },
    {
      prop: "CATEGORY_RV",
      label: "分类",
      "header-align": "center",
      align: "left",
      width: "190",
      formatter: row => {
        return row.dictionaries.CATEGORY_RV;
      }
    },
    {
      prop: "userNum",
      label: "户号",
      width: "150",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "userName",
      label: "客户名称",
      width: "150",
      "header-align": "center",
      align: "left"
    },
    {
      prop: "USER_TRADE_TYPE_RV",
      label: "所处行业",
      width: "200",
      "header-align": "center",
      align: "left",
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
      prop: "TECHNOLOGY_CATEGORY_RV",
      label: "技术分类",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.TECHNOLOGY_CATEGORY_RV;
      }
    },
    {
      prop: "PROJECT_TYPE_RV",
      label: "项目类型",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.PROJECT_TYPE_RV;
      }
    },
    {
      prop: "projectName",
      label: "项目名称",
      "header-align": "center",
      align: "left"
    },
    {
      prop: "projectCompleteDate",
      label: "项目竣工时间",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "EX_CHECK_RV",
      label: "是否经过第三方审核",
      width: "90",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.EX_CHECK_RV;
      }
    },
    {
      prop: "investAmount",
      label: "投资",
      "header-align": "center",
      align: "center",
      children: [
        {
          prop: "investAmount1",
          label: "口径二",
          "header-align": "center",
          align: "right"
        },
        {
          prop: "investAmount",
          label: "口径一",
          "header-align": "center",
          align: "right"
        }
      ]
    },
    {
      prop: "implCompany",
      label: "项目施工单位名称",
      "header-align": "center",
      align: "left"
    },
    {
      prop: "SAVE_PROMOTE_TYPE_RV",
      label: "节能服务推动方式",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.SAVE_PROMOTE_TYPE_RV;
      }
    },
    {
      prop: "eleScale",
      label: "年度用电规模（万千瓦时）",
      "header-align": "center",
      width: "110",
      align: "right"
    },
    {
      prop: "saveQ1",
      label: "口径二节约电量（万千瓦时）",
      "header-align": "center",
      align: "center",
      children: [
        {
          prop: "saveQuantity1",
          label: "按实际节电量",
          "header-align": "center",
          width: "120",
          align: "right"
        },
        {
          prop: "saveConvertQuantity1",
          label: "按折算系数折算后",
          "header-align": "center",
          align: "right"
        }
      ]
    },
    {
      prop: "saveQ",
      label: "口径一节约电量（万千瓦时）",
      "header-align": "center",
      align: "center",
      children: [
        {
          prop: "saveQuantity",
          label: "按实际节电量",
          width: "120",
          "header-align": "center",
          align: "right"
        },
        {
          prop: "saveConvertQuantity",
          label: "按折算系数折算后",
          "header-align": "center",
          align: "right"
        }
      ]
    },
    {
      prop: "saveP1",
      label: "口径二节约电力（万千瓦）",
      "header-align": "center",
      align: "center",
      children: [
        {
          prop: "savePower1",
          label: "按实际节电力",
          width: "120",
          "header-align": "center",
          align: "right"
        },
        {
          prop: "saveConvertPower1",
          label: "按折算系数折算后",
          "header-align": "center",
          align: "right"
        }
      ]
    },
    {
      prop: "saveP",
      label: "口径一节约电力（万千瓦）",
      "header-align": "center",
      align: "center",
      children: [
        {
          prop: "savePower",
          label: "按实际节电力",
          width: "120",
          "header-align": "center",
          align: "right"
        },
        {
          prop: "saveConvertPower",
          label: "按折算系数折算后",
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
