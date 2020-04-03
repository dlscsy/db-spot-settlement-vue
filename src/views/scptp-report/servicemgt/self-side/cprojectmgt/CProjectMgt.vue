<template>
  <div>
    <base-condition
      v-if="showCondition()"
      :config.sync="conditionConfig"
      :pageKey="pageKey"
      v-model="conditions"
      v-on:query="handleQuery"
      v-on:input="handleInput"
    />
    <base-operation
      v-if="showOperation()"
      :config="config.operationConfig"
      v-on:add="handleAdd"
      v-on:edit="handleEdit"
      v-on:detail="handleDetail"
      v-on:del="handleDel"
      v-on:showFileList="showFileList"
      v-on:export="handleExport"
      v-on:import="handleImport"
    >
      <slot name="customBtns"></slot>
    </base-operation>
    <template v-for="(tableConfig, code) in config.tableConfig">
      <base-table
        :pageKey="pageKey"
        :key="code"
        v-if="isShowTable(code)"
        :config="tableConfig"
        :tableData="tableData"
        :total="total"
        :page.sync="pagination.page"
        :limit.sync="pagination.limit"
        ref="table"
        v-on:selectionChange="handleSelectionChange"
        v-on:rowClick="handleRowClick"
        v-on:paginationChange="handlePaginationChange"
      >
        <slot name="pagination"></slot>
      </base-table>
    </template>
    <edit-dialog
      v-if="showFModal()"
      :visible.sync="fmodalVisible"
      :title="fmodalTitle"
      :config="defaultData"
      :initData="initData"
      :pageKey="pageKey"
      v-model="formDataForShow"
      :projectCategory="projectCategory"
      @save="handleSave"
    />
    <file-modal
      v-if="showFileModal()"
      :visible.sync="fileModalVisible"
      :carriedParams="carriedParams"
      :projectCategory="projectCategory"
      :projectSide="projectSide"
    />
    <import-dialog
      v-if="importVisible"
      :visible.sync="importVisible"
      :title="importTitle"
      :pageKey="pageKey"
      :config="config.excelConfig"
      :projectCategoryDefault="projectCategory"
      @down="handleDownload"
      @import="handleImportSave"
    />
  </div>
</template>

<script>
import request from "utils/request";
import BaseCondition from "templates/condition/BaseCondition";
import BaseOperation from "templates/operation/BaseOperation";
import BaseTable from "components/Table/MultistageHeaderTable";
import EditDialog from "./fmodal/EditDialog";
import ImportDialog from "./ImportDialog";

import { exportConfig } from "./exportConfig";
import { pageConfig } from "./config";
import FileModal from "components/FileModal/index";
const isUndefined = require("lodash/isUndefined");
const isEmpty = require("lodash/isEmpty");
const isBoolean = require("lodash/isBoolean");
const isObject = require("lodash/isObject");
const isNumber = require("lodash/isNumber");
const isArray = require("lodash/isArray");
const moment = require("moment");
import { getUserInfo } from "@/utils/auth";
import axios from "axios";
import { getToken } from "@/utils/auth";

