import defaultSettings from "@/settings";

const title = defaultSettings.title || "需求侧计量报表多维度展示系统";

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
