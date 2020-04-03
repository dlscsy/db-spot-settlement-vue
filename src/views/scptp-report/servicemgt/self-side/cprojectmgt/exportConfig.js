export const exportConfig = {
  projectTypeMap: [
    {
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
    },
    {
      "1": "节能服务项目",
      "2": "节能诊断明细项目",
      "3": "高损变压器项目",
      "4": "推广LED项目",
      "5": "激励措施或新设备新技术降低负荷项目",
      "6": "客户侧节能改造发电项目",
      "7": "合同能源管理项目",
      "8": "非合同能源管理项目"
    }
  ],

  handleExport(tHeader, filterVal, list, projectSide, projectCategory) {
    var fileName =
      this.projectTypeMap[projectSide][projectCategory] + "导出excel列表";
    this.downloadLoading = true;
    import("@/vendor/Export2Excel").then(excel => {
      const data = this.formatJson(filterVal, list);
      excel.export_json_to_excel({
        header: tHeader,
        data,
        filename: fileName,
        autoWidth: this.autoWidth,
        bookType: this.bookType
      });
      this.downloadLoading = false;
    });
  },
  formatJson(filterVal, jsonData) {
    return jsonData.map(v =>
      filterVal.map(j => {
        return v[j];
      })
    );
  }
};
