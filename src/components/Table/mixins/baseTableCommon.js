// 表格的公共声明
import schema from "async-validator";
import {
  TABLE_EDIT_ADD_ACTION,
  TABLE_EDIT_UPDATE_ACTION,
  TABLE_EDIT_DEL_ACTION,
  TABLE_EDIT_ALL_RESET_ACTION
} from "components/Table/TableConstant";
import TableInputItem from "templates/item/TableInputItem";
import { uuid } from "utils/utils";
import { EDIT_TABLE } from "components/Table/TableConstant";

const isEmpty = require("lodash/isEmpty");
const isEqual = require("lodash/isEqual");

export default {
  components: {
    TableInputItem
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
      required: true
    },
    // 是否可编辑
    editDisabled: {
      type: Boolean,
      default: false
    },
    // 是否重新加载表格数据
    tableReLoad: {
      type: Boolean,
      default: false
    },
    // 总数据条数
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
      initTableData: [], // 用于存储初始的表格数据以便于可编辑表格的重置操作
      realShowData: [], // 表格真实现在界面中的数据
      currentRow: null, // 当前选中行
      currentEditCell: null, // 当前正在编辑的单元格
      editRow: {}, // 当前正在编辑的单元格所在的行
      headerBtnsShow: false, // 可编辑表格是否显示确认修改表格数据按钮和整体重置表格数据按钮
      editRowKeys: {}, // 编辑过的数据主键集合
      addRowKeys: {}, // 新增的数据主键集合
      delDataKeys: [], // 删除的数据主键集合
      selectedDatas: [], // 勾选的数据
      errorColumns: {} // 触发校验时不通过的字段
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
        this.realShowData = [].concat(newVal);
      }
      if (this.tableReLoad) {
        // 如果表格数据重新加载了，则重置相关的内部状态
        this.initTableData = [].concat(newVal);
        this.currentRow = null;
        this.headerBtnsShow = false;
        this.selectedDatas = [];
      } else {
        this.headerBtnsShow = !isEqual(this.initTableData, newVal);
      }
    },
    headerBtnsShow(newVal) {
      if (!newVal) {
        this.resetInternalState();
        this.$emit("editTableSave", {});
      }
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
    // 单元格是否含有元素控件配置
    hasEditWidget(column) {
      return !isEmpty(column.widget);
    },
    // 是否显示可编辑表格操作按钮列
    showEditTableBtns() {
      return this.config.tableType === EDIT_TABLE && !this.editDisabled;
    },
    // 是否显示分页
    showPagination() {
      return this.config.pagination.show;
    },
    // 多选选中表格数据时调用的方法
    handleSelectionChange(selection) {
      this.selectedDatas = selection.slice(0, selection.length);
      this.$emit("selectionChange", this.selectedDatas);
    },
    // 单选选中表格数据时调用的方法
    handleRowClick(row) {
      if (this.config.selectionType === "multiple") return false;
      if (isEqual(row, this.currentRow)) {
        // 点击同一行取消选中
        const refStr = `${this.pageKey}BaseTable`;
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
        // TODO 增加处理：当前页已发生部分修改, 分页操作将导致已发生的修改无效，是否继续分页？
        this.$emit("paginationChange", {
          page: this.currentPage,
          limit: val
        });
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
        // TODO 增加处理：当前页已发生部分修改, 分页操作将导致已发生的修改无效，是否继续分页？
        this.$emit("paginationChange", {
          page: val,
          limit: this.pageSize
        });
      }
    },
    // 双击单元格时调用的方法
    handleCellDblClick(row, column, cell) {
      if (!this.editDisabled) {
        this.editRow = row;
        if (this.currentEditCell === null) {
          this.currentEditCell = cell;
          cell.classList.add("base-table-cell-dbl-click");
        } else {
          if (isEqual(this.currentEditCell, cell)) {
            cell.classList.toggle("base-table-cell-dbl-click");
            this.currentEditCell = null;
            this.editRow = {};
          } else {
            this.currentEditCell.classList.toggle("base-table-cell-dbl-click");
            cell.classList.add("base-table-cell-dbl-click");
            this.currentEditCell = cell;
          }
        }
      }
    },
    // 单元格数据录入时调用的方法
    handleInput(_val_, _key_) {
      if (!isEmpty(this.editRow)) {
        const _dataKey = this.editRow[this.config.rowkey];
        const _initObjByKey = this.initTableData.filter(
          data => data[this.config.rowkey] === _dataKey
        )[0];

        let _editObj = { ...this.editRow, [_key_]: _val_ };
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
    // 可编辑表格保存数据时调用的方法
    handleSave() {
      let insertDatas = this.tableData.filter(
        data => this.addRowKeys[data[this.config.rowkey]]
      );
      let updateDatas = this.tableData.filter(
        data => this.editRowKeys[data[this.config.rowkey]]
      );
      // 保存前校验
      this.saveValidator(insertDatas, updateDatas);
      if (isEmpty(this.errorColumns)) {
        this.$emit("editTableSave", {
          insertDatas: insertDatas,
          updateDatas: updateDatas,
          delDatakeys: this.delDataKeys
        });
        if (this.currentEditCell !== null) {
          this.currentEditCell.classList.toggle("base-table-cell-dbl-click");
        }
        this.currentEditCell = null;
        this.editRow = {};
      } else {
        let _msg = "表单中表格数据校验不通过，问题如下：<br />";
        Object.keys(this.errorColumns).forEach(key => {
          let _currValMsg = this.errorColumns[key];
          _msg = `${_msg}<br />${_currValMsg}`;
        });
        _msg = `${_msg}<br /><br />因此，无法执行确认修改表格数据操作！`;
        this.$message({
          message: _msg,
          dangerouslyUseHTMLString: true,
          type: "error"
        });

        this.errorColumns = {};
      }
    },
    // 可编辑表格全部重置数据时调用的方法
    handleAllReset() {
      this.$emit("tableEdit", {
        actionType: TABLE_EDIT_ALL_RESET_ACTION,
        array: [].concat(this.initTableData)
      });
    },
    // 可编辑表格重置单行数据时调用的方法
    handleReset(_key_) {
      let _resetObj = this.initTableData.filter(
        data => data[this.config.rowkey] === _key_
      )[0];
      delete this.editRowKeys[`${_key_}`];
      if (this.currentEditCell !== null) {
        this.currentEditCell.classList.toggle("base-table-cell-dbl-click");
      }
      this.currentEditCell = null;
      this.editRow = {};
      this.$emit("tableEdit", {
        actionType: TABLE_EDIT_UPDATE_ACTION,
        obj: _resetObj
      });
    },
    // 可编辑表格添加数据时调用的方法
    handleAdd() {
      const UUID = uuid(36, 16);
      this.addRowKeys[`${UUID}`] = UUID;
      let _addObj = {
        ...this.config.editInit,
        [this.config.rowkey]: UUID
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
      this.$emit("tableEdit", {
        actionType: TABLE_EDIT_DEL_ACTION,
        index: _index_
      });
    },
    handleAllDel() {
      if (this.selectedDatas.length === 0) {
        this.$message({
          message: "请至少选择一条信息进行删除！",
          type: "warning"
        });
      } else {
        this.selectedDatas.forEach(data => {
          this.handleDel(this.tableData.indexOf(data), data);
        });
      }
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
          this.errorColumns = Object.assign({}, this.errorColumns, _dataErrors);
          break;
        }
      }
    },
    // 重置内部状态
    resetInternalState() {
      if (this.currentEditCell !== null) {
        this.currentEditCell.classList.toggle("base-table-cell-dbl-click");
      }
      this.currentEditCell = null;
      this.editRow = {};
      this.editRowKeys = {};
      this.addRowKeys = {};
      this.delDataKeys = [];
      this.errorColumns = {};
    }
  }
};
