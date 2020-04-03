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
          <div class="tree-left">
            <el-scrollbar wrap-class="scrollbar-wrapper">
              <el-tree
                id="tree-options"
                :data="data2"
                :props="defaultProps"
                default-expand-all
                :filter-node-method="filterNode"
                style="max-height: 20rem;"
                ref="tree2"
              >
              </el-tree>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="16" style="margin-left:20px">
          <div class="showData-right">
            <div slot="title" class="return-option-title">
              回退意见
            </div>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="returnOpinion"
            >
            </el-input>
          </div>
        </el-col>
      </el-row>
      <el-row class="bottom-batton">
        <el-col :span="24" align="center">
          <el-button
            type="primary"
            size="small"
            class="operation-btn"
            @click="doReturn"
          >
            <svg-icon icon-class="shangbao" />确定回退
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
    <div slot="title" id="base-fmodal-title-container">{{ title }}</div>
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
      returnOpinion: "",
      data2: [
        {
          id: -1,
          label: "回退的报表名称",
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
      // this.query(this.conditions);
    },
    closeDialog() {
      this.returnOpinion = "";
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
      // this.query(this.conditions);
    },
    // 每页限制的数据条数改变时调用的方法
    handleCurrentChange(val) {
      this.currentPage = val;
      this.conditions = Object.assign({}, this.conditions, {
        page: val
      });
      // this.query(this.conditions);
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
    doReturn() {
      this.$emit("doReturn", this.returnOpinion);
    }
  }
};
</script>

<style lang="scss" scoped>
#sproject-mgt-fmodal-title-container:hover {
  cursor: pointer;
}
.bottom-batton {
  padding: 1rem 5rem 1rem 5rem;
}
.top-title {
  font-weight: bold;
  margin-bottom: 2px;
}
.return-option-title {
  font-size: 16px;
  margin: 0px 0px 15px 0px;
  text-align: center;
  font-weight: bold;
}
</style>
