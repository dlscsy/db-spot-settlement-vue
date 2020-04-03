<!-- 基础表格组件 -->
<template>
  <div
    class="edit-table-container"
    :class="{ 'is-single': config.selectionType === 'single' }"
    :key="menukey"
  >
    <el-table
      :ref="pageKey + `baseTable`"
      :row-key="config.rowkey"
      :data="realShowData"
      :border="true"
      :stripe="true"
      :size="'mini'"
      class="edit-table"
      v-bind="getTableBind()"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
      @cell-dblclick="handleCellDblClick"
    >
      <el-table-column
        v-if="config.selectionType === 'multiple'"
        type="selection"
        header-align="center"
        align="center"
        width="42"
      />
      <columnTemplate
        v-for="column in config.columns"
        :key="column.prop"
        :column="column"
      ></columnTemplate>
      <el-table-column
        v-if="showEditTableBtns()"
        header-align="center"
        width="140"
        fixed="right"
        align="center"
        class-name="edit-table-operate-column"
      >
        <template slot="header">
          <el-tooltip
            v-if="headerBtnsShow"
            effect="light"
            content="保存"
            placement="top"
          >
            <svg-icon
              icon-class="ok"
              class="edit-table-operateBtn"
              style="margin-right: 1rem;"
              @click="handleSave"
            />
          </el-tooltip>
          <el-tooltip
            v-if="headerBtnsShow"
            effect="light"
            content="重置"
            placement="top"
          >
            <svg-icon
              icon-class="reset"
              class="edit-table-operateBtn"
              style="margin-right: 1rem;"
              @click="handleAllReset"
            />
          </el-tooltip>
          <el-tooltip effect="light" content="新增" placement="top">
            <svg-icon
              icon-class="add"
              class="edit-table-operateBtn"
              @click="handleAdd"
            />
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <el-tooltip
            v-if="editRowdKeys[`${scope.row[config.rowkey]}`]"
            effect="light"
            content="重置"
            placement="left"
          >
            <svg-icon
              icon-class="reset"
              class="edit-table-operateBtn"
              style="margin-right: 1rem;"
              @click="handleReset(scope.row[config.rowkey])"
            />
          </el-tooltip>
          <el-tooltip effect="light" content="删除" placement="bottom">
            <svg-icon
              icon-class="delete"
              class="edit-table-operateBtn"
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
      class="edit-table-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <slot></slot>
    </el-pagination>
  </div>
</template>

<script>
import { uuid } from "utils/utils";
import { EDIT_TABLE } from "./TableConstant";
import columnTemplate from "./ColumnTemplate";

const isEmpty = require("lodash/isEmpty");
const isEqual = require("lodash/isEqual");

