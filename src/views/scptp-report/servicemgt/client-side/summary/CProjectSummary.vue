<template>
  <div>
    <base-condition
      :config.sync="conditionConfig"
      :pageKey="pageKey"
      v-model="conditions"
      v-on:query="handleQuery"
      v-on:input="handleInput"
    />
    <base-operation
      v-if="showOperation()"
      :config="config.operationConfig"
      v-on:export="handleExport"
    />
    <base-table
      :pageKey="pageKey"
      :config="tableConfig"
      :tableData="tableData"
      :total="total"
      ref="table"
    />
  </div>
</template>

<script>
import BaseCondition from "templates/condition/BaseCondition";
import BaseOperation from "templates/operation/BaseOperation";
import { pageConfig } from "./config";
import { tableConfig } from "./tableConfig";
import BaseTable from "components/Table/MultistageHeaderTable";
import request from "utils/request";
import { exportConfig } from "./exportConfig";
const isNumber = require("lodash/isNumber");
const isArray = require("lodash/isArray");
const isEmpty = require("lodash/isEmpty");
const isUndefined = require("lodash/isUndefined");
const isObject = require("lodash/isObject");
const isBoolean = require("lodash/isBoolean");

export default {
  name: "CProjectSummary",
  components: {
    BaseCondition,
    BaseTable,
    BaseOperation
  },
  created() {
    this.conditionConfig = JSON.parse(
      JSON.stringify(this.config.conditionConfig)
    );
  },
  data() {
    return {
      conditions: {},
      pageKey: "cProjectSummary",
      conditionConfig: {},
      tableData: [],
      total: 0,
      config: pageConfig,
      tableConfig: tableConfig,
      selectedDatas: []
    };
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
    handleInput(event) {
      //let userNumIndex;
      if (event.projectCategory != this.projectCategory) {
        this.conditionConfig = JSON.parse(
          JSON.stringify(this.config.conditionConfig)
        );
        this.projectCategory = event.projectCategory;
        this.selectedDatas = [];
        this.selectedKeys = [];
        this.tableData = [];
        this.conditionConfig.items.forEach(item => {
          if (item.key == "projectOptionConfig") {
            item.url =
              "/projectInfoSummary/getCategoryDropDown/" + this.projectCategory;
            item.value = "";
            event.projectOptionConfig = "";
          }
        });
      }
    },
    query(_params_) {
      request(this.config.base.queryUrl, "get", _params_).then(res => {
        if (
          !isEmpty(res) &&
          res.data.httpStatus === 200 &&
          res.data.businessCode === "B0000"
        ) {
          let monthTotal = null;
          let totalTotal = null;
          let tableDataTemp = res.data.body;
          tableDataTemp.forEach(item => {
            if (item.monthValue) {
              monthTotal = monthTotal + parseFloat(item.monthValue);
            }
            if (item.totalValue) {
              totalTotal = totalTotal + parseFloat(item.totalValue);
            }
          });
          this.tableData = res.data.body;
          this.tableData.splice(0, 0, {
            monthValue: monthTotal,
            orgCode: "0319",
            orgName: "合计",
            totalValue: totalTotal
          });
          this.total = res.data.body.total;
          this.selectedDatas = res.data.body;
          this.selectedKeys = [];
          this.conditions.projectOptionConfig = JSON.stringify(
            _params_.projectOptionConfig
          );
        } else {
          this.$message({
            message: "查询数据信息失败！",
            type: "error"
          });
        }
      });
    },
    // 查询时调用的方法
    handleQuery() {
      const _conditions = { ...this.conditions };
      if (isEmpty(this.conditions.company)) {
        this.$message({
          message: "请选择所属单位！",
          type: "warning"
        });
        return;
      }
      if (isEmpty(this.conditions.projectOptionConfig)) {
        this.$message({
          message: "请选择分类！",
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
      if (typeof _conditions.projectOptionConfig === "string") {
        _conditions.projectOptionConfig = JSON.parse(
          _conditions.projectOptionConfig
        );
      }
      this.query(this.removeObjectNullVal(_conditions));
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
    handleExport() {
      var tHeader = []; // 导出表头
      var filterVal = []; // 导出表头对应的字段名称
      var tableHead = this.config.tableConfig.columns; // table表字段
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
      if (this.selectedDatas.length <= 0) {
        this.$message({
          message: "没有数据",
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
        exportConfig.handleExport(tHeader, filterVal, merge);
      }
    }
  }
};
</script>
