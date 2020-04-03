import { conditionConfig } from "./conditionConfig";
import { clientSideTableConfig } from "./tableConfig/clientSideTableConfig";
import { contractTableConfig } from "./tableConfig/contractTableConfig";
import { incentiveTableConfig } from "./tableConfig/incentiveTableConfig";
import { uncontractTableConfig } from "./tableConfig/uncontractTableConfig";
import { saveServiceTableConfig } from "./tableConfig/saveServiceTableConfig";
import { diagnosisTableConfig } from "./tableConfig/diagnosisTableConfig";
import { hLTransformerTableConfig } from "./tableConfig/hLTransformerTableConfig";
import { promoteLEDTableConfig } from "./tableConfig/promoteLEDTableConfig";
import { fmodalConfig } from "./fmodalConfig";
import { fileModalConfig } from "./fileModalConfig";
import { unContractExcelConfig } from "./excelConfig/unContractConfig";
import { contractExcelConfig } from "./excelConfig/contractConfig";
import { clientSideExcelConfig } from "./excelConfig/clientSideConfig";
import { ledExcelConfig } from "./excelConfig/ledConfig";
import { hlTransformerExcelConfig } from "./excelConfig/hlTransformerConfig";
import { diagnosisExcelConfig } from "./excelConfig/diagnosisConfig";
import { incentiveExcelConfig } from "./excelConfig/incentiveConfig";

export const pageConfig = {
  // 必填
  base: {
    queryUrl: "/cProjectMgtController/getCProjectMgtInfo",
    addUrl: "/cProjectMgtController/add",
    existUrl: "/cProjectMgtController/validateExist",
    delUrl: "/cProjectMgtController/del",
    updateUrl: "/cProjectMgtController/update",
    templeteUrl: "/cProjectMgtController/getExcelTemplate",
    importUrl: "/cProjectMgtController/batchAdd",
    isReportUrl: "/commonController/validateReport"
  },
  conditionConfig: conditionConfig,
  // 操作区域配置，选填
  operationConfig: {
    baseBtnState: true,
    enclosureBtnState: true,
    file4BatchDataBtnState: true
  },
  tableConfig: {
    "1": saveServiceTableConfig,
    "2": diagnosisTableConfig,
    "3": hLTransformerTableConfig,
    "4": promoteLEDTableConfig,
    "5": incentiveTableConfig,
    "6": clientSideTableConfig,
    "7": contractTableConfig,
    "8": uncontractTableConfig
  },
  fmodalConfig: fmodalConfig,
  fileModalConfig: fileModalConfig,
  excelConfig: {
    "2": diagnosisExcelConfig,
    "3": hlTransformerExcelConfig,
    "4": ledExcelConfig,
    "5": incentiveExcelConfig,
    "6": clientSideExcelConfig,
    "7": contractExcelConfig,
    "8": unContractExcelConfig
  }
};