export default {
  components: {
    columnTemplate
  },
  props: {
    // 业务页面唯一标识
    pageKey: {
      type: String,
      required: true
    },
    // 表格组件所需的配置
    config: {
      type: Object,
      required: true
    },
    // 表格组件所需的数据
    tableData: {
      type: Array,
      required: true,
      default: function() {
        return [];
      }
    },
    tableReLoad: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    // 页码
    page: {
      type: Number
    },
    // 每页限制的数据条数
    limit: {
      type: Number
    }
  },
  data() {
    return {
      currentRow: null,
      currentEditCell: null,
      headerBtnsShow: false,
      editRowdKeys: {},
      delDataKeys: [],
      realShowData: [],
      menukey: 1
    };
  },
  watch: {
    tableData(newVal) {
      if (this.config.pagination.frontPagingType) {
        this.realShowData = newVal.slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
      } else {
        this.realShowData = newVal;
      }
      if (this.tableReLoad) {
        // TODO 还有待验证
        this.initTableData = [].concat(newVal);
        this.currentRow = null;
        this.currentEditCell = null;
        this.headerBtnsShow = false;
        this.editRowdKeys = {};
        this.delDataKeys = [];
        this.tableReLoad = false;
      } else {
        if (!isEmpty(this.initTableData)) {
          let _currTableData = [].concat(this.tableData);
          this.headerBtnsShow = !isEqual(
            this.initTableData,
            _currTableData.map(data => {
              if (data.inputType) {
                delete data.inputType;
              }
              return data;
            })
          );
        }
      }
    },
    menuTree() {
      ++this.menukey;
    }
  },
  mounted() {
    this.initTableData = [].concat(this.tableData);
    if (this.config.pagination.frontPagingType) {
      this.realShowData = this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    } else {
      this.realShowData = this.tableData;
    }
  },
  computed: {
    // 页码的get和set方法
    currentPage: {
      get() {
        return this.page;
      },
      set(page) {
        /* 每当页码改变的时候，该方式可以将页码同步设置到父级组件对应的属性page中
         * 这样父级组件在通过props的方式同步回来，以便在触发selection-change或者
         * current-change事件的时候能够同时返回最新的页码和每页限制的数据条数
         */
        this.$emit("update:page", page);
      }
    },
    // 每页限制的数据的get和set方法
    pageSize: {
      get() {
        return this.limit;
      },
      set(limit) {
        /* 每当每页限制的数据条数改变的时候，该方式可以将每页限制的数据条数同步设置到
         * 父级组件对应的属性limit中，这样父级组件在通过props的方式同步回来，以便在
         * 触发selection-change或者current-change事件的时候能够同时返回最新的页码
         * 和每页限制的数据条数
         */
        this.$emit("update:limit", limit);
      }
    }
  },
  methods: {
    // 构建表格列的绑定属性
    getColumnBind(columnIndex) {
      return Object.assign({}, this.config.columns[columnIndex], {
        "show-overflow-tooltip": true
      });
    },
    // 构建表格的绑定属性
    getTableBind() {
      if (this.config.selectionType === "single") {
        return Object.assign({}, this.config.tableMeta, {
          "highlight-current-row": true
        });
      }

      return this.config.tableMeta;
    },
    // 构建分页的绑定属性
    getPaginationBind() {
      const defaultBind = {
        background: true,
        layout: "total, slot, ->, jumper, prev, pager, next, sizes",
        "page-sizes": [10, 20, 30, 50]
      };

      if (!isEmpty(this.config.pagination.pageMeta)) {
        if (this.config.pagination.pageMeta.small) {
          return Object.assign(
            {},
            defaultBind,
            this.config.pagination.pageMeta,
            {
              layout: "total, slot, ->, jumper, prev, pager, next"
            }
          );
        }
        return Object.assign({}, defaultBind, this.config.pagination.pageMeta);
      }
      return defaultBind;
    },
    // 是否显示分页
    showPagination() {
      return this.config.pagination.show;
    },
    // 多选选中表格数据时调用的方法
    handleSelectionChange(selection) {
      this.$emit("selectionChange", selection.slice(0, selection.length));
    },
    // 单选选中表格数据时调用的方法
    handleRowClick(row) {
      if (this.config.selectionType === "multiple") return false;
      if (isEqual(row, this.currentRow)) {
        // 点击同一行取消选中
        const refStr = this.pageKey + "baseTable";
        this.$refs[refStr].setCurrentRow();
        this.currentRow = null;
        this.$emit("rowClick", {});
      } else {
        this.currentRow = row;
        this.$emit("rowClick", { ...row });
      }
    },
    // 每页限制的数据条数改变时调用的方法
    handleSizeChange(val) {
      if (this.config.pagination.frontPagingType) {
        this.realShowData = this.tableData.slice(
          (this.currentPage - 1) * val,
          this.currentPage * val
        );
      } else {
        // TODO 后端分页时，如果当前页已有修改的数据时，需要提示：该操作将会导致已经修改的数据失效，是否确认进行分页跳转？
        // TODO 确认才执行如下操作
        this.$emit("paginationChange", { page: this.currentPage, limit: val });
      }
    },
    // 页码改变时调用的方法
    handleCurrentChange(val) {
      if (this.config.pagination.frontPagingType) {
        this.realShowData = this.tableData.slice(
          (val - 1) * this.pageSize,
          val * this.pageSize
        );
      } else {
        // TODO 后端分页时，如果当前页已有修改的数据时，需要提示：该操作将会导致已经修改的数据失效，是否确认进行分页跳转？
        // TODO 确认才执行如下操作
        this.$emit("paginationChange", { page: val, limit: this.pageSize });
      }
    },
    // 单元格是否含有元素控件配置
    hasEditWidget(column) {
      return !isEmpty(column.widget);
    },
    showEditTableBtns() {
      return this.config.tableType === EDIT_TABLE;
    },
    // 双击单元格时调用的方法
    handleCellDblClick(row, column, cell) {
      if (this.currentEditCell === null) {
        this.currentEditCell = cell;
        cell.classList.add("edit-table-cell-dbl-click");
      } else {
        if (isEqual(this.currentEditCell, cell)) {
          cell.classList.toggle("edit-table-cell-dbl-click");
          this.currentEditCell = null;
        } else {
          this.currentEditCell.classList.toggle("edit-table-cell-dbl-click");
          cell.classList.add("edit-table-cell-dbl-click");
          this.currentEditCell = cell;
        }
      }
    },
    // 单元格数据录入时调用的方法
    handleInput(_val_, _key_, _row_) {
      const _dataKey = _row_[this.config.rowkey];
      this.$emit(
        "cellEdit",
        this.tableData.map(data => {
          if (_dataKey === data[this.config.rowkey]) {
            return {
              ...data,
              [_key_]: _val_
            };
          }
          return data;
        })
      );

      if (
        !isEmpty(
          this.initTableData.filter(
            data => data[this.config.rowkey] === _dataKey
          )[0]
        )
      ) {
        if (
          _val_ !==
          this.initTableData.filter(
            data => data[this.config.rowkey] === _dataKey
          )[0][_key_]
        ) {
          this.editRowdKeys[`${_dataKey}`] = _dataKey;
        } else {
          delete this.editRowdKeys[`${_dataKey}`];
        }
      }
    },
    // 可编辑表格保存数据时调用的方法
    handleSave() {
      let insertDatas = this.tableData.filter(
        data => !this.editRowdKeys[data[this.config.rowkey]]
      );
      let updateDatas = this.tableData.filter(
        data => this.editRowdKeys[data[this.config.rowkey]]
      );
      this.$emit("editTableSave", {
        insertDatas: insertDatas,
        updateDatas: updateDatas,
        delDatakeys: this.delDataKeys
      });
    },
    // 可编辑表格全部重置数据时调用的方法
    handleAllReset() {
      this.$emit("cellEdit", [].concat(this.initTableData));
      this.headerBtnsShow = false;
      this.editRowdKeys = {};
      this.delDataKeys = [];
    },
    // 可编辑表格重置单行数据时调用的方法
    handleReset(_key_) {
      this.$emit(
        "cellEdit",
        this.tableData.map(data => {
          if (_key_ === data[this.config.rowkey]) {
            return this.initTableData.filter(
              curr => curr[this.config.rowkey] === _key_
            )[0];
          }
          return data;
        })
      );
      delete this.editRowdKeys[`${_key_}`];
    },
    // 可编辑表格添加数据时调用的方法
    handleAdd() {
      this.$emit(
        "cellEdit",
        this.tableData.concat({
          ...this.config.editInit,
          [this.config.rowkey]: uuid(36, 16)
        })
      );
    },
    // 可编辑表格删除数据时调用的方法
    handleDel(_index_, _row_) {
      const _dataKey = _row_[this.config.rowkey];
      if (
        !isEmpty(
          this.initTableData.filter(
            data => data[this.config.rowkey] === _dataKey
          )[0]
        )
      ) {
        this.delDataKeys.push(_dataKey);
      }
      this.$emit("cellEdit", _index_);
    }
  }
};
</script>

