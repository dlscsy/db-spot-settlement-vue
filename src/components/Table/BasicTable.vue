<!-- 基础表格组件 -->
<template>
  <div
    class="base-table-container"
    :class="{ 'is-single': config.selectionType === 'single' }"
  >
    <el-table
      :ref="pageKey + `baseTable`"
      :row-key="config.rowkey"
      :data="tableData"
      :border="true"
      :stripe="true"
      :size="'mini'"
      class="base-table"
      v-bind="getTableBind()"
      @selection-change="handleSelectionChange"
      @row-click="handleRowClick"
    >
      <el-table-column
        v-if="config.selectionType === 'multiple'"
        type="selection"
        header-align="center"
        align="center"
        width="42"
      />
      <el-table-column
        v-for="(column, index) in config.columns"
        :key="column.prop"
        v-bind="getColumnBind(index)"
      >
        <template slot-scope="scope">
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
// const isUndefined = require("lodash/isUndefined");
const isEmpty = require("lodash/isEmpty");
const isEqual = require("lodash/isEqual");

export default {
  // name: "BasicTable",
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
      currentRow: null
    };
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

      // if (!isEmpty(this.config.pagination)) {
      //   if (this.config.pagination.small) {
      //     return Object.assign({}, defaultBind, this.config.pagination, {
      //       layout: "total, slot, ->, jumper, prev, pager, next"
      //     });
      //   }
      //   return Object.assign({}, defaultBind, this.config.pagination);
      // }
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
      // return isUndefined(this.config.pagination) || this.config.pagination;
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
    // // 每页限制的数据条数改变时调用的方法
    // handleSizeChange(val) {
    //   this.$emit("paginationChange", { page: this.currentPage, limit: val });
    // },
    // // 页码改变时调用的方法
    // handleCurrentChange(val) {
    //   this.$emit("paginationChange", { page: val, limit: this.pageSize });
    // }
    // 每页限制的数据条数改变时调用的方法
    handleSizeChange(val) {
      if (this.config.pagination.frontPagingType) {
        this.realShowData = this.tableData.slice(
          (this.currentPage - 1) * val,
          this.currentPage * val
        );
      } else {
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
        this.$emit("paginationChange", { page: val, limit: this.pageSize });
      }
    }
  }
};
</script>
