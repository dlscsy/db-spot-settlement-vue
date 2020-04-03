<!-- 表单对话框组件 -->
<template>
  <el-dialog
    :visible="visible"
    :destroy-on-close="true"
    custom-class="base-fmodal-container sproject-mgt-fmodal-container"
    v-bind="getModalBind()"
    @open="handleOpenModal"
    @opened="handleOpenedModal"
    @close="handleCloseModal"
    @closed="handleClosedModal"
  >
    <div class="base-fmodal-body-container sproject-mgt-fmodal-body-container">
      <el-form
        :ref="`${pageKey}FmodalForm`"
        :model="value"
        :inline="false"
        :rules="getRules()"
        v-bind="getFormBind()"
      >
        <el-collapse v-model="activeElCollapseName">
          <el-collapse-item name="elCollapseItem1">
            <template slot="title">
              <div class="sproject-mgt-fmodal-collapse-title-container">
                <i class="el-icon-edit" />项目类别及统计月份信息
              </div>
            </template>
            <el-row :key="-1" :gutter="10">
              <el-col
                v-for="(item, index) in config.baseItems"
                :key="`form-base-item-col-${index}`"
                :span="span"
              >
                <base-form-item
                  :key="`${item.key}-base-form-item`"
                  :ref="`${item.key}-base-form-item-ref`"
                  :item="item"
                  :value="value[item.key]"
                  :disabled="disabled || unEditable(item)"
                  @change="handleInput($event, item.key)"
                />
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="elCollapseItem2">
            <template slot="title">
              <div class="sproject-mgt-fmodal-collapse-title-container">
                <i class="el-icon-edit" />项目基本信息
              </div>
            </template>
            <el-row v-for="rowIndex in rowNum" :key="rowIndex" :gutter="10">
              <el-col
                v-for="(item, index) in getRowFormItems(rowIndex)"
                :key="`form-item-col${rowIndex}-${index}`"
                :span="span"
              >
                <div v-if="item.type === 'select'">
                  <base-form-item
                    v-if="!item.dynamicItem || diffBaseFormItemShow"
                    :ref="`${item.key}-base-form-item-ref`"
                    :key="`${item.key}-base-form-item`"
                    :item="item"
                    :value="value[item.key]"
                    :disabled="disabled || unEditable(item)"
                    @change="handleInput($event, item.key)"
                  />
                </div>
                <div v-else>
                  <base-form-item
                    v-if="!item.dynamicItem || diffBaseFormItemShow"
                    :ref="`${item.key}-base-form-item-ref`"
                    :key="`${item.key}-base-form-item`"
                    :item="item"
                    :value="value[item.key]"
                    :disabled="disabled || unEditable(item)"
                    @input="handleInput($event, item.key)"
                  />
                </div>
              </el-col>
            </el-row>
          </el-collapse-item>
          <el-collapse-item name="elCollapseItem3">
            <template slot="title">
              <div class="sproject-mgt-fmodal-collapse-title-container">
                <i class="el-icon-edit" />
                {{ `${this.subInfosTitle}信息` }}
              </div>
            </template>
            <el-row :key="rowNum + 1" :gutter="10">
              <el-col :key="`form-item-col${rowNum + 1}-0`" :span="24">
                <s-project-mgt-table
                  v-if="showSubInfoTable()"
                  :ref="`${pageKey}FmodalBaseTable`"
                  :pageKey="pageKey"
                  :config="config.subInfoTableConfig"
                  :columnsConfig="subInfoTableColumnsConfig"
                  :selectedProjectCategory="selectedProjectCategory"
                  :projectId="projectId"
                  :convertRate="convertRate"
                  :editDisabled="disabled"
                  :tableData="subInfoTableData"
                  :total="subInfoTableData.length"
                  :page.sync="subInfoTablePagination.page"
                  :limit.sync="subInfoTablePagination.limit"
                  v-on:tableEdit="handleTableEdit($event)"
                  v-on:editTableSave="handleEditTableSave($event)"
                />
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-form>
    </div>
    <div slot="title" id="base-fmodal-title-container">{{ title }}</div>
    <div slot="footer" class="base-fmodal-footer-container">
      <el-button type="primary" icon="el-icon-close" size="small" @click="handleCloseModal()">关闭</el-button>
      <el-button
        v-if="btnVisible"
        type="primary"
        icon="el-icon-refresh-left"
        size="small"
        @click="handleReset()"
      >重置</el-button>
      <el-button v-if="btnVisible" type="primary" size="small" @click="handleSave()">
        <svg-icon icon-class="save" />保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import baseFmodalCommon from "templates/fmodal/mixins/baseFmodalCommon";
