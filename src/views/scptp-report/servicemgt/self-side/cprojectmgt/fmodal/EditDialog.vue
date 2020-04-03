<!-- 表单对话框组件 -->
<template>
  <el-dialog
    :visible="visible"
    :destroy-on-close="true"
    custom-class="base-fmodal-container cproject-mgt-fmodal-container"
    v-bind="getModalBind()"
    @open="handleOpenModal"
    @opened="handleOpenedModal"
    @close="handleCloseModal"
    @closed="handleClosedModal"
    width="80%"
  >
    <div class="base-fmodal-body-container cproject-mgt-fmodal-body-container">
      <el-form
        ref="fmodal"
        :model="value"
        :inline="false"
        label-position="right"
        label-width="190px"
        size="small"
        :status-icon="true"
        :destroy-on-close="true"
      >
        <el-collapse v-model="activeElCollapseName">
          <el-collapse-item name="elCollapseItem">
            <template slot="title">
              <div class="sproject-mgt-fmodal-collapse-title-container">
                <i class="el-icon-edit" />项目类别及统计月份信息
              </div>
            </template>
            <el-row :gutter="10">
              <el-col :span="8">
                <el-form-item
                  label="上报月份"
                  :rules="rules.Null"
                  prop="theMonth"
                >
                  <el-date-picker
                    :value="value['theMonth']"
                    @input="handleItemInput($event, 'theMonth')"
                    type="month"
                    placeholder="请选择上报月份"
                    format="yyyy-MM"
                    value-format="yyyy-MM"
                    style="width: 100%;"
                    clearable
                    readonly
                  />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="所属单位/供电局"
                  :rules="rules.Null"
                  prop="company"
                >
                  <tree-select
                    :treeDataStructure="companyTree"
                    placeholder="请选择所属单位/供电局"
                    :value="value['company']"
                    @input="handleItemInput($event, 'company')"
                    filterable
                    clearable
                    :disabled="isEdit"
                  ></tree-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item
                  label="项目类别"
                  :rules="rules.Null"
                  prop="projectCategory"
                >
                  <el-select
                    :value="value['projectCategory']"
                    @input="handleItemInput($event, 'projectCategory')"
                    style="width:100%;"
                    @change="projectCategoryChange"
                    clearable
                    :disabled="isEdit"
                  >
                    <el-option
                      v-for="o in projectCategoryArr"
                      :key="o.value"
                      :label="o.label"
                      :value="o.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
        <SaveServerFmodel
          ref="modal"
          :value="value"
          v-if="projectCategory == '1'"
          @save="handleSave"
          @input="handleInput($event)"
        ></SaveServerFmodel>
        <DiagnosisFmodel
          ref="modal"
          :value="value"
          v-if="projectCategory == '2'"
          @save="handleSave"
          @input="handleInput($event)"
        ></DiagnosisFmodel>
        <HLTransformerFmodel
          ref="modal"
          :value="value"
          v-if="projectCategory == '3'"
          @save="handleSave"
          @input="handleInput($event)"
        ></HLTransformerFmodel>
        <PromoteLEDFmodel
          ref="modal"
          :value="value"
          v-if="projectCategory == '4'"
          @save="handleSave"
          @input="handleInput($event)"
        ></PromoteLEDFmodel>
        <incentive-fmodal
          ref="modal"
          v-model="formDataForShow"
          v-if="projectCategory == '5'"
          @save="handleSave"
          @input="handleInput($event)"
        ></incentive-fmodal>
        <client-side-fmodal
          ref="modal"
          v-model="formDataForShow"
          v-else-if="projectCategory == '6'"
          @save="handleSave"
          @input="handleInput($event)"
        ></client-side-fmodal>
        <contract-fmodal
          ref="modal"
          v-model="formDataForShow"
          v-else-if="projectCategory == '7'"
          @input="handleInput($event)"
          @save="handleSave"
        ></contract-fmodal>
        <un-contract-fmodal
          ref="modal"
          v-model="formDataForShow"
          v-else-if="projectCategory == '8'"
          @input="handleInput($event)"
          @save="handleSave"
        ></un-contract-fmodal>
      </el-form>
    </div>
    <div slot="title" id="base-fmodal-title-container">{{ title }}</div>
    <div slot="footer" class="base-fmodal-footer-container">
      <el-button
        type="primary"
        icon="el-icon-close"
        size="small"
        @click="handleCloseModal()"
        >关闭</el-button
      >
      <el-button
        v-if="btnVisible"
        type="primary"
        icon="el-icon-refresh-left"
        size="small"
        @click="handleReset()"
        >重置</el-button
      >
      <el-button
        v-if="btnVisible"
        type="primary"
        size="small"
        @click="handleSave()"
      >
        <svg-icon icon-class="save" />保存
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import request from "utils/request";
import IncentiveFmodal from "./IncentiveFmodal";
import ClientSideFmodal from "./ClientSideFmodal";
import ContractFmodal from "./ContractFmodal";
import UnContractFmodal from "./UnContractFmodal";
import TreeSelect from "components/TreeSelect";
import { getUserInfo } from "@/utils/auth";
import SaveServerFmodel from "./SaveServiceFmodel";
import DiagnosisFmodel from "./DiagnosisFmodel";
import HLTransformerFmodel from "./HLTransformerFmodel";
import PromoteLEDFmodel from "./PromoteLEDFmodel";
const isEmpty = require("lodash/isEmpty");
const isEqual = require("lodash/isEqual");
export default {
  components: {
    IncentiveFmodal,
    TreeSelect,
    ClientSideFmodal,
    ContractFmodal,
    UnContractFmodal,
    SaveServerFmodel,
    DiagnosisFmodel,
    HLTransformerFmodel,
    PromoteLEDFmodel
  },
  props: {
    // 业务页面唯一标识
    pageKey: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    config: {
      type: Object,
      required: true
    },
    initData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 表单整体的数据对象和对象值
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      itemsInRowNum: 3, // 表单每行显示表单项个数
      rowNum: 0, // 表单的总行数
      companyTree: {},
      span: 8,
      changeData: {},
      disabled: false, // 点击查看按钮查看详情时需要设置成true
      btnVisible: true, // 查看详情对话框只需要显示关闭按钮
      formDataForShow: {},
      projectCategoryArr: [],
      activeElCollapseName: ["elCollapseItem"],
      projectCategory: "5",
      isEdit: false,
      isView: false,
      rules: {
        Null: [
          {
            required: true,
            pattern: /^(?=.*\S).+$/,
            trigger: ["blur", "change"],
            message: "必填项不能为空"
          }
        ]
      }
    };
  },
  watch: {
    value(newVal) {
      this.formDataForShow = newVal;
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      request(`/commonController/getTreeOrgs/${getUserInfo().orgCode}`).then(
        res => {
          this.companyTree = res.data.body;
        }
      );
      const url = "/commonController/getDropDownCodesByCodeType/";
      request(url + "1").then(res => {
        this.projectCategoryArr = res.data.body;
      });
    },
    // 构建弹出对话框的绑定属性
    getModalBind() {
      return Object.assign({}, this.config.modalMeta);
    },
    // 构建表单的绑定属性
    getFormBind() {
      return Object.assign(
        {},
        {
          "label-position": "left",
          "label-width": "110px",
          width: "56%",
          size: "small",
          "status-icon": true,
          "destroy-on-close": true
        },
        this.config.formMeta
      );
    },
    // 获得校验规则
    getRules() {
      return isEmpty(this.config.rules) ? [] : this.config.rules;
    },
    // 设置初始化值
    setDefaultValue() {
      const formDataForShow = { ...this.initData };
      this.$emit("input", { ...formDataForShow });
    },
    // 新增操作时设置初始化值
    setDefaultValueOnAdd() {
      let formDataForShow = { ...this.config };
      this.initFormDataForShow = { ...formDataForShow };
      this.$emit("input", { ...formDataForShow });
    },
    // 表单对话框打开事件处理
    handleOpenModal() {
      if (this.title.indexOf("详情") >= 0) {
        this.disabled = true;
        this.btnVisible = false;
      }
    },
    // 表单对话框打开后事件处理
    handleOpenedModal() {
      // 初始化数据
      if (this.title.indexOf("编辑") >= 0 || this.title.indexOf("详情") >= 0) {
        this.setDefaultValue();
        this.projectCategoryChange(this.initData.projectCategory);
        this.isEdit = true;
      }
      // 新增操作时设置初始化值
      if (this.title.indexOf("新增") >= 0) {
        this.setDefaultValueOnAdd();
        this.projectCategoryChange(this.config.projectCategory);
        this.isEdit = false;
      }
    },
    // 表单对话框关闭时事件处理
    handleCloseModal() {
      this.$emit("update:visible", false);
    },
    // 表单对话框关闭后事件处理
    handleClosedModal() {
      this.changeData = {};
      this.disabled = false;
      this.btnVisible = true;
      this.$emit("input", {});
    },
    // 保存时调用的方法
    handleSave() {
      this.$refs["fmodal"].validate(valid => {
        if (valid) {
          if (isEqual(this.initData, this.value)) {
            this.$message({
              message: "没有要变更的数据，不需要保存！",
              type: "warning"
            });
          } else {
            // this.$emit("update:visible", false);
            let actionType = "add";
            if (this.title.indexOf("编辑") >= 0) {
              actionType = "update";
            }
            this.$emit("save", {
              actionType: actionType,
              changeData: this.value
            });
          }
        }
      });
    },
    // 重置时调用的方法
    handleReset() {
      const obj = Object.assign({}, this.initData, {
        projectCategory: this.value.projectCategory
      });
      this.$emit("input", obj);
    },
    // 操作条件项时调用的方法
    handleInput(val) {
      // this.changeData = Object.assign({}, this.changeData, { [key]: val });
      this.$emit("input", val);
    },
    handleItemInput(val, key) {
      this.$emit("input", { ...this.value, [key]: val });
    },
    projectCategoryChange(val) {
      this.projectCategory = val;
    }
  }
};
</script>

<style lang="scss" scope>
.cproject-mgt-fmodal-container {
  .el-dialog__body {
    .cproject-mgt-fmodal-body-container {
      padding-bottom: 0.875rem !important;
      .el-row .el-col .el-form-item--small {
        height: 2.5rem !important;
      }
    }
  }
}
</style>
