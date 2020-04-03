<template>
  <el-table-column
    v-if="hasChildren(column)"
    :prop="column.prop"
    :label="column.label"
    v-bind="getColumnBind(column)"
  >
    <template>
      <columnTemplate
        v-for="item in column.children"
        :key="item.prop"
        :column="item"
      ></columnTemplate>
    </template>
  </el-table-column>
  <el-table-column
    v-else
    :prop="column.prop"
    :label="column.label"
    v-bind="getColumnBind(column)"
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
</template>
<script>
const isEmpty = require("lodash/isEmpty");

export default {
  name: "columnTemplate",
  props: {
    column: {
      type: Object
    }
  },
  methods: {
    // 构建表格列的绑定属性
    getColumnBind(column) {
      return Object.assign({}, column, {
        "show-overflow-tooltip": true
      });
    },
    hasChildren(column) {
      return !isEmpty(column.children);
    }
  }
};
</script>
