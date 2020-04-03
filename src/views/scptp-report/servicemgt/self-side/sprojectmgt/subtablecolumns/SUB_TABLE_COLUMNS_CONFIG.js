import { B_COMPENSATE } from "./1_B_COMPENSATE";
import { B_HE_TRANSFORMER } from "./2_B_HE_TRANSFORMER";
import { B_LINE } from "./3_B_LINE";
import { B_BOOST } from "./4_B_BOOST";
import { B_ELE_MACHINERY } from "./5_B_ELE_MACHINERY";
import { B_WASTE_RECOVERY } from "./6_B_WASTE_RECOVERY";
import { B_VRV } from "./7_B_VRV";
import { B_LIGHTING } from "./8_B_LIGHTING";
import { B_HEAT_PUMP } from "./9_B_HEAT_PUMP";
import { B_ELE_STORAGE } from "./10_B_ELE_STORAGE";
import { B_COAL } from "./11_B_COAL";
import { B_GAS } from "./12_B_GAS";
import { B_RESOURCE } from "./13_B_RESOURCE";

export const SUB_TABLE_COLUMNS_CONFIG = {
  "1": B_COMPENSATE,
  "2": B_HE_TRANSFORMER,
  "3": B_LINE,
  "4": B_BOOST,
  "5": B_ELE_MACHINERY,
  "6": B_WASTE_RECOVERY,
  "7": B_VRV,
  "8": B_LIGHTING,
  "9": B_HEAT_PUMP,
  "10": B_ELE_STORAGE,
  "11": B_COAL,
  "12": B_GAS,
  "13": B_RESOURCE
};

export const SUB_TABLE_INFO_TITLES_CONFIG = {
  "1": "变电站无功补偿项目",
  "2": "高效变压器应用项目",
  "3": "线路改造项目",
  "4": "升压改造项目",
  "5": "电机系统节能项目",
  "6": "中央空调余热回收项目",
  "7": "中央空调系统控制节能及中央空调过渡季冷却水制冷项目",
  "8": "绿色照明项目",
  "9": "水（地）源热泵项目",
  "10": "电蓄冷（热）项目",
  "11": "燃煤工业锅炉分层燃烧项目",
  "12": "燃气锅炉冷凝式余热回收项目",
  "13": "资源利用发电项目"
};
