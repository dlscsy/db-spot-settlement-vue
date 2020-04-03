<!-- 表单对话框组件 -->
<template>
  <el-dialog
    :visible="visible"
    v-bind="getModalBind()"
    :title="title"
    custom-class="base-fmodal-container sproject-mgt-fmodal-container"
    @opened="handleOpenedModal"
    @close="handleCloseModal"
    @closed="handleClosedModal"
  >
    <div class="base-fmodal-body-container">
      <el-form
        :inline="false"
        label-position="right"
        label-width="110px"
        size="small"
        :status-icon="true"
        :destroy-on-close="true"
      >
        <el-row>
          <el-col :span="12">
            <el-form-item label="上报月份">
              <el-date-picker
                v-model="theMonth"
                type="month"
                placeholder="请选择上报月份"
                format="yyyy-MM"
                value-format="yyyy-MM"
                style="width: 100%;"
                clearable
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="项目类别">
              <el-select
                v-model="projectCategory"
                style="width:100%;"
                @change="handleChange"
              >
                <el-option
                  v-for="o in projectCategoryArr"
                  :key="o.value"
                  :label="o.label"
                  :value="o.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="导入文件">
              <el-upload
                style="display: inline"
                :auto-upload="false"
                :on-change="elInFile"
                action="#"
                ref="upload"
                :show-file-list="false"
                accept=".xlsx, .xls"
              >
                <el-input
                  v-model="fileName"
                  placeholder="请选择导入文件"
                  readonly
                />
              </el-upload>
            </el-form-item>
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
        type="primary"
        icon="el-icon-download"
        size="small"
        @click="handleDownload()"
        >模板下载</el-button
      >
      <el-button type="primary" size="small" @click="handleSave()">
        <svg-icon icon-class="save" />导入
      </el-button>
    </div>
  </el-dialog>
</template>
<script>
import request from "utils/request";
// import XLSX from "xlsx";
import { toObject } from "utils/importUtil";
import { uuid } from "utils/utils";
const isEmpty = require("lodash/isEmpty");
const moment = require("moment");

export default {
  data() {
    return {
      theMonth: "",
      projectCategory: "2",
      projectCategoryArr: "",
      fileName: "",
      importData: {},
      projectCategoryOld: "2"
    };
  },
  props: {
    // 业务页面唯一标识
    pageKey: {
      type: String,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    config: {
      type: Object,
      required: true
    },
    projectCategoryDefault: {
      type: String
      // required: true
    }
  },
  beforeCreate() {
    require("utils/import");
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const url = "/commonController/getDropDownCodesByCodeType/";
      request(url + "1").then(res => {
        let result = res.data.body;
        result.splice(0, 1);
        this.projectCategoryArr = result;
      });
      if (this.projectCategoryDefault != "1") {
        this.projectCategory = this.projectCategoryDefault;
      }
      this.theMonth = moment(new Date()).format("YYYY-MM");
    },
    handleOpenedModal() {},
    // 表单对话框关闭时事件处理
    handleCloseModal() {
      this.$emit("update:visible", false);
    },
    // 构建弹出对话框的绑定属性
    getModalBind() {
      return Object.assign({});
    },
    handleSave() {
      if (isEmpty(this.importData)) {
        this.$message({
          message: "无可导入数据",
          type: "warning"
        });
        return;
      }
      if (this.importData.isFail) {
        let message = "";
        if (!isEmpty(this.importData.timeErrorRows)) {
          message +=
            this.importData.timeErrorRows.join("、") + "行上报月份非当月数据，";
        }
        if (!isEmpty(this.importData.failRows)) {
          message += this.importData.failRows.join("、") + "行数据不完整，";
        }
        message += "请修改后再导入";
        this.$message({
          message: message,
          type: "warning"
        });
        return;
      }
      if (this.importData.data.length < 1) {
        this.$message({
          message: "无可导入数据",
          type: "warning"
        });
        return;
      }
      this.$emit("import", this.importData);
    },
    elInFile(f) {
      this.projectCategoryOld = this.projectCategory.toString;
      this.fileName = f.name;
      this.read(f.raw);
    },
    read(f) {
      let rd = new FileReader();
      rd.onload = e => {
        //this.readAsArrayBuffer函数内，会回调this.onload函数。在这里处理结果
        e;
        let sheets = rd.read2JS();
        for (let name in sheets) {
          this.Mapdata = sheets[name];
          this.reMap(this.Mapdata);
          break;
        }
      };
      rd.readAsBinaryString(f);
    },
    reMap(data) {
      if (data.length < 1) {
        this.$message({
          message: "文件中无数据",
          type: "warning"
        });
        return;
      }
      if (isEmpty(this.projectCategory)) {
        this.$message({
          message: "请选择项目类别",
          type: "warning"
        });
        return;
      }
      var result = toObject(this.config[this.projectCategory], data, {
        theMonth: this.theMonth,
        datasource: "1"
      });
      if (this.projectCategory == "7" || this.projectCategory == "8") {
        var list = result.data;
        var rl = [];
        list.forEach(element => {
          element.caliberType = "0";
          element.projectId = uuid(36, 16);
          let temp = Object.assign({}, element, {
            investAmount: element.investAmount1,
            saveQuantity: element.saveQuantity1,
            savePower: element.savePower1,
            saveConvertQuantity: element.saveConvertQuantity1,
            saveConvertPower: element.saveConvertPower1,
            saveCost: element.saveCost1,
            caliberType: "1"
          });
          if (this.projectCategory == "7") {
            temp.eleScale = element.eleScale1;
          }
          rl.push(element);
          rl.push(temp);
        });
        result.data = rl;
      }
      result.projectCategory = this.projectCategory;
      this.importData = result;
    },
    handleDownload() {
      if (isEmpty(this.projectCategory)) {
        this.$message({
          message: "请选择项目类别",
          type: "warning"
        });
        return;
      }
      this.$emit("down", this.projectCategory);
    },
    handleClosedModal() {},
    handleChange(val) {
      if (val != this.projectCategoryOld) {
        this.fileName = "";
        this.importData = {};
      }
    }
  }
};
</script>
<style lang="scss" scope>
.el-upload {
  display: block;
}
</style>
