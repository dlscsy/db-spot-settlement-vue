<template>
  <el-dialog
    :visible="visible"
    v-bind="getModalBind()"
    @close="handleCloseModal"
    @opened="handleOpenedModal"
    @closed="handleClosedModal"
  >
    <div class="base-file-modal-body-container">
      <!-- <div class="tree-left">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-tree
            id="tree-options"
            :data="treeDataStructure.treeNodes"
            :node-key="props.value"
            :props="props"
            :default-expanded-keys="[carriedParams.zzbm]"
            :accordion="false"
            highlight-current
            style="max-height: 20rem;"
            @node-click="handleNodeClick"
          />
        </el-scrollbar>
      </div>-->
      <div class="showData-right">
        <div class="condition">
          <el-form :inline="true" :model="conditions" v-bind="getFormBind()">
            <el-form-item label="文件名称">
              <el-input
                v-model="conditions.fileName"
                placeholder="请输入文件名称"
                style="width: 15rem;"
                :clearable="true"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="table">
          <el-table
            ref="fileModalTable"
            row-key="fileId"
            :data="tableData"
            :border="true"
            :stripe="true"
            :size="'mini'"
            class="table-self"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" header-align="center" align="center" width="42" />
            <el-table-column
              key="fileName"
              prop="fileName"
              label="文件名称"
              header-align="center"
              width="460px"
              align="center"
              :show-overflow-tooltip="true"
            />
            <el-table-column
              key="operateDate"
              prop="operateDate"
              label="上传日期"
              header-align="center"
              align="center"
              :show-overflow-tooltip="true"
            />
          </el-table>
          <el-pagination
            :current-page.sync="currentPage"
            :page-size.sync="pageSize"
            :total="tableDataTotal"
            v-bind="getPaginationBind()"
            class="table-pagination"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    <div slot="title" id="base-file-modal-title-container">{{ `${projectTypeName}文件管理` }}</div>
    <div slot="footer" class="base-file-modal-footer-container">
      <el-button type="primary" icon="el-icon-close" size="small" @click="handleCloseModal()">关闭</el-button>
      <el-upload
        ref="fileModalUploadBtn"
        class="file-modal-upload-btn"
        :headers="headers"
        :auto-upload="true"
        :action="`${baseUrl}fileMgtController/upload`"
        :multiple="false"
        :show-file-list="false"
        :data="uploadParams"
        :on-success="handleUploadSuccess"
      >
        <el-button type="primary" icon="el-icon-upload2" size="small">上传</el-button>
      </el-upload>
      <el-button type="primary" icon="el-icon-download" size="small" @click="handleDownLoad()">下载</el-button>
      <el-button type="primary" icon="el-icon-delete" size="small" @click="handleRemove()">删除</el-button>
    </div>
  </el-dialog>
</template>

<script>
import request from "utils/request";
import { getToken } from "@/utils/auth";

const isEmpty = require("lodash/isEmpty");

