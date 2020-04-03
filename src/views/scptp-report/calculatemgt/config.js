import { conditionConfig } from "./conditionConfig";
import { tableConfig } from "./tableConfig";

export const pageConfig = {
  // 必填
  base: {
    queryUrl: "/calculateSideSummary/search"
    // addUrl: "/demoController/add",
    // updateUrl: "/demoController/update",
    // delUrl: "/demoController/del",
    // existUrl: "/demoController/validateExist"
  },
  conditionConfig: conditionConfig,
  // 操作区域配置，选填
  operationConfig: {
    baseBtnState: false
  },
  tableConfig: tableConfig
};
