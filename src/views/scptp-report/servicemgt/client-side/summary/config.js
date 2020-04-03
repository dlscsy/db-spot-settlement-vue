import { conditionConfig } from "./conditionConfig";
import { tableConfig } from "./tableConfig";

export const pageConfig = {
  // 必填
  base: {
    queryUrl: "/projectInfoSummary/search"
  },
  conditionConfig: conditionConfig,
  tableConfig: tableConfig,
  // 操作区域配置，选填
  operationConfig: {
    baseBtnState: false,
    file4BatchDataBtnState: "export"
  }
};
