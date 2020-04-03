import { conditionConfig } from "./conditionConfig";
import { tableConfig } from "./tableConfig";
import { fmodalConfig } from "./fmodalConfig";

import { compensateExcelConfig } from "./excelConfig/compensateConfig";
import { heTransformerExcelConfig } from "./excelConfig/heTransformerConfig";
import { lineExcelConfig } from "./excelConfig/lineConfig";
import { boostExcelConfig } from "./excelConfig/boostConfig";
import { eleMachineryExcelConfig } from "./excelConfig/eleMachineryConfig";
import { wasteRecoveryExcelConfig } from "./excelConfig/wasteRecoveryConfig";
import { vrvExcelConfig } from "./excelConfig/vrvConfig";
import { lightingExcelConfig } from "./excelConfig/lightingConfig";
import { heatPumpExcelConfig } from "./excelConfig/heatPumpConfig";
import { eleStorageExcelConfig } from "./excelConfig/eleStorageConfig";
import { coalExcelConfig } from "./excelConfig/coalConfig";
import { gasExcelConfig } from "./excelConfig/gasConfig";
import { resourceExcelConfig } from "./excelConfig/resourceConfig";

export const pageConfig = {
  // 必填
  base: {
    queryUrl: "/sProjectMgtController/getSProjectInfo",
    addUrl: "/sProjectMgtController/addSProjectInfo",
    updateUrl: "/sProjectMgtController/updateSProjectInfo",
    delUrl: "/sProjectMgtController/delSProjectInfo",
    existUrl: "/sProjectMgtController/validateExist",
    templeteUrl: "/sProjectMgtController/getSelfExcelTemplate",
    importUrl: "/sProjectMgtController/batchSelfAdd",
    isReportUrl: "/commonController/validateReport"
  },
  conditionConfig: conditionConfig,
  // 操作区域配置，选填
  operationConfig: {
    baseBtnState: false
  },
  tableConfig: tableConfig,
  fmodalConfig: fmodalConfig,
  excelSelfConfig: {
    "1": compensateExcelConfig,
    "2": heTransformerExcelConfig,
    "3": lineExcelConfig,
    "4": boostExcelConfig,
    "5": eleMachineryExcelConfig,
    "6": wasteRecoveryExcelConfig,
    "7": vrvExcelConfig,
    "8": lightingExcelConfig,
    "9": heatPumpExcelConfig,
    "10": eleStorageExcelConfig,
    "11": coalExcelConfig,
    "12": gasExcelConfig,
    "13": resourceExcelConfig
  }
};
