<!-- 基础表格组件 -->
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
      <slot name="customColumnsFront"></slot>
      <el-table-column
        v-for="(column, index) in config.columns"
        :key="column.prop"
        v-bind="getColumnBind(index)"
      >
        <template slot-scope="scope">
          <table-input-item
            v-if="hasEditWidget(column)"
            :key="`${column.prop}-base-form-item`"
            :pageKey="pageKey"
            :item="column.widget"
            v-model="scope.row"
            @input="handleInput($event, column.prop)"
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
      <slot name="customColumnsBehind"></slot>
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
            v-if="editRowdKeys[`${scope.row[config.rowkey]}`]"
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
      <slot name="pagination"></slot>
    </el-pagination>
  </div>
</template>

<script>
import baseTableCommon from "./mixins/baseTableCommon";

export default {
  mixins: [baseTableCommon]
};
</script>