<style lang="scss" scoped>
// .edit-table {
//   width: 100%;
// }
// .edit-table-container {
//   .base-form-item-container {
//     display: none;
//   }
//   .edit-table-cell-dbl-click .base-form-item-container {
//     display: block;
//   }
//   .edit-table-cell-dbl-click .base-form-item-container + span {
//     display: none;
//   }
// }
</style>

<style lang="scss">
// @import "styles/variables.scss";

// .edit-table-container {
//   .el-checkbox__input.is-checked {
//     .el-checkbox__inner {
//       background-color: $checkboxBg;
//       border-color: $checkboxBorderColor;
//     }
//   }
//   .el-checkbox__input.is-indeterminate {
//     .el-checkbox__inner {
//       background-color: $checkboxBg;
//       border-color: $checkboxBorderColor;
//     }
//   }
//   .el-checkbox__input {
//     .el-checkbox__inner:hover {
//       border-color: $checkboxBorderColor;
//     }
//   }
//   .el-checkbox__input.is-focus {
//     .el-checkbox__inner {
//       border-color: $checkboxBorderColor;
//     }
//   }
//   .el-checkbox__input.is-indeterminate {
//     .el-checkbox__inner {
//       background-color: $checkboxBg;
//       border-color: $checkboxBorderColor;
//     }
//   }
//   // .el-table__header-wrapper {
//   //   border-bottom: 1px solid #EBEEF5;
//   // }
//   .edit-table-pagination {
//     padding: 0.5rem;
//     .number.active {
//       background: $buttonBg !important;
//       &:hover {
//         color: #ffffff !important;
//         cursor: pointer;
//       }
//     }
//     li:hover {
//       color: $buttonBg !important;
//     }
//   }
//   .edit-table-operate-column {
//     .el-button--primary {
//       background: $buttonBg;
//       border: 1px solid $buttonBorderColor;
//       span > svg {
//         margin-right: 0.5rem;
//       }
//       &:hover {
//         background: $buttonHover;
//         border: 1px solid $buttonHover;
//       }
//     }
//   }
//   .edit-table-operateBtn {
//     color: $buttonBg;
//     height: 0.875rem;
//     width: 0.875rem;
//     &:hover {
//       cursor: pointer;
//       height: 1rem;
//       width: 1rem;
//     }
//   }
// }

// .edit-table-container.is-single {
//   tbody .el-table__row:hover {
//     cursor: pointer;
//   }
// }
// //解决表格不对齐问题
// .el-table th.gutter {
//   display: table-cell !important;
// }
</style>
