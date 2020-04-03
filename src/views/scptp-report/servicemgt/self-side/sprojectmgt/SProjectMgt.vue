<template>
  <div>
    <base-template :pageKey="pageKey" :config="config">
      <template v-slot:customBtns>
        <el-button type="primary" size="small" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        <el-button type="primary" size="small" icon="el-icon-edit" @click="handleEdit">编辑</el-button>
        <el-button type="primary" size="small" @click="handleDetail">
          <svg-icon icon-class="detail" />查看
        </el-button>
        <el-button type="primary" size="small" icon="el-icon-delete" @click="handleDel">删除</el-button>
        <el-button type="primary" size="small" @click="handleImport">
          <svg-icon icon-class="import" />导入
        </el-button>
      </template>
    </base-template>
    <s-project-mgt-f-modal
      :visible.sync="fmodalVisible"
      :title="fmodalTitle"
      :config="config.fmodalConfig"
      :initData="selectedDatas[0]"
      :pageKey="pageKey"
      v-model="formDataForShow"
      @save="handleSave"
    />
    <import-self-dialog
      v-if="importVisible"
      :visible.sync="importVisible"
      :title="importTitle"
      :pageKey="pageKey"
      :config="config.excelSelfConfig"
      :projectCategoryDefault="projectCategory"
      @down="handleDownload"
      @import="handleImportSave"
    />
  </div>
</template>

<script>
import request from "utils/request";
import BaseTemplate from "templates/BaseTemplate";
import SProjectMgtFModal from "./SProjectMgtFModal";
import { pageConfig } from "./config";
import ImportSelfDialog from "./ImportSelfDialog";
import axios from "axios";
import { getToken, getUserInfo } from "@/utils/auth";

const isEmpty = require("lodash/isEmpty");

export default {
  name: "SProjectMgt",
  components: {
    BaseTemplate,
    SProjectMgtFModal,
    ImportSelfDialog
  },
  props: {},
  data() {
    return {
      pageKey: "SProjectMgt",
      config: pageConfig,
      selectedDatas: [],
      selectedKeys: [],
      fmodalVisible: false,
      fmodalTitle: "",
      formDataForShow: {},
      importTitle: "批量文件导入",
      importVisible: false,
      projectSide: "0"
    };
  },
  watch: {},
  // 如果有声明周期函数，顺序在这里
  computed: {},
  methods: {
    // 新增时调用的方法
    handleAdd() {
      this.fmodalTitle = `新增${this.config.fmodalConfig.mainTitle}`;
      this.fmodalVisible = true;
    },
    // 编辑时调用的方法
    handleEdit() {
      if (this.$children[0].selectedKeys.length === 0) {
        this.$message({
          message: "编辑前请选择一条信息！",
          type: "warning"
        });
      } else if (this.$children[0].selectedKeys.length > 1) {
        this.$message({
          message: "只能选择一条信息进行编辑！",
          type: "warning"
        });
      } else {
        const _selectedData = this.$children[0].selectedDatas[0];
        if (
          _selectedData.dataState === "1" &&
          _selectedData.company === getUserInfo().orgCode
        ) {
          this.$message({
            message: "本级所属单位的该条数据已被锁定，不允许编辑！",
            type: "warning"
          });
        } else {
          // 执行编辑
          this.fmodalTitle = `编辑${this.config.fmodalConfig.mainTitle}`;
          this.fmodalVisible = true;
          this.selectedDatas = this.$children[0].selectedDatas;
          this.selectedKeys = this.$children[0].selectedKeys;
        }
      }
    },
    // 查看详情时调用的方法
    handleDetail() {
      if (this.$children[0].selectedKeys.length === 0) {
        this.$message({
          message: "查看详情前请选择一条信息！",
          type: "warning"
        });
      } else if (this.$children[0].selectedKeys.length > 1) {
        this.$message({
          message: "只能选择一条信息进行详情查看！",
          type: "warning"
        });
      } else {
        // 执行查看详情
        this.fmodalTitle = `${this.config.fmodalConfig.mainTitle}详情`;
        this.fmodalVisible = true;
        this.selectedDatas = this.$children[0].selectedDatas;
        this.selectedKeys = this.$children[0].selectedKeys;
      }
    },
    // 删除时调用的方法
    handleDel() {
      if (this.$children[0].selectedKeys.length === 0) {
        this.$message({
          message: "请至大大少选择一条信息进行删除！",
          type: "warning"
        });
      } else {
        request(this.config.base.delUrl, "post", {
          datas: this.$children[0].selectedDatas
        }).then(res => {
          if (
            !isEmpty(res) &&
            res.data.httpStatus === 200 &&
            res.data.businessCode === "B0000"
          ) {
            this.$children[0].handleQuery();
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
              primaryKeyValue: this.$children[0].selectedKeys[0],
              projectCategory: this.$children[0].selectedDatas[0]
                .projectCategory
            };
      saveObj.projectSide = this.projectSide;
      let flag = await this.isReport(saveObj);
      if (!flag) {
        if (isEmpty(this.config.base.existUrl) || obj.actionType === "update") {
          this.save(saveObj, obj.actionType);
        } else {
          request(this.config.base.existUrl, "post", saveObj).then(res => {
            if (
              !isEmpty(res) &&
              res.data.httpStatus === 200 &&
              res.data.businessCode === "B0000"
            ) {
              if (res.data.body) {
                this.save(saveObj, obj.actionType);
              } else {
                const _allItems = this.config.fmodalConfig.baseItems.concat(
                  this.config.fmodalConfig.items
                );
                const validateExistField = _allItems
                  .filter(curr => curr.validateExistField === true)
                  .map(curr => {
                    return curr.label;
                  })
                  .join("、");
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
    save(_obj_, _actionType_) {
      for (var key in _obj_) {
        if (key.substring(key.length - 4, key.length) === "Date") {
          if (isEmpty(_obj_[key])) {
            _obj_[key] = "";
          }
        }
      }
      request(this.config.base[`${_actionType_}Url`], "post", _obj_).then(
        res => {
          if (
            !isEmpty(res) &&
            res.data.httpStatus === 200 &&
            res.data.businessCode === "B0000"
          ) {
            this.fmodalVisible = false;
            this.$children[0].handleQuery();
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
              let blob = new Blob([response.data]); //, {// 创建一个Blob对象type: "application/msword"}
              let fileName = info.split("=")[1]; // 设置文件名
              if (window.navigator.msSaveOrOpenBlob) {
                // 判断是否允许用户再客户端上保存文件(提供保存按钮和打开按钮)
                navigator.msSaveOrOpenBlob(blob, fileName); //只提供保存按钮
              } else {
                var link = document.createElement("a"); // 创建一个a标签
                link.href = window.URL.createObjectURL(blob); // 将blob对象放在a标签的href中
                link.download = fileName; // 文件名称
                link.click();
                // 释放内存
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
          this.$children[0].handleQuery();
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