export default {
  name: "CProjectMgt",
  components: {
    BaseCondition,
    BaseOperation,
    BaseTable,
    EditDialog,
    FileModal,
    // ImportSelfDialog
    ImportDialog
  },
  data() {
    return {
      conditions: {},
      pagination: {
        page: 1,
        limit: 10
      },
      tableData: [],
      total: 0,
      selectedDatas: [],
      selectedKeys: [],
      fmodalVisible: false,
      fileModalVisible: false,
      importVisible: false,
      fmodalTitle: "",
      projectTypeName: "",
      formDataForShow: {},
      config: pageConfig,
      conditionConfig: {},
      pageKey: "cproject",
      // tableConfig: {},
      defaultData: {},
      delMonth: "",
      delCompany: "",
      projectCategory: "",
      initData: {}, //表单初始化数据
      carriedParams: {}, // 带往附件页面参数
      projectSide: "1", // 项目所属侧
      importTitle: "批量文件导入",
      exportCofing: exportConfig // 导出公共js
    };
  },
  created() {
    this.conditionConfig = JSON.parse(
      JSON.stringify(this.config.conditionConfig)
    );
  },
  mounted() {
    // 初始化分页组件所需要的页码和每页限制的数据条数
    this.initpagination();
    // 初始化数据
    if (this.config.tableConfig[this.projectCategory].initLoad) {
      this.handleInput(this.conditions);
      this.handleQuery();
    }
  },
  methods: {
    // 是否显示条件区域
    showCondition() {
      return !isEmpty(this.config.conditionConfig);
    },
    // 是否显示操作区域
    showOperation() {
      return (
        isUndefined(this.config.operationConfig) ||
        isObject(this.config.operationConfig) ||
        (isBoolean(this.config.operationConfig) &&
          this.config.operationConfig) ||
        this.config.operationConfig === "true"
      );
    },
    // 是否显示表单对话框
    showFModal() {
      return !isEmpty(this.config.fmodalConfig);
    },
    showFileModal() {
      return !isEmpty(this.config.fileModalConfig);
    },
    // 根据配置文件初始化分页控件配置
    initpagination() {
      if (
        !isEmpty(this.config.tableConfig) &&
        !isEmpty(this.config.tableConfig.pagination)
      ) {
        if (this.config.tableConfig.pagination["current-page"]) {
          this.pagination.page = this.config.tableConfig.pagination[
            "current-page"
          ];
        }
        if (this.config.tableConfig.pagination["page-size"]) {
          this.pagination.limit = this.config.tableConfig.pagination[
            "page-size"
          ];
        }
      }
    },
    // 多选选中表格数据时调用的方法
    handleSelectionChange(selectedDatas) {
      this.selectedDatas = selectedDatas;
      const rowkey = this.config.tableConfig[this.projectCategory].rowkey;
      if (this.projectCategory == "7" || this.projectCategory == "8") {
        this.selectedKeys = [];
        selectedDatas.forEach(item => {
          this.selectedKeys.push(item[rowkey]);
          this.selectedKeys.push(item[rowkey + "1"]);
        });
      } else if (this.projectCategory == "1") {
        this.selectedKeys = selectedDatas.map(data => {
          return data[rowkey];
        });
        if (!isEmpty(selectedDatas[0])) {
          this.delMonth = selectedDatas[0].theMonth;
          this.delCompany = selectedDatas[0].company;
        }
      } else {
        this.selectedKeys = selectedDatas.map(data => {
          return data[rowkey];
        });
      }
    },
    // 单选选中表格数据时调用的方法
    handleRowClick(rowObj) {
      if (isEmpty(rowObj)) {
        this.selectedDatas = [];
        this.selectedKeys = [];
      } else {
        this.selectedDatas = [rowObj];
        const rowkey = this.config.tableConfig[this.projectCategory].rowkey;
        this.selectedKeys = [rowObj[rowkey]];
      }
    },
    // 分页时调用的方法
    handlePaginationChange(pagination) {
      const _conditions =
        this.config.conditionConfig &&
          !isEmpty(this.config.conditionConfig.additionalConditions)
          ? Object.assign(
            {},
            this.config.conditionConfig.additionalConditions,
            this.conditions,
            pagination
          )
          : Object.assign({}, this.conditions, pagination);

      this.query(this.removeObjectNullVal(_conditions));
    },
    // 查询时调用的方法
    handleQuery() {
      const _conditions =
        this.config.conditionConfig &&
          !isEmpty(this.config.conditionConfig.additionalConditions)
          ? Object.assign(
            {},
            this.config.conditionConfig.additionalConditions,
            this.conditions,
            this.pagination
          )
          : Object.assign({}, this.conditions, this.pagination);
      if (isEmpty(this.conditions.company)) {
        this.$message({
          message: "请选择所属单位！",
          type: "warning"
        });
        return;
      }
      if (isEmpty(this.conditions.theMonth)) {
        this.$message({
          message: "请选择上报月份！",
          type: "warning"
        });
        return;
      }
      if (isEmpty(this.conditions.projectCategory)) {
        this.$message({
          message: "请选择项目类别！",
          type: "warning"
        });
        return;
      }
      this.query(this.removeObjectNullVal(_conditions));
    },
    // 新增时调用的方法
    handleAdd() {
      this.fmodalTitle = `新增${this.config.fmodalConfig.mainTitle}`;
      this.defaultData = Object.assign(
        {},
        {
          projectCategory: this.conditions.projectCategory,
          theMonth: moment().format("YYYY-MM"),
          company: this.conditions.company
        }
      );
      this.initData = Object.assign({}, this.defaultData);
      this.fmodalVisible = true;
    },
    // 编辑时调用的方法
    handleEdit() {
      if (this.selectedDatas.length === 0) {
        this.$message({
          message: "编辑前请选择一条信息！",
          type: "warning"
        });
      } else if (this.selectedDatas.length > 1) {
        this.$message({
          message: "只能选择一条信息进行编辑！",
          type: "warning"
        });
      } else if (
        this.projectCategory == "1" &&
        this.selectedDatas[0].title == "本年累计"
      ) {
        this.$message({
          message: "不能编辑本年累计数据！",
          type: "warning"
        });
      } else {
        // 执行编辑
        this.fmodalTitle = `编辑${this.config.fmodalConfig.mainTitle}`;
        if (
          this.selectedDatas[0].dataState == "1" &&
          this.selectedDatas[0].company == getUserInfo().orgCode
        ) {
          this.$message({
            message: "数据已锁定不可编辑",
            type: "warning"
          });
          return;
        }
        this.selectedDatas[0].projectCategory = this.conditions.projectCategory;
        this.initData = this.selectedDatas[0];
        this.fmodalVisible = true;
      }
    },
    // 查看详情时调用的方法
    handleDetail() {
      if (this.selectedDatas.length === 0) {
        this.$message({
          message: "查看详情前请选择一条信息！",
          type: "warning"
        });
      } else if (this.selectedDatas.length > 1) {
        this.$message({
          message: "只能选择一条信息进行详情查看！",
          type: "warning"
        });
      } else {
        // 执行查看详情
        this.fmodalTitle = `${this.config.fmodalConfig.mainTitle}详情`;
        this.selectedDatas[0].projectCategory = this.conditions.projectCategory;
        this.initData = this.selectedDatas[0];
        this.fmodalVisible = true;
      }
    },
    // 删除时调用的方法
    handleDel() {
      if (this.selectedKeys.length === 0) {
        this.$message({
          message: "请至少选择一条信息进行删除！",
          type: "warning"
        });
      } else if (
        this.projectCategory == "1" &&
        this.selectedDatas[0].title != "本月新增"
      ) {
        this.$message({
          message: "不能删除本年累计的数据！",
          type: "warning"
        });
      } else {
        let delParam = {
          projectCategory: this.projectCategory,
          keys: this.selectedKeys,
          theMonth: this.delMonth,
          company: this.delCompany
        };
        request(this.config.base.delUrl, "post", delParam).then(res => {
          if (
            !isEmpty(res) &&
            res.data.httpStatus === 200 &&
            res.data.businessCode === "B0000"
          ) {
            // this.query(
            //   this.removeObjectNullVal(
            //     Object.assign({}, this.conditions, this.pagination)
            //   )
            // );
            this.handleQuery();
          } else {
            this.$message({
              message: "删除数据信息失败！",
              type: "error"
            });
          }
        });
      }
    },
    isReport(saveObj) {
      // 判断是否已上报
      return new Promise(resolve => {
        request(this.config.base.isReportUrl, "post", saveObj).then(res => {
          if (
            !isEmpty(res) &&
            res.data.httpStatus === 200 &&
            res.data.businessCode === "B0000"
          ) {
            if (res.data.body) {
              resolve(true);
            } else {
              resolve(false);
            }
          } else {
            this.$message({
              message: "验证是否上报数据失败！",
              type: "error"
            });

            resolve(true);
          }
        });
      });
    },
    async handleSave(obj) {
      let saveObj =
        obj.actionType === "add"
          ? obj.changeData
          : {
            ...obj.changeData,
            primaryKeyValue: this.selectedKeys[0]
          };
      saveObj.datasource = "0";
      saveObj.projectSide = this.projectSide;
      if (saveObj.projectCategory == "7" || saveObj.projectCategory == "8") {
        let objarr = [];
        let temp = Object.assign({}, saveObj, { datasource: "0" });
        temp.caliberType = "0";
        let temp1 = Object.assign({}, temp, {
          investAmount: temp.investAmount1,
          saveQuantity: temp.saveQuantity1,
          savePower: temp.savePower1,
          saveConvertQuantity: temp.saveConvertQuantity1,
          saveConvertPower: temp.saveConvertPower1,
          saveCost: temp.saveCost1,
          caliberType: "1",
          datasource: "0",
          primaryKeyValue: temp.guid1
        });
        if (saveObj.projectCategory == "7") {
          temp1.eleScale = temp.eleScale1;
        }
        if (obj.actionType == "update") {
          temp1.guid = temp.guid1;
        }
        objarr.push(temp);
        objarr.push(temp1);
        saveObj = {
          objArr: objarr,
          projectCategory: temp.projectCategory,
          projectSide: this.projectSide,
          theMonth: saveObj.theMonth,
          company: saveObj.company
        };
      }
      let flag = await this.isReport(saveObj);
      if (!flag) {
        if (isEmpty(this.config.base.existUrl)) {
          this.save(saveObj, obj.actionType);
        } else if (this.projectCategory == "1" && obj.actionType !== "add") {
          this.save(saveObj, obj.actionType);
        } else {
          saveObj.actionType = obj.actionType;
          request(this.config.base.existUrl, "post", saveObj).then(res => {
            if (
              !isEmpty(res) &&
              res.data.httpStatus === 200 &&
              res.data.businessCode === "B0000"
            ) {
              if (res.data.body) {
                this.save(saveObj, obj.actionType);
              } else {
                const validateExistField = "用户编号、上报月份";
                this.$message({
                  message: `存在相同数据信息！相同信息相关字段：${validateExistField}`,
                  type: "warning"
                });
              }
            } else {
              this.$message({
                message: "验证是否存在数据信息失败！",
                type: "error"
              });
            }
          });
        }
      } else {
        this.$message({
          message: "本月份数据已上报，不能新增",
          type: "error"
        });
      }
    },
    removeObjectNullVal(_obj_) {
      Object.keys(_obj_).forEach(key => {
        const value = _obj_[key];
        if (
          value === "undefined" ||
          (!isNumber(value) && isEmpty(value)) ||
          (isArray(value) && value.length === 1 && value[0] === "")
        ) {
          delete _obj_[key];
        }
      });

      return _obj_;
    },
    query(_params_) {
      request(this.config.base.queryUrl, "get", _params_).then(res => {
        if (
          !isEmpty(res) &&
          res.data.httpStatus === 200 &&
          res.data.businessCode === "B0000"
        ) {
          this.tableData = res.data.body.rows;
          this.total = res.data.body.total;
          this.selectedDatas = [];
          this.selectedKeys = [];
        } else {
          this.$message({
            message: "查询数据信息失败！",
            type: "error"
          });
        }
      });
    },
    save(_obj_, _actionType_) {
      request(this.config.base[`${_actionType_}Url`], "post", _obj_).then(
        res => {
          if (
            !isEmpty(res) &&
            res.data.httpStatus === 200 &&
            res.data.businessCode === "B0000"
          ) {
            this.fmodalVisible = false;
            // this.query(
            //   this.removeObjectNullVal(
            //     Object.assign({}, this.conditions, this.pagination)
            //   )
            // );
            this.handleQuery();
          } else {
            this.$message({
              message: `${
                _actionType_ === "add" ? "新增" : "编辑"
                }数据信息失败！`,
              type: "error"
            });
          }
        }
      );
    },
    handleInput(event) {
      let userNumIndex;
      let categoryIndex;
      if (event.projectCategory != this.projectCategory) {
        this.conditionConfig = JSON.parse(
          JSON.stringify(this.config.conditionConfig)
        );
        this.projectCategory = event.projectCategory;
        this.selectedDatas = [];
        this.selectedKeys = [];
        this.tableData = [];
        if (event.projectCategory == "1") {
          this.conditionConfig.items.forEach((item, index) => {
            if (item.key == "userNum") {
              userNumIndex = index;
            }
          });
          if (userNumIndex) {
            this.conditionConfig.items.splice(userNumIndex, 1);
          }
          this.conditionConfig.items.forEach((item, index) => {
            if (item.key == "category") {
              categoryIndex = index;
            }
          });
          if (categoryIndex) {
            this.conditionConfig.items.splice(categoryIndex, 1);
          }
        } else if (
          !(event.projectCategory == "7" || event.projectCategory == "8")
        ) {
          this.conditionConfig.items.forEach((item, index) => {
            if (item.key == "category") {
              categoryIndex = index;
            }
          });
          if (categoryIndex) {
            this.conditionConfig.items.splice(categoryIndex, 1);
          }
        }
      }
    },
    isShowTable(code) {
      return code == this.projectCategory;
    },
    showFileList() {
      if (this.selectedDatas.length === 0) {
        this.$message({
          message: "请选择一条数据进行附件操作！",
          type: "warning"
        });
      } else if (this.selectedDatas.length > 1) {
        this.$message({
          message: "只能选择一条数据进行附件操作！",
          type: "warning"
        });
      } else {
        Object.assign(this.selectedDatas[0], {
          projectCategory: this.projectCategory
        });
        this.carriedParams = this.selectedDatas[0];
        this.fileModalVisible = true;
      }
    },

    handleExport() {
      var tHeader = []; // 导出表头
      var filterVal = []; // 导出表头对应的字段名称
      var tableHead = this.config.tableConfig[this.projectCategory].columns; // table表字段
      tableHead.forEach(item => {
        if (!isEmpty(item.children)) {
          item.children.forEach(child => {
            tHeader.push(child.label);
            filterVal.push(child.prop);
          });
        } else {
          tHeader.push(item.label);
          filterVal.push(item.prop);
        }
      });
      var merge = [];
      // 获取导出数据
      // const _conditions =
      //   this.config.conditionConfig &&
      //     !isEmpty(this.config.conditionConfig.additionalConditions)
      //     ? Object.assign(
      //       this.config.conditionConfig.additionalConditions,
      //       this.conditions
      //     )
      //     : Object.assign({}, this.conditions);
      // delete _conditions.userNum;
      // delete _conditions.category;
      // request(this.config.base.queryUrl, "get", _conditions).then(res => {
      //   if (
      //     !isEmpty(res) &&
      //     res.data.httpStatus === 200 &&
      //     res.data.businessCode === "B0000"
      //   ) {
      //     var exportData = res.data.body.rows; // 导出数据
      //     if (!isEmpty(exportData[0].dictionaries)) {
      //       exportData.forEach(item => {
      //         merge.push(Object.assign(item.dictionaries, item));
      //       });
      //     } else {
      //       merge = exportData;
      //     }
      //     exportConfig.handleExport(
      //       tHeader,
      //       filterVal,
      //       merge,
      //       this.projectSide,
      //       this.projectCategory
      //     );
      //   } else {
      //     this.$message({
      //       message: "查询数据信息失败！",
      //       type: "error"
      //     });
      //   }
      // });
      if (this.selectedDatas.length <= 0) {
        this.$message({
          message: "请勾选数据",
          type: "warning"
        });
      } else {
        var exportData = this.selectedDatas;
        if (!isEmpty(exportData[0].dictionaries)) {
          exportData.forEach(item => {
            merge.push(Object.assign(item.dictionaries, item));
          });
        } else {
          merge = exportData;
        }
        exportConfig.handleExport(
          tHeader,
          filterVal,
          merge,
          this.projectSide,
          this.projectCategory
        );
      }
    },
    handleImport() {
      this.importVisible = true;
    },
    handleDownload(projectCategory) {
      axios({
        method: "post", // 设置访问请求为post
        baseURL: process.env.VUE_APP_BUSINESS_BASE_URL,
        url: this.config.base.templeteUrl, // 请求地址
        data: "params=" + JSON.stringify({ projectCategory: projectCategory }), // 参数
        headers: { "Auth-Token": getToken() },
        responseType: "blob" // 表明返回服务器返回的数据类型(必加否则可能文件损坏)
      }).then(
        response => {
          if (response.sta != "00") {
            if (response.data != null) {
              let info = decodeURIComponent(
                escape(response.headers["content-disposition"])
              );
              let blob = new Blob([response.data]); //, {//创建一个Blob对象type: "application/msword"}
              let fileName = info.split("=")[1]; //设置文件名
              if (window.navigator.msSaveOrOpenBlob) {
                //判断是否允许用户再客户端上保存文件(提供保存按钮和打开按钮)
                navigator.msSaveOrOpenBlob(blob, fileName); //只提供保存按钮
              } else {
                var link = document.createElement("a"); //创建一个a标签
                link.href = window.URL.createObjectURL(blob); //将blob对象放在a标签的href中
                link.download = fileName; //文件名称
                link.click();
                //释放内存
                window.URL.revokeObjectURL(link.href);
              }
            } else {
              this.$message.info("文件缺失");
            }
          } else {
            this.$message.error(response.message);
          }
        },
        err => {
          this.$message.error(err);
        }
      );
    },
    handleImportSave(data) {
      request(this.config.base.importUrl, "post", data).then(res => {
        if (
          !isEmpty(res) &&
          res.data.httpStatus === 200 &&
          res.data.businessCode === "B0000"
        ) {
          this.importVisible = false;
          this.handleQuery();
        } else {
          this.$message({
            message: res.data.message,
            type: "error"
          });
        }
      });
    }
  }
};
</script>
