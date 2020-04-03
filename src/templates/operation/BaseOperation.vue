<!-- 按钮操作区域组件 -->
<template>
  <div class="operation-btn-container">
    <el-button
      v-if="ifShow('add')"
      type="primary"
      :size="btnSize()"
      :icon="isCustomSvgIcon('add') ? '' : 'el-icon-plus'"
      @click="handleAdd()"
    >
      <svg-icon
        v-if="isCustomSvgIcon('add')"
        :icon-class="config.addBtnSvg"
      />新增
    </el-button>

    <el-button
      v-if="ifShow('edit')"
      type="primary"
      :size="btnSize()"
      :icon="isCustomSvgIcon('edit') ? '' : 'el-icon-edit'"
      @click="handleEdit()"
    >
      <svg-icon
        v-if="isCustomSvgIcon('edit')"
        :icon-class="config.editBtnSvg"
      />编辑
    </el-button>

    <el-button
      v-if="ifShow('detail')"
      type="primary"
      :size="btnSize()"
      @click="handleDetail()"
    >
      <svg-icon
        v-if="isCustomSvgIcon('detail')"
        :icon-class="config.detailBtnSvg"
      />
      <svg-icon v-else icon-class="detail" />查看
    </el-button>

    <el-button
      v-if="ifShow('del')"
      type="primary"
      :size="btnSize()"
      :icon="isCustomSvgIcon('del') ? '' : 'el-icon-delete'"
      @click="handleDel()"
    >
      <svg-icon
        v-if="isCustomSvgIcon('del')"
        :icon-class="config.delBtnSvg"
      />删除
    </el-button>

    <el-button
      v-if="ifShow('import')"
      type="primary"
      :size="btnSize()"
      @click="handleImport()"
    >
      <svg-icon
        v-if="isCustomSvgIcon('import')"
        :icon-class="config.importBtnSvg"
      />
      <svg-icon v-else icon-class="import" />导入
    </el-button>

    <el-button
      v-if="ifShow('export')"
      type="primary"
      :size="btnSize()"
      @click="exportExcel()"
    >
      <svg-icon
        v-if="isCustomSvgIcon('export')"
        :icon-class="config.exportBtnSvg"
      />
      <svg-icon v-else icon-class="export" />导出
    </el-button>

    <el-button
      v-if="ifShow('upload')"
      type="primary"
      :size="btnSize()"
      :icon="isCustomSvgIcon('upload') ? '' : 'el-icon-upload2'"
    >
      <svg-icon
        v-if="isCustomSvgIcon('upload')"
        :icon-class="config.uploadBtnSvg"
      />上传
    </el-button>

    <el-button
      v-if="ifShow('download')"
      type="primary"
      :size="btnSize()"
      :icon="isCustomSvgIcon('download') ? '' : 'el-icon-download'"
    >
      <svg-icon
        v-if="isCustomSvgIcon('download')"
        :icon-class="config.downloadBtnSvg"
      />下载
    </el-button>

    <el-button
      v-if="ifShow('enclosure')"
      type="primary"
      :size="btnSize()"
      @click="showFileList()"
    >
      <svg-icon
        v-if="isCustomSvgIcon('enclosure')"
        :icon-class="config.exportBtnSvg"
      />
      <svg-icon v-else icon-class="enclosure" />附件
    </el-button>

    <!-- 其他自定义按钮 -->
    <slot></slot>
  </div>
</template>

<script>
/**
 * size                       按钮的尺寸
 * addBtnSvg                  新增按钮的自定义图标，选填，必须是svg文件
 * editBtnSvg                 编辑按钮的自定义图标，选填，必须是svg文件
 * detailBtnSvg               查看按钮的自定义图标，选填，必须是svg文件
 * delBtnSvg                  删除按钮的自定义图标，选填，必须是svg文件
 * importBtnSvg               导入按钮的自定义图标，选填，必须是svg文件
 * exportBtnSvg               导出按钮的自定义图标，选填，必须是svg文件
 * uploadBtnSvg               上传按钮的自定义图标，选填，必须是svg文件
 * downloadBtnSvg             下载按钮的自定义图标，选填，必须是svg文件
 * enclosureBtnSvg            附件按钮的自定义图标，选填，必须是svg文件
 * fileBtnState               取值：true（全都显示）、upload（只显示上传按钮）、download（只显示下载按钮）
 * file4BatchDataBtnState     取值：true（全都显示）、import（只显示导入按钮）、export（只显示导出按钮）
 * baseBtnState               未定义或者值为true，则新增、编辑、查看、删除按钮都会显示
 * addBtnState                取值：true，则新增按钮显示，必须baseBtnState为false
 * editBtnState               取值：true，则编辑按钮显示，必须baseBtnState为false
 * detailBtnState             取值：true，则查看按钮显示，必须baseBtnState为false
 * delBtnState                取值：true，则删除按钮显示，必须baseBtnState为false
 * enclosureBtnState          取值：true, 显示附件按钮
 */
const isUndefined = require("lodash/isUndefined");
const isBoolean = require("lodash/isBoolean");
const isEmpty = require("lodash/isEmpty");

export default {
  // name: "BaseOperation",
  props: {
    config: { type: Object }
  }, // 按钮操作区域组件所需的配置
  methods: {
    // 判断按钮是否显示
    ifShow(btnType) {
      let key = btnType + "BtnState";
      if (
        btnType === "add" ||
        btnType === "edit" ||
        btnType === "detail" ||
        btnType === "del"
      ) {
        return (
          isUndefined(this.config) ||
          isUndefined(this.config.baseBtnState) ||
          (isBoolean(this.config.baseBtnState) && this.config.baseBtnState) ||
          (isBoolean(this.config[key]) && this.config[key])
        );
      } else if (btnType === "upload" || btnType === "download") {
        key = "fileBtnState";
        return (
          !isUndefined(this.config) &&
          !isUndefined(this.config[key]) &&
          ((isBoolean(this.config[key]) && this.config[key]) ||
            this.config[key] === btnType)
        );
      } else if (btnType === "enclosure") {
        key = "enclosureBtnState";
        return (
          !isUndefined(this.config) &&
          !isUndefined(this.config[key]) &&
          ((isBoolean(this.config[key]) && this.config[key]) ||
            this.config[key] === btnType)
        );
      } else {
        key = "file4BatchDataBtnState";
        return (
          !isUndefined(this.config) &&
          !isUndefined(this.config[key]) &&
          ((isBoolean(this.config[key]) && this.config[key]) ||
            this.config[key] === btnType)
        );
      }
    },
    // 判断是否使用自定义图标
    isCustomSvgIcon(btnType) {
      if (isEmpty(this.config)) {
        return false;
      } else {
        let key = btnType + "BtnSvg";
        return this.config[key];
      }
    },
    // 设置按钮尺寸
    btnSize() {
      return isEmpty(this.config) || isUndefined(this.config.size)
        ? "small"
        : this.config.size;
    },
    handleAdd() {
      this.$emit("add");
    },
    handleEdit() {
      this.$emit("edit");
    },
    handleDetail() {
      this.$emit("detail");
    },
    handleDel() {
      this.$emit("del");
    },
    showFileList() {
      this.$emit("showFileList");
    },
    exportExcel() {
      this.$emit("export");
    },
    handleImport() {
      this.$emit("import");
    }
  }
};
</script>
