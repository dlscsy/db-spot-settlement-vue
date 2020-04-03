<!--计量侧报表汇总-->
<template>
  <base-template :pageKey="pageKey" :config="pageConfig">
    <template v-slot:customColumnsFront>
      <el-table-column
        label="详情"
        header-align="center"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <el-button
            class="detail-button"
            type="primary"
            size="small"
            @click="handleClick(scope.row)"
            >详情</el-button
          >
        </template>
      </el-table-column>
    </template>
    <template v-slot:customBtns>
      <el-button type="primary" size="small" @click="countReport">
        <svg-icon icon-class="statistics" />统计
      </el-button>
    </template>
  </base-template>
</template>

<script>
import BaseTemplate from "templates/BaseTemplate";
import { pageConfig } from "./config";

export default {
  name: "ClientSideSummary",
  components: {
    BaseTemplate
  },
  props: {},
  data() {
    return {
      pageKey: "CalculateSideSummary",
      //smartbi服务器ip端口
      serviceIpPort: process.env.SMARTBI_IP_PORT,
      pageConfig: pageConfig,
      //批量上报查询参数
      theMonth: "",
      company: ""
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {
    //报表统计
    countReport() {
      //TODO 调用存储过程接口
    },
    //点击详情
    handleClick(row) {
      //判断获取行是否有smartbi节点id
      if (row.smartId) {
        //封装拼接smarbi链接的参数（smartbi官网固定格式）
        // 报表参数，统计月份
        let paramProductName = {
          name: "统计月份",
          value: this.$children[0].conditions.theMonth,
          displayValue: this.$children[0].conditions.theMonth
        };
        // 报表参数，所属单位
        let operationUnitData = {
          name: "所属单位",
          value: this.$children[0].conditions.company,
          displayValue: this.$children[0].conditions.company
        };
        let paramsInfo = [];
        paramsInfo.push(paramProductName);
        paramsInfo.push(operationUnitData);
        //拼接链接
        let url =
          this.serviceIpPort +
          "/smartbi/vision/openresource.jsp" +
          "?paramsInfo=" +
          encodeURIComponent(JSON.stringify(paramsInfo)) +
          "&resid=" +
          row.smartId +
          "&showtoolbar=true" +
          "&refresh=true" +
          "&user=admin&password=admin";
        //打开一个新窗口显示报表
        window.open(url, "_blank");
      } else {
        //获取失败
        this.$message({
          message: "获取报表失败！",
          type: "error"
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.detail-button {
  padding: 6px 10px;
  font-size: 11px;
  border-radius: 3px;
  background: #01367a;
  border: 1px solid #01367a;
}
</style>
