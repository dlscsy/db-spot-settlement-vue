<!--自身侧和客户侧报表汇总页公用一个vue页面，名字暂定“客户侧汇总”ClientSideSummary，防止以后两个页面需要分离-->
<template>
  <base-template :pageKey="pageKey" :config="pageConfig">
    <template v-slot:customBtns>
      <el-button
        type="primary"
        size="small"
        class="operation-btn"
        @click="countReport"
      >
        <svg-icon icon-class="statistics" />统计
      </el-button>
      <el-button
        type="primary"
        size="small"
        class="operation-btn"
        @click="submitReport"
      >
        <svg-icon icon-class="shangbao" />上报
      </el-button>
      <el-button
        type="primary"
        size="small"
        class="operation-btn"
        @click="isNextCompany"
      >
        <svg-icon icon-class="shangbao" />替下级上报
      </el-button>
      <el-button
        type="primary"
        size="small"
        class="operation-btn"
        icon="el-icon-refresh-right"
        @click="returnReport"
        >回退</el-button
      >
      <template>
        <batch-submit
          :visible="visible"
          :title="title"
          :children="reportChildren"
          :searchParams="searchParams"
          :loading="loading"
          @closeDialog="closeDialog"
          @batchSubmit="batchSubmit"
        ></batch-submit>
      </template>
      <template>
        <report-return
          :visible="returnVisible"
          :title="returnTitle"
          :children="reportChildren"
          :searchParams="searchParams"
          @closeDialog="closeDialog"
          @doReturn="doReturn"
        ></report-return>
      </template>
    </template>
    <template v-slot:customColumnsFront>
      <el-table-column
        label="详情"
        header-align="center"
        align="center"
        width="80"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.statisticsState === '1'">
            <el-button
              class="detail-button"
              type="primary"
              size="small"
              @click="handleClick(scope.row)"
              >详情</el-button
            >
          </div>
          <div v-else>—</div>
        </template>
      </el-table-column>
    </template>
  </base-template>
</template>

<script>
import BaseTemplate from "templates/BaseTemplate";
import BatchSubmit from "./BatchSubmit";
import ReportReturn from "./ReportReturn";
import { pageConfig } from "./config";
import request from "@/utils/request";
import { getUserInfo } from "@/utils/auth";
const isEmpty = require("lodash/isEmpty");

