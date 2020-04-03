// 数据展示区域配置
import { BASIC_TABLE } from "components/Table/TableConstant";

export const clientSideTableConfig = {
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
      fixed: true,
      width: "200",
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
      prop: "TECHNOLOGY_CATEGORY_RV",
      label: "技术分类",
      "header-align": "center",
      align: "center",
      formatter: row => {
        return row.dictionaries.TECHNOLOGY_CATEGORY_RV;
      }
    },
    {
      prop: "projectName",
      label: "项目名称",
      "header-align": "center",
      width: "200",
      align: "left"
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
      prop: "unitCode",
      label: "机组编号",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "basicInfo",
      label: "基本信息",
      "header-align": "center",
      align: "center",
      children: [
        {
          prop: "unitCapacity",
          label: "机组容量（万千瓦）",
          "header-align": "center",
          align: "right",
          width: "130"
        },
        {
          prop: "workingDate",
          label: "投入运行时间",
          "header-align": "center",
          align: "center",
          width: "100"
        },
        {
          prop: "catalogPrice",
          label: "目录电价（万元/万千瓦时）",
          "header-align": "center",
          align: "right",
          width: "120"
        },
        {
          prop: "gridPrice",
          label: "上网电价（万元/万千瓦时）",
          "header-align": "center",
          align: "right",
          width: "120"
        }
      ]
    },
    {
      prop: "year",
      label: "今年累计电量情况",
      "header-align": "center",
      align: "center",
      children: [
        {
          prop: "unitQuantityYear",
          label: "机组发电量(万千瓦时)",
          "header-align": "center",
          align: "right",
          width: "90"
        },
        {
          prop: "reQuantityYear",
          label: "余额上网电量(万千瓦时)",
          "header-align": "center",
          align: "right",
          width: "100"
        },
        {
          prop: "reConvertQuantityYear",
          label: "余额上网电量(折算)（万千瓦时）",
          "header-align": "center",
          align: "right",
          width: "130"
        },
        {
          prop: "selfQuantityYear",
          label: "企业自用电量（万千瓦时）",
          "header-align": "center",
          align: "right",
          width: "100"
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
