<template>
  <div
    class="base-table-container"
    :class="{ 'is-single': config.selectionType === 'single' }"
  >
    <el-table
      :ref="`${pageKey}BaseTable`"
      :row-key="config.rowkey"
      :data="realShowData"
      :border="true"
      :stripe="true"
      :size="'mini'"
      class="base-table"
      v-bind="getTableBind()"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      @cell-dblclick="handleCellDblClick"
    >
      <el-table-column
        v-if="config.selectionType === 'multiple' && !editDisabled"
        type="selection"
        header-align="center"
        align="center"
        width="42"
      />
      <el-table-column
        v-for="(column, index) in columnsConfig.columns"
        :key="column.prop"
        v-bind="getColumnBind(index)"
      >
        <template slot="header">
          <span v-html="column.label"></span>
        </template>
        <template slot-scope="scope">
          <table-input-item
            v-if="hasEditWidget(column)"
            :key="`${column.prop}-base-form-item`"
            :ref="`${column.prop}-base-form-item-${scope.$index}`"
            :pageKey="pageKey"
            :item="column.widget"
            :rules="columnsConfig.rules"
            v-model="scope.row"
            @input="handleInput($event, column.prop, column.widget)"
          />
          <span
            v-html="
              column.formatter
                ? column.formatter(
                    scope.row,
                    scope.column,
                    scope.row[column.prop],
                    scope.$index
                  )
                : scope.row[column.prop]
            "
          />
        </template>
      </el-table-column>
      <el-table-column
        v-if="showEditTableBtns()"
        header-align="center"
        width="160"
        fixed="right"
        align="center"
        class-name="base-table-operate-column"
      >
        <template slot="header">
          <template v-if="headerBtnsShow">
            <el-tooltip effect="light" content="保存" placement="top">
              <svg-icon
                icon-class="ok"
                class="base-table-operateBtn"
                style="margin-right: 1rem;"
                @click="handleSave"
              />
            </el-tooltip>
            <el-tooltip effect="light" content="重置" placement="top">
              <svg-icon
                icon-class="reset"
                class="base-table-operateBtn"
                style="margin-right: 1rem;"
                @click="handleAllReset"
              />
            </el-tooltip>
          </template>
          <el-tooltip effect="light" content="新增" placement="top">
            <svg-icon
              icon-class="add"
              class="base-table-operateBtn"
              style="margin-right: 1rem;"
              @click="handleAdd"
            />
          </el-tooltip>
          <el-tooltip effect="light" content="批量删除" placement="bottom">
            <svg-icon
              icon-class="delete"
              class="base-table-operateBtn"
              @click="handleAllDel()"
            />
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <el-tooltip
            v-if="
              editRowKeys[`${scope.row[config.rowkey]}`] &&
                editRow[config.rowkey] === scope.row[config.rowkey]
            "
            effect="light"
            content="重置"
            placement="left"
          >
            <svg-icon
              icon-class="reset"
              class="base-table-operateBtn"
              style="margin-right: 1rem;"
              @click="handleReset(scope.row[config.rowkey])"
            />
          </el-tooltip>
          <el-tooltip effect="light" content="删除" placement="bottom">
            <svg-icon
              icon-class="delete"
              class="base-table-operateBtn"
              @click="handleDel(scope.$index, scope.row)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="showPagination()"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :total="total"
      v-bind="getPaginationBind()"
      class="base-table-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <slot></slot>
    </el-pagination>
  </div>
</template>

<script>
import schema from "async-validator";
import request from "utils/request";
import { uuid, multiply, divide } from "utils/utils";
import {
  VALUE_LINKAGE,
  DROPDOWN_VALUE_LINKAGE,
  TABLE_EDIT_ADD_ACTION,
  TABLE_EDIT_UPDATE_ACTION,
  TABLE_EDIT_ALL_UPDATE_ACTION
} from "components/Table/TableConstant";
import baseTableCommon from "components/Table/mixins/baseTableCommon";

const isEmpty = require("lodash/isEmpty");
const isNumber = require("lodash/isNumber");
const isEqual = require("lodash/isEqual");
const round = require("lodash/round");

