import { conditionConfig } from "./conditionConfig";
import { tableConfig } from "./tableConfig";
import { fmodalConfig } from "./fmodalConfig";

export const pageConfig = {
  // 必填
  base: {
    queryUrl: "/demoController/queryByConditions",
    addUrl: "/demoController/add",
    updateUrl: "/demoController/update",
    delUrl: "/demoController/del",
    existUrl: "/demoController/validateExist"
  },
  conditionConfig: conditionConfig,
  // 操作区域配置，选填
  operationConfig: {
    // file4BatchDataBtnState: true
  },
  tableConfig: tableConfig,
  fmodalConfig: fmodalConfig
};