export default {
  name: "FileModal",
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    carriedParams: {
      type: Object,
      default: function () {
        return {};
      }
    },
    // 配置选项
    props: {
      type: Object,
      default: function () {
        return {
          value: "value", // 实际值对应的属性
          label: "label", // 显示值对应的属性
          children: "childrenNodes" // 子节点集合对应的属性
        };
      }
    },
    // 项目类型
    projectCategory: {
      type: String,
      required: true
    },
    // 项目所属侧
    projectSide: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      baseUrl: process.env.VUE_APP_BUSINESS_BASE_URL,
      headers: {
        "Auth-Token": getToken() // TODO 增加TOKEN
      },
      treeDataStructure: {},
      conditions: {
        fileName: ""
      },
      uploadParams: {},
      projectTypeName: "",
      tableData: [],
      tableDataTotal: 0,
      currentPage: 1,
      pageSize: 5,
      selectedDatas: [],
      selectedDataKeys: [],
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
      projectSideMap: { "0": "自身侧", "1": "客户侧" },
      projectId: ""
    };
  },
  // created() {},
  methods: {
    // 表单对话框打开后事件处理
    handleOpenedModal() {
      var projectCategory = this.carriedParams.projectCategory;
      // 初始化项目类别名称
      this.projectTypeName = this.projectTypeMap[this.projectSide][
        projectCategory
      ];
      // 初始化条件
      if (this.carriedParams.projectCategory == "1") {
        this.projectId = this.carriedParams.projectId;
      } else {
        this.projectId = this.carriedParams.guid;
      }
      this.conditions = Object.assign({}, this.conditions, {
        orgCode: this.carriedParams.company,
        projectCategory: this.projectCategory,
        projectSide: "1",
        projectId: this.projectId,
        limit: this.pageSize,
        page: this.currentPage
      });
      this.uploadParams = Object.assign({}, this.conditions, {
        orgCode: this.carriedParams.company,
        projectCategory: this.projectCategory,
        projectSide: this.projectSide,
        projectCategoryName: this.projectTypeName,
        projectSideName: this.projectSideMap[this.projectSide],
        projectId: this.projectId
      });
      console.log(this.uploadParams);
      // 初始化
      //this.queryZzjgTree();
      this.handleQuery();
    },
    // 表单对话框关闭时事件处理
    handleCloseModal() {
      // TODO
      this.$emit("update:visible", false);
    },
    // 表单对话框关闭后事件处理
    handleClosedModal() {
      this.treeDataStructure = {};
      this.tableData = [];
      this.tableDataTotal = 0;
      this.currentPage = 1;
      this.pageSize = 5;
      this.selectedDatas = [];
      this.selectedDataKeys = [];
    },
    // 节点点击事件
    handleNodeClick(node) {
      this.conditions = Object.assign({}, this.conditions, {
        zzbm: node[this.props.value]
      });
      this.query(this.conditions);
    },
    // 上传时调用的方法
    handleUploadSuccess(response) {
      if (
        !isEmpty(response) &&
        response.httpStatus === 200 &&
        response.businessCode === "B0000"
      ) {
        this.query(this.conditions);
      } else {
        this.$message({
          message: response.message,
          type: "error"
        });
      }
    },
    // 下载时调用的方法
    handleDownLoad() {
      let params = JSON.stringify(
        Object.assign(this.uploadParams, this.headers)
      ); // TODO 增加TOKEN
      let formElement = document.createElement("form");
      formElement.style.display = "display:none;";
      formElement.method = "post";
      formElement.acceptCharset = "UTF-8";
      formElement.action = `${this.baseUrl}/fileMgtController/download`;
      formElement.target = "callBackTarget";
      let inputElement = document.createElement("input");
      inputElement.type = "hidden";
      inputElement.name = "params";
      inputElement.value = params;
      formElement.appendChild(inputElement);
      document.body.appendChild(formElement);
      formElement.submit();
      document.body.removeChild(formElement);
    },
    // 查询时调用方法
    handleQuery() {
      this.query(this.conditions);
    },
    // queryZzjgTree() {
    //   request(`/fileMgtController/getTreeZzjgs`, "get", this.conditions).then(
    //     res => {
    //       if (
    //         !isEmpty(res) &&
    //         res.data.httpStatus === 200 &&
    //         res.data.businessCode === "B0000"
    //       ) {
    //         this.treeDataStructure = res.data.body;
    //         this.tableData = res.data.body.fileInfos;
    //         this.tableDataTotal = res.data.body.total;
    //       } else {
    //         this.$message({
    //           message: res.data.message,
    //           type: "error"
    //         });
    //       }
    //     }
    //   );
    // },
    // 构建弹出对话框的绑定属性
    getModalBind() {
      return {
        "custom-class": "base-file-modal-container"
      };
    },
    getFormBind() {
      return {
        "label-position": "left",
        "label-width": "80px",
        size: "small",
        "status-icon": true
      };
    },
    getPaginationBind() {
      return {
        background: true,
        layout: "total, slot, ->, jumper, prev, pager, next"
      };
    },
    // 每页限制的数据条数改变时调用的方法
    handleCurrentChange(val) {
      this.conditions = Object.assign({}, this.conditions, {
        page: val
      });
      this.query(this.conditions);
    },
    // 单选选中表格数据时调用的方法
    handleSelectionChange(selection) {
      this.selectedDatas = selection.slice(0, selection.length);
      this.selectedDataKeys = this.selectedDatas.map(row => {
        return row.fileId;
      });
    },
    handleRemove() {
      var projectCategory = this.carriedParams.projectCategory;
      if (this.selectedDataKeys.length === 0) {
        this.$message({
          message: "请至少选择一条信息进行删除！",
          type: "warning"
        });
      } else {
        request("/fileMgtController/removeFileInfo", "post", {
          selectedDatas: this.selectedDatas,
          projectCategoryName: this.projectTypeMap[this.projectSide][
            projectCategory
          ]
        }).then(res => {
          if (
            !isEmpty(res) &&
            res.data.httpStatus === 200 &&
            res.data.businessCode === "B0000"
          ) {
            this.$message({
              message: res.data.message,
              type: "success"
            });
            this.query(this.conditions);
          } else {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          }
        });
      }
    },
    query(_conditions_) {
      request(`/fileMgtController/getFileInfo`, "get", _conditions_).then(
        res => {
          if (
            !isEmpty(res) &&
            res.data.httpStatus === 200 &&
            res.data.businessCode === "B0000"
          ) {
            this.tableData = res.data.body.fileInfos;
            this.tableDataTotal = res.data.body.total;
          } else {
            this.$message({
              message: res.data.message,
              type: "error"
            });
          }
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.table-self {
  width: 100%;
}
</style>

<style lang="scss">
@import "styles/mixin.scss";
@import "styles/variables.scss";

.base-file-modal-container {
  background-color: rgba(0, 0, 0, 0);
  .el-dialog__header {
    padding: 0.625rem;
    padding-left: 1.125rem;
    background-color: $fmodalBg;
    color: $fmodalTitleColor;
    border-radius: 0.375rem 0.375rem 0 0;
    .el-dialog__headerbtn {
      top: 0.625rem;
      i {
        color: $fmodalTitleColor;
        line-height: 1.125rem;
      }
    }
  }
  .el-dialog__body {
    padding: 0 0.375rem;
    background-color: $fmodalBg;
    .base-file-modal-body-container {
      @include mpbClear;
      padding: 0.625rem 0.875rem;
      padding-bottom: 0.125rem;
      background-color: $fmodalBodyBg;
      max-height: 21.25rem;
      @include flex-box($HORIZONTAL, $NOWRAP);
      justify-content: space-between;
      .tree-left {
        @include flexScale(1);
        border-right: 0.0625rem solid $fmodalFooterBorderColor;
        margin-right: 0.75rem;
        margin-bottom: 0.5rem;
        .scrollbar-wrapper {
          overflow-x: hidden !important;
        }
        .el-scrollbar {
          height: 20rem;
        }
      }
      .showData-right {
        @include flexScale(3);
        @include flex-box($VERTICAL, $WRAP);
        align-content: stretch;
        .condition {
          height: 2.75rem;
          display: flex;
        }
        .table {
          @include flexScale(1);
          .el-checkbox__input.is-checked {
            .el-checkbox__inner {
              background-color: $checkboxBg;
              border-color: $checkboxBorderColor;
            }
          }
          .el-checkbox__input.is-indeterminate {
            .el-checkbox__inner {
              background-color: $checkboxBg;
              border-color: $checkboxBorderColor;
            }
          }
          .el-checkbox__input {
            .el-checkbox__inner:hover {
              border-color: $checkboxBorderColor;
            }
          }
          .el-checkbox__input.is-focus {
            .el-checkbox__inner {
              border-color: $checkboxBorderColor;
            }
          }
          .el-checkbox__input.is-indeterminate {
            .el-checkbox__inner {
              background-color: $checkboxBg;
              border-color: $checkboxBorderColor;
            }
          }
          .table-pagination {
            padding: 0.5rem;
            .number.active {
              background: $buttonBg !important;
              &:hover {
                color: #ffffff !important;
                cursor: pointer;
              }
            }
            li:hover {
              color: $buttonBg !important;
            }
          }
        }
      }
      .el-button--primary {
        background: $buttonBg;
        border: 0.0625rem solid $buttonBorderColor;
        span > svg {
          margin-right: 0.5rem;
        }
        &:hover {
          background: $buttonHover;
          border: 0.0625rem solid $buttonHover;
        }
      }
    }
  }
  .el-dialog__footer {
    padding: 0 0.375rem;
    padding-bottom: 0.375rem;
    background-color: $fmodalBg;
    border-radius: 0 0 0.375rem 0.375rem;
    .base-file-modal-footer-container {
      padding: 0.625rem 0.875rem;
      background-color: $fmodalFooterBg;
      border-top: 0.0625rem solid $fmodalFooterBorderColor;
      .file-modal-upload-btn {
        display: inline-block;
        margin: 0 0.625rem;
      }
    }
    .el-button--primary {
      background: $buttonBg;
      border: 0.0625rem solid $buttonBorderColor;
      span > svg {
        margin-right: 0.5rem;
      }
      &:hover {
        background: $buttonHover;
        border: 0.0625rem solid $buttonHover;
      }
    }
  }
}
</style>
