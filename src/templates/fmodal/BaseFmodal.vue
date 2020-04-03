<!-- 表单对话框组件 -->
<template>
  <el-dialog
    :visible="visible"
    :destroy-on-close="true"
    custom-class="base-fmodal-container"
    v-bind="getModalBind()"
    @open="handleOpenModal"
    @opened="handleOpenedModal"
    @close="handleCloseModal"
    @closed="handleClosedModal"
  >
    <div class="base-fmodal-body-container">
      <el-form
        :ref="`${pageKey}FmodalForm`"
        :model="value"
        :inline="false"
        :rules="getRules()"
        v-bind="getFormBind()"
      >
        <el-row v-for="rowIndex in rowNum" :key="rowIndex" :gutter="10">
          <el-col
            v-for="(item, index) in getRowFormItems(rowIndex)"
            :key="`form-item-col${rowIndex}-${index}`"
            :span="span"
          >
            <base-form-item
              :key="`${item.key}-base-form-item`"
              :item="item"
              :value="value[item.key]"
              :disabled="disabled || unEditable(item)"
              @input="handleInput($event, item.key)"
            ></base-form-item>
          </el-col>
        </el-row>
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
import baseFmodalCommon from "templates/fmodal/mixins/baseFmodalCommon";

export default {
  mixins: [baseFmodalCommon]
};
</script>