export default {
  name: "ClientSideSummary",
  components: {
    BaseTemplate,
    BatchSubmit,
    ReportReturn
  },
  props: {},
  data() {
    return {
      pageKey: "ClientSideSummary",
      pageConfig: pageConfig,
      //0:自身侧 1：客户侧
      projectSide: "0",
      isShowReturnButton: true,
      visible: false,
      returnVisible: false,
      title: "上级替下级批量上报",
      returnTitle: "上级回退下级报表",
      reportChildren: [],
      //批量上报查询参数
      searchParams: {},
      //smartbi服务器ip端口
      serviceIpPort: process.env.SMARTBI_IP_PORT,
      loading: false
    };
  },
  created() {
    this.initProjectSide();
  },
  mounted() {
    this.initProjectSide();
  },
  watch: {
    //监听自身侧和客户侧报表汇总页路由变化
    $route() {
      this.initProjectSide();
    }
  },
  // 如果有声明周期函数，顺序在这里
  computed: {},
  methods: {
    //初始化projectSide，0：自身侧 1：客户侧
    initProjectSide() {
      // this.projectSide = this.$route.meta.projectSide;
      // this.$children[0].config.conditionConfig.additionalConditions.projectSide = this.projectSide;

      //从路由中获取projectSide值
      this.projectSide = this.$route.meta.projectSide;
      //在查询额外条件中设置projectSide值
      pageConfig.conditionConfig.additionalConditions.projectSide = this.projectSide;
    },
    //报表统计
    countReport() {
      //判断是否选择的是下级未上报的报表
      let isNextSubmit = this.checkStatistics1();
      if (!isNextSubmit) return;
      //判断是否选择的是本级已上报的报表
      let isSubmit = this.checkStatistics2();
      if (!isSubmit) return;
      //获取页面勾选的行数据
      let selectedDatas = this.$children[0].selectedDatas;
      //获取请求参数
      let params = this.getParams(selectedDatas, true);
      //遍历勾选的数据，将项目编码暂存到codeValueArr
      if (selectedDatas.length > 0) {
        request("/clientSideSummary/count", "post", params).then(res => {
          if (
            res.data.httpStatus === 200 &&
            res.data.businessCode === "B0000"
          ) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.$children[0].handleQuery();
          } else {
            this.$message({
              message: "统计失败！",
              type: "error"
            });
          }
        });
      } else {
        this.$message({
          message: "请勾选需要统计的报表！",
          type: "warning"
        });
      }
    },
    //报表上报
    submitReport() {
      //判断是否选择的是未统计的报表
      let isNoStatistic = this.checkSubmit1();
      if (!isNoStatistic) return;
      //判断是否选择的是已上报的报表
      let isSubmit = this.checkSubmit2();
      if (!isSubmit) return;
      //判断是否勾选第一张报表，并且其他报表全部统计
      let isFirst = this.checkSubmit3();
      if (!isFirst) return;
      //获取页面勾选的行数据
      let selectedDatas = this.$children[0].selectedDatas;
      //获取请求参数
      let params = this.getParams(selectedDatas, false);
      //遍历勾选的数据，将项目编码暂存到codeValueArr
      if (selectedDatas.length > 0) {
        request("/clientSideSummary/submit", "post", params).then(res => {
          if (
            res.data.httpStatus === 200 &&
            res.data.businessCode === "B0000"
          ) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.$children[0].handleQuery();
          } else {
            this.$message({
              message: "上报失败！",
              type: "error"
            });
          }
        });
      } else {
        this.$message({
          message: "请勾选需要上报的报表！",
          type: "warning"
        });
      }
    },
    //初始化参数（用于批量上报/回退）
    initParams(selectedDatas) {
      let children = [];
      let childrenItem = {};
      selectedDatas.forEach(item => {
        childrenItem.id = item.codeValue;
        childrenItem.label = item.reportName;
        children.push({ ...childrenItem });
      });
      this.reportChildren = children;
      let searchParams = {
        projectSide: this.projectSide,
        company: this.$children[0].conditions.company,
        theMonth: this.$children[0].conditions.theMonth
      };
      return searchParams;
    },
    //替下级批量上报
    helpSubmitReport() {
      //获取页面勾选的行数据
      let selectedDatas = this.$children[0].selectedDatas;
      // let isSubmit = this.checkNexitSubmit(selectedDatas);
      // if (!isSubmit) return;
      //遍历勾选的数据，将项目编码暂存到codeValueArr
      if (selectedDatas.length > 0) {
        this.searchParams = this.initParams(selectedDatas);
        this.visible = true;
      } else {
        this.$message({
          message: "请勾选需要替下级上报的报表！",
          type: "warning"
        });
      }
    },
    //判断是否有下级所属单位
    isNextCompany() {
      let params = {
        company: this.$children[0].conditions.company
      };
      let userCompany = getUserInfo().orgCode;
      if (params.company !== userCompany) {
        this.$message({
          message: "请回到本级报表进行替下级上报！",
          type: "warning"
        });
        return;
      }
      request("/clientSideSummary/isNextCompany", "get", params).then(res => {
        if (
          !isEmpty(res) &&
          res.data.httpStatus === 200 &&
          res.data.businessCode === "B0000"
        ) {
          if (res.data.body) {
            this.helpSubmitReport();
          } else {
            this.$message({
              message: "您没有下级所属单位，无法替下级单位上报！",
              type: "warning"
            });
            return;
          }
        } else {
          this.$message({
            message: "查询下级所属单位失败！",
            type: "error"
          });
          return false;
        }
      });
    },
    //弹框关闭事件
    closeDialog() {
      this.visible = false;
      this.returnVisible = false;
    },
    //报表回退
    returnReport() {
      //获取页面勾选的行数据
      let selectedDatas = this.$children[0].selectedDatas;
      //是否打开弹框
      let isShow = true;
      if (selectedDatas.length > 0) {
        let conditionCompany = this.$children[0].conditions.company;
        let userCompany = getUserInfo().orgCode;
        if (conditionCompany === userCompany) {
          this.$message({
            message: "不能回退本级报表！",
            type: "error"
          });
        } else {
          isShow = this.checkReturn();
          if (isShow) {
            this.searchParams = this.initParams(selectedDatas);
            this.returnVisible = true;
          }
        }
      } else {
        this.$message({
          message: "请勾选需要回退的报表！",
          type: "warning"
        });
      }
    },
    //回退
    doReturn(returnOpinion) {
      //获取页面勾选的行数据
      let selectedDatas = this.$children[0].selectedDatas;
      let params = this.getParams(selectedDatas, false);
      params.returnOpinion = returnOpinion;
      request("/clientSideSummary/reportReturn", "post", params).then(res => {
        if (
          !isEmpty(res) &&
          res.data.httpStatus === 200 &&
          res.data.businessCode === "B0000"
        ) {
          this.$message({
            message: res.data.message,
            type: "success"
          });
          this.returnVisible = false;
          this.$children[0].handleQuery();
        } else {
          this.$message({
            message: "报表回退失败！",
            type: "error"
          });
        }
      });
    },
    //封装请求参数(value:页面勾选值 isStatist：是否是统计方法调用)
    getParams(value, isStatist) {
      //获取页面勾选的行数据
      let selectedDatas = value;
      let params = {
        projectSide: "",
        company: "",
        theMonth: "",
        codeValues: []
      };
      params.company = this.$children[0].conditions.company;
      params.theMonth = this.$children[0].conditions.theMonth;
      params.projectSide = this.projectSide;
      for (let i = 0; i < selectedDatas.length; i++) {
        params.codeValues.push(selectedDatas[i].codeValue);
      }
      //判断是否勾选第一个报表，是则将所有报表编码存入codeValues中
      if (params.codeValues.indexOf("0") > -1) {
        let tableData = this.$children[0].tableData;
        params.codeValues = [];
        for (let j = 0; j < tableData.length; j++) {
          if (isStatist) {
            if (
              tableData[j].submitState === "0" ||
              tableData[j].submitState === "2"
            ) {
              params.codeValues.push(tableData[j].codeValue);
            }
          } else {
            params.codeValues.push(tableData[j].codeValue);
          }
        }
      }
      return params;
    },
    //一键上报
    batchSubmit() {
      // let params = {
      //   projectSide: this.projectSide,
      //   company: this.$children[0].conditions.company,
      //   theMonth: this.$children[0].conditions.theMonth
      // };
      this.loading = true;
      //获取页面勾选的行数据
      let selectedDatas = this.$children[0].selectedDatas;
      let params = this.getParams(selectedDatas, false);
      // let params = {
      //   projectSide: "",
      //   company: "",
      //   theMonth: "",
      //   codeValues: []
      // };
      // params.company = this.$children[0].conditions.company;
      // params.theMonth = this.$children[0].conditions.theMonth;
      // params.projectSide = this.projectSide;
      // for (let i = 0; i < selectedDatas.length; i++) {
      //   params.codeValues.push(selectedDatas[i].codeValue);
      // }
      request("/clientSideSummary/batchSubmit", "post", params).then(res => {
        if (res.data.httpStatus === 200 && res.data.businessCode === "B0000") {
          this.$message({
            message: "批量上报成功！",
            type: "success"
          });
          this.loading = false;
          this.closeDialog();
          this.$children[0].handleQuery();
        } else {
          this.loading = false;
          this.$message({
            message: "批量上报失败！",
            type: "error"
          });
        }
      });
    },
    //校验统计（下级未上报的报表不能统计）
    checkStatistics1() {
      let isShow = true;
      //获取页面勾选的行数据
      let selectedDatas = this.$children[0].selectedDatas;
      selectedDatas.forEach(item => {
        if (
          item.noSubmit !== "0" &&
          !(item.yesSubmit === "0" && item.noSubmit === "1")
        ) {
          isShow = false;
        }
      });
      if (!isShow) {
        this.$message({
          message: "不能统计下级未上报的报表！",
          type: "warning"
        });
      }
      return isShow;
    },
    //校验统计（已上报的报表不能统计）
    checkStatistics2() {
      let isShow = true;
      //获取页面勾选的行数据
      let selectedDatas = this.$children[0].selectedDatas;
      selectedDatas.forEach(item => {
        if (item.submitState === "1") {
          isShow = false;
        }
      });
      if (!isShow) {
        this.$message({
          message: "不能统计已上报的报表！",
          type: "warning"
        });
      }
      return isShow;
    },
    //校验上报（未统计的报表不能上报）
    checkSubmit1() {
      let isShow = true;
      //获取页面勾选的行数据
      let selectedDatas = this.$children[0].selectedDatas;
      selectedDatas.forEach(item => {
        let statisticsState = item.statisticsState;
        if (statisticsState === "0") {
          isShow = false;
        }
      });
      if (!isShow) {
        this.$message({
          message: "不能上报未统计的报表！",
          type: "warning"
        });
      }
      return isShow;
    },
    //校验上报（已上报的报表不能上报）
    checkSubmit2() {
      let isShow = true;
      //获取页面勾选的行数据
      let selectedDatas = this.$children[0].selectedDatas;
      selectedDatas.forEach(item => {
        if (item.submitState === "1") {
          isShow = false;
        }
      });
      if (!isShow) {
        this.$message({
          message: "不能上报已上报的报表！",
          type: "warning"
        });
      }
      return isShow;
    },
    //校验上报（当上报第一张报表时，如果有未统计的报表不能上报）
    checkSubmit3() {
      // 判断是否包含第一张报表
      let isFirst = false;
      let isShow = true;
      //获取页面勾选的行数据
      let selectedDatas = this.$children[0].selectedDatas;
      selectedDatas.forEach(item => {
        if (item.codeValue === "0") {
          isFirst = true;
        }
      });
      if (isFirst) {
        this.$children[0].tableData.forEach(item => {
          if (item.statisticsState === "0") {
            isShow = false;
          }
        });
      }
      if (!isShow) {
        this.$message({
          message: "其他报表存在未统计，不能上报汇总报表！",
          type: "warning"
        });
      }
      return isShow;
    },
    //校验替下级上报（已上报的报表不能上报）
    checkNexitSubmit(selectedDatas) {
      let isShow = true;
      selectedDatas.forEach(item => {
        if (item.noSubmit === "0") {
          isShow = false;
        }
      });
      if (!isShow) {
        this.$message({
          message: "不能上报已上报的报表！",
          type: "warning"
        });
      }
      return isShow;
    },
    //校验回退（未统计的报表不能上报）
    checkReturn() {
      let isShow = true;
      //获取页面勾选的行数据
      let selectedDatas = this.$children[0].selectedDatas;
      selectedDatas.forEach(item => {
        let statisticsState = item.statisticsState;
        let submitState = item.submitState;
        if (statisticsState === "0" || submitState === "0") {
          isShow = false;
        }
      });
      if (!isShow) {
        this.$message({
          message: "不能回退未上报的报表！",
          type: "warning"
        });
      }
      return isShow;
    },
    //点击详情
    handleClick(row) {
      //判断获取行是否有smartbi节点id
      if (row.smartId) {
        //封装拼接smarbi链接的参数（smartbi官网固定格式）
        // 报表参数，统计月份
        let paramProductName = {
          name: "统计月份",
          value: this.$children[0].conditions.theMonth.replace("-", ""),
          displayValue: this.$children[0].conditions.theMonth.replace("-", "")
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