export default {
  mixins: [baseTableCommon],
  props: {
    columnsConfig: {
      type: Object,
      required: true
    },
    selectedProjectCategory: {
      type: String,
      required: true
    },
    projectId: {
      type: String,
      required: true
    },
    convertRate: {
      type: Number,
      required: true
    }
  },
  watch: {
    convertRate(newVal) {
      const _currTableData = this.tableData.map(data => {
        if (
          data.hasOwnProperty("THEORY_QUANTITY") &&
          data.hasOwnProperty("CONVERT_QUANTITY")
        ) {
          let _convertQuantity = round(
            multiply(data.THEORY_QUANTITY, newVal),
            4
          );
          return { ...data, CONVERT_QUANTITY: _convertQuantity };
        }
        return data;
      });
      if (!isEqual(_currTableData, this.initTableData)) {
        for (let _curr of _currTableData) {
          const _currDataKey = _curr[this.config.rowkey];
          this.editRowKeys[`${_currDataKey}`] = _currDataKey;
        }
      }
      this.$emit("tableEdit", {
        actionType: TABLE_EDIT_ALL_UPDATE_ACTION,
        array: _currTableData
      });
    }
  },
  methods: {
    // 构建表格列的绑定属性
    getColumnBind(columnIndex) {
      return Object.assign({}, this.columnsConfig.columns[columnIndex], {
        "show-overflow-tooltip": true
      });
    },
    // 单元格数据录入时调用的方法
    async handleInput(_val_, _key_, _tableInputItem_) {
      if (!isEmpty(this.editRow)) {
        const _dataKey = this.editRow[this.config.rowkey];
        const _initObjByKey = this.initTableData.filter(
          data => data[this.config.rowkey] === _dataKey
        )[0];

        let _editObj = { ...this.editRow, [_key_]: _val_ };
        if (_tableInputItem_.linkageType === VALUE_LINKAGE) {
          _editObj = await this.valueLinkage(_editObj);
        } else if (_tableInputItem_.linkageType === DROPDOWN_VALUE_LINKAGE) {
          _editObj = await this.dropdownValueLinkage(_editObj, _val_, _key_);
        }

        if (!isEmpty(_initObjByKey)) {
          if (!isEqual(_initObjByKey, _editObj)) {
            this.editRowKeys[`${_dataKey}`] = _dataKey;
          } else {
            delete this.editRowKeys[`${_dataKey}`];
          }
        }
        this.editRow = { ..._editObj };
        this.$emit("tableEdit", {
          actionType: TABLE_EDIT_UPDATE_ACTION,
          obj: _editObj
        });
      }
    },
    // 可编辑表格添加数据时调用的方法
    handleAdd() {
      const UUID = uuid(36, 16);
      this.addRowKeys[`${UUID}`] = UUID;
      let _addObj = {
        ...this.columnsConfig.editInit,
        [this.config.rowkey]: UUID,
        PROJECT_ID: this.projectId
      };
      if (this.currentEditCell !== null) {
        this.currentEditCell.classList.toggle("base-table-cell-dbl-click");
      }
      this.currentEditCell = null;
      this.editRow = {};
      this.$emit("tableEdit", {
        actionType: TABLE_EDIT_ADD_ACTION,
        obj: _addObj,
        page: this.currentPage - 1,
        limit: this.pageSize
      });
    },
    // 值联动处理
    async valueLinkage(_data_) {
      if ("1,2,3,4".indexOf(this.selectedProjectCategory) >= 0) {
        let theoryQuantity = this.columnsConfig.formula(_data_);
        let convertQuantity = round(
          multiply(theoryQuantity, this.convertRate),
          4
        );
        return {
          ..._data_,
          THEORY_QUANTITY: theoryQuantity,
          CONVERT_QUANTITY: convertQuantity
        };
      } else if ("5,6,7,8,9,13".indexOf(this.selectedProjectCategory) >= 0) {
        let _unificationHours = await this.asyncFun(
          "/commonController/getUnificationHours",
          "get",
          {}
        );
        let _hours = null == _data_.HOURS ? _unificationHours : _data_.HOURS;
        let _calObj = Object.assign({}, _data_, {
          HOURS: _hours
        });
        let saveQuantity = this.columnsConfig.formula(_calObj);
        let savePower = divide(saveQuantity, _hours);
        return {
          ..._data_,
          SAVE_QUANTITY: saveQuantity,
          SAVE_POWER: savePower
        };
      } else if ("10".indexOf(this.selectedProjectCategory) >= 0) {
        let savePower = this.columnsConfig.formula(_data_);
        return {
          ..._data_,
          SAVE_POWER: savePower
        };
      } else if ("11,12".indexOf(this.selectedProjectCategory) >= 0) {
        let saveQuantity = this.columnsConfig.formula(_data_);
        return {
          ..._data_,
          SAVE_QUANTITY: saveQuantity
        };
      }
    },
    // 下拉值联动处理
    async dropdownValueLinkage(_data_, _val_, _key_) {
      let _PREFIX = _key_.indexOf("BEFORE_") >= 0 ? "BEFORE_" : "AFTER_";
      let _calObj = {};
      if ("2".indexOf(this.selectedProjectCategory) >= 0) {
        let _linkageParams = {
          MODEL_NUM: _data_[`${_PREFIX}MODEL_NUM`],
          CAPACITY: _data_[`${_PREFIX}CAPACITY`]
        };

        let _returnObj = await this.asyncFun(
          "/commonController/getTransformerParamForCalculate",
          "get",
          _linkageParams
        );
        _calObj = Object.assign({}, _data_, {
          [`${_PREFIX}NOLOAD_LOSS`]: _returnObj.NOLOAD_LOSS,
          [`${_PREFIX}SHORT_LOSS`]: _returnObj.LOAD_LOSS
        });
      } else if ("3".indexOf(this.selectedProjectCategory) >= 0) {
        let _linkageParams = {
          MODEL_NUM: _data_[`${_PREFIX}MODEL_NUM`]
        };

        let _returnObj = await this.asyncFun(
          "/commonController/getCableParamForCalculate",
          "get",
          _linkageParams
        );
        _calObj =
          _PREFIX === "BEFORE_"
            ? Object.assign({}, _data_, {
                [`${_PREFIX}RESISTANCE`]: _returnObj.RESISTANCE
              })
            : Object.assign({}, _data_, {
                [`${_PREFIX}RESISTANCE`]: _returnObj.RESISTANCE,
                [`${_PREFIX}AVG_ELE_CURRENT`]: multiply(
                  _returnObj.SAVE_ELE_CURRENT,
                  0.3
                )
              });
      } else if ("4".indexOf(this.selectedProjectCategory) >= 0) {
        let _linkageParams = {
          VOLTAGE: _data_[`${_PREFIX}VOLTAGE`],
          MODEL_NUM: _data_[`${_PREFIX}MODEL_NUM`]
        };

        let _returnObj = await this.asyncFun(
          "/commonController/getOverheadLineParamForCalculate",
          "get",
          _linkageParams
        );
        _calObj =
          _PREFIX === "BEFORE_"
            ? Object.assign({}, _data_, {
                [`${_PREFIX}RESISTANCE`]: _returnObj.RESISTANCE
              })
            : Object.assign({}, _data_, {
                [`${_PREFIX}RESISTANCE`]: _returnObj.RESISTANCE,
                [`${_PREFIX}AVG_ELE_CURRENT`]: multiply(
                  _returnObj.SAVE_ELE_CURRENT,
                  0.3
                )
              });
      }
      let theoryQuantity = this.columnsConfig.formula(_calObj);
      let convertQuantity = round(
        multiply(theoryQuantity, this.convertRate),
        4
      );
      return {
        ..._calObj,
        THEORY_QUANTITY: theoryQuantity,
        CONVERT_QUANTITY: convertQuantity
      };
    },
    // 异步获取联动数据
    asyncFun(url, fetchType, params) {
      return new Promise(resolve => {
        request(url, fetchType, params).then(res => {
          resolve(res.data.body);
        });
      });
    },
    // 保存前校验
    saveValidator(_insertDatas_, _updateDatas_) {
      let validator = new schema(this.columnsConfig.rules);
      let _needValidateDatas = [].concat(_insertDatas_).concat(_updateDatas_);
      let _dataErrors = {};
      for (let _currNeed of _needValidateDatas) {
        validator.validate(_currNeed, errors => {
          if (!isEmpty(errors)) {
            errors.forEach(error => {
              _dataErrors[error.field] = error.message;
            });
          }
        });

        if (!isEmpty(_dataErrors)) {
          break;
        }
      }

      if (!isEmpty(_dataErrors)) {
        this.errorColumns = Object.assign({}, this.errorColumns, _dataErrors);
      } else {
        for (let _currNeed of this.tableData) {
          _dataErrors = this.valueLinkageValidator(_currNeed);
          if (!isEmpty(_dataErrors)) {
            break;
          }
        }
        if (!isEmpty(_dataErrors)) {
          this.errorColumns = Object.assign({}, this.errorColumns, _dataErrors);
        }
      }
    },
    // 值联动校验处理
    valueLinkageValidator(_obj_) {
      if (
        _obj_.hasOwnProperty("THEORY_QUANTITY") &&
        _obj_.hasOwnProperty("CONVERT_QUANTITY")
      ) {
        if (!isNumber(_obj_["THEORY_QUANTITY"])) {
          return {
            THEORY_QUANTITY: "理论年节约电量不能为空"
          };
        }
        if (!isNumber(_obj_["CONVERT_QUANTITY"])) {
          return {
            CONVERT_QUANTITY: "折算年节约电量不能为空"
          };
        }
        if (
          round(multiply(_obj_["THEORY_QUANTITY"], this.convertRate), 4) !==
          round(_obj_["CONVERT_QUANTITY"], 4)
        ) {
          return {
            CONVERT_QUANTITY: `值${_obj_["THEORY_QUANTITY"]}折算后不等于${
              _obj_["CONVERT_QUANTITY"]
            }`
          };
        }
      }

      return {};
    }
  }
};
</script>
