// 数据展示区域配置
import { BASIC_TABLE } from "components/Table/TableConstant";

export const saveServiceTableConfig = {
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
      children: [
        {
          prop: "title"
        }
      ]
    },
    {
      prop: "projectCode_14",
      label: "科学用电示范点",
      width: "110",
      "header-align": "center",
      align: "center"
    },
    {
      prop: "projectCode_15",
      label: "印发宣传资料",
      "header-align": "center",
      align: "center"
    },
    {
      label: "节能宣传",
      "header-align": "center",
      align: "center",
      children: [
        {
          prop: "projectCode_16",
          label: "走进社区",
          "header-align": "center",
          align: "center"
        },
        {
          prop: "projectCode_17",
          label: "走进学校",
          "header-align": "center",
          align: "center"
        },
        {
          prop: "projectCode_18",
          label: "走进农村",
          "header-align": "center",
          align: "center"
        },
        {
          prop: "projectCode_19",
          label: "数量",
          "header-align": "center",
          align: "center"
        }
      ]
    },
    {
      label: "节能展示中心",
      "header-align": "center",
      align: "center",
      children: [
        {
          prop: "projectCode_20",
          label: "参观批次",
          "header-align": "center",
          align: "center"
        },
        {
          prop: "projectCode_21",
          label: "参观市民人数",
          "header-align": "center",
          align: "center"
        },
        {
          prop: "projectCode_22",
          label: "参观中小学生人数",
          "header-align": "center",
          align: "center"
        }
      ]
    },
    {
      label: "节能降耗交流研讨班",
      "header-align": "center",
      align: "left",
      children: [
        {
          prop: "projectCode_23",
          label: "举办期次",
          "header-align": "center",
          align: "center"
        },
        {
          prop: "projectCode_24",
          label: "参加户数",
          "header-align": "center",
          align: "center"
        },
        {
          prop: "projectCode_25",
          label: "参加人数",
          "header-align": "center",
          align: "center"
        }
      ]
    },
    {
      label: "节能服务",
      "header-align": "center",
      align: "center",
      children: [
        {
          prop: "projectCode_26",
          label: "节能咨询",
          "header-align": "center",
          align: "center"
        },
        {
          prop: "projectCode_27",
          label: "节能告知",
          "header-align": "center",
          align: "center"
        },
        {
          prop: "projectCode_28",
          label: "节能合理化建议",
          width: "110",
          "header-align": "center",
          align: "center"
        },
        {
          prop: "projectCode_29",
          label: "资金投入(万元)",
          width: "70",
          "header-align": "center",
          align: "center"
        }
      ]
    }
  ]
};
