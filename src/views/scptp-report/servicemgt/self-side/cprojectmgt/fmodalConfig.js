// form表单区域配置
export const fmodalConfig = {
  // 必填
  mainTitle: "节能服务节约电力电量情况",
  // 选填，表单每行显示表单项个数，必须能被24整除
  itemsInRowNum: 2,
  // 选填，配置项参考el-dialog的API
  modalMeta: {
    "destroy-on-close": true
  },
  // 选填，配置项参考el-form的API
  formMeta: {},
  // 必填
  items: {},
  // 选填，子表单的配置
  childrenForm: [
    // {
    //   mainTitle: "",
    //   itemsInRowNum: 2,
    //   modalMeta: {},
    //   formMeta: {},
    //   items: [],
    //   rules: []
    // }
  ]
};