import { uuid } from "utils/utils";
import SProjectMgtTable from "./SProjectMgtTable";
import {
  TABLE_EDIT_ADD_ACTION,
  TABLE_EDIT_UPDATE_ACTION,
  TABLE_EDIT_ALL_UPDATE_ACTION,
  TABLE_EDIT_ALL_RESET_ACTION
} from "components/Table/TableConstant";
import {
  SUB_TABLE_COLUMNS_CONFIG,
  SUB_TABLE_INFO_TITLES_CONFIG
} from "./subtablecolumns/SUB_TABLE_COLUMNS_CONFIG";

const isNumber = require("lodash/isNumber");
const isEmpty = require("lodash/isEmpty");
const isEqual = require("lodash/isEqual");
const toString = require("lodash/toString");
const moment = require("moment");

export default {
  mixins: [baseFmodalCommon],
  components: {
    SProjectMgtTable
  },
  data() {
    return {
      // 其他校验规则
      otherRules: {},
      // 手风琴展开项
      activeElCollapseName: [
        "elCollapseItem1",
        "elCollapseItem2",
        "elCollapseItem3"
      ],
      // 是否显示动态判断的那些表单项
      diffBaseFormItemShow: false,
      // 项目附属子信息标题
      subInfosTitle: "",
      // 项目附属子信息数据表格分页配置
      subInfoTablePagination: {
        page: 1,
        limit: 5
      },
      // 项目附属子信息数据
      subInfoTableData: [],
      // 项目附属子信息数据表格的列配置
      subInfoTableColumnsConfig: {},
      // 选择的项目类型
      selectedProjectCategory: "",
      // 项目ID
      projectId: "",
      // 折算系数
      convertRate: 0
    };
  },
  watch: {
    selectedProjectCategory(newVal, oldVal) {
      if (!isEmpty(newVal) && !isEqual(newVal, oldVal)) {
        if (this.title.indexOf("新增") >= 0) {
          this.subInfoTableData = [];
          this.$emit("input", {
            ...this.initFormDataForShow,
            projectCategory: newVal
          });
          this.subInfoTableColumnsConfig = {};
        }
        // 项目类别改变时的处理
        this.subInfosTitle = SUB_TABLE_INFO_TITLES_CONFIG[newVal];
        this.showBaseFormItem(newVal);
        this.subInfoTableColumnsConfig = SUB_TABLE_COLUMNS_CONFIG[newVal];
      }
    }
  },
  methods: {
    // 获得校验规则
    getRules() {
      if (isEmpty(this.config.rules)) {
        return {};
      } else {
        let _currRules = {};
        Object.keys(this.config.rules).forEach(key => {
          const _theRuleForKey = this.config.rules[key];
          if (this.otherRules.hasOwnProperty(key)) {
            let _currRuleForKey = _theRuleForKey.concat(this.otherRules[key]);
            _currRules[key] = _currRuleForKey;
          } else {
            _currRules[key] = _theRuleForKey;
          }
        });
        return _currRules;
      }
    },
    // 是否显示子信息表格
    showSubInfoTable() {
      return !isEmpty(this.subInfoTableColumnsConfig);
    },
    // 表单对话框打开后事件处理
    handleOpenedModal() {
      // 初始化数据
      if (this.title.indexOf("编辑") >= 0 || this.title.indexOf("详情") >= 0) {
        this.setDefaultValue();
      }
    },
    // 表单对话框关闭后事件处理
    handleClosedModal() {
      this.initFormDataForShow = {};
      this.changeData = {};
      this.disabled = false;
      this.btnVisible = true;
      this.activeElCollapseName = [
        "elCollapseItem1",
        "elCollapseItem2",
        "elCollapseItem3"
      ];
      this.diffBaseFormItemShow = false;
      this.subInfosTitle = "";
      this.subInfoTablePagination = {
        page: 1,
        limit: 5
      };
      this.subInfoTableData = [];
      this.subInfoTableColumnsConfig = {};
      this.selectedProjectCategory = "";
      this.projectId = "";
      this.convertRate = 0;
      this.$emit("input", {});
    },
    // 保存时调用的方法
    handleSave() {
      if (
        isEmpty(this.changeData["tableChangeData"]) &&
        this.$refs[`${this.pageKey}FmodalBaseTable`].headerBtnsShow
      ) {
        this.$message({
          message:
            "表单中表格数据已发生改变，整体保存数据前请先确认暂存表单中表格数据！",
          type: "warning"
        });
      } else if (
        isEqual(
          this.getFormDataExceptTableData(this.initData),
          this.getFormDataExceptTableData(this.value)
        ) &&
        isEmpty(this.changeData["tableChangeData"])
      ) {
        this.$message({
          message: "没有要变更的数据，不需要保存！",
          type: "warning"
        });
      } else {
        let actionType = "add";
        if (this.title.indexOf("编辑") >= 0) {
          actionType = "update";
        }
        this.$refs[`${this.pageKey}FmodalForm`].validate(valid => {
          if (valid) {
            let operationObj = {
              operator: isEmpty(this.userInfo)
                ? "未登录"
                : this.userInfo.userName,
              operateDate: moment().format("YYYY-MM-DD HH:mm:ss"),
              operatorCompany: isEmpty(this.userInfo)
                ? "未登录"
                : this.userInfo.orgCode
            };
            this.$emit("save", {
              actionType: actionType,
              changeData:
                actionType === "update"
                  ? Object.assign({}, this.changeData, operationObj)
                  : Object.assign(
                      {},
                      this.initFormDataForShow,
                      this.changeData,
                      operationObj,
                      { dataSource: "0", dataState: "0" }
                    )
            });
          } else {
            this.$message({
              message:
                "表单中除了表格数据外的表单项校验不通过，无法执行保存操作！",
              type: "warning"
            });
            return valid;
          }
        });
      }
    },
    // 重置时调用的方法
    handleReset() {
      if (this.title.indexOf("新增") >= 0) {
        this.subInfoTableData = [];
        this.$emit("input", { ...this.initFormDataForShow });
      } else {
        this.$emit("input", { ...this.initData });
        this.handleTableEdit({
          actionType: TABLE_EDIT_ALL_RESET_ACTION,
          array: [].concat(this.initData["subInfos"])
        });
      }
    },
    // 操作除了表格数据外的表单项时调用的方法
    handleInput(val, key) {
      if (key === "projectCategory") {
        this.selectedProjectCategory = val;
      } else if (key === "exSaveCheck") {
        this.convertRate = val === "1" ? 1 : 0.8;
      }

      this.changeData = Object.assign({}, this.changeData, { [key]: val });
      this.$emit("input", { ...this.value, [key]: val });
    },
    // 项目附属子信息数据表格单元格编辑时调用的方法
    handleTableEdit(val) {
      if (val.actionType === TABLE_EDIT_ADD_ACTION) {
        this.subInfoTableData.splice(val.page * val.limit, 0, val.obj);
      } else if (val.actionType === TABLE_EDIT_UPDATE_ACTION) {
        let _editObj = val.obj;
        const _theKey = this.config.subInfoTableConfig.rowkey;
        this.subInfoTableData = this.subInfoTableData.map(data => {
          if (data[_theKey] === _editObj[_theKey]) {
            return _editObj;
          }
          return data;
        });
      } else if (val.actionType === TABLE_EDIT_ALL_RESET_ACTION) {
        this.subInfoTableData = val.array;
      } else if (val.actionType === TABLE_EDIT_ALL_UPDATE_ACTION) {
        this.subInfoTableData = val.array;
      } else {
        this.subInfoTableData.splice(val.index, 1);
      }
    },
    // 项目附属子信息数据表格保存时调用的方法
    handleEditTableSave(val) {
      if (!isEmpty(val)) {
        this.changeData = Object.assign({}, this.changeData, {
          tableChangeData: val
        });
      } else {
        if (this.title.indexOf("编辑") >= 0) {
          let _theRelKey = "exSaveCheck";
          // if (
          //   this.subInfoTableData.length > 0 &&
          //   this.subInfoTableData[0].hasOwnProperty("THEORY_QUANTITY") &&
          //   this.subInfoTableData[0].hasOwnProperty("CONVERT_QUANTITY")
          // ) {
          //   _theRelKey = "exSaveCheck";
          // }
          if (_theRelKey === "exSaveCheck") {
            this.convertRate = this.initData[_theRelKey] === "1" ? 1 : 0.8;
          }
          this.$emit("input", {
            ...this.value,
            [_theRelKey]: this.initData[_theRelKey]
          });
        }
        delete this.changeData["tableChangeData"];
      }
    },
    // 设置初始化值
    setDefaultValue() {
      const formDataForShow = { ...this.initData };
      // 初始化项目类别
      this.selectedProjectCategory = formDataForShow["projectCategory"];
      // 初始化主信息的项目ID
      this.projectId = formDataForShow["projectId"];
      // 初始化折算系数
      this.convertRate = formDataForShow["exSaveCheck"] === "1" ? 1 : 0.8;
      // 初始化子信息表格的值
      this.subInfoTableData = [].concat(this.initData["subInfos"]);
      this.$emit("input", { ...formDataForShow });
    },
    // 新增操作时设置初始化值
    setDefaultValueOnAdd() {
      // 初始化主信息的项目ID
      this.projectId = uuid(36, 16);
      const formDataForShow = { ...this.value, projectId: this.projectId };
      const _allItems = this.config.baseItems.concat(this.config.items);
      _allItems.forEach(item => {
        const { key, initValue } = item;
        if (
          formDataForShow[key] === undefined ||
          formDataForShow[key] === null
        ) {
          formDataForShow[key] = initValue;
        }
      });
      // 该对象的初始化用于在新增操作期间，设置重置操作时所需要的数据对象
      this.initFormDataForShow = { ...formDataForShow };
      // 初始化项目类别
      this.selectedProjectCategory = formDataForShow["projectCategory"];
      this.$emit("input", { ...formDataForShow });
    },
    // 是否显示动态判断的那些表单项
    showBaseFormItem(_selectedProjectCategory_) {
      this.diffBaseFormItemShow =
        _selectedProjectCategory_ !== "1" &&
        _selectedProjectCategory_ !== "2" &&
        _selectedProjectCategory_ !== "3" &&
        _selectedProjectCategory_ !== "4";
    },
    // 获得除表格数据以外的表单数据
    getFormDataExceptTableData(_obj_) {
      let _currObj = {};
      Object.keys(_obj_).forEach(key => {
        let _theVal = _obj_[key];
        if (key === "subInfos") {
          delete _obj_[key];
        } else {
          _currObj[key] = isNumber(_theVal) ? toString(_theVal) : _theVal;
        }
      });

      return _currObj;
    }
  }
};
</script>

<style lang="scss" scope>
.sproject-mgt-fmodal-container {
  .el-dialog__body {
    .sproject-mgt-fmodal-body-container {
      padding-bottom: 0.875rem !important;
      .el-row .el-col .el-form-item--small {
        height: 2.5rem !important;
      }
    }
  }
}
</style>
