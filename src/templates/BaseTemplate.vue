<template>
  <div>
    <base-condition
      v-if="showCondition()"
      :config="config.conditionConfig"
      :pageKey="pageKey"
      v-model="conditions"
      v-on:query="handleQuery"
    />
    <base-operation
      v-if="showOperation()"
      :config="config.operationConfig"
      v-on:add="handleAdd"
      v-on:edit="handleEdit"
      v-on:detail="handleDetail"
      v-on:del="handleDel"
    >
      <slot name="customBtns"></slot>
    </base-operation>
    <base-table
      :pageKey="pageKey"
      :config="config.tableConfig"
      :tableData="tableData"
      :total="total"
      :page.sync="pagination.page"
      :limit.sync="pagination.limit"
      v-on:selectionChange="handleSelectionChange"
      v-on:rowClick="handleRowClick"
      v-on:paginationChange="handlePaginationChange"
      v-on:cellEdit="handleCellEdit($event)"
    >
      <template v-slot:customColumnsFront>
        <slot name="customColumnsFront"></slot>
      </template>
      <template v-slot:customColumnsBehind>
        <slot name="customColumnsBehind"></slot>
      </template>
      <template v-slot:pagination>
        <slot name="pagination"></slot>
      </template>
    </base-table>
    <base-fmodal
      v-if="showFModal()"
      :visible.sync="fmodalVisible"
      :title="fmodalTitle"
      :config="config.fmodalConfig"
      :initData="selectedDatas[0]"
      :pageKey="pageKey"
      v-model="formDataForShow"
      @save="handleSave"
    />
  </div>
</template>

<script>
import request from "utils/request";
import BaseCondition from "./condition/BaseCondition";
import BaseOperation from "./operation/BaseOperation";
import BaseTable from "components/Table/BaseTable";
import BaseFmodal from "./fmodal/BaseFmodal";

const isUndefined = require("lodash/isUndefined");
const isEmpty = require("lodash/isEmpty");
const isBoolean = require("lodash/isBoolean");
const isObject = require("lodash/isObject");
const isNumber = require("lodash/isNumber");
const isArray = require("lodash/isArray");

export default {
  // name: "BaseTemplate",
  components: {
    BaseCondition,
    BaseOperation,
    BaseTable,
    BaseFmodal
  },
  props: {
    pageKey: {
      type: String,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
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
      fmodalTitle: "",
      formDataForShow: {}
    };
  },
  watch: {
    conditions(newVal) {
      this.$emit("templateConditionsChange", newVal);
    }
  },
  mounted() {
    // 初始化分页组件所需要的页码和每页限制的数据条数
    this.initpagination();
    // 初始化数据
    if (this.config.tableConfig.initLoad) {
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
    // 根据配置文件初始化分页控件配置
    initpagination() {
      // if (
      //   !isEmpty(this.config.tableConfig) &&
      //   !isEmpty(this.config.tableConfig.pagination)
      // ) {
      //   if (this.config.tableConfig.pagination["current-page"]) {
      //     this.pagination.page = this.config.tableConfig.pagination[
      //       "current-page"
      //     ];
      //   }
      //   if (this.config.tableConfig.pagination["page-size"]) {
      //     this.pagination.limit = this.config.tableConfig.pagination[
      //       "page-size"
      //     ];
      //   }
      // }
      if (!isEmpty(this.config.tableConfig)) {
        if (this.config.tableConfig.pagination.pageMeta["current-page"]) {
          this.pagination.page = this.config.tableConfig.pagination.pageMeta[
            "current-page"
          ];
        }
        if (this.config.tableConfig.pagination.pageMeta["page-size"]) {
          this.pagination.limit = this.config.tableConfig.pagination.pageMeta[
            "page-size"
          ];
        }
      }
    },
    // 多选选中表格数据时调用的方法
    handleSelectionChange(selectedDatas) {
      this.selectedDatas = selectedDatas;
      const rowkey = this.config.tableConfig.rowkey;
      this.selectedKeys = selectedDatas.map(data => {
        return data[rowkey];
      });
    },
    // 单选选中表格数据时调用的方法
    handleRowClick(rowObj) {
      if (isEmpty(rowObj)) {
        this.selectedDatas = [];
        this.selectedKeys = [];
      } else {
        this.selectedDatas = [rowObj];
        const rowkey = this.config.tableConfig.rowkey;
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
    // TODO 可编辑表格单元格编辑时调用的方法
    handleCellEdit(val) {
      if (isNumber(val)) {
        this.tableData.splice(val, 1);
      } else {
        this.tableData = val;
      }
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
              this.config.tableConfig.pagination.frontPagingType
                ? {}
                : this.pagination
              // this.pagination
            )
          : Object.assign(
              {},
              this.conditions,
              this.config.tableConfig.pagination.frontPagingType
                ? {}
                : this.pagination
              // this.pagination
            );
      this.query(this.removeObjectNullVal(_conditions));
    },
    // 新增时调用的方法
    handleAdd() {
      this.fmodalTitle = `新增${this.config.fmodalConfig.mainTitle}`;
      this.fmodalVisible = true;
    },
    // 编辑时调用的方法
    handleEdit() {
      if (this.selectedKeys.length === 0) {
        this.$message({
          message: "编辑前请选择一条信息！",
          type: "warning"
        });
      } else if (this.selectedKeys.length > 1) {
        this.$message({
          message: "只能选择一条信息进行编辑！",
          type: "warning"
        });
      } else {
        // 执行编辑
        this.fmodalTitle = `编辑${this.config.fmodalConfig.mainTitle}`;
        this.fmodalVisible = true;
      }
    },
    // 查看详情时调用的方法
    handleDetail() {
      if (this.selectedKeys.length === 0) {
        this.$message({
          message: "查看详情前请选择一条信息！",
          type: "warning"
        });
      } else if (this.selectedKeys.length > 1) {
        this.$message({
          message: "只能选择一条信息进行详情查看！",
          type: "warning"
        });
      } else {
        // 执行查看详情
        this.fmodalTitle = `${this.config.fmodalConfig.mainTitle}详情`;
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
      } else {
        request(this.config.base.delUrl, "post", {
          keys: this.selectedKeys
        }).then(res => {
          if (
            !isEmpty(res) &&
            res.data.httpStatus === 200 &&
            res.data.businessCode === "B0000"
          ) {
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
    handleSave(obj) {
      let saveObj =
        obj.actionType === "add"
          ? obj.changeData
          : {
              ...obj.changeData,
              primaryKeyValue: this.selectedKeys[0]
            };

      if (isEmpty(this.config.base.existUrl)) {
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
              const validateExistField = this.config.fmodalConfig.items
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
    }
  }
};
</script>
