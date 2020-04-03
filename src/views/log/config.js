import { conditionConfig } from "./conditionConfig";
import { tableConfig } from "./tableConfig";

export const pageConfig = {
  // 必填
  base: {
    queryUrl: "/logController/getLoggerByPage"
  },
  conditionConfig: conditionConfig,
  // 操作区域配置，选填
  operationConfig: {
    baseBtnState: false
  },
  tableConfig: tableConfig
};
