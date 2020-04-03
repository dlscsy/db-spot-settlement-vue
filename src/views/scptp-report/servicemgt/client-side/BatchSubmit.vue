<!-- 表单对话框组件 -->
<template>
  <el-dialog
    :visible="visible"
    v-bind="getModalBind()"
    :title="title"
    custom-class="base-fmodal-container sproject-mgt-fmodal-container"
    @opened="handleOpenedModal"
    @close="closeDialog"
  >
    <div class="base-fmodal-body-container sproject-mgt-fmodal-body-container">
      <el-row>
        <el-col :span="7">
          <div>
            <el-scrollbar wrap-class="scrollbar-wrapper">
              <el-tree
                id="tree-options"
                class="tree-left"
                :data="data2"
                :props="defaultProps"
                default-expand-all
                :filter-node-method="filterNode"
                @node-click="handleNodeClick"
                ref="tree2"
              >
              </el-tree>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="16" style="margin-left:20px">
          <div class="showData-right">
            <div class="table">
              <el-table
                ref="fileModalTable"
                row-key="fileId"
                :data="tableData"
                :border="true"
                :stripe="true"
                :size="'mini'"
                class="table-self"
                v-loading="loading"
              >
                <!-- <el-table-column
                  type="selection"
                  header-align="center"
                  align="center"
                  width="42"
                /> -->
                <el-table-column type="index" label="序号" align="center">
                  <template slot-scope="scope">
                    {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
                  </template>
                </el-table-column>
                <el-table-column
                  key="orgName"
                  prop="orgName"
                  label="所属单位"
                  header-align="center"
                  align="center"
                  :show-overflow-tooltip="true"
                />
                <el-table-column
                  key="statisticsState"
                  prop="statisticsState"
                  label="统计状态"
                  header-align="center"
                  align="center"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.statisticsState === '0'">未统计</span>
                    <span v-else>已统计</span>
                  </template>
                </el-table-column>
                <el-table-column
                  key="submitState"
                  prop="submitState"
                  label="上报状态"
                  header-align="center"
                  align="center"
                  :show-overflow-tooltip="true"
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.submitState === '0'">未上报</span>
                    <span v-else-if="scope.row.submitState === '2'"
                      >已回退</span
                    >
                    <span v-else>已上报</span>
                  </template>
                </el-table-column>
                <!-- <el-table-column
                  label="操作"
                  header-align="center"
                  align="center"
                  :show-overflow-tooltip="true"
                >
                  <template>
                    <el-button
                      type="primary"
                      size="small"
                      class="operation-btn"
                    >
                      <svg-icon icon-class="shangbao" />上报
                    </el-button>
                  </template>
                </el-table-column> -->
              </el-table>
              <el-pagination
                class="pagination-button"
                :current-page.sync="currentPage"
                :page-size.sync="pageSize"
                :total="tableDataTotal"
                v-bind="getPaginationBind()"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row class="bottom-batton">
        <el-col :span="24" align="center">
          <el-button
            type="primary"
            size="small"
            class="operation-btn"
            @click="batchSubmit"
          >
            <svg-icon icon-class="shangbao" />一键上报
          </el-button>
          <el-button
            type="primary"
            size="small"
            class="operation-btn"
            @click="closeDialog"
          >
            <svg-icon icon-class="close" />关闭
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div slot="title" id="sproject-mgt-fmodal-title-container">{{ title }}</div>
    <div slot="footer" class="sproject-mgt-fmodal-footer-container"></div>
  </el-dialog>
</template>

<script>
import request from "@/utils/request";
const isEmpty = require("lodash/isEmpty");

export default {
  // name: "BatchSubmit",
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    children: {
      type: Array,
      required: true
    },
    searchParams: {
      type: Object,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      conditions: {},
      tableData: [],
      tableDataTotal: 0,
      currentPage: 1,
      pageSize: 8,
      filterText: "",
      data2: [
        {
          id: -1,
          label: "报表名称",
          children: []
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    // this.data2.children = this.children;
  },
  mounted() {},
  watch: {
    children(newValue) {
      this.data2[0].children = newValue;
    }
  },
  methods: {
    // 构建弹出对话框的绑定属性
    getModalBind() {
      return Object.assign(
        {},
        { "custom-class": "sproject-mgt-fmodal-container" }
        // this.config.modalMeta
      );
    },
    // 表单对话框打开后事件处理
    handleOpenedModal() {
      let projectSide = this.searchParams.projectSide;
      let company = this.searchParams.company;
      let theMonth = this.searchParams.theMonth;
      this.conditions = Object.assign({}, this.conditions, {
        projectSide: projectSide,
        company: company,
        theMonth: theMonth,
        limit: this.pageSize,
        page: this.currentPage,
        codeValue: this.data2[0].children[0].id
      });
      this.query(this.conditions);
    },
    closeDialog() {
      this.tableData = [];
      this.tableDataTotal = 0;
      this.currentPage = 1;
      this.pageSize = 8;
      this.$emit("closeDialog", null);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
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
    // 节点点击事件
    // handleNodeClick(node) {
    //   let params = {
    //     codeValue: node.id,
    //     page: this.currentPage,
    //     limit: this.pageSize
    //   };
    //   this.$emit("handleNodeClick", params);
    // }
    handleNodeClick(node) {
      this.conditions = Object.assign({}, this.conditions, {
        codeValue: node.id
      });
      this.query(this.conditions);
    },
    // 每页限制的数据条数改变时调用的方法
    handleCurrentChange(val) {
      this.currentPage = val;
      this.conditions = Object.assign({}, this.conditions, {
        page: val
      });
      this.query(this.conditions);
    },
    query(params) {
      request("/clientSideSummary/searchNoSubmit", "post", params).then(res => {
        if (
          !isEmpty(res) &&
          res.data.httpStatus === 200 &&
          res.data.businessCode === "B0000"
        ) {
          this.tableData = res.data.body.rows;
          this.tableDataTotal = res.data.body.total;
        } else {
          this.$message({
            message: "查询下级机构失败！",
            type: "error"
          });
        }
      });
    },
    //一键上报
    batchSubmit() {
      this.$emit("batchSubmit", null);
    }
  }
};
</script>

<style lang="scss">
@import "styles/variables.scss";

.bottom-batton {
  padding: 1rem 5rem 1rem 5rem;
}
.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #01367a !important;
}
</style>
